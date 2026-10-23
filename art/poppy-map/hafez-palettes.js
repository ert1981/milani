/* hafez-palettes.js — Poppy Map in Grokly: colour palettes from the palet-hafez family (Hafez «نقش‌خط»).
   Roles in Poppy Map: paper (زمینهٔ کاغذ و خط‌های شیری) · ink (خط‌های نقشه) · line (خط رنگی و گلبرگ‌های آبی) ·
   poppy (شقایق‌ها) · sun (خورشید زرد).  The original seed keeps the original colours; any other seed (Generate) picks one of
   40 handwoven templates (گبه، جاجیم، گلیم), 13 Anticyclone palettes or 3 silk threads, from the seed hash — never from
   the sketch's own random stream, so the composition of a seed stays the same.  Plant dyes are approximations. */
(function () {
  var DYE = {
    shiri: [236, 226, 204], krem: [228, 214, 186], nokhodi: [214, 190, 150], shotori: [178, 134, 90], gerdu: [112, 74, 48],
    sukhte: [76, 50, 36], meshki: [42, 34, 32], khakestari: [152, 145, 136],
    ronas: [180, 60, 44], ronasTire: [132, 38, 36], goli: [204, 98, 90], narenji: [216, 114, 54], holui: [232, 172, 124], golbehi: [226, 164, 152],
    laki: [168, 30, 52], lakiTond: [188, 32, 42], esparak: [226, 184, 68], khardali: [194, 150, 58], anar: [170, 150, 94],
    sabz: [72, 130, 82], chamani: [96, 152, 72], yashmi: [62, 132, 118], zeytuni: [120, 122, 64],
    asemani: [112, 156, 200], nili: [48, 86, 152], sormei: [32, 44, 90], firuze: [58, 150, 160], badenjani: [88, 40, 68], arghavani: [134, 52, 96]
  };
  var TEXTILE = [
    ['گبهٔ شیری قشقایی، زمینهٔ روناس', 'ronas shiri nokhodi sormei esparak'], ['گبهٔ کهگیلویه، پشم خودرنگ', 'shiri shotori gerdu khakestari goli'],
    ['گبهٔ لری، پشم خودرنگ', 'shiri nokhodi shotori gerdu meshki'], ['گبهٔ حوض، نیل و روناس', 'nili asemani shiri ronas sormei'],
    ['گبهٔ درخت، سبز اسپرک و نیل', 'sabz chamani esparak shiri laki'], ['گبهٔ قشقایی، زمینهٔ اسپرک', 'esparak narenji gerdu shiri zeytuni'],
    ['گبهٔ شیر، دشت ارژن', 'shotori narenji shiri sormei goli'], ['گبهٔ بختیاری، لاکی و سبز', 'laki yashmi khardali krem sormei'],
    ['گبهٔ پوست انار', 'anar gerdu nokhodi ronas zeytuni'], ['گبهٔ بادمجانی', 'badenjani arghavani golbehi shiri khardali'],
    ['گبهٔ غروب، روناس نارنجی', 'narenji holui ronas sukhte shiri'], ['گبهٔ خاکستری، پشم کوهستان', 'khakestari shiri meshki ronas asemani'],
    ['گبهٔ چنگ و آدمک', 'nokhodi gerdu laki nili esparak'], ['گبهٔ ابرش سبز یشمی', 'yashmi sabz khardali krem ronasTire'],
    ['جاجیم شاهسون، آذربایجان', 'laki chamani esparak sormei shiri'], ['جاجیم قشقایی، فارس', 'ronas narenji khardali yashmi shiri meshki'],
    ['جاجیم کردی', 'laki sormei krem sabz arghavani'], ['جاجیم ترکمن، لاکی و کرم و مشکی', 'lakiTond krem meshki nili'],
    ['جاجیم بختیاری', 'ronas shiri gerdu nili esparak'], ['جاجیم مغان، لاکی و سبز تند', 'lakiTond chamani narenji krem sormei'],
    ['جاجیم چشم‌خروس', 'narenji firuze shiri sormei khardali'], ['جاجیم لوزی تودرتو', 'arghavani yashmi esparak shiri laki'],
    ['جاجیم ملیله‌دار', 'goli zeytuni nokhodi sukhte asemani'], ['جاجیم دندان‌موشی', 'meshki shiri laki esparak'],
    ['جاجیم روستایی، رنگ شاد', 'narenji esparak chamani golbehi sormei'], ['جاجیم شب، نیل و لاک', 'sormei nili laki krem firuze'],
    ['جاجیم کرم و قهوه‌ای', 'krem nokhodi gerdu ronas sukhte'], ['گلیم سنه، لاکی روی سرمه‌ای', 'laki sormei shiri yashmi khardali goli'],
    ['گلیم قشقایی، ستارهٔ هشت‌پر', 'ronas nili shiri narenji sabz'], ['گلیم کهگیلویه، شانه و لوزی', 'gerdu ronas shiri meshki khardali'],
    ['گلیم بلوچ، رنگ تیره', 'ronasTire badenjani sormei shotori shiri'], ['گلیم افشار', 'gerdu arghavani sormei lakiTond nokhodi'],
    ['ورنی شاهسون', 'laki sormei esparak sabz shiri firuze'], ['گلیم مداخل، پر و خالی', 'laki shiri sormei esparak'],
    ['سوزنی قشقایی', 'narenji sabz sormei shiri laki esparak'], ['گلیم حصیری و لادی', 'nokhodi gerdu ronas zeytuni krem'],
    ['گلیم ساده، ابرش نیلی', 'nili asemani sormei shiri'], ['گلیم محرمات', 'ronas shiri sormei esparak sabz gerdu'],
    ['گلیم کرمانشاهی، لاکی و قهوه‌ای و کرم', 'laki gerdu krem nokhodi sormei'], ['گلیم خرچنگی', 'narenji shiri sormei yashmi esparak']
  ];
  var ORIGINALS = [
    [[190, 95, 55], [45, 65, 75], [210, 125, 85], [35, 45, 60]], [[170, 115, 65], [55, 85, 75], [35, 55, 65], [150, 105, 75]],
    [[210, 145, 75], [65, 75, 85], [45, 55, 60], [185, 105, 65]], [[90, 150, 190], [210, 105, 65], [55, 65, 80], [165, 85, 75]],
    [[200, 125, 75], [75, 95, 105], [45, 50, 55], [155, 95, 70]], [[25, 35, 90], [30, 140, 160], [230, 120, 140], [245, 225, 200]],
    [[20, 70, 160], [210, 50, 60], [255, 160, 100], [40, 140, 90]], [[35, 50, 110], [255, 145, 110], [40, 170, 175], [240, 215, 185]],
    [[50, 150, 100], [220, 100, 130], [25, 80, 170], [200, 60, 70]], [[45, 110, 145], [55, 145, 105], [195, 55, 48], [248, 240, 220]],
    [[35, 65, 85], [165, 85, 55], [220, 155, 65], [245, 235, 210]], [[60, 150, 115], [190, 50, 45], [50, 100, 140], [250, 242, 225]],
    [[40, 90, 120], [200, 70, 50], [180, 140, 70], [240, 230, 205]]
  ];
  var SILK = {
    'ابریشم نیلی': [[156, 186, 232], [86, 128, 208], [40, 80, 172], [22, 46, 124], [8, 17, 58]],
    'ابریشم لاکی': [[228, 146, 144], [204, 72, 82], [168, 24, 42], [118, 12, 28], [54, 5, 14]],
    'ابریشم مشکی': [[170, 168, 176], [112, 110, 118], [64, 62, 70], [32, 30, 36], [10, 9, 12]]
  };
  var ZWHITE = [243, 239, 229], SILK_IVORY = [238, 231, 214];
  var L = function (c) { return 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]; };
  function hsv(c) { var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0;
    if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return { h: h, s: mx ? d / mx : 0, v: mx }; }
  // assign Poppy Map's five roles from any palette (rule: keep a light paper, a dark ink, a warm poppy, a cool line, a bright sun)
  function roles(name, cols) {
    var by = cols.slice().sort(function (a, b) { return L(b) - L(a); });
    var paper = L(by[0]) >= 165 ? by[0] : ZWHITE;                        // light ground (or cotton white when the palette has none)
    var ink = by[by.length - 1];                                          // the darkest
    var rest = cols.filter(function (c) { return c !== paper && c !== ink; });
    if (!rest.length) rest = cols.slice();
    // owner: the poppies are always red — the palette's own red (روناسی، لاکی، لاکی تند…) when it has one, otherwise lacquer red
    var redness = function (c) { var h = hsv(c); return (h.h < 14 || h.h > 340) && h.s > 0.62 && h.v > 0.35 ? h.s * h.v : 0; };
    var reds = cols.filter(function (c) { return redness(c) > 0; }).sort(function (a, b) { return redness(b) - redness(a); });
    var poppy = reds[0] || DYE.lakiTond;
    var cool = function (c) { var h = hsv(c); return (h.h > 150 && h.h < 260 ? 1 : h.h > 90 && h.h <= 150 ? 0.7 : 0) * (0.3 + h.s); };
    var line = rest.filter(function (c) { return c !== poppy; }).sort(function (a, b) { return cool(b) - cool(a); })[0] || ink;
    // owner: the sun is the brightest colour of the palette
    var sun = by[0];
    return { name: name, paper: paper, ink: ink, line: line, poppy: poppy, sun: sun };
  }
  var LIST = [];
  TEXTILE.forEach(function (t) { LIST.push(roles(t[0], t[1].split(' ').map(function (k) { return DYE[k]; }))); });
  ORIGINALS.forEach(function (o, i) { LIST.push(roles('Anticyclone o' + i, o.concat([SILK_IVORY]))); });
  Object.keys(SILK).forEach(function (k) { var s = SILK[k], laki = SILK['ابریشم لاکی']; LIST.push({ name: k, paper: SILK_IVORY, ink: s[4], line: s[1], poppy: laki[2], sun: s[0] }); });
  var ORIGINAL = { name: 'رنگ‌های اصلی', paper: [251, 246, 242], ink: [0, 0, 0], line: null, poppy: [205, 68, 70], sun: [253, 184, 19] };
  // the seed (?h=0x…) chooses the palette; the default (original) seed keeps the original colours
  var q = new URLSearchParams(location.search), h = q.get('h') || '', P = ORIGINAL;
  var DEFAULT = '0x6d696c616e69617274652d6772' + '0'.repeat(38);
  if (h && h !== DEFAULT && h.length > 20) { var n = parseInt(h.slice(-8), 16) >>> 0; P = LIST[n % LIST.length]; }
  window.HAFEZ = { palette: P, list: LIST };
  window.PM = function (role, a) { var c = P[role]; return a === undefined ? [c[0], c[1], c[2]] : [c[0], c[1], c[2], a]; };
})();
