// Grokly Pass — collector credits for people who MINTED a Reza Milani artwork on Verse.
//
// Plain script, no build step, no dependencies. Exposes window.GroklyPass.
//
//   FREE     : the “Made with Grokly” mark is always on and the exported video uses the first 30 seconds.
//   CREDITS  : the FIRST MINTER of an eligible token gets its minutes (5 / 10 / 75 by tier; Collector also unlocks 4K), once per
//              token (later owners get nothing). Each export spends its length in whole seconds; up to 5 minutes per video.
//
// How it works (needs the verification service in server/verify/, see holder-gate.md):
//   1. Connect wallet (EIP-1193 / EIP-6963). 2. “Sign in” = the wallet signs a free EIP-4361 message (personal_sign; no
//   transaction, no gas). 3. The service checks the signature, finds the tokens this wallet minted first, records the
//   claim once, and returns a 15-minute session token + the balance. 4. Right before each export this file asks for a
//   render token for the video's length (the service reserves the seconds), checks its ES256 signature with
//   CONFIG.verifyPublicKeyJwk, redeems it once (single use) and only then renders without the cap / mark.
//   Anything uncertain (no service configured, offline, timeout, bad token, not enough credits) ⇒ FREE. Never blocks export.
//   Only the wallet address, signatures and tokens are sent. Audio, video and pictures never leave the device.
//
// NOTE: export happens in the user's browser, so a technical user can always patch this page. See holder-gate.md.
(function () {
  'use strict';

  // ---------------------------------------------------------------------------------------------
  // CONFIG — the only place the founder needs to edit.
  // ---------------------------------------------------------------------------------------------
  // Customer-facing tiers (marketing model locked 2026-10-23, /tmp/claude-0/qa/holder-model-fa.md). Display only: the service
  // decides minutes/perks from server/verify/collections.json (keep both in sync). "Whispers of the Wind" earns minutes too
  // (shared contract) but is not advertised until its token-id range is confirmed.
  const TIERS = [
    { name: 'Starter', price: '$4.90', minutes: 5, extra: '', url: 'https://verse.works/artworks/98bbb95d-e0b7-4279-9f25-298d7aa77e52', works: [['Traveling with the Wind', '98bbb95d-e0b7-4279-9f25-298d7aa77e52']] },
    { name: 'Spring', price: '$6.54–$9.80', minutes: 10, extra: '', url: 'https://verse.works/series/the-first-days-of-spring', label: 'any of 11 works from The First Days of Spring',
      works: [['A Night Conversation of Tree and Wind', '656c5062-7cf4-456a-aba2-6360e96d6a95'], ['A Tree in the Distance', '247816ad-c595-48cf-81ca-ddb2d7f78174'],
        ['Blossoms Behind the River', '82cbb997-1718-4eee-a916-a0856f3b1cc5'], ['Canebrake #2', '564368df-bdc6-4608-9d80-689bd0ba5ecf'], ['Cherry Blossoms by the River', 'b5e6c94d-8d1e-4e0b-a98c-7fa4ad72986a'],
        ['Poppies in the Spring Wind', '63d93357-169f-40c7-ac31-3ecffb903994'], ['The Last Flower', 'ffcd348b-5f3f-4e9a-8389-e09429f55fa4'], ['The First Days of Spring', 'd211f060-41dc-40a2-afb5-e0bb32f1b95e'],
        ['Spring Blossoms Along the Eastern Pond', '4b5c54d4-b5d0-4cd4-a92b-0964b125c9e1'], ['The Quiet Side of Spring', '83d5890a-9de9-4f73-add6-656042343263'], ['The Silence Between Wind and Tree', '51ac19d0-46ad-4e28-8dbc-83b89fe39e35']] },
    { name: 'Collector', price: '$49', minutes: 75, extra: ', plus 4K and priority bot replies', url: 'https://verse.works/series/touch-of-the-moment-by-reza-milani?itemId=47d4486b-8b06-435b-8ba7-def536acd681', label: 'Touch of the Moment', works: [] },
  ];
  const CONFIG = {
    tiers: TIERS,
    freeMaxSeconds: 30,         // free tier: export length cap (the mark is always on)
    creditMaxSeconds: 300,      // with credits: up to 5 minutes per video
    gate4k: true,               // 4K export only with the "4k" perk, from the signed session
    fourKMinUsd: 49,            // display only: the service decides (perkThresholdsUsd in collections.json)
    // TODO(founder): the deployed verification service + its public key (`npm run keygen` in server/verify).
    verifyUrl: 'https://91-188-254-194.sslip.io',              // '' ⇒ credits are off and everyone uses the free tier
    verifyPublicKeyJwk: { kty: 'EC', crv: 'P-256', x: 'lwilFML3eDHoUijdVI3v643r92i5-THxHkfSRUgR7R0', y: 'yVdXAEjfSECsP3a_nIl8-ed7a-frPY0Vd6msicVuL70' }, // founder's public key (generated on his Mac, 2026-10-24); the private half stays on the verify host only
    exportTimeoutMs: 8000,      // budget for the network steps right before an export
    storageKey: 'grokly.pass.wallet',
  };
  // Test-only override, honoured ONLY on a local test host (the local harness serves the app on 127.0.0.1).
  const LOCAL_TEST_HOST = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (LOCAL_TEST_HOST && window.GROKLY_PASS_TEST_CONFIG && typeof window.GROKLY_PASS_TEST_CONFIG === 'object') {
    const t = window.GROKLY_PASS_TEST_CONFIG; Object.keys(CONFIG).forEach((k) => { if (k in t) CONFIG[k] = t[k]; });
  }
  // Freeze everything so the limits can't be changed from the console; the rules below read these closure constants.
  const deepFreeze = (o) => { if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(deepFreeze); } return o; };
  deepFreeze(CONFIG);
  const FREE_MAX = 30;                                          // the free cap is fixed: never longer than 30 s
  const CREDIT_MAX = Math.max(FREE_MAX, Number(CONFIG.creditMaxSeconds) || 300);
  const GATE_4K = CONFIG.gate4k !== false || !LOCAL_TEST_HOST;   // 4K stays gated outside local tests
  const VERIFY_URL = String(CONFIG.verifyUrl || ''), VERIFY_JWK = CONFIG.verifyPublicKeyJwk;
  const COLLECTION_URL = 'https://verse.works/rezamilani'; // the founder's Verse profile

  // Product name follows the page (team A is renaming the product): read from the watermark checkbox label
  // “Show “Made with X”” ⇒ mark = "Made with X", name = "X". Falls back to Grokly.
  const MARK = () => { const l = document.getElementById('wm'); const m = l && l.closest('label') && /“([^”]+)”/.exec(l.closest('label').textContent); return m ? m[1] : 'Made with Milani'; }; // team A: product name Milani
  const NAME = () => MARK().replace(/^Made with\s+/, '') || 'Milani'; // team A: product name Milani
  const PASS = () => NAME() + ' Pass';
  const isAddr = (a) => typeof a === 'string' && /^0x[0-9a-fA-F]{40}$/.test(a);
  const enabled = () => !!(VERIFY_URL && VERIFY_JWK);
  const verseArt = (id) => 'https://verse.works/artworks/' + id;
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
  };
  const timeout = (ms, v = 'timeout') => new Promise((r) => setTimeout(() => r(v), Math.max(0, ms)));
  const usd = (v) => '$' + (Math.round(Number(v || 0) * 100) / 100).toFixed(2).replace(/\.00$/, '');
  const fmtMin = (s) => { s = Math.max(0, Math.floor(s)); const m = Math.floor(s / 60), r = s % 60; return r ? `${m} min ${r} s` : `${m} min`; };

  // ---------------------------------------------------------------------------------------------
  // Service client + token checks (ES256 JWT, WebCrypto)
  // ---------------------------------------------------------------------------------------------
  const b64uDecode = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
  let pubKey = null;
  async function readToken(token, typ, account) {
    try {
      if (!(window.crypto && crypto.subtle)) return null;
      const [h, p, s] = String(token).split('.'); if (!s) return null;
      if (JSON.parse(new TextDecoder().decode(b64uDecode(h))).alg !== 'ES256') return null;
      pubKey = pubKey || (await crypto.subtle.importKey('jwk', VERIFY_JWK, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']));
      if (!(await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, pubKey, b64uDecode(s), new TextEncoder().encode(h + '.' + p)))) return null;
      const c = JSON.parse(new TextDecoder().decode(b64uDecode(p)));
      if (c.iss !== 'grokly-verify' || c.typ !== typ || c.sub !== account) return null;
      if (/^https?:$/.test(location.protocol) && c.aud !== location.origin) return null;
      return c; // callers check exp
    } catch { return null; }
  }
  async function api(path, body, ms) {
    const ac = new AbortController(), tm = setTimeout(() => ac.abort(), Math.max(300, ms));
    try {
      const r = await fetch(VERIFY_URL.replace(/\/+$/, '') + '/' + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: ac.signal, credentials: 'omit', cache: 'no-store' });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(j.error || 'HTTP ' + r.status), { status: r.status, body: j });
      return j;
    } finally { clearTimeout(tm); }
  }
  const sessKey = (a) => 'grokly.pass.session.' + a;
  async function acceptSession(res, account) {
    const c = await readToken(res.session, 'session', account);
    if (!c) throw new Error('the answer could not be checked');
    S.sess = { account, token: res.session, exp: c.exp, balance: Number(res.balance) || 0, claims: res.claims || [], grants: res.grants || [], perks: Array.isArray(c.perks) ? c.perks : [],
      usd: Number(c.usd != null ? c.usd : res.collectedUsd) || 0, need4k: Number((res.perkThresholdsUsd || {})['4k']) || CONFIG.fourKMinUsd, at: Date.now() };
    ls.set(sessKey(account), res.session);
  }
  const usedJti = new Set();

  // ---------------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------------
  const S = { wallets: [], wallet: null, account: null, phase: 'idle', sess: null, msg: '', picking: false, signing: false };
  // phase: idle | connecting | restoring | ready | error
  const listeners = new Set();
  let lastCredits = false;
  const sessionNow = () => !!(S.sess && S.sess.account === S.account && S.sess.exp * 1000 > Date.now());
  const creditsNow = () => enabled() && !!S.account && sessionNow() && S.sess.balance >= 1;
  const allows4k = () => !GATE_4K || (enabled() && !!S.account && sessionNow() && S.sess.perks.includes('4k')); // perk comes from the signed session
  function emit() {
    render();
    const h = creditsNow();
    if (h !== lastCredits) { lastCredits = h; syncCheckbox(true); listeners.forEach((f) => { try { f(h); } catch {} }); }
  }

  // ---------------------------------------------------------------------------------------------
  // Wallet discovery (EIP-6963 + window.ethereum fallback)
  // ---------------------------------------------------------------------------------------------
  function addWallet(info, provider) {
    if (!provider || typeof provider.request !== 'function') return;
    if (S.wallets.some((w) => w.provider === provider)) return;
    const id = (info && (info.rdns || info.uuid)) || 'injected';
    const icon = info && typeof info.icon === 'string' && /^data:image\/(svg\+xml|png|jpeg|webp|gif)[;,]/.test(info.icon) ? info.icon : '';
    S.wallets = S.wallets.filter((w) => w.id !== id).concat({ id, name: (info && info.name) || guessName(provider), icon, provider });
    render();
  }
  function guessName(p) { return p.isRabby ? 'Rabby' : p.isCoinbaseWallet ? 'Coinbase Wallet' : p.isMetaMask ? 'MetaMask' : 'Browser wallet'; }
  window.addEventListener('eip6963:announceProvider', (e) => { const d = e && e.detail; if (d) addWallet(d.info, d.provider); });
  function discover() { try { window.dispatchEvent(new Event('eip6963:requestProvider')); } catch {} }
  function fallbackInjected() { if (window.ethereum && !S.wallets.length) addWallet({ name: guessName(window.ethereum), rdns: 'injected' }, window.ethereum); } // only if no EIP-6963 wallet
  const hasWallet = () => S.wallets.length > 0 || !!window.ethereum;

  // ---------------------------------------------------------------------------------------------
  // Connect / disconnect / events
  // ---------------------------------------------------------------------------------------------
  const handlers = { accountsChanged: (accs) => setAccount(Array.isArray(accs) && accs[0]), disconnect: () => setAccount(null) };
  function bind(w) {
    if (S.wallet && S.wallet !== w) unbind(S.wallet);
    S.wallet = w; if (w._bound) return;
    for (const [ev, fn] of Object.entries(handlers)) { try { w.provider.on && w.provider.on(ev, fn); } catch {} }
    w._bound = true;
  }
  function unbind(w) {
    if (!w || !w._bound) return;
    for (const [ev, fn] of Object.entries(handlers)) { try { (w.provider.removeListener || w.provider.off || (() => {})).call(w.provider, ev, fn); } catch {} }
    w._bound = false;
  }
  function setAccount(a) {
    const next = isAddr(a) ? a.toLowerCase() : null;
    if (next === S.account) return;
    S.account = next; if (!S.sess || S.sess.account !== next) S.sess = null;
    if (!next) { S.phase = 'idle'; S.msg = S.wallet ? 'Wallet disconnected.' : ''; emit(); return; }
    S.phase = 'ready'; S.msg = ''; emit();
    if (enabled()) restoreSession(next);
  }
  // A session saved earlier for this wallet (reload / account switch): refresh it without a new signature.
  async function restoreSession(acct) {
    if (!ls.get(sessKey(acct))) return;
    S.phase = 'restoring'; render();
    await refreshSession(CONFIG.exportTimeoutMs);
    if (S.account === acct) { S.phase = 'ready'; emit(); }
  }
  async function connect(w) {
    if (!w) {
      if (!S.wallets.length) { discover(); fallbackInjected(); }
      if (S.wallets.length > 1) { S.picking = true; render(); return; }
      w = S.wallets[0]; if (!w) { render(); return; }
    }
    S.picking = false; S.phase = 'connecting'; S.msg = 'Confirm in your wallet…'; bind(w); render();
    try {
      const accs = await w.provider.request({ method: 'eth_requestAccounts' });
      if (!accs || !accs[0]) throw Object.assign(new Error('no account'), { code: 4001 });
      ls.set(CONFIG.storageKey, w.id);
      S.account = null; setAccount(accs[0]);
    } catch (e) {
      S.phase = 'idle';
      S.msg = e && e.code === 4001 ? 'Connection cancelled. You can try again any time.'
        : e && e.code === -32002 ? 'Your wallet already has a request open. Please check your wallet.'
        : 'Could not connect to your wallet. Please try again.';
      emit();
    }
  }
  function disconnect() {
    const w = S.wallet;
    if (w) w.provider.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] }).catch(() => {}); // best effort (MetaMask)
    if (S.account) ls.set(sessKey(S.account), null);
    ls.set(CONFIG.storageKey, null); unbind(w); S.wallet = null; S.account = null; S.sess = null; S.phase = 'idle'; S.msg = ''; emit();
  }
  async function reconnect() { // after reload: eth_accounts never opens a popup
    const id = ls.get(CONFIG.storageKey); if (!id) return;
    const w = S.wallets.find((x) => x.id === id) || (id === 'injected' ? S.wallets[0] : null); if (!w) return;
    try { const accs = await w.provider.request({ method: 'eth_accounts' }); if (accs && accs[0]) { bind(w); setAccount(accs[0]); } } catch {}
  }

  // ---------------------------------------------------------------------------------------------
  // Sign-in, balance, render tokens
  // ---------------------------------------------------------------------------------------------
  async function signIn() { // user action only: opens the wallet's signature prompt
    const acct = S.account, w = S.wallet; if (!acct || !w || !enabled() || S.signing) return;
    S.signing = true; S.msg = 'Confirm the free sign-in in your wallet. It is not a transaction and costs nothing.'; render();
    try {
      const ch = await api('challenge', { address: acct }, 10000);
      const msgHex = '0x' + Array.from(new TextEncoder().encode(ch.message), (b) => b.toString(16).padStart(2, '0')).join('');
      const signature = await w.provider.request({ method: 'personal_sign', params: [msgHex, acct] });
      const res = await api('verify', { message: ch.message, signature }, 30000);
      if (S.account !== acct) return;
      await acceptSession(res, acct); S.phase = 'ready'; S.msg = '';
    } catch (e) {
      S.msg = e && e.code === 4001 ? 'Sign-in cancelled. You can try again any time.' : 'Could not sign in right now (' + ((e && e.message) || 'error') + '). Free mode for now.';
    } finally { S.signing = false; emit(); }
  }
  // New session + fresh balance, without a signature (allowed for 24 h after signing). true if it worked.
  async function refreshSession(budgetMs) {
    const acct = S.account, tok = (S.sess && S.sess.account === acct && S.sess.token) || ls.get(sessKey(acct));
    if (!acct || !tok || !enabled()) return false;
    try { const res = await api('balance', { session: tok }, budgetMs); if (S.account !== acct) return false; await acceptSession(res, acct); return true; }
    catch (e) {
      if (S.account !== acct) return false;
      if (e.status === 401) { S.sess = null; ls.set(sessKey(acct), null); S.msg = 'Please sign in again to use your collector credits.'; }
      else S.msg = `Couldn’t reach the ${NAME()} minutes service right now. Free mode until it answers.`;
      return false;
    }
  }
  // Before export: confirm the wallet (eth_accounts, no popup) and refresh the balance. Never throws; bounded time.
  async function checkForExport() {
    if (!enabled() || !S.wallet || !S.account) return false;
    try {
      const accs = await Promise.race([S.wallet.provider.request({ method: 'eth_accounts' }), timeout(1500)]);
      if (Array.isArray(accs)) setAccount(accs[0]);
      if (!S.account || !(S.sess || ls.get(sessKey(S.account)))) return false;
      const ok = await Promise.race([refreshSession(CONFIG.exportTimeoutMs), timeout(CONFIG.exportTimeoutMs)]);
      emit(); return ok === true && creditsNow();
    } catch { return false; }
  }
  // Reserve + redeem credits for `seconds`. Returns { ok, reason }.
  async function spend(seconds) {
    const acct = S.account, need = Math.ceil(seconds), deadline = Date.now() + CONFIG.exportTimeoutMs;
    if (!creditsNow()) return { ok: false, reason: S.account && sessionNow() ? 'none' : 'signin' };
    if (S.sess.balance < need) return { ok: false, reason: 'short' };
    try {
      const r = await api('render', { session: S.sess.token, seconds: need }, deadline - Date.now());
      const c = await readToken(r.renderToken, 'render', acct);
      if (!c || c.sec < need || c.exp * 1000 <= Date.now() || usedJti.has(c.jti)) return { ok: false, reason: 'bad' };
      usedJti.add(c.jti); // single use on this side too
      const d = await api('redeem', { renderToken: r.renderToken }, deadline - Date.now());
      if (S.sess && S.sess.account === acct) S.sess.balance = Number(d.balance);
      emit(); return { ok: true };
    } catch (e) {
      if (e && e.status === 402) { if (S.sess) S.sess.balance = Number((e.body && e.body.balance) || 0); emit(); return { ok: false, reason: 'short' }; }
      if (e && e.status === 401) { S.sess = null; emit(); return { ok: false, reason: 'signin' }; }
      return { ok: false, reason: 'offline' };
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Tier rules used by index.html
  // ---------------------------------------------------------------------------------------------
  function showWatermark(userWants) { return creditsNow() ? !!userWants : true; } // preview
  const maxSeconds = () => (creditsNow() ? CREDIT_MAX : FREE_MAX);
  let lastReason = '';
  // Decides one export: spends credits for its length, or falls back to the free version (first 30 s, mark on).
  // Returns { pcm, feats, capped (seconds or 0), wm (draw the mark?), credits (seconds spent), reason }.
  async function capExport(pcm, feats, SR, FPS, userWantsWm) {
    const cut = (sec) => { const n = Math.floor(sec * SR); if (!pcm || pcm.length <= n) return { pcm, feats, capped: 0 };
      const out = pcm.slice(0, n), fade = Math.min(n, Math.floor(0.4 * SR)); for (let i = 0; i < fade; i++) out[n - fade + i] *= 1 - i / fade;
      return { pcm: out, feats: feats ? feats.slice(0, Math.ceil(sec * FPS)) : feats, capped: sec }; };
    const full = cut(CREDIT_MAX), seconds = full.pcm.length / SR;
    let reason = '';
    if (enabled() && S.account) { const r = await spend(seconds); if (r.ok) { lastReason = ''; return { ...full, wm: !!userWantsWm, credits: Math.ceil(seconds), reason: '' }; } reason = r.reason; }
    lastReason = reason || 'free';
    return { ...cut(FREE_MAX), wm: true, credits: 0, reason: lastReason };
  }
  function exportNote(capped, reason = lastReason) {
    if (!capped && (!reason || reason === 'free')) return ''; // a short free video needs no note
    const why = { short: `You don’t have enough minutes left for this video (${fmtMin(S.sess ? S.sess.balance : 0)} left), so it was made in the free version.`,
      offline: 'The minutes service didn’t answer, so this video was made in the free version. Your minutes were not used.',
      signin: S.account && enabled() ? `Sign in with your wallet (Quality › ${PASS()}) to use your minutes.` : '',
      bad: 'Your minutes couldn’t be confirmed, so this video was made in the free version.' }[reason] || '';
    const base = capped ? `Free videos use the first ${capped} seconds and carry the “${MARK()}” mark.` : '';
    const pitch = !enabled() ? 'Longer videos and 4K for collectors of Reza Milani’s art are coming soon.'
      : !S.sess || !(S.sess.claims.length || S.sess.grants.length) ? `Mint a Reza Milani artwork on Verse to get full-length minutes without the mark (Quality › ${PASS()}).` : '';
    return [base, why, pitch].filter(Boolean).join(' ').trim();
  }

  // ---------------------------------------------------------------------------------------------
  // UI (rendered into #passBox; styles use the page's CSS variables)
  // ---------------------------------------------------------------------------------------------
  const CSS = `
.gp { display: grid; gap: 8px; border-top: 1.5px solid var(--line, #ccc); padding-top: 12px; }
.gp h3 { margin: 0; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.gp .gp-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--line, #ccc); flex: none; }
.gp[data-state="active"] .gp-dot { background: #2f9e6b; }
.gp[data-state="error"] .gp-dot { background: var(--coral, #e2614f); }
.gp p { margin: 0; color: var(--soft, #666); font-size: 13.5px; overflow-wrap: anywhere; }
.gp .gp-acct { font-family: "Space Mono", ui-monospace, monospace; color: var(--ink, #222); }
.gp .gp-bal { color: var(--ink, #222); font-weight: 600; }
.gp .row { gap: 8px; }
.gp .gp-wallets { display: grid; gap: 6px; }
.gp .gp-wallets button { justify-content: flex-start; width: 100%; }
.gp .gp-wallets img { width: 20px; height: 20px; border-radius: 4px; }
.gp a { color: var(--teal, #00506a); }
.gp details { font-size: 13.5px; color: var(--soft, #666); }
.gp summary { cursor: pointer; color: var(--teal, #00506a); }
.gp ul { margin: 6px 0 0; padding-left: 18px; display: grid; gap: 3px; }
.gp .gp-src { margin: 0; font-size: 13.5px; color: var(--ink, #222); }
.gp .btn.gp-go { background: var(--teal, #00506a); border-color: var(--teal, #00506a); color: var(--teal-ink, #fff); }
#quality [data-q="2160"]:disabled { opacity: .5; cursor: not-allowed; border-style: dashed; text-decoration: line-through; box-shadow: none; }
.gp .btn:focus-visible, .gp summary:focus-visible { outline: 2px solid var(--teal, #00506a); outline-offset: 2px; }`;
  let box = null;
  const el = (tag, props, kids) => { const n = document.createElement(tag); Object.assign(n, props || {}); (kids || []).forEach((k) => k && n.append(k)); return n; };
  const txt = (s) => document.createTextNode(s);
  const btn = (text, onclick, cls) => el('button', { type: 'button', className: 'btn small' + (cls ? ' ' + cls : ''), textContent: text, onclick });
  const link = (text, href) => el('a', { href, textContent: text, target: '_blank', rel: 'noopener' });
  const short = (a) => a.slice(0, 6) + '…' + a.slice(-4);
  const RULE = 'Minutes go to the collector who minted the artwork, once per artwork.';
  const FINE = 'To receive minutes, mint the artwork to your own wallet (connect it at checkout on Verse). Artworks minted to Verse’s default custodial wallet, or bought on the secondary market, don’t include minutes. Minutes are credited once per artwork, to the wallet that minted it. They are a tool benefit, not an investment.';
  // Pricing copy (marketing, locked): tiers with links to the artworks on Verse + the required fine print.
  function tierList(open) {
    const d = el('details'), ul = el('ul');
    d.append(el('summary', { textContent: 'Mint an artwork, get minutes' }));
    CONFIG.tiers.forEach((t) => {
      const li = el('li', {}, [el('strong', { textContent: `${t.name} · ${t.price}` }), txt(' · '), link(t.label || t.works.map((w) => w[0]).join(', '), t.url), txt(` → ${t.minutes} minutes${t.extra}`)]);
      if (t.works.length > 1) { const sub = el('ul'); t.works.forEach(([n, id]) => sub.append(el('li', {}, [link(n, verseArt(id))]))); li.append(sub); }
      ul.append(li);
    });
    d.append(ul, el('p', { textContent: `4K unlocks when the different artworks you minted add up to $${CONFIG.fourKMinUsd} (Touch of the Moment alone does it; several editions of one artwork count once).` }), el('p', { textContent: `Minutes never expire. Videos run up to ${CREDIT_MAX / 60} minutes each. Need more? Mint another artwork. Works for voice videos and music videos alike.` }), el('p', { textContent: FINE }));
    if (open) d.open = true;
    return d;
  }
  function render() {
    if (!box) return;
    const wrap = el('div', { className: 'gp' });
    const head = el('h3', {}, [el('span', { className: 'gp-dot' }), txt(PASS())]);
    const msg = el('p', { className: 'gp-msg', role: 'status' }); msg.setAttribute('aria-live', 'polite');
    const lines = [], actions = el('div', { className: 'row' }); let state = 'off';
    const free = `Free: the first ${FREE_MAX} seconds of every video, with a small “${MARK()}” mark.`;
    const pitch = `${free} Mint a Reza Milani artwork on Verse and get full-length, watermark-free minutes, credited once to the wallet that minted it.`;
    if (!enabled()) {
      lines.push(el('p', { textContent: `${free} Longer videos and 4K for collectors of Reza Milani’s art are coming soon.` }),
        el('p', {}, [link('See his work on Verse', COLLECTION_URL)]));
    } else if (!S.account) {
      lines.push(el('p', { textContent: pitch }), tierList());
      if (!hasWallet()) {
        lines.push(el('p', {}, [txt('Already minted one? Install '), link('MetaMask', 'https://metamask.io/download/'), txt(', '), link('Coinbase Wallet', 'https://www.coinbase.com/wallet/downloads'), txt(' or '), link('Rabby', 'https://rabby.io/'), txt(' with the wallet you minted with, then reload this page.')]));
      } else if (S.picking) {
        const list = el('div', { className: 'gp-wallets', role: 'group' }); list.setAttribute('aria-label', 'Choose a wallet');
        S.wallets.forEach((w) => { const b = btn('', () => connect(w)); if (w.icon) b.append(el('img', { src: w.icon, alt: '' })); b.append(txt(w.name)); list.append(b); });
        lines.push(list); actions.append(btn('Cancel', () => { S.picking = false; render(); }));
      } else {
        const c = btn(S.phase === 'connecting' ? 'Connecting…' : 'Connect wallet', () => connect(), 'gp-go'); c.disabled = S.phase === 'connecting'; actions.append(c);
      }
    } else {
      lines.push(el('p', {}, [txt('Wallet '), el('span', { className: 'gp-acct', textContent: short(S.account), title: S.account })]));
      if (S.phase === 'restoring' && !sessionNow()) lines.push(el('p', { textContent: 'Checking your minutes…' }));
      else if (!sessionNow()) {
        lines.push(el('p', { textContent: 'Sign in with your wallet to use the minutes of artworks you minted. It is a free signature, not a transaction.' }));
        const b = btn(S.signing ? 'Waiting for your wallet…' : 'Sign in', signIn, 'gp-go'); b.disabled = S.signing; actions.append(b);
      } else {
        const mine = S.sess.claims.filter((c) => c.status !== 'claimed-by-another'), others = S.sess.claims.filter((c) => c.status === 'claimed-by-another');
        if (S.sess.balance >= 1) state = 'active';
        lines.push(el('p', {}, [el('span', { className: 'gp-bal', textContent: `${fmtMin(S.sess.balance)} left.` }), txt(S.sess.balance >= 1 ? ` Each video spends its length (up to ${CREDIT_MAX / 60} minutes, no watermark unless you want it). Minutes never expire.` : ` Free mode (${FREE_MAX} seconds, with the mark).`)]));
        const src = [...mine.map((c) => `${c.source || 'Artwork'} #${c.tokenId} · ${fmtMin(c.seconds)}${c.valueUsd ? ' · ' + usd(c.valueUsd) : ''}`),
          ...(S.sess.grants || []).map((g) => `${!g.source || g.source === 'Gift' ? 'Gift from ' + NAME() : g.source} · ${fmtMin(g.seconds)}${(g.perks || []).includes('4k') ? ' · 4K' : ''}`)];
        if (src.length) { const ul = el('ul', { className: 'gp-src' }); src.forEach((x) => ul.append(el('li', { textContent: x }))); lines.push(el('p', { textContent: 'Your minutes come from:' }), ul); }
        else lines.push(el('p', { textContent: 'No artworks minted by this wallet were found. ' + RULE }), tierList());
        if (others.length) lines.push(el('p', { textContent: `${others.length} artwork(s) in this wallet were minted by someone else, so their minutes went to that collector.` }));
        if (S.sess.perks.includes('4k')) lines.push(el('p', { textContent: `4K export is unlocked (${usd(S.sess.usd)} of collected artworks).` }));
        else if (GATE_4K) { lines.push(el('p', { className: 'gp-4k', textContent: `4K unlocks at ${usd(S.sess.need4k)} of collected artworks — you have ${usd(S.sess.usd)}.` })); if (src.length) lines.push(tierList()); }
        actions.append(btn('Refresh', () => refreshSession(CONFIG.exportTimeoutMs).then(emit)));
      }
      actions.append(btn('Disconnect', disconnect));
    }
    msg.textContent = S.msg;
    wrap.dataset.state = state;
    wrap.append(head, ...lines); if (actions.childNodes.length) wrap.append(actions); wrap.append(msg);
    const wasOpen = box.querySelector('details') && box.querySelector('details').open; const d = wrap.querySelector('details'); if (d && wasOpen) d.open = true;
    box.replaceChildren(wrap);
    syncCheckbox(false); syncQuality(); syncFooter();
  }
  // Footer line: honest while the minutes service is off; the bot line once it is on.
  function syncFooter() {
    const f = document.getElementById('footSoon'); if (!f) return;
    if (enabled()) f.replaceChildren(txt('Coming soon: mention the bot under your video on X'));
    else f.replaceChildren(txt('Longer videos and 4K for collectors: coming soon · '), link('Reza Milani on Verse', COLLECTION_URL));
  }
  // 4K (Quality picker #quality, data-q="2160") only with the "4k" perk. If 4K is selected without it, 2K is picked instead.
  // index.html re-checks allows4k() when “Make my video” is pressed (marked Grokly Pass hook).
  function syncQuality() {
    const b = document.querySelector('#quality [data-q="2160"]'); if (!b) return;
    const ok = allows4k(); b.disabled = !ok;
    const why = ok ? '4K takes longer and some phones can’t make it.' : enabled() ? '4K is included with Touch of the Moment (Collector).' : '4K for collectors is coming soon.';
    b.title = ok ? '' : why;
    // Visible reason (touch and keyboard users never see tooltips), linked to the button for screen readers.
    let n = document.getElementById('q4kNote');
    if (!n) { const seg = document.getElementById('quality'); if (!seg) return; n = el('div', { id: 'q4kNote', className: 'note' }); seg.insertAdjacentElement('afterend', n); }
    if (n.textContent !== why) n.textContent = why;
    b.setAttribute('aria-describedby', 'q4kNote');
    if (!ok && b.getAttribute('aria-pressed') === 'true') { const k2 = document.querySelector('#quality [data-q="1440"]'); if (k2) k2.click(); }
  }
  // The “Show Made with Grokly” checkbox (#wm) only works with credits: free ⇒ ticked + locked; when credits become
  // available ⇒ unticked once (no mark by default). A 'change' event lets index.html update its own state.
  function syncCheckbox(transition) {
    const cb = document.getElementById('wm'); if (!cb) return;
    const on = creditsNow(), set = (v) => { if (cb.checked !== v) { cb.checked = v; cb.dispatchEvent(new Event('change', { bubbles: true })); } };
    cb.disabled = !on;
    const lab = cb.closest('label'); if (lab) lab.title = on ? '' : `Minted artworks remove the mark (see ${PASS()} below).`;
    if (!on) set(true); else if (transition) set(false);
  }

  // ---------------------------------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------------------------------
  function mount(target) {
    box = typeof target === 'string' ? document.getElementById(target) : target;
    if (!box) return;
    if (!document.getElementById('gp-style')) document.head.append(el('style', { id: 'gp-style', textContent: CSS }));
    render();
  }
  async function init() {
    if (!enabled()) return;
    discover();
    await timeout(350, 0); // give EIP-6963 wallets a moment to announce
    fallbackInjected(); render();
    await reconnect();
    // keep the session fresh while the page is open (sessions last 15 min; refresh needs no signature for 24 h)
    setInterval(() => { if (S.account && !document.hidden && S.sess && S.sess.exp * 1000 - Date.now() < 180000) refreshSession(CONFIG.exportTimeoutMs).then(emit); }, 60000);
  }
  const start = () => { mount('passBox'); init(); setTimeout(syncQuality, 1500); }; // again after index.html restores saved settings
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  const API = Object.freeze({
    config: CONFIG,
    connect, disconnect, signIn, refresh: () => refreshSession(CONFIG.exportTimeoutMs).then((ok) => { emit(); return ok; }),
    hasCredits: creditsNow, allows4k, showWatermark, maxSeconds, capExport, exportNote, checkForExport,
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    get state() { return { account: S.account, phase: S.phase, enabled: enabled(), signedIn: sessionNow(), credits: creditsNow(), collectedUsd: S.sess ? S.sess.usd : 0, balance: S.sess ? S.sess.balance : 0, claims: S.sess ? S.sess.claims.slice() : [], grants: S.sess ? S.sess.grants.slice() : [], perks: S.sess ? S.sess.perks.slice() : [], message: S.msg, wallets: S.wallets.map((w) => w.name) }; },
  });
  try { Object.defineProperty(window, 'GroklyPass', { value: API, writable: false, configurable: false, enumerable: true }); } catch { /* already defined */ }
})();
