/*
  hart3 — one image: SELF + 3–5 OTHERS + their relations. hart2 is untouched.

  اسکچ خودت — یو‌آی و گرافیک دست‌نخورده.
  فقط رفتار پرنده‌ها و دایره از موتور احساس خوانده می‌شود.
  ← →  احساس بعدی/قبلی      ↑ ↓  خانوادهٔ بعدی      N  گلهٔ تازه
  R  ضبط یک دقیقه (دوباره R برای توقف زودتر)      X  اجرای ده برابر سریع‌تر (روشن/خاموش)
*/

// ── palette: one minimal, modern set — ink on ground, a single red ─────────
const INK = [32, 30, 29];        // --color-text
const GROUND = [243, 242, 242];  // --color-bg
const MID = [138, 136, 133];     // neutral-500
const ACCENT = [236, 48, 19];    // --color-accent

function rampColor(base, a) { return color(base[0], base[1], base[2], a); }

// each of the 250 feelings gets its own tone, mixed only from the palette:
// the family sets how far it sits along mid → ink → accent, the step within
// the family sets how deep it goes. No colour outside the system appears.
function toneFor(d) {
  const f = d.family / 9;                  // 0 → 1 across the families
  const k = (d.index % 25) / 24;           // 0 → 1 within one family
  const t = constrain(f * 0.75 + k * 0.25, 0, 1);
  const mix = (A, B, u) => [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u];
  // first half of the range cools toward ink, second half warms toward the accent
  const base = t < 0.5 ? mix(MID, INK, t * 2) : mix(INK, ACCENT, (t - 0.5) * 2);
  // the step inside the family lifts or deepens it against the ground
  const lift = (k - 0.5) * 0.22;
  return mix(base, lift > 0 ? GROUND : [0, 0, 0], abs(lift)).map(v => round(constrain(v, 0, 255)));
}

let currentColor = null;
function chooseRandomColor() {
  if (currentColor == null) {
    // ninety entries so the sketch's colors[n] lookups all resolve:
    // ground, ink, mid and one accent, at graded transparencies
    const out = [];
    for (let i = 0; i < 90; i++) {
      const k = i % 6;
      const a = 26 + (i % 5) * 22;
      if (k === 0) out.push(rampColor(GROUND, 255));
      else if (k === 1) out.push(rampColor(INK, a + 40));
      else if (k === 2) out.push(rampColor(MID, a));
      else if (k === 3) out.push(rampColor(GROUND, 235));
      else if (k === 4) out.push(rampColor(ACCENT, a + 30));
      else out.push(rampColor(INK, a));
    }
    currentColor = { name: 'modern', colors: out };
  }
  return currentColor;
}

// ── 250 palettes, one per feeling, never repeated ─────────────────────────
// Groups of 25, in order: monochrome, ocean, earth, warm/sunset, pastel, night,
// neon, botanical, jewel, experimental. Each palette runs dark → light.
// Inside a family the feelings rise in intensity; the group's palettes are
// ranked the same way (positive: brighter, more saturated; negative: heavier,
// darker) and matched step for step.
const PALETTES = [
  ["#0B0F14","#26313B","#52616B","#A8B5BE","#E9EEF1"],
  ["#111111","#292929","#4A4A4A","#8A8A8A","#E6E6E6"],
  ["#151A24","#293241","#3D5A80","#98C1D9","#E0FBFC"],
  ["#171717","#303030","#5C5C5C","#A6A6A6","#EEEEEE"],
  ["#101820","#243746","#456A7D","#7FA6B8","#D7E4E8"],
  ["#181818","#343434","#606060","#A0A0A0","#E8E8E8"],
  ["#0C1821","#1B3A4B","#386FA4","#73A2C6","#C7DDEB"],
  ["#191919","#393939","#595959","#999999","#D9D9D9"],
  ["#12151A","#252B33","#414B57","#7B8794","#DCE3E8"],
  ["#0E1B22","#28414B","#4F6D75","#8CA6A8","#D8E2DF"],
  ["#141414","#353535","#565656","#8F8F8F","#DADADA"],
  ["#0D1B2A","#1B263B","#415A77","#778DA9","#E0E1DD"],
  ["#161616","#2E2E2E","#505050","#7A7A7A","#D0D0D0"],
  ["#102027","#263238","#455A64","#78909C","#CFD8DC"],
  ["#1A1A1A","#333333","#4D4D4D","#808080","#CCCCCC"],
  ["#0A1016","#1C2833","#34495E","#71879A","#D5DEE5"],
  ["#171C1F","#30383D","#58656B","#8D9A9F","#DDE3E5"],
  ["#111827","#263449","#40566F","#7189A3","#D9E2EC"],
  ["#16181D","#30343B","#555C66","#858D98","#D6DAE0"],
  ["#0F1419","#252D35","#46525D","#77838D","#CBD2D7"],
  ["#151A1E","#2B343A","#4A575E","#7E8B91","#D4D9DB"],
  ["#101416","#283236","#46565B","#71858A","#D2DADB"],
  ["#18191B","#34363A","#5A5D62","#8D9095","#D9DADC"],
  ["#0B1114","#1F3036","#3D555B","#6F8A8E","#CFDCDB"],
  ["#171B1D","#30383B","#505B5F","#858F92","#D5D9DA"],
  ["#071A2B","#0B3C5D","#1D6FA5","#5AA9D6","#D7F0FF"],
  ["#081C2C","#0E4D64","#137C8B","#45B5AA","#D5F2E3"],
  ["#0A1628","#12355B","#1C7293","#28A9C5","#B8E8F2"],
  ["#071E26","#0B525B","#12908A","#51C2B1","#D4F4E4"],
  ["#101B35","#243B6B","#4169A1","#7FA7D8","#E2EDFF"],
  ["#051923","#003F5C","#2F6690","#3F8FBF","#A8DADC"],
  ["#0B132B","#1C2541","#3A506B","#5BC0BE","#FDE74C"],
  ["#0B1F33","#123E5A","#176B87","#4CA1AF","#C8E6E8"],
  ["#061A2D","#114B70","#227CA7","#63B4D8","#DDF4FF"],
  ["#0C1B2A","#173F5F","#20639B","#3CAEA3","#F6F6F6"],
  ["#0A1931","#185ADB","#4D96FF","#9DC3FF","#EAF2FF"],
  ["#081B29","#104E64","#168AAD","#52B69A","#D8F3DC"],
  ["#102A43","#243B53","#334E68","#486581","#D9E2EC"],
  ["#06283D","#1363DF","#47B5FF","#DFF6FF","#F9F9F9"],
  ["#071E3D","#1F4287","#278EA5","#21E6C1","#EAF6F6"],
  ["#0B1D26","#164A63","#1F7A8C","#BFDBF7","#E1E5F2"],
  ["#0A2239","#145DA0","#0C7B93","#00A8A8","#F6F7EB"],
  ["#061826","#0B3954","#087E8B","#5AAA95","#C7F9CC"],
  ["#0D2137","#193C5A","#2878A8","#5BB9D5","#DDF3F5"],
  ["#091D2B","#154360","#1F618D","#5499C7","#D6EAF8"],
  ["#0B172A","#1B4965","#62B6CB","#5FA8D3","#CAE9FF"],
  ["#102A43","#1D4E89","#2C7DA0","#61A5C2","#A9D6E5"],
  ["#081C15","#1B4332","#2D6A4F","#52B788","#D8F3DC"],
  ["#071A19","#164E63","#0F766E","#2DD4BF","#CCFBF1"],
  ["#0B2027","#203A43","#2C5364","#66A5AD","#C4DFE6"],
  ["#2B1D0E","#594123","#8B6B3E","#C6A15B","#F0E3C0"],
  ["#3A2415","#6B3F22","#A8663A","#D19A66","#F2D3A0"],
  ["#241A13","#4A3022","#76533C","#A98467","#DCC7AA"],
  ["#2C1E16","#593D2B","#8B684A","#C19A6B","#EAD7B7"],
  ["#33261D","#624B36","#927453","#BE9B72","#E5D2B8"],
  ["#1F261A","#39452A","#5F7140","#8FA866","#D7E3B0"],
  ["#172312","#304B20","#527A34","#82A94A","#DDE8B0"],
  ["#252014","#4D4425","#77713A","#A7A25A","#E1DDB3"],
  ["#291B13","#5C321F","#934B2C","#C9794B","#EBC09A"],
  ["#2E2118","#684B30","#A2764B","#C9A66B","#E9D7B0"],
  ["#1C251B","#344E2B","#557A3E","#7FA65A","#D2E0B2"],
  ["#382A1E","#684B32","#98704A","#C4A078","#E6D2B8"],
  ["#30251D","#5D4634","#896B52","#B79A7A","#E0CFB6"],
  ["#2B2118","#594331","#8A684C","#B9956B","#E2D0B6"],
  ["#252014","#4E4728","#766F3A","#A29A59","#DAD4A5"],
  ["#1E261B","#3B4A2B","#65764A","#91A86A","#D3DDB8"],
  ["#302015","#633B24","#9A5A35","#C98656","#E8C3A1"],
  ["#241B15","#50382A","#795741","#A27B5C","#D9C0A5"],
  ["#352719","#6B4A2D","#9A7042","#C39A63","#E8D5B0"],
  ["#1D2419","#3C4C2C","#61754A","#8FA56A","#D4DEBC"],
  ["#332418","#65472A","#936537","#BD8B55","#E5C99C"],
  ["#2B231B","#574B37","#7F7157","#A99A7C","#DCD3C2"],
  ["#39291E","#6D513A","#9C7654","#C1A27D","#E6D7C3"],
  ["#20251B","#485033","#707B4A","#9CA66C","#D9DEB9"],
  ["#281E17","#553D2C","#815E43","#AA8564","#DCC7AC"],
  ["#3A0F0F","#76251F","#B84A39","#E27D60","#F7C6A3"],
  ["#40130E","#8C2F1C","#C95A32","#E9945A","#FFD6A5"],
  ["#35120F","#742E24","#AF5142","#D98268","#F2C1AE"],
  ["#32110D","#71351F","#B65F32","#DC914E","#F4D6A1"],
  ["#3D1712","#8A3525","#C75B39","#E88A5A","#FFD1B3"],
  ["#2A1110","#68232A","#A43B47","#D66B73","#F2B5B5"],
  ["#301016","#70213B","#A93652","#D45D6D","#F2B5C4"],
  ["#2B0F1A","#671D42","#A83261","#D45A83","#F2B6CB"],
  ["#3A1010","#7A211B","#B93A2F","#E0643A","#FFB385"],
  ["#33130B","#7A2E0B","#B95012","#E78323","#FFD166"],
  ["#2D170B","#69400B","#A96710","#D69E2E","#F6D365"],
  ["#24100A","#5E2414","#9B3D24","#C9683E","#F1B59A"],
  ["#32140D","#733016","#B9562A","#DF8B45","#F7C98A"],
  ["#36170F","#803B20","#BD6339","#E39A60","#F7D3A5"],
  ["#29110C","#612B1B","#963F26","#C8663D","#E9AA82"],
  ["#351316","#6B2526","#A13B32","#CE654B","#F2B8A2"],
  ["#301018","#6A2344","#A53D62","#D46C85","#F1B4C5"],
  ["#28101A","#581B39","#8A2E5D","#C05280","#E9A9C1"],
  ["#3A1812","#7C3A24","#B96A42","#DFA477","#F3D0B5"],
  ["#24120C","#5B2D17","#91502A","#C17A43","#E7B77C"],
  ["#32140C","#723514","#A95A1F","#D98535","#F4C47C"],
  ["#28130E","#5F3021","#92533B","#C47D5A","#E7B79C"],
  ["#3B1710","#7C2E1B","#B84D2B","#DF7C4D","#F5B88D"],
  ["#2E1210","#6E2521","#A9443A","#CF6C5C","#F0B0A6"],
  ["#35140D","#7A351D","#B95D35","#DE8C5A","#F4C49C"],
  ["#F8EDEB","#FCD5CE","#F8C4C8","#F9B4C5","#F497B8"],
  ["#EEF7F2","#D8F3DC","#B7E4C7","#95D5B2","#74C69D"],
  ["#EDF6F9","#D8F3DC","#BDE0FE","#A2D2FF","#8ECAE6"],
  ["#FFF7E6","#FFE5B4","#FFD6A5","#FFB997","#FEC5BB"],
  ["#F5F0FF","#E6D9FF","#CDB4DB","#B8A1D9","#9D8AC7"],
  ["#FFF1F0","#FFDAD6","#FFB4A2","#E5989B","#B5838D"],
  ["#F0F7FF","#DCEEFF","#B9D9FF","#91C8FF","#6FA8DC"],
  ["#F4F9E9","#DDE7C7","#C2D5AA","#A6B98A","#87986A"],
  ["#FFF8E7","#FBE7C6","#F7D6A0","#EFC88B","#DDBE7C"],
  ["#F8F1E5","#EED7C5","#DDBEA9","#CFA58D","#B9848C"],
  ["#F4EFFA","#E7D8F2","#D3BBDD","#BFA3D4","#A78BC1"],
  ["#EEF4F1","#D9E8E0","#BFD8CC","#A3C4B5","#7FAF9B"],
  ["#FFF0F3","#FAD2E1","#E8C2CA","#D6A2AD","#C68B96"],
  ["#EFF7F6","#D7EFEF","#B5E2E2","#8FD3D3","#6AB7B8"],
  ["#FFF6EC","#FFE1C7","#F9C6A7","#F3A683","#E88973"],
  ["#F4F4F4","#E0E0E0","#C6C6C6","#AAAAAA","#8E8E8E"],
  ["#F1F8E9","#DCEDC8","#C5E1A5","#AED581","#9CCC65"],
  ["#FFF3E0","#FFE0B2","#FFCC80","#FFB74D","#FFA726"],
  ["#E8F5E9","#C8E6C9","#A5D6A7","#81C784","#66BB6A"],
  ["#E3F2FD","#BBDEFB","#90CAF9","#64B5F6","#42A5F5"],
  ["#FCE4EC","#F8BBD0","#F48FB1","#F06292","#EC407A"],
  ["#F3E5F5","#E1BEE7","#CE93D8","#BA68C8","#AB47BC"],
  ["#FFFDE7","#FFF9C4","#FFF59D","#FFF176","#FFEE58"],
  ["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA"],
  ["#EFEBE9","#D7CCC8","#BCAAA4","#A1887F","#8D6E63"],
  ["#050505","#101010","#1D1D1D","#343434","#D6D6D6"],
  ["#080B12","#111827","#1F2937","#374151","#D1D5DB"],
  ["#090D14","#14213D","#1F3A5F","#365F8C","#B8D8F0"],
  ["#0B0B14","#17172B","#292952","#454579","#AAAADD"],
  ["#100A18","#24122F","#41205A","#6E3B83","#C49AD8"],
  ["#11080E","#2B0F1C","#4A1830","#77264B","#D27BA0"],
  ["#0D0B07","#21170B","#3D2B10","#6A4B18","#C69C4E"],
  ["#0B1110","#112D2A","#1B4D47","#28736B","#81C7BD"],
  ["#081318","#102A32","#174957","#236C7B","#7EC8D4"],
  ["#0A1014","#182B34","#274553","#3D6878","#A2CBD5"],
  ["#0C0D0A","#1C2517","#334225","#596B3B","#A9BA75"],
  ["#0E0A07","#29160C","#4C2915","#77451F","#C18A4A"],
  ["#120B0B","#2A1515","#512525","#7D3B3B","#C47D7D"],
  ["#0C0810","#241328","#43214C","#703B78","#B887BE"],
  ["#070D16","#11213A","#1A3861","#285A91","#79A7D3"],
  ["#090C12","#171C2B","#282F46","#424C69","#9BA8C4"],
  ["#0D0D0D","#202020","#3A3A3A","#5A5A5A","#B0B0B0"],
  ["#0A0E0C","#152019","#263D2D","#3F6146","#92B59A"],
  ["#100F0B","#211F16","#3B3727","#5D573F","#AAA184"],
  ["#0F0B09","#261510","#45271C","#70412E","#B97C5A"],
  ["#090B12","#151B2D","#202B49","#34466D","#8297C2"],
  ["#0C0A0F","#211625","#3C2745","#60406B","#A883AF"],
  ["#080E0E","#142626","#214242","#326262","#7FA7A2"],
  ["#100B07","#281A0D","#473018","#745026","#B58B51"],
  ["#0B0B0B","#242424","#414141","#666666","#AFAFAF"],
  ["#090014","#22004A","#5B00A8","#B000FF","#E8B4FF"],
  ["#050014","#1A0066","#3B00FF","#7A5CFF","#C7BFFF"],
  ["#001014","#003D4D","#00A6A6","#00F5D4","#B8FFF1"],
  ["#00140B","#004D2C","#00A651","#00F084","#B5FFD9"],
  ["#140500","#4D1700","#B83B00","#FF6A00","#FFD166"],
  ["#14000A","#4D001F","#B8004D","#FF007A","#FFB3D1"],
  ["#001018","#003D66","#0077CC","#00BFFF","#B3EAFF"],
  ["#130014","#4B0052","#A000B8","#E100FF","#F5B3FF"],
  ["#0D1400","#364D00","#7BA600","#BFFF00","#E8FF99"],
  ["#140F00","#4D3500","#B88600","#FFD000","#FFF0A3"],
  ["#001414","#004D4D","#00A3A3","#00FFFF","#B3FFFF"],
  ["#140000","#4D0000","#B80000","#FF1A1A","#FFAAAA"],
  ["#00140A","#004D26","#00A854","#00FF88","#B3FFD8"],
  ["#0B0014","#2D0052","#6800B8","#B800FF","#E8A3FF"],
  ["#001014","#003A52","#0086B3","#00D4FF","#A8EEFF"],
  ["#14000F","#4D0037","#A80078","#FF00C8","#FFB3EC"],
  ["#101400","#394D00","#85B800","#C6FF00","#EFFF9C"],
  ["#140800","#4D2200","#B85C00","#FF8700","#FFD28A"],
  ["#000E14","#00364D","#006B99","#00AFFF","#A8E7FF"],
  ["#14000A","#520028","#B8005A","#FF248F","#FFB8D9"],
  ["#00140F","#004D3B","#00A87D","#00F5A0","#B3FFE4"],
  ["#100014","#39004D","#8000B8","#C800FF","#E5A3FF"],
  ["#001414","#005252","#00AFAF","#00FFFF","#A8FFFF"],
  ["#141400","#4D4D00","#AFAF00","#FFFF00","#FFFFA8"],
  ["#140500","#522000","#B84A00","#FF6900","#FFD09A"],
  ["#0B3D2E","#146B4A","#2E8B57","#72B76A","#D5E8B6"],
  ["#163020","#31572C","#4F772D","#90A955","#ECF39E"],
  ["#1B4332","#2D6A4F","#40916C","#74C69D","#D8F3DC"],
  ["#184E77","#1D7874","#679289","#A4C3B2","#F4F1DE"],
  ["#283618","#606C38","#6B8E23","#A3B18A","#FEFAE0"],
  ["#386641","#6A994E","#A7C957","#DDE7C7","#F2E8CF"],
  ["#1A472A","#2E7D32","#66BB6A","#A5D6A7","#E8F5E9"],
  ["#12372A","#436850","#ADBC9F","#FBFADA","#DDE6D5"],
  ["#1F3A2E","#356859","#379683","#7AC74F","#CBE54E"],
  ["#254D32","#4B7F52","#7FB069","#B5C99A","#E2E8C0"],
  ["#233D2B","#3E6B48","#6C9A68","#A7C99A","#DDE8C7"],
  ["#193C34","#276A5B","#4E9F85","#86C5A5","#D5F2DF"],
  ["#1B4332","#52796F","#84A98C","#CAD2C5","#F2E8CF"],
  ["#234E3F","#3A7563","#6BA292","#A9C9B8","#E4F0E7"],
  ["#173F35","#2A6F62","#489C8B","#86C8B5","#D4F1E1"],
  ["#284B36","#527A55","#7BAE7F","#AACBA7","#DCE8D5"],
  ["#334E3C","#5C7A61","#87A96B","#B6C99B","#E4E8D1"],
  ["#2D4A3E","#52796F","#84A98C","#B8CBB9","#E8F0E5"],
  ["#173F3F","#2B6868","#4F9C9C","#8BC7C7","#D7EEEE"],
  ["#204E4A","#357A72","#63A69F","#9CCBC4","#DDF0ED"],
  ["#254441","#3A756C","#5F9E95","#8DC1B8","#D8E8E4"],
  ["#183A37","#2C6660","#4C9A91","#79C2B7","#CFE9E3"],
  ["#263D32","#486B52","#6F956B","#A3B98D","#D8E2C8"],
  ["#1C3B2A","#386641","#6A994E","#A7C957","#F2E8CF"],
  ["#16352B","#285A45","#43805C","#6FA77A","#B8D5B5"],
  ["#210F1C","#5A163C","#9E2458","#D94F70","#F3A6B7"],
  ["#17103A","#34206F","#5E3FA3","#8E6CC8","#D4C5F9"],
  ["#081C3A","#123C69","#1F5F99","#4F90C6","#B5D6F2"],
  ["#211A05","#604C08","#A67C00","#D4A017","#F2D675"],
  ["#2A0B14","#65152A","#A82C4C","#D95B72","#F0A3B4"],
  ["#071D1A","#0E594F","#15806D","#38A88F","#A7E3D1"],
  ["#24110B","#6B2D14","#A84B1E","#D97838","#F1C27D"],
  ["#1C1029","#472060","#713B9C","#A66CC4","#D8B9E8"],
  ["#101A2C","#203B65","#315C8C","#5685B4","#B8CCE3"],
  ["#24150B","#634018","#A66A24","#D39A42","#F0D09A"],
  ["#1A0F0B","#552315","#8E3B20","#C15C31","#EAA47A"],
  ["#0C1820","#173F4F","#286779","#4B9AAF","#A7D4DD"],
  ["#1D0B27","#4A175E","#772D8C","#A852B5","#D89BD9"],
  ["#241020","#5C1F46","#91316D","#C95791","#E8A5C3"],
  ["#081E1B","#174B42","#267A69","#50A98F","#B6DCCF"],
  ["#241B0A","#57450F","#8C701D","#B89A43","#E7D69B"],
  ["#15102B","#34285E","#51408A","#7964B8","#C3B7E4"],
  ["#1B1724","#3A314B","#66557A","#9987AA","#D8CFDE"],
  ["#2A0D0D","#641F1F","#9B3434","#CA5A5A","#EAA5A5"],
  ["#0B1820","#183C4C","#2B687B","#4E99A8","#A9D2D9"],
  ["#1A0F18","#472235","#743C5B","#A66A85","#D5AFC0"],
  ["#1B2417","#42522A","#667D3D","#9AAA60","#D7DEB2"],
  ["#29170A","#63360F","#99551B","#C57B31","#E5B36C"],
  ["#151B1D","#344B50","#537277","#83A1A2","#C6D4D2"],
  ["#24112F","#4B1F5C","#743582","#A85FA6","#D8A7D1"],
  ["#111827","#F43F5E","#F59E0B","#10B981","#3B82F6"],
  ["#18181B","#F97316","#EAB308","#22C55E","#06B6D4"],
  ["#1E1B4B","#DB2777","#F97316","#FACC15","#22D3EE"],
  ["#172554","#2563EB","#7C3AED","#DB2777","#F43F5E"],
  ["#052E16","#16A34A","#84CC16","#FACC15","#FB923C"],
  ["#450A0A","#DC2626","#F97316","#FACC15","#FDE68A"],
  ["#0C4A6E","#0284C7","#06B6D4","#14B8A6","#A7F3D0"],
  ["#3B0764","#7E22CE","#C026D3","#EC4899","#F9A8D4"],
  ["#172554","#1D4ED8","#0EA5E9","#22D3EE","#CFFAFE"],
  ["#431407","#C2410C","#EA580C","#F59E0B","#FDE68A"],
  ["#3F0D12","#A71D31","#D64045","#FFBA08","#F5E663"],
  ["#073B4C","#118AB2","#06D6A0","#FFD166","#EF476F"],
  ["#03045E","#0077B6","#00B4D8","#90E0EF","#CAF0F8"],
  ["#240046","#5A189A","#9D4EDD","#C77DFF","#E0AAFF"],
  ["#10002B","#3C096C","#7B2CBF","#9D4EDD","#C77DFF"],
  ["#370617","#6A040F","#9D0208","#D00000","#FFBA08"],
  ["#003049","#D62828","#F77F00","#FCBF49","#EAE2B7"],
  ["#264653","#2A9D8F","#E9C46A","#F4A261","#E76F51"],
  ["#1B1B1E","#2D3047","#93B7BE","#E0CA3C","#F4F1DE"],
  ["#0B132B","#6FFFE9","#5BC0BE","#3A506B","#1C2541"],
  ["#231942","#5E548E","#9F86C0","#BE95C4","#E0B1CB"],
  ["#03071E","#370617","#6A040F","#D00000","#FFBA08"],
  ["#001219","#005F73","#0A9396","#94D2BD","#E9D8A6"],
  ["#2B2D42","#8D99AE","#EDF2F4","#EF233C","#D90429"],
  ["#100C08","#2F2419","#6B4F35","#B08968","#F2E8CF"]
];

const EMOTION_PALETTE = [
  // ACCEPTANCE → Botanical
  192, 191, 197, 190, 187, 188, 195, 185, 199, 184, 194, 182, 196, 180, 193, 181, 198, 176, 186, 178, 177, 189, 183, 179, 175,
  // JOY → Experimental
  249, 245, 243, 248, 244, 242, 226, 247, 235, 228, 225, 227, 232, 239, 233, 246, 229, 241, 231, 240, 230, 238, 236, 234, 237,
  // LOVE → Pastel
  115, 124, 111, 107, 110, 118, 113, 101, 109, 121, 116, 112, 104, 102, 100, 123, 105, 108, 120, 114, 119, 106, 103, 122, 117,
  // CURIOSITY → Neon
  154, 158, 168, 167, 153, 170, 152, 166, 160, 173, 174, 150, 159, 162, 165, 171, 172, 163, 164, 155, 157, 161, 169, 156, 151,
  // POWER → Jewel
  223, 217, 220, 221, 224, 216, 219, 214, 211, 208, 207, 212, 213, 218, 210, 215, 205, 201, 200, 209, 204, 222, 202, 206, 203,
  // ANGER → Warm / Sunset
  93, 91, 80, 77, 96, 98, 81, 92, 82, 90, 88, 79, 75, 99, 78, 94, 97, 76, 89, 86, 83, 87, 95, 85, 84,
  // FEAR → Night
  149, 141, 125, 142, 143, 126, 146, 140, 128, 135, 134, 137, 147, 138, 145, 129, 127, 132, 144, 130, 139, 148, 133, 136, 131,
  // SADNESS → Ocean
  38, 37, 49, 34, 29, 40, 47, 46, 43, 45, 39, 32, 36, 35, 44, 31, 26, 28, 33, 30, 27, 25, 48, 42, 41,
  // SHAME → Monochrome
  3, 5, 7, 10, 1, 22, 14, 12, 16, 24, 18, 20, 0, 21, 8, 19, 9, 13, 4, 23, 11, 17, 15, 2, 6,
  // STRESS / BODY → Earth
  71, 72, 73, 62, 69, 65, 54, 61, 63, 55, 60, 74, 67, 59, 53, 52, 57, 68, 64, 70, 56, 50, 66, 51, 58,
];

function hexRGB(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
function lum(c) { return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; }

// the members of a palette that read on the light sheet, darkest first
function paletteInks(p) {
  const all = p.map(hexRGB);
  const ok = all.filter(c => lum(c) < 0.78);
  return ok.length ? ok : [all.reduce((a, c) => lum(c) < lum(a) ? c : a)];
}
// the one a feeling draws itself in: the readable member nearest a middle weight
function paletteInk(p) {
  return paletteInks(p).reduce((a, c) => Math.abs(lum(c) - 0.38) < Math.abs(lum(a) - 0.38) ? c : a);
}

// ── the emotion engine: only numbers, no drawing ──────────────────────────
const FAMILIES = [
  ['ACCEPTANCE / OPENNESS', 205, 32, 78, 0.18, 1.40, 0.10, 0.02, 'neutral'],
  ['JOY / ALIVENESS',        45, 82, 62, 0.55, 0.90, 0.35, 0.10, 'play'],
  ['LOVE / CONNECTION',     340, 48, 68, 0.30, 0.80, 0.65, 0.02, 'connect'],
  ['CURIOSITY / SEEKING',   175, 58, 62, 0.40, 0.70, 0.35, 0.25, 'inspect'],
  ['POWER / COURAGE',        25, 72, 55, 0.45, 1.10, 0.20, 0.15, 'independent'],
  ['ANGER / HATE',            8, 88, 48, 0.75, 0.55, 0.75, 0.30, 'attack'],
  ['FEAR / ANXIETY',        260, 48, 48, 0.70, 0.45, 0.02, 0.85, 'flee'],
  ['SADNESS / GRIEF',       215, 48, 43, 0.12, 1.20, 0.04, 0.35, 'withdraw'],
  ['SHAME / DISCONNECTION', 290, 42, 48, 0.20, 0.60, 0.02, 0.50, 'hide'],
  ['STRESS / BODY',          65, 55, 50, 0.60, 0.50, 0.10, 0.20, 'correct'],
];

const NAMES = (
  'Accepting Open Calm Centered Content Fulfilled Patient Peaceful Present Relaxed Serene Trusting ' +
  'Blessed Fortunate Lucky Grace Humbled Thankful Self-loving Reflective Gentle Spacious Soft Releasing Quiet ' +
  'Amazed Awe Bliss Delighted Eager Ecstatic Enchanted Energized Engaged Enthusiastic Excited Free Happy ' +
  'Inspired Invigorated Lively Passionate Playful Radiant Refreshed Rejuvenated Renewed Satisfied Thrilled Vibrant ' +
  'Connected Loving Affectionate Caring Compassion Empathy Tender Warm Safe Bonded Intimate Devoted Cherished ' +
  'Belonging Held Grateful Appreciative Moved Touched Merciful Involved Resistant Uneasy Confused Disconnected ' +
  'Curious Exploring Fascinated Interested Intrigued Stimulated Questioning Expectant Hopeful Encouraged ' +
  'Optimistic Inquisitive Alert Aware Seeking Doubt Unsure Perplexed Reluctant Shocked Suspicious Ungrounded ' +
  'Unsettled Concerned Dissatisfied ' +
  'Courageous Powerful Adventurous Brave Capable Confident Daring Determined Liberated Grounded Proud Strong ' +
  'Worthy Valiant Resilient Bold Fearless Independent Assertive Focused Stable Empowered Decisive Sovereign Certain ' +
  'Angry Annoyed Agitated Aggravated Bitter Contempt Cynical Disdain Disgruntled Disturbed Edgy Exasperated ' +
  'Frustrated Furious Grouchy Hostile Impatient Irritated Irate Moody Outraged Pissed Resentful Upset Vindictive ' +
  'Afraid Anxious Apprehensive Frightened Hesitant Nervous Panicked Paralyzed Scared Terrified Worried Fragile ' +
  'Helpless Sensitive Shaken Startled Threatened Vulnerable Dreading Alarmed Jumpy Wary Trembling Cornered Fleeing ' +
  'Sad Anguish Depressed Despondent Disappointed Discouraged Forlorn Gloomy Grief Heartbroken Hopeless Lonely ' +
  'Longing Melancholy Sorrow Teary Unhappy Weary Yearning Mourning Wistful Blue Aching Bereft Despairing ' +
  'Embarrassed Shame Ashamed Humiliated Inhibited Mortified Self-conscious Useless Weak Worthless Guilty ' +
  'Regretful Remorseful Sorry Resigned Trapped Powerless Impotent Incapable Victim Doubtful Skeptical Aloof ' +
  'Isolated Withdrawn ' +
  'Stressed Tense Burned-out Cranky Depleted Exhausted Frazzled Overwhelmed Rattled Rejecting Restless Tight ' +
  'Worn-out Numb Hard Pain Heavy Hollow Prickly Hot Pulsing Icy Queasy Radiating Knotted'
).split(' ');

function dnaFor(i) {
  const f = floor(i / 25), k = i % 25;
  const F = FAMILIES[f];
  const t = k / 24, h = hash(i * 9173);
  return {
    index: i, name: NAMES[i] || ('#' + (i + 1)), family: f, familyName: F[0],
    energy: clamp(F[4] * (0.55 + t * 0.9) + h * 0.12, 0.03, 1),
    tension: clamp((f >= 5 ? 0.45 : 0.12) + t * 0.5 + h * 0.15, 0, 1),
    intensity: clamp(0.25 + t * 0.7 + h * 0.15, 0.05, 1),
    attraction: clamp(F[6] * (0.6 + t * 0.8), 0, 1),
    avoidance: clamp(F[7] * (0.6 + t * 0.8), 0, 1),
    sensitivity: clamp(F[5] * (0.7 + (1 - t) * 0.6), 0.05, 2.2),
    noise: clamp(0.05 + t * 0.5 + (f === 5 || f === 9 ? 0.3 : 0), 0, 1),
    orbit: (f === 2 || f === 1) ? 0.4 + t * 0.5 : 0.05 + t * 0.2,
    deformation: clamp(0.12 + t * 0.6 + h * 0.2, 0, 1),
    memory: clamp((f === 5 || f === 7 ? 0.7 : 0.2) + t * 0.3, 0, 1),
    forgetting: clamp((f === 5 || f === 7 ? 0.05 : 0.55) + (1 - t) * 0.35, 0.004, 0.95),
    social: F[8],
    paletteIndex: EMOTION_PALETTE[i],
    palette: PALETTES[EMOTION_PALETTE[i]],
    paletteInks: paletteInks(PALETTES[EMOTION_PALETTE[i]]),
    paletteInk: paletteInk(PALETTES[EMOTION_PALETTE[i]]),
  };
}

// ── the force field of one image ─────────────────────────────────────────
// The feelings are not averaged into one. Three readings are taken:
//   mean      — what the image is, weighted by how intensely each feeling is held
//   variance  — how far the feelings disagree
//   pairwise  — how much every pair of others clashes with each other
const SELF_WEIGHT = 1.5;
function valence(d) { return d.attraction - d.avoidance; }
function weightedMean(ds, key, ws) {
  let a = 0, w = 0;
  for (let i = 0; i < ds.length; i++) {
    const v = typeof key === 'function' ? key(ds[i]) : ds[i][key];
    a += v * ws[i]; w += ws[i];
  }
  return w ? a / w : 0;
}
function variance(vs) {
  if (vs.length < 2) return 0;
  const m = vs.reduce((p, c) => p + c, 0) / vs.length;
  return vs.reduce((p, c) => p + (c - m) * (c - m), 0) / vs.length;
}
// how badly two feelings sit together: opposite valence, different families,
// gestures that work against each other (one approaches what the other flees)
const OPPOSED = { attack: ['flee', 'hide', 'withdraw'], connect: ['withdraw', 'hide', 'independent'],
                  play: ['withdraw', 'correct'], inspect: ['hide'], flee: ['attack'], hide: ['inspect', 'attack'] };
function conflictBetween(a, b) {
  const val = min(1, abs(valence(a) - valence(b)));
  const fam = a.family === b.family ? 0 : 0.35;
  const gest = (OPPOSED[a.social] || []).includes(b.social) || (OPPOSED[b.social] || []).includes(a.social) ? 0.4 : 0;
  const pace = abs(a.energy - b.energy) * 0.35;
  return min(1, val * 0.55 + fam + gest + pace);
}
function pairwiseConflict(ds) {
  let sum = 0, n = 0;
  for (let i = 0; i < ds.length; i++)
    for (let j = i + 1; j < ds.length; j++) { sum += conflictBetween(ds[i], ds[j]); n++; }
  return n ? sum / n : 0;
}
function pairCount(n) { return n * (n - 1) / 2; }

function forceField(selfD, birds) {
  const ds = birds.map(b => b.dna);
  const active = [selfD, ...ds];
  const ws = [SELF_WEIGHT, ...ds.map(d => 0.4 + d.intensity)];

  const mean = {
    energy: weightedMean(active, 'energy', ws),
    tension: weightedMean(active, 'tension', ws),
    valence: weightedMean(active, valence, ws),
    noise: weightedMean(active, 'noise', ws),
    intensity: weightedMean(active, 'intensity', ws),
    deformation: weightedMean(active, 'deformation', ws),
    memory: weightedMean(active, 'memory', ws),
  };
  const vari = {
    energy: variance(active.map(d => d.energy)),
    valence: variance(active.map(valence)),
    tension: variance(active.map(d => d.tension)),
  };
  // variances of [0,1] values top out at 0.25 (energy) and 1 (valence); normalise
  const contradiction = min(1, vari.energy * 4 * 0.4 + vari.valence * 0.45 + vari.tension * 4 * 0.15
                               + abs(valence(selfD) - mean.valence) * 0.25);
  const socialConflict = pairwiseConflict(ds);
  // what the others carry in memory of this image so far
  const lived = birds.length ? birds.reduce((p, b) => p + b.memory, 0) / birds.length : 0;

  return {
    mean, variance: vari, pairwise: { conflict: socialConflict, pairs: pairCount(ds.length) },
    energy: mean.energy,
    tension: min(1.4, mean.tension + contradiction * 0.3 + socialConflict * 0.2),
    attraction: mean.valence,
    noise: mean.noise * 0.45 + contradiction * 0.45,
    density: 0.1 + mean.intensity * 0.6 + socialConflict * 0.35 + contradiction * 0.2,
    deformation: mean.deformation + contradiction * 0.25,
    memory: min(1, mean.memory * 0.7 + lived * 0.3),
    contradiction, socialConflict,
  };
}

// ── the sketch's own state, as it was ─────────────────────────────────────
let controlPoints = [];
let parandehs = [];
let circlePos, circleVel, circleAcc, circleRadius = 50;
let selfD, field, flock = [];
let paper;        // the sky outside the frame, built once per feeling
let prevC = null; // where the disc was last frame
let hits = 0;     // how much is striking the disc right now
let dwell = 0;    // how long the pencil has stayed in one place
let penDir = null, guess = null, prev2C = null;
let said = new Map();   // where the pen has already spoken
let penDown = false;    // is the pen on the paper
let penSelf = null;
let penPrev = null;     // the hand the pen had before the last impact
let penT = 1;           // 0 → 1: how far the new hand has taken over
let lastImpact = null;  // where and when the self was last struck
const TRANSFER_STEPS = 28;
let penStill = 0;       // frames the pen has not moved
// the drifters: pens that do not belong to any body. they cross the sheet
// toward a point they keep forgetting, and the disc deflects them.
let drift = [];
function makeDrift() {
  drift = [0, 1, 2].map((i) => ({
    x: random(width), y: random(height),
    tx: random(width), ty: random(height),
    px: 0, py: 0, w: 0, ease: 0.02 + i * 0.03, ink: PENS[i % PENS.length],
  }));
  for (const d2 of drift) { d2.px = d2.x; d2.py = d2.y; }
}
function drifters() {
  if (!drift.length) makeDrift();
  const R2 = circleRadius / 2 + 8;
  for (const d2 of drift) {
    d2.x = lerp(d2.x, d2.tx, d2.ease);
    d2.y = lerp(d2.y, d2.ty, d2.ease * 2.4);

    // the weight is the slowness: a fast hand leaves almost nothing
    const travelled = dist(d2.x, d2.y, d2.px, d2.py);
    d2.w = lerp(d2.w, travelled, 0.1);
    const flow = noise(frameCount * 0.05, d2.ease * 40) * 12;
    const wt = max(0.15, (flow - d2.w) * 0.5) * (0.4 + field.tension);

    // the disc deflects whatever comes near it
    if (dist(circlePos.x, circlePos.y, d2.x, d2.y) <= R2) {
      const a2 = atan2(d2.y - circlePos.y, d2.x - circlePos.x);
      d2.tx = circlePos.x + cos(a2) * R2 * 2.2;
      d2.ty = circlePos.y + sin(a2) * R2 * 2.2;
      hits = min(14, hits + 0.4);
    }

    field2.stroke(d2.ink[0], d2.ink[1], d2.ink[2], 14 + field.energy * 40);
    field2.strokeWeight(wt);
    field2.line(d2.px, d2.py, d2.x, d2.y);

    d2.px = d2.x; d2.py = d2.y;
    // it forgets the target as soon as it arrives
    if (dist(d2.x, d2.y, d2.tx, d2.ty) < 40) {
      d2.tx = random(width); d2.ty = random(height);
      d2.ink = PENS[floor(random(PENS.length))];
    }
  }
}     // the feeling whose body last struck the disc — the hand it draws with   // heading, the line thrown ahead, the path's memory
// the pen carries three inks; every body that strikes the disc turns it to the next
const PENS = [[38, 40, 44], [192, 86, 58]];   // the drifters keep these two

// the plotter's two inks come from the palette of the feeling in its hand:
//   A — the deepest colour of the palette: the dominant ink
//   B — the member that contrasts with A most, among those that read on paper:
//       a rare intervention
// neither is used as flat RGB: each is turned into a pigment — slightly
// desaturated and deepened — so it still reads as ink, not as paint
function pigment(c, deepen) {
  const g = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
  return c.map(v => Math.round((v + (g - v) * 0.15) * (1 - deepen)));
}
// ── the plotter's 250 ink pairs: [A deep ink, B accent ink], one per feeling.
// A is not the darkest colour outright: it is the darkest that still keeps its
// identity (among the palette's three darkest, the over-neutral are dropped and
// the strongest saturation / chroma / readability wins). Both inks keep their hue,
// keep a minimum chroma, and stay out of the black zone — dark, never black — so
// an Ocean feeling reads as ocean ink, and the drifters' true black stays distinct.
// No A, no B and no pair repeats across the 250.
const INK_PAIRS = [
  [[50,112,96], [114,192,118]],  // 001
  [[106,152,68], [158,191,112]],  // 002
  [[44,99,60], [139,183,94]],  // 003
  [[38,84,57], [121,192,114]],  // 004
  [[38,85,65], [80,176,101]],  // 005
  [[43,97,80], [114,192,151]],  // 006
  [[43,97,88], [99,185,170]],  // 007
  [[42,93,53], [133,190,111]],  // 008
  [[48,108,73], [73,163,91]],  // 009
  [[50,112,58], [157,190,111]],  // 010
  [[43,97,90], [114,191,180]],  // 011
  [[33,89,69], [146,188,107]],  // 012
  [[38,84,80], [88,180,166]],  // 013
  [[137,168,62], [51,113,63]],  // 014
  [[38,84,84], [101,186,186]],  // 015
  [[40,97,43], [76,169,81]],  // 016
  [[84,128,57], [145,179,66]],  // 017
  [[63,92,39], [125,149,67]],  // 018
  [[36,87,75], [97,184,140]],  // 019
  [[25,66,98], [114,191,149]],  // 020
  [[52,115,86], [87,180,133]],  // 021
  [[36,86,77], [99,185,160]],  // 022
  [[48,116,103], [103,173,63]],  // 023
  [[84,109,32], [147,180,88]],  // 024
  [[23,99,70], [86,169,76]],  // 025
  [[88,63,40], [164,115,74]],  // 026
  [[48,36,86], [193,113,157]],  // 027
  [[38,43,84], [200,178,42]],  // 028
  [[165,12,38], [88,121,180]],  // 029
  [[29,45,94], [72,168,167]],  // 030
  [[210,74,40], [41,129,118]],  // 031
  [[13,140,161], [189,147,16]],  // 032
  [[6,97,116], [113,191,165]],  // 033
  [[128,29,43], [212,156,11]],  // 034
  [[95,30,206], [230,31,65]],  // 035
  [[22,98,222], [199,132,19]],  // 036
  [[201,92,16], [26,181,205]],  // 037
  [[100,34,158], [233,73,160]],  // 038
  [[63,15,108], [166,61,245]],  // 039
  [[20,129,178], [40,59,123]],  // 040
  [[112,10,21], [168,9,9]],  // 041
  [[232,114,17], [26,138,67]],  // 042
  [[188,101,10], [8,105,155]],  // 043
  [[9,103,151], [14,148,171]],  // 044
  [[119,8,12], [141,23,64]],  // 045
  [[170,36,36], [214,97,17]],  // 046
  [[63,6,116], [178,61,245]],  // 047
  [[20,107,136], [225,39,83]],  // 048
  [[178,73,18], [141,48,22]],  // 049
  [[9,138,164], [13,14,150]],  // 050
  [[114,114,114], [153,153,153]],  // 051
  [[132,79,60], [190,130,110]],  // 052
  [[75,167,128], [114,191,156]],  // 053
  [[113,142,64], [146,182,93]],  // 054
  [[129,79,176], [169,114,192]],  // 055
  [[72,160,76], [95,183,99]],  // 056
  [[72,159,160], [109,191,191]],  // 057
  [[78,173,126], [113,193,149]],  // 058
  [[176,114,79], [193,145,113]],  // 059
  [[134,60,147], [184,110,196]],  // 060
  [[126,177,67], [149,195,96]],  // 061
  [[176,79,97], [192,114,131]],  // 062
  [[119,79,176], [164,114,192]],  // 063
  [[13,131,242], [94,174,212]],  // 064
  [[220,35,101], [231,75,113]],  // 065
  [[37,153,168], [47,191,209]],  // 066
  [[242,57,13], [245,97,61]],  // 067
  [[224,151,31], [204,167,89]],  // 068
  [[208,32,91], [228,78,128]],  // 069
  [[222,92,33], [229,125,77]],  // 070
  [[24,135,225], [71,162,235]],  // 071
  [[13,128,242], [61,153,245]],  // 072
  [[242,88,13], [245,121,61]],  // 073
  [[242,219,13], [245,229,61]],  // 074
  [[223,137,12], [244,161,39]],  // 075
  [[140,50,7], [206,92,11]],  // 076
  [[95,126,7], [104,155,8]],  // 077
  [[6,83,116], [11,145,206]],  // 078
  [[140,74,7], [155,67,8]],  // 079
  [[7,126,65], [10,194,111]],  // 080
  [[7,128,97], [8,155,118]],  // 081
  [[7,126,126], [8,126,155]],  // 082
  [[103,140,7], [126,155,8]],  // 083
  [[7,124,124], [8,155,155]],  // 084
  [[133,133,7], [155,155,8]],  // 085
  [[140,61,7], [155,45,8]],  // 086
  [[72,7,128], [188,61,245]],  // 087
  [[140,104,7], [155,118,8]],  // 088
  [[7,128,67], [11,206,115]],  // 089
  [[128,7,93], [206,11,164]],  // 090
  [[100,7,140], [193,61,245]],  // 091
  [[7,133,133], [11,206,206]],  // 092
  [[82,7,140], [199,61,245]],  // 093
  [[7,104,136], [11,173,206]],  // 094
  [[140,7,63], [245,61,134]],  // 095
  [[123,7,140], [221,61,245]],  // 096
  [[140,7,7], [245,61,61]],  // 097
  [[140,7,72], [235,12,121]],  // 098
  [[8,94,155], [8,106,155]],  // 099
  [[53,10,194], [84,61,245]],  // 100
  [[50,103,112], [51,97,113]],  // 101
  [[80,51,114], [131,82,177]],  // 102
  [[97,44,73], [192,114,149]],  // 103
  [[82,103,46], [137,156,70]],  // 104
  [[91,45,101], [192,114,181]],  // 105
  [[64,50,112], [134,111,195]],  // 106
  [[38,82,95], [65,131,144]],  // 107
  [[34,94,82], [66,146,123]],  // 108
  [[35,81,94], [66,130,147]],  // 109
  [[43,74,108], [70,113,156]],  // 110
  [[90,51,121], [168,107,199]],  // 111
  [[93,40,108], [193,112,194]],  // 112
  [[112,43,86], [207,99,147]],  // 113
  [[120,46,46], [210,96,96]],  // 114
  [[109,49,30], [219,134,83]],  // 115
  [[108,87,28], [151,128,62]],  // 116
  [[22,101,87], [37,126,114]],  // 117
  [[46,31,92], [118,80,182]],  // 118
  [[122,34,71], [223,83,114]],  // 119
  [[128,84,34], [184,132,52]],  // 120
  [[129,40,63], [219,87,116]],  // 121
  [[117,68,27], [214,155,73]],  // 122
  [[30,76,118], [64,123,172]],  // 123
  [[129,62,30], [187,101,45]],  // 124
  [[126,96,7], [172,132,28]],  // 125
  [[96,48,32], [206,137,84]],  // 126
  [[128,53,80], [216,90,125]],  // 127
  [[127,51,60], [217,89,89]],  // 128
  [[90,39,32], [200,102,73]],  // 129
  [[113,68,51], [209,137,97]],  // 130
  [[131,58,51], [218,105,88]],  // 131
  [[131,48,68], [217,89,120]],  // 132
  [[107,40,74], [207,99,139]],  // 133
  [[130,45,79], [217,89,134]],  // 134
  [[124,51,44], [222,122,84]],  // 135
  [[99,49,29], [211,129,63]],  // 136
  [[106,45,34], [217,111,57]],  // 137
  [[142,63,51], [210,96,63]],  // 138
  [[143,76,48], [206,115,59]],  // 139
  [[140,78,45], [203,122,50]],  // 140
  [[112,65,38], [216,158,86]],  // 141
  [[142,65,40], [230,140,76]],  // 142
  [[108,41,27], [218,122,56]],  // 143
  [[116,53,35], [217,139,89]],  // 144
  [[119,52,34], [222,127,84]],  // 145
  [[142,51,43], [245,130,61]],  // 146
  [[142,71,39], [203,117,45]],  // 147
  [[130,73,30], [185,113,44]],  // 148
  [[129,82,19], [177,133,44]],  // 149
  [[141,66,21], [195,111,31]],  // 150
  [[61,61,61], [149,149,149]],  // 151
  [[72,72,72], [150,150,150]],  // 152
  [[128,128,128], [82,82,82]],  // 153
  [[38,84,52], [95,183,115]],  // 154
  [[84,75,38], [176,154,80]],  // 155
  [[38,53,84], [51,69,113]],  // 156
  [[71,38,84], [162,83,178]],  // 157
  [[38,49,84], [109,134,189]],  // 158
  [[38,38,84], [114,114,192]],  // 159
  [[60,84,38], [153,177,81]],  // 160
  [[38,70,84], [114,177,192]],  // 161
  [[84,38,38], [181,91,91]],  // 162
  [[73,162,151], [51,113,113]],  // 163
  [[75,38,84], [173,94,183]],  // 164
  [[38,50,84], [93,122,182]],  // 165
  [[65,35,87], [167,112,194]],  // 166
  [[33,57,89], [51,73,113]],  // 167
  [[35,88,81], [95,183,171]],  // 168
  [[84,50,38], [161,104,72]],  // 169
  [[89,33,60], [192,91,134]],  // 170
  [[29,56,93], [89,142,193]],  // 171
  [[88,62,34], [154,118,69]],  // 172
  [[29,79,93], [94,180,194]],  // 173
  [[92,53,30], [163,117,63]],  // 174
  [[93,68,29], [171,134,63]],  // 175
  [[13,150,242], [21,96,142]],  // 176
  [[27,62,95], [53,86,118]],  // 177
  [[30,77,92], [72,151,161]],  // 178
  [[31,79,119], [56,143,135]],  // 179
  [[34,52,89], [93,140,198]],  // 180
  [[29,95,108], [41,95,122]],  // 181
  [[38,84,64], [70,155,116]],  // 182
  [[28,63,105], [74,143,173]],  // 183
  [[37,95,129], [62,165,196]],  // 184
  [[29,69,93], [66,147,194]],  // 185
  [[36,110,127], [32,192,162]],  // 186
  [[23,83,104], [66,136,147]],  // 187
  [[24,107,132], [32,89,131]],  // 188
  [[13,107,242], [61,132,245]],  // 189
  [[29,77,108], [65,131,175]],  // 190
  [[41,63,91], [38,60,125]],  // 191
  [[20,96,106], [63,149,141]],  // 192
  [[19,110,106], [66,167,152]],  // 193
  [[33,97,128], [68,159,199]],  // 194
  [[6,82,116], [59,120,157]],  // 195
  [[27,89,113], [41,139,161]],  // 196
  [[29,88,127], [61,148,197]],  // 197
  [[19,104,97], [44,174,158]],  // 198
  [[12,101,110], [28,88,135]],  // 199
  [[15,95,112], [30,83,133]],  // 200
  [[74,74,74], [141,141,141]],  // 201
  [[77,77,77], [136,136,136]],  // 202
  [[71,71,71], [130,130,130]],  // 203
  [[69,69,69], [122,122,122]],  // 204
  [[110,110,110], [117,117,117]],  // 205
  [[72,74,78], [119,122,127]],  // 206
  [[62,62,62], [109,109,109]],  // 207
  [[64,64,64], [104,104,104]],  // 208
  [[71,81,85], [118,132,137]],  // 209
  [[65,73,75], [113,122,125]],  // 210
  [[69,74,81], [112,120,130]],  // 211
  [[38,64,84], [107,118,123]],  // 212
  [[38,62,84], [113,159,191]],  // 213
  [[38,69,84], [97,112,116]],  // 214
  [[38,58,84], [104,115,126]],  // 215
  [[38,61,84], [102,111,119]],  // 216
  [[49,96,108], [51,91,113]],  // 217
  [[42,77,93], [73,132,162]],  // 218
  [[48,87,107], [86,149,179]],  // 219
  [[38,75,84], [67,138,148]],  // 220
  [[32,60,90], [76,117,169]],  // 221
  [[43,68,97], [73,116,162]],  // 222
  [[66,110,147], [51,82,113]],  // 223
  [[47,72,104], [111,164,195]],  // 224
  [[49,89,127], [87,139,179]],  // 225
  [[118,95,53], [172,140,77]],  // 226
  [[132,94,60], [181,139,90]],  // 227
  [[95,109,49], [145,161,72]],  // 228
  [[121,85,54], [177,132,82]],  // 229
  [[78,105,47], [126,159,71]],  // 230
  [[83,106,48], [128,161,72]],  // 231
  [[126,93,57], [177,133,81]],  // 232
  [[125,90,56], [180,137,88]],  // 233
  [[118,82,53], [171,128,77]],  // 234
  [[78,98,44], [125,158,71]],  // 235
  [[67,102,46], [108,150,67]],  // 236
  [[108,75,49], [158,112,71]],  // 237
  [[103,68,46], [192,154,114]],  // 238
  [[131,94,59], [183,144,79]],  // 239
  [[118,83,53], [176,132,79]],  // 240
  [[98,66,44], [160,110,72]],  // 241
  [[98,92,44], [151,145,68]],  // 242
  [[121,90,55], [175,132,75]],  // 243
  [[97,91,44], [147,138,66]],  // 244
  [[114,81,48], [163,118,70]],  // 245
  [[66,96,43], [110,143,64]],  // 246
  [[111,86,50], [176,139,69]],  // 247
  [[119,73,46], [179,113,65]],  // 248
  [[130,82,51], [192,131,73]],  // 249
  [[113,62,39], [214,149,92]],  // 250
];
function inkPairFor(d) { return INK_PAIRS[d.index]; }
let inkBLeft = 0;   // how many more strikes the rare ink stays in the pen
// how each ink behaves as graphite: how much its opacity varies stroke to
// stroke, and how much the paper's tooth breaks it up
const INK_GRAIN = [
  { vary: 0.60, tooth: 0.75, weight: 1.00, skip: 0.45 },   // black — soft, still granular
  { vary: 0.70, tooth: 0.85, weight: 1.15, skip: 0.55 },   // red — driest of the three
];
// the grain of the sheet under the pencil at this point
function toothAt(x, y) {
  return noise(x * 0.09, y * 0.09, 5) * 0.7 + noise(x * 0.31, y * 0.31, 9) * 0.3;
}
let penIx = 0, strikes = 0;
// the ink turns over on the Fibonacci strikes: 1, 2, 3, 5, 8, 13, 21 …
let fibA = 1, fibB = 1;   // ink turns at strikes 1, 2, 3, 5, 8, 13 …
let rim = [];     // contact marks on the circle's edge
let dent = 0, dentA = 0;
let t = 0;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.style('position', 'fixed');
  c.style('inset', '0');
  c.style('z-index', '0');
  rectMode(CENTER);
  circlePos = createVector(windowWidth / 2.6, windowHeight / 3);
  circleVel = createVector(0, 0);
  circleAcc = createVector(0, 0);

  makeControlPoints();
  noStroke();

  hartSeedLook();
  setEmotion(window.__HART_START__ !== undefined ? window.__HART_START__ : hartStartFromSeed());
}

// Generate: هر بذر با حسِ آغازین دیگری شروع می‌کند (۲۵۰ حس، هر کدام پالت، پرنده‌ها و حرکت خودش را دارد)؛
// بذر پیش‌فرض گروکلی و بذر خود اثر همان حس اصلی (۰) را نگه می‌دارند
// Generate: each seed (other than the original) also gets its own paper, circle size, pen weight and number of
// others in the image, so a generated Hart is clearly a different picture. The original seed keeps every original value.
// (Persian: هر بذر کاغذ، اندازهٔ دایره، ضخامت قلم و شمار پرنده‌های خودش را دارد؛ بذر اصلی دست نمی‌خورد)
const HART_PAPERS = [[214, 196, 168], [206, 218, 200], [200, 208, 218], [232, 198, 190], [232, 214, 170], [212, 200, 224], [196, 214, 212], [220, 212, 188]];
const HV = { r: 1, pen: 1, extra: 0, orig: true };
function hartSeedLook() {
  const h = String((window.tokenData && tokenData.hash) || '').toLowerCase();
  if (/^0x6d696c616e69617274652d67720*$/.test(h) || h.startsWith('0x3ae1a417aa40d0f870a98d767eebd2fe') || !/^0x[0-9a-f]{16,}/.test(h)) return;
  const byte = (i) => parseInt(h.substr(2 + i * 2, 2), 16) / 255;
  const P = HART_PAPERS[Math.floor(byte(4) * HART_PAPERS.length) % HART_PAPERS.length];
  for (let i = 0; i < 3; i++) { GROUND[i] = P[i]; WASHI[i] = Math.min(255, P[i] + 4); }
  HV.r = 0.7 + byte(5) * 1.1;            // circle 35–90 px instead of 50
  HV.pen = 0.8 + byte(6) * 1.6;          // plotter pen 0.8–2.4× heavier
  HV.extra = Math.floor(byte(7) * 4);    // 0–3 more others in the image
  HV.orig = false;
}
function hartQuarter() {
  const h = String((window.tokenData && tokenData.hash) || '').toLowerCase();
  if (hartStartFromSeed() === 0 && (/^0x6d696c616e69617274652d67720*$/.test(h) || h.startsWith('0x3ae1a417aa40d0f870a98d767eebd2fe') || !/^0x[0-9a-f]{16,}/.test(h))) return 0;
  return parseInt(h.slice(-6), 16) % 4;
}
function hartStartFromSeed() {
  const h = String((window.tokenData && tokenData.hash) || '').toLowerCase();
  if (!/^0x[0-9a-f]{16,}/.test(h)) return 0;
  if (/^0x6d696c616e69617274652d67720*$/.test(h) || h.startsWith('0x3ae1a417aa40d0f870a98d767eebd2fe')) return 0;
  let x = 0; for (let i = 2; i < h.length; i++) x = (Math.imul(x, 31) + h.charCodeAt(i)) >>> 0;
  return x % 250;
}

function makeControlPoints() {
  controlPoints = [
    createVector(width / 3, height), createVector(width / 3 * 2, height),
    createVector(width, height / 3), createVector(width, height / 3 * 2),
    createVector(width / 3 * 2, 0), createVector(width / 3, 0),
  ];
}

// the feeling on screen — and the feelings the flock carries
function setEmotion(i) {
  selfD = dnaFor(((i % 250) + 250) % 250);
  restart();
  publish();
}

// every feeling begins on a clean page, with the sketch reset
function restart() {
  currentColor = null;
  chans = [[], [], [], []];
  clearEchoes();
  if (field2) field2.clear();
  frameSeed = floor(random(100000));
  makePaper();
  background(GROUND[0], GROUND[1], GROUND[2]);
  // the golden point of the panel's upper-left quarter
  const PH = 385, phi = 0.618;
  // نقطهٔ طلایی در یکی از چهار ربعِ تابلو، با بذر (بذر اصلی: ربع بالا-چپ، مثل اصل)
  const gq = hartQuarter(), gx = gq & 1 ? PH - PH * (1 - phi) * phi : PH * (1 - phi) * phi, gy = gq & 2 ? PH - PH * (1 - phi) * phi : PH * (1 - phi) * phi;
  circlePos = createVector(
    width / 2 - PH / 2 + gx,
    height / 2 - PH / 2 + gy);
  circleVel = createVector(0, 0);
  circleAcc = createVector(0, 0);
  circleRadius = 50 * HV.r;
  rim = []; dent = 0; dentA = 0; prevC = null; hits = 0;
  // the pen is reloaded with the first ink, and its hand forgets the last feeling
  strikes = 0; fibA = 1; fibB = 1; penIx = 0; dwell = 0; inkBLeft = 0;
  penDir = null; guess = null; prev2C = null; said = new Map(); penDown = false; penSelf = null;
  penPrev = null; penT = 1; lastImpact = null; sumi = null; wetSpots = []; penStill = 0;
  wetStrokes = []; inkAgeMap = new Map(); lastLift = null;
  confineCircle();
  makeControlPoints();
  t = 0;
  reseed();
}

// who is present. Either named (window.__HART_OTHERS__ — emotion indices), or
// chosen from the self: a fixed draw per feeling, so the same self always
// meets the same others. Each comes from a different family, never the self's.
function chooseOthers(selfD) {
  const given = (window.__HART_OTHERS__ || []).filter(i => Number.isInteger(i) && i >= 0 && i < 250 && i !== selfD.index);
  if (given.length >= 3) return given.slice(0, 5);
  let seed = (selfD.index + 1) * 2654435761 >>> 0;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const n = Math.min(8, 3 + floor(rnd() * 3) + HV.extra);
  const out = [...given];
  const fams = new Set([selfD.family, ...given.map(i => floor(i / 25))]);
  while (out.length < n) {
    const f = floor(rnd() * 10);
    if (fams.has(f)) continue;
    fams.add(f);
    out.push(f * 25 + floor(rnd() * 25));
  }
  return out;
}

function reseed() {
  // as many birds as the original asked for, each carrying a feeling of its own
  // count from the feeling: the louder it is, the more of the world crowds in
  // one image holds a self and 3–5 others: few enough to read, each one
  // attributable to its feeling
  parandehs = chooseOthers(selfD).map((i, k) => new Parandeh(i, k));
  flock = parandehs;
  publish();
}

// the image's own clock. p5 rewrites frameCount every refresh, so the sketch
// keeps its own count and hands it to every step; ink age reads the same clock,
// so ×10 runs the whole image — motion, rings, drying — ten times faster
let simFrame = 0;
function simMillis() { return simFrame * (1000 / 60); }

// X: run the image ten times faster — the same frames, ten per screen refresh
let hartSpeed = 1;
function draw() {
  for (let i = 0; i < hartSpeed; i++) {
    simFrame++;
    window.frameCount = simFrame;
    stepFrame();
  }
  recIndicator();
}

function stepFrame() {
  field = forceField(selfD, parandehs);
  scribble();
  grounds();
  A10();
}

// ── A10 — the layer of the original sketch, untouched ─────────────────────
function A10() {
  const chosen = chooseRandomColor();
  const tone = toneFor(selfD);


  brushFrame();

  const circleDir = p5.Vector.sub(circlePos, parandehs[0].pos).normalize();

  // the curve and the disc keep to the frame; the bodies come and go through it
  // the strung curve — only through the birds the panel holds, so it reads
  const inside = parandehs.filter(b =>
    abs(b.pos.x - width / 2) < 192 && abs(b.pos.y - height / 2) < 192);
  if (inside.length > 1) {
    noFill();
    stroke(SUMI[0], SUMI[1], SUMI[2], 60 + field.tension * 90);
    strokeWeight(0.6);
    beginShape();
    for (const b of inside) vertex(b.pos.x, b.pos.y);
    endShape();
  }

  // proximity: two birds that can feel each other are joined, briefly
  stroke(SUMI[0], SUMI[1], SUMI[2], 2.8);
  strokeWeight(0.4);
  for (let i = 0; i < inside.length; i++) {
    for (let j = i + 1; j < inside.length; j++) {
      const a = inside[i].pos, b = inside[j].pos;
      const dd = dist(a.x, a.y, b.x, b.y);
      if (dd < 50 + field.density * 70) line(a.x, a.y, b.x, b.y);
    }
  }

  // the measurement the circle makes on the panel — ticks that track it
  stroke(tone[0], tone[1], tone[2], 120);
  strokeWeight(1);
  const px = constrain(circlePos.x, width / 2 - 192, width / 2 + 192);
  const py = constrain(circlePos.y, height / 2 - 192, height / 2 + 192);
  line(px, height / 2 - 192, px, height / 2 - 178);
  line(px, height / 2 + 178, px, height / 2 + 192);
  line(width / 2 - 192, py, width / 2 - 178, py);
  line(width / 2 + 178, py, width / 2 + 192, py);

  // the body of the circle, dented where the world pressed on it
  const CR = circleRadius / 2;
  noFill();
  stroke(SHU[0], SHU[1], SHU[2], 210);
  strokeWeight(0.6);
  beginShape();
  for (let a = 0; a <= TWO_PI + 0.01; a += 0.08) {
    const dv = dent * exp(-pow(angDiff(a, dentA), 2) * 5) * CR * 0.35 * field.deformation;
    const r = CR - dv;
    vertex(circlePos.x + cos(a) * r, circlePos.y + sin(a) * r);
  }
  endShape(CLOSE);
  // ── the pen ─────────────────────────────────────────────────────────────
  // no emotion draws a picture. an emotion changes the BODY of the pencil:
  // how fast, how heavy, at what angle, how many times, with what hesitation
  // and how much of the paper it agrees to leave alone. the five hands are the
  // pencil's ancestors — precision, structure, flow, pressure, silence — and
  // the feeling only decides how much of each is in the hand at this moment.
  if (prevC && field2) {
    const dd = dist(circlePos.x, circlePos.y, prevC.x, prevC.y);
    if (dd > 0.1 && dd < 40) {
      let PEN;
      const travel = atan2(circlePos.y - prevC.y, circlePos.x - prevC.x);
      if (penDir === null) penDir = travel;

      const src = currentHand();                             // whose feeling is in the hand
      PEN = inkPairFor(penSelf || selfD)[penIx];             // and the ink its palette gives
      const G = penDNA(src);                                 // and the body it gives the pencil
      const S = sceneFieldAt(circlePos.x, circlePos.y);      // and what this place does to it
      const local = S.local;
      // strikes in short-term memory press the hand; their absence quiets it
      const struck = min(1, hits / 6);
      const A = {                                             // the ancestors, weighted here
        I: G.I * (1 - local * 0.25) * S.I,
        D: G.D * (0.6 + local * 0.6) * S.D,
        T: G.T * (0.7 + local * 0.4) * S.T,
        K: G.K * (0.4 + local * 1.2) * S.K * (0.6 + struck * 0.8),
        W: G.W * (1.25 - local * 0.7) * S.W * (1.3 - struck * 0.6),
      };

      // ── the twelve, computed from the ancestors and the local feeling ────
      const curv = abs(angDiff(travel, penDir));
      const slow = 1 - min(1, dd / 5);
      const LX = width * 0.18, LY = height * 0.15;
      const mist = noise(circlePos.x * 0.0016, circlePos.y * 0.0016, 4) - 0.5;
      const lum = constrain(1 - dist(circlePos.x, circlePos.y, LX, LY) / (0.9 * max(width, height))
                            + mist * 0.4, 0, 1);
      const dark = 1 - lum;
      const emo = constrain(G.emotion * (0.4 + local), 0, 1.4);

      const pressure  = constrain(A.K * emo * 0.9 + A.D * (0.3 + dark * 0.5) + A.I * curv * 0.8
                                  + G.pressure * 0.4 + hits * 0.03, 0.05, 1.5);
      const speedWant = constrain(A.K * G.tension * 0.5 + A.T * 0.5 - A.W * 0.4 + G.speed * 0.6, 0.05, 1.2);
      const continuity= constrain(A.I * 0.8 + A.T * 0.4 - A.W * 0.5 + G.continuity * 0.4, 0, 1.2);
      const density   = constrain(A.D * (0.3 + dark * 0.6) + A.K * emo * 0.5 - A.W * 0.5 + G.density * 0.4, 0, 1.2);
      const roughness = constrain(G.roughness * (0.5 + A.K), 0, 1.2);
      const repetition= max(1, round(1 + G.repetition * A.K * 7));
      const hesitation= constrain(G.hesitation * (0.6 + A.W * 0.6), 0, 1);
      const whiteSpace= constrain(A.W * 0.8 + A.T * 0.2 + G.whiteSpace * 0.4, 0, 1.3);
      const strokeLen = constrain(G.length * (0.5 + A.I * 0.8 + A.T * 0.5), 0.15, 1.4);

      // ── silence speaks first: it may end the step before any ink is spent ─
      // what this mark would be worth: the turn of the path, the strikes still
      // in memory, the field here, the hand's memory, and how new the ground is
      const key = floor(circlePos.x / 26) + ',' + floor(circlePos.y / 26);
      const novelty = 1 - min(1, (said.get(key) || 0) / 5);
      let value = curv * 1.5 + hits * 0.06 + local * 0.5 + src.memory * 0.15 + src.intensity * 0.12;
      if (said.get(key)) value *= 0.35 + novelty * 0.65;      // the revisit penalty
      const silenceThreshold = whiteSpace * 0.45;

      if (value < silenceThreshold) {
        if (penDown) sumiLift(field2);
        penDown = false;                                      // pen up: silence, not a stroke
      } else if (random() < hesitation * 0.6 * (1 - cursiveOf(G, src) * 0.6)) {
        if (penDown) sumiLift(field2);
        penDown = false;                                      // a pause
      } else {

        // ── direction: structure, light, feeling and the hand's own memory ──
        penDir += angDiff(travel, penDir) * (0.1 + (1 - continuity) * 0.35);
        const terrain = (noise(circlePos.x * 0.0021, circlePos.y * 0.0021, 9) - 0.5) * TWO_PI;
        penDir += angDiff(terrain * 0.7 + atan2(LY - circlePos.y, LX - circlePos.x) * 0.18, penDir) * 0.18 * A.T;
        // and the pull or the push of the feeling itself: love bends the path
        // toward the field, hate bends it away, with the same mathematics
        const pull = (src.attraction - src.avoidance);
        penDir += sin(frameCount * 0.01 + src.index) * pull * 0.12 * local;
        penDir += (noise(frameCount * 0.04, 17) - 0.5) * emo * roughness * 0.4;

        // the hand's tremor is not random: the feeling is in it
        const tr = (noise(frameCount * 0.05, 3) - 0.5) * (0.4 + emo * roughness * 2.2);
        const nx = -sin(penDir) * tr, ny = cos(penDir) * tr;

        const opacity = constrain(0.25 + src.memory * 0.55 + src.intensity * 0.4
                                  + field.energy * 0.25 - field.noise * 0.35, 0.12, 1.5);
        // A and B share one physics: only the pigment differs, never width, bite or skip
        const grain = INK_GRAIN[0];
        // the pencil never gives the same weight twice: pressure, the tooth of
        // the sheet and the ink's own dryness all move it
        const tooth = toothAt(circlePos.x, circlePos.y);
        const bite = 1 - grain.tooth * (1 - tooth) * 0.9;
        const vary = 1 + (noise(frameCount * 0.11, 23) - 0.5) * grain.vary * 1.6;
        const cap = 110 * opacity * bite;

        field2.noFill();
        field2.strokeCap(ROUND);

        // where the sheet's tooth is deepest a dry ink skips altogether
        const skip = tooth < 0.24 && random() < grain.skip;

        // ── I + K — the brush: line and insistence are one body of ink ──────
        if (!penDown || !sumi) sumiBegin(G, src, emo);
        sumiStep(field2, prevC.x, prevC.y, circlePos.x, circlePos.y,
                 { PEN, pressure, opacity, grain, cap, vary });

        // ── D — structure: hatching that closes as the form darkens ─────────
        if (A.D > 0.05 && density > 0.08) {
          const band = (1.2 + pressure * 3.4) * A.D;
          const gap = 3.6 - density * 2.2;
          const px = -sin(penDir), py = cos(penDir);
          field2.strokeWeight((0.35 + pressure * 0.4) * (window.__hartPen || 1) * HV.pen); // اندازهٔ قلم پلاتر ← صدا (× قلمِ بذر)
          for (let o = -band; o <= band; o += gap) {
            const t = abs(o) / max(0.001, band);
            field2.stroke(PEN[0], PEN[1], PEN[2],
                          min(cap, (14 + density * 60) * A.D * opacity * (1 - t * 0.6)
                              * (1 - grain.tooth * (1 - toothAt(prevC.x + px * o, prevC.y + py * o)) * 0.9)));
            field2.line(prevC.x + px * o, prevC.y + py * o, circlePos.x + px * o, circlePos.y + py * o);
          }
          if (density > 0.75) {
            const cross = penDir + 0.7, cx2 = -sin(cross), cy2 = cos(cross);
            for (let o = -band; o <= band; o += gap * 1.6) {
              field2.stroke(PEN[0], PEN[1], PEN[2], min(cap, 10 + (density - 0.75) * 90 * A.D));
              field2.line(prevC.x + cx2 * o, prevC.y + cy2 * o,
                          circlePos.x + cx2 * o, circlePos.y + cy2 * o);
            }
          }
        }

        // ── T — the flow of the space, carried past the pen, and the air ────
        if (A.T > 0.05) {
          const flowLen = (20 + lum * 60) * A.T * strokeLen;
          field2.stroke(PEN[0], PEN[1], PEN[2], min(cap, (5 + pressure * 16) * A.T * opacity * bite));
          field2.strokeWeight((0.35 + pressure * 0.45) * (window.__hartPen || 1) * HV.pen); // اندازهٔ قلم پلاتر ← صدا (× قلمِ بذر)
          let fx = circlePos.x, fy = circlePos.y, fa = penDir;
          field2.beginShape();
          for (let i = 0; i < flowLen / 4; i++) {
            field2.vertex(fx, fy);
            fa += (noise(fx * 0.004, fy * 0.004, frameCount * 0.002) - 0.5) * (0.18 + roughness * 0.3);
            fx += cos(fa) * 4; fy += sin(fa) * 4;
          }
          field2.endShape();
          const air = floor(lum * 5 * A.T);
          for (let i = 0; i < air; i++) {
            const r = random(6, 30), aa = random(TWO_PI);
            field2.stroke(PEN[0], PEN[1], PEN[2], (3 + lum * 6) * opacity);
            field2.strokeWeight(0.3);
            field2.point(circlePos.x + cos(aa) * r, circlePos.y + sin(aa) * r);
          }
        }

        said.set(key, (said.get(key) || 0) + 1);
        penDown = true;
      }

      prev2C = { x: prevC.x, y: prevC.y };
    }
  }

  // the old hand lets go over TRANSFER_STEPS frames after an impact
  if (penT < 1) penT = min(1, penT + 1 / TRANSFER_STEPS);
  // a brush resting in one place is lifted: the stroke ends
  if (prevC && dist(circlePos.x, circlePos.y, prevC.x, prevC.y) <= 0.1) penStill++; else penStill = 0;
  if (penDown && penStill > 8 + (sumi ? sumi.cursive * 14 : 0) && field2) { sumiLift(field2); penDown = false; }
  inkAge();
  drifters();

  prevC = { x: circlePos.x, y: circlePos.y };
  hits *= 0.995;

  // the vibration: rings that stand off the body and breathe, wider and
  // more numerous the more the feeling is roused — and one leaves it outright
  // whenever it is struck, carrying the feeling outward
  {
    const HR2 = circleRadius / 2;
    const n = 2;                       // two rings, no more
    push();
    noFill();
    for (let i = 1; i <= n; i++) {
      const ph = sin(frameCount * (0.05 + field.energy * 0.22) - i * 0.9);
      // they stand close to the body, and barely breathe
      const gap = 3 + field.energy * 4 + hits * 0.2;
      const r = HR2 + i * gap + ph * (0.8 + field.energy * 1.6 + hits * 0.2);
      const fall = 1 - (i - 1) / max(1, n);
      const c = hits > 2 && i % 3 === 0 ? SHU : SUMI;
      stroke(c[0], c[1], c[2], min(200, (40 + field.energy * 110 + hits * 8) * fall));
      strokeWeight(0.4 + fall * 0.8);
      // drawn by hand: the circle is gone round more than once, never closing
      // in the same place, and the pressure changes as the wrist turns
      for (let pass = 0; pass < 2; pass++) {
        const start = random(TWO_PI);
        const arc = TWO_PI * random(0.82, 1.06);
        beginShape();
        for (let t = 0; t <= arc; t += 0.14) {
          const a2 = start + t;
          const wob = (noise(cos(a2) * 1.6 + i * 4 + pass, sin(a2) * 1.6 + i * 4, frameCount * 0.006) - 0.5)
                      * (0.8 + field.tension * 2.6);
          const drift = sin(t * 1.3 + pass) * 0.6;      // the hand does not come back to the same radius
          vertex(circlePos.x + cos(a2) * (r + wob + drift),
                 circlePos.y + sin(a2) * (r + wob + drift));
        }
        endShape();
      }
    }
    // what is transmitted: a ring that leaves the body whenever it is struck
    if (hits > 0.5) {
      stroke(SHU[0], SHU[1], SHU[2], min(190, 40 + hits * 14));
      strokeWeight(0.7);
      circle(circlePos.x, circlePos.y, HR2 * 2 + 6 + (28 - hits) * 0.5);
    }
    pop();
  }

  // the body: gone round by hand, again and again, never closing in one place
  const HR = circleRadius / 2;
  push();
  noFill();
  for (let r = 2; r <= HR; r += 1.4) {
    const start = random(TWO_PI), arc = TWO_PI * random(0.78, 1.08);
    stroke(SHU[0], SHU[1], SHU[2], 16 + field.tension * 26);
    strokeWeight(0.4 + random(0.3));
    beginShape();
    for (let t = 0; t <= arc; t += 0.2) {
      const a2 = start + t;
      const wob = (noise(cos(a2) * 2 + r, sin(a2) * 2 + r, frameCount * 0.004) - 0.5)
                  * (0.8 + field.tension * 2.4);
      vertex(circlePos.x + cos(a2) * (r + wob), circlePos.y + sin(a2) * (r + wob));
    }
    endShape();
  }
  pop();

  // the rim it keeps of every contact — forgotten at the feeling's own rate
  for (const m of rim) {
    stroke(SUMI[0], SUMI[1], SUMI[2], m.life * 170);
    strokeWeight(0.6);
    arc(circlePos.x, circlePos.y, circleRadius + 8, circleRadius + 8, m.a - m.w * 0.5, m.a + m.w * 0.5);
    m.life -= selfD.forgetting * 0.012;
  }
  rim = rim.filter(m => m.life > 0.02);

  // between strikes the self glides on the push it was given, and drifts a
  // little at its own energy, so the pen travels and a stroke can run its course
  circleVel.x += (noise(frameCount * 0.004, 3) - 0.5) * 0.06 * (0.3 + selfD.energy);
  circleVel.y += (noise(frameCount * 0.004, 9) - 0.5) * 0.06 * (0.3 + selfD.energy);
  // five mild wells: the board's centre and its four corners. each pulls only
  // within its own reach, so when nothing pushes it the self settles into
  // whichever is nearest — and a strike can carry it from one well to another
  {
    const inset = 192.5 - circleRadius / 2 - 12;
    const wells = [[0, 0], [-inset, -inset], [inset, -inset], [-inset, inset], [inset, inset]];
    for (const [wx, wy] of wells) {
      const dx = width / 2 + wx - circlePos.x, dy = height / 2 + wy - circlePos.y;
      const fall = exp(-(dx * dx + dy * dy) / (2 * 120 * 120));
      circleVel.x += dx * 0.0006 * fall;
      circleVel.y += dy * 0.0006 * fall;
    }
  }
  circleVel.mult(0.975);
  circleVel.limit(0.5 + selfD.energy * 4);
  circlePos.add(circleVel);
  confineCircle();

  for (let i = 0; i < parandehs.length; i++) {
    const d = parandehs[i].d;
    const distance = dist(parandehs[i].pos.x, parandehs[i].pos.y, circlePos.x, circlePos.y);
    if (distance >= circleRadius && parandehs[i].inside) {
      parandehs[i].inside = false;
      parandehs[i].leftAt = frameCount;
    }
    if (distance < circleRadius) {
      // ── behaviour, from the feeling: how far the bird turns on contact
      parandehs[i].vel.rotate(random(-PI / 4, PI / 4) * (0.3 + d.tension * 1.7));

      // ── and how hard the circle is pushed, and which way
      const sign = d.attraction > d.avoidance ? -1 : 1;
      circleAcc = circleDir.copy().mult(50.5 * sign * (0.3 + d.tension * 1.6));
      circleVel.add(circleAcc);
      circleVel.limit(0.5 + selfD.energy * 4);
      circlePos.add(circleVel);
      confineCircle();

      // the bird is sent back out, so contact is a touch, not a resting place
      {
        const b = parandehs[i];
        const ox = b.pos.x - circlePos.x, oy = b.pos.y - circlePos.y, ol = max(1, mag(ox, oy));
        b.vel.x += (ox / ol) * (0.6 + d.tension * 0.8);
        b.vel.y += (oy / ol) * (0.6 + d.tension * 0.8);
      }

      // one strike per contact: only on the frame it enters, and not again
      // until it has left and a short cooldown has passed
      const b = parandehs[i];
      if (b.inside || frameCount - (b.leftAt ?? -999) < 12) { b.inside = true; continue; }
      b.inside = true;

      // it remembers being touched: a mark on the rim, and a dent
      hits = min(14, hits + 1);
      // it leaves with whatever ink the pen was carrying when it struck,
      // and it hands the pen its own feeling: the disc draws in that body now
      // the strike turns the bird to the next colour of its OWN palette —
      // never a colour from outside it
      parandehs[i].hits++;
      parandehs[i].memory = min(1, parandehs[i].memory + 0.12 * (0.4 + d.memory));
      // the hand changes: what the pen holds right now becomes the old hand,
      // and the bird's feeling takes over across the next strokes
      penPrev = currentHand();
      penSelf = d;
      penT = 0;
      lastImpact = { x: circlePos.x, y: circlePos.y, a: atan2(circlePos.y - parandehs[i].pos.y, circlePos.x - parandehs[i].pos.x), f: frameCount };
      // A dominates; on the Fibonacci strikes B steps in, for two strikes only
      if (++strikes >= fibB) {
        penIx = 1; inkBLeft = 2;
        const next = fibA + fibB;
        fibA = fibB; fibB = next;
      } else if (penIx === 1 && --inkBLeft <= 0) {
        penIx = 0;
      }
      dentA = atan2(parandehs[i].pos.y - circlePos.y, parandehs[i].pos.x - circlePos.x);
      dent = min(1, dent + d.deformation * 0.5);
      rim.push({ a: dentA, life: 1, w: 0.15 + d.intensity * 0.45 });
      if (rim.length > 80) rim.shift();
    }
  }

  for (let i = 0; i < parandehs.length; i++) parandehs[i].updates();
  // the disc and its rings stay inside; the bodies do not
  for (let i = 0; i < parandehs.length; i++) parandehs[i].displays();
  mount();          // the board is over everything but its own lettering
  cartouche();
  label();
}

// the machine: a dark instrument ground, and the scan aperture in the middle
const SUMI = [38, 40, 44];        // the hairline ink
const WASHI = [247, 246, 243];    // the ground everything accumulates on
const SHU = [192, 86, 58];        // rust
const AI = [74, 143, 139];        // teal
const OCHRE = [71, 84, 138];      // indigo
// the older names, aliased so every remaining call resolves to ink and paper
const VOID = WASHI, SCAN = WASHI, TRACE = SUMI;
const RULE = [120, 108, 92], DIM = [126, 114, 96];

// the greyscale a B-mode image is read on: anechoic → tissue → fascia → bone
const HOT = [[8, 9, 11], [46, 48, 52], [116, 118, 124], [188, 190, 196], [248, 249, 252]];
function hot(u) {
  const v = constrain(u, 0, 1) * (HOT.length - 1);
  const i = floor(v), f = v - i, A = HOT[i], B = HOT[min(HOT.length - 1, i + 1)];
  return [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f];
}
// the flow map: toward the probe reads warm, away reads cool
const FLOW_TO = [236, 48, 19], FLOW_AWAY = [42, 108, 210];
const CELL = 5, GRID = 77, CM = 16;

// the sector the probe insonates, hung from the transducer face
function sector() {
  const L = width / 2 - 192.5, T = height / 2 - 192.5;
  return { ax: width / 2, ay: T + 10, near: 34, far: 372, half: radians(33), L, T };
}
// is this point inside the beam, and how deep does it lie
function inBeam(x, y) {
  const S = sector();
  const dx = x - S.ax, dy = y - S.ay, r = mag(dx, dy);
  if (r < S.near || r > S.far) return null;
  const a = atan2(dy, dx) - HALF_PI;
  if (abs(a) > S.half) return null;
  return { r, a, depth: (r - S.near) / (S.far - S.near) };
}

// what the beam finds: the tissue holds an echo where the bodies dwell
let echoes = new Float32Array(GRID * GRID);
let beamLine = 0, beamAcc = 0, scanT = 0;
function clearEchoes() {
  echoes = new Float32Array(GRID * GRID);
  beamLine = 0; beamAcc = 0; scanT = 0;
}

// the image itself: speckle, depth loss, and the echoes over it

// colour flow: the component of each body's motion along the beam

// brought up against the dark, a feeling's tone stays its own

// the console face is etched once: the grid, the brackets, the plate labels
// what the pen must leave blank: the plot and every annotation beside it
let listRows = 0;   // how many names the column drew last frame
function keepClear() {
  const L = width / 2 - 192.5, R = width / 2 + 192.5;
  const T = height / 2 - 192.5, B = height / 2 + 192.5;
  const sb = sealBox();
  return [
    { x: L - 34, y: T - 34, w: 453, h: 453 },                       // the mount and its window
  ];
}
// nothing is reserved beside the plate any more
function inAnnotation() {
  return false;
}

function isClear(x, y) {
  for (const r of keepClear()) {
    if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) return false;
  }
  return true;
}

// the layer everything writes into, one hairline at a time
let field2;

function makePaper() {
  if (!paper) paper = createGraphics(width, height);
  paper.clear();
  paper.background(WASHI[0], WASHI[1], WASHI[2]);
  // the ground is almost bare: a few thousand hairlines, each near invisible,
  // drifting on one noise field — the drawing is what accumulates on top
  paper.noFill();
  for (let i = 0; i < 2600; i++) {
    let x = random(width), y = random(height);
    const c = i % 23 === 0 ? AI : i % 31 === 0 ? SHU : SUMI;
    paper.stroke(c[0], c[1], c[2], 9);
    paper.strokeWeight(0.5);
    paper.beginShape();
    for (let k = 0; k < 26; k++) {
      paper.vertex(x, y);
      const a = noise(x * 0.0016, y * 0.0016, 11) * TWO_PI * 2;
      x += cos(a) * 3.2; y += sin(a) * 3.2;
    }
    paper.endShape();
  }
  if (!field2) field2 = createGraphics(width, height);
  field2.clear();
}

// the long exposure: what the bodies have drawn since this feeling began
function exposure() {
  image(field2, 0, 0);
}

// a brush stroke: it enters, presses, and lifts
function brush(g, x1, y1, x2, y2, w, alpha, ink) {
  g = g || window;
  const steps = max(3, floor(dist(x1, y1, x2, y2) / 4));
  const c = ink || SUMI;
  for (let i = 0; i < steps; i++) {
    const t1 = i / steps, t2 = (i + 1) / steps;
    const press = sin(pow(t1, 0.8) * PI);
    g.stroke(c[0], c[1], c[2], alpha * (0.35 + press * 0.75));
    g.strokeWeight(w * (0.25 + press));
    g.line(lerp(x1, x2, t1) + random(-0.5, 0.5), lerp(y1, y2, t1) + random(-0.5, 0.5),
           lerp(x1, x2, t2), lerp(y1, y2, t2));
  }
}

// the frame is not ruled, it is brushed — four strokes, each lifting at its end
let frameSeed = 0;
function brushFrame() {
  const L = width / 2 - 192.5, R = width / 2 + 192.5;
  const T = height / 2 - 192.5, B = height / 2 + 192.5;
  randomSeed(frameSeed);
  push();
  push();
  rectMode(CORNER);
  noFill();
  // one hairline holds the field; nothing else frames it
  stroke(SUMI[0], SUMI[1], SUMI[2], 60);
  strokeWeight(0.5);
  rect(L, T, 385, 385);
  pop();
  pop();
  randomSeed(simFrame * 7919 + 13);
}

// nothing is sampled any more; the sheet is simply painted
let chans = [];
function scribble() {
  return;
  const v = [abs(field.attraction), field.density * 0.8, field.energy, field.noise];
  for (let i = 0; i < 4; i++) {
    // the pen wanders around the value, as an instrument pen does
    const jitter = (noise(i * 31, frameCount * 0.08) - 0.5) * (0.06 + field.noise * 0.5);
    chans[i].push(constrain(v[i] + jitter, 0, 1.4));
    if (chans[i].length > 190) chans[i].shift();
  }
}


function grounds() {
  image(paper, 0, 0);
  exposure();
  mount();
  studies();
}

// the passe-partout: a plain board in the paper's own tone, no rules, no bevel
function mount() {
  const L = width / 2 - 192.5, R = width / 2 + 192.5;
  const T = height / 2 - 192.5, B = height / 2 + 192.5;
  const M = 30;

  push();
  rectMode(CORNER);
  noStroke();
  fill(WASHI[0], WASHI[1], WASHI[2]);
  rect(L - M, T - M, 385 + M * 2, M);
  rect(L - M, T, M, 385);
  rect(R, T, M, 385);
  rect(L - M, B, 385 + M * 2, M);
  pop();
}

// nothing is tabulated: the studies give way to the accumulation itself
function studies() {}

function cartouche() {
  const L = width / 2 - 192.5, R = width / 2 + 192.5, B = height / 2 + 192.5;
  push();
  noStroke();
  textFont('monospace');
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  fill(SUMI[0], SUMI[1], SUMI[2], 190);
  textSize(8);
  // (متن حذف شد) text(selfD.name.toLowerCase(), L, B + 42);

  fill(SUMI[0], SUMI[1], SUMI[2], 105);
  textSize(6.5);
  // (متن حذف شد) text(selfD.familyName.toLowerCase() + '   ' + selfD.social, L, B + 56);

  textAlign(RIGHT, TOP);
  fill(SUMI[0], SUMI[1], SUMI[2], 105);
  textSize(6.5);
  // (متن حذف شد) text(nf(selfD.index + 1, 3) + ' / 250   ' + parandehs.length + ' others   ' + pairCount(parandehs.length) + ' pairs', R, B + 42);
  // (متن حذف شد) text('t ' + nf(simMillis() / 1000, 4, 1) + ' s', R, B + 56);
  pop();
}

// ── SumiBrush: 墨 on washi, one 筆 stroke at a time ────────────────────────
// A stroke is a body of ink, not a line: a wet core, 3–7 body fibres, 2–8 edge
// fibres, 1–5 dry fibres and a few bleed halos. Ink runs out along the stroke,
// so it passes WET → NORMAL → DRY; speed dries it, slowness feeds it, the
// paper's tooth shows through where it is dry. When the brush lifts, a few
// hairs carry on alone. The feeling does not choose the look — it sets the
// pressure profile, the tremor and the breaks of the hand that holds the brush.
const PAPER_ABSORB = 1.0;
const MAX_CORE_DENSITY = 0.88;
// softness is never a blur: it comes only from absorption, separating hairs,
// the paper's tooth and changing ink density. nothing here filters the image.   // past this the ink does not darken or thicken — it spreads     // kept low: more and it turns to watercolour
let sumi = null;              // the stroke in progress
let wetSpots = [];            // ink still soaking outward into the fibres

// ── Ink Age ───────────────────────────────────────────────────────────────
// Every line has an age. A stroke is not painted onto the sheet when it is made:
// it is recorded, with its birth time, its ink and its wetness, and re-rendered
// live as it passes FRESH → WET → SETTLING → DRYING → DRY. Only once it is dry is
// it fixed into field2, where it never changes again. Fresh ink is soft and deep
// and bleeds a hair's breadth; settling ink stops bleeding and its edge firms;
// drying ink lets the tooth of the paper through; dry ink is paper and ink fixed
// together. A heavily loaded stroke stays darker than a thin one even when dry.
// The feeling sets how the ink behaves while it dries, not how time runs:
//   calm — even;  furious — pools, then dries fractured;
//   grief — bleeds, then fades;  fear — thin, and dry almost at once.
let wetStrokes = [];          // strokes still drying, rendered live every frame
let inkAgeMap = new Map();    // 26px cells: when ink last landed there, and how much
const AGE_CELL = 26;
const MAX_LIVE_SEGS = 1600;   // beyond this the oldest stroke is fixed early

// how much old, settled ink lies under this point — sampled between the four
// nearest cell centres, so the cell grid never shows in the drawing
function cellOld(i, j, now) {
  const c = inkAgeMap.get(i + ',' + j);
  return c ? smoothstep01((now - c.t) / 6000) * min(1, c.ink) : 0;
}
function oldInkAt(x, y) {
  const now = simMillis();
  const fx = x / AGE_CELL - 0.5, fy = y / AGE_CELL - 0.5;
  const i = floor(fx), j = floor(fy), tx = fx - i, ty = fy - j;
  const a = lerp(cellOld(i, j, now), cellOld(i + 1, j, now), tx);
  const b = lerp(cellOld(i, j + 1, now), cellOld(i + 1, j + 1, now), tx);
  return lerp(a, b, ty);
}
function smoothstep01(u) { u = constrain(u, 0, 1); return u * u * (3 - 2 * u); }
// ink from another stroke that is still wet here, and how dilute it was
function cellWet(i, j, now, id) {
  const c = inkAgeMap.get(i + ',' + j);
  if (!c || c.id === id) return [0, 0];
  return [(1 - smoothstep01((now - c.t) / 6000)) * min(1, c.ink), c.dil ?? 0.5];
}
function wetInkAt(x, y, id) {
  const now = simMillis();
  const fx = x / AGE_CELL - 0.5, fy = y / AGE_CELL - 0.5;
  const i = floor(fx), j = floor(fy), tx = fx - i, ty = fy - j;
  const c00 = cellWet(i, j, now, id), c10 = cellWet(i + 1, j, now, id);
  const c01 = cellWet(i, j + 1, now, id), c11 = cellWet(i + 1, j + 1, now, id);
  const wet = lerp(lerp(c00[0], c10[0], tx), lerp(c01[0], c11[0], tx), ty);
  const ws = c00[0] + c10[0] + c01[0] + c11[0];
  const dil = ws > 0 ? (c00[0] * c00[1] + c10[0] * c10[1] + c01[0] * c01[1] + c11[0] * c11[1]) / ws : 0.5;
  return { wet, dil };
}

// how cursive this hand writes: controlled and calm → 楷 separate strokes with
// clear stops; aroused and loose → 草 long, continuous, many motions in one
function cursiveOf(G, src) {
  return constrain(src.energy * 0.6 + src.noise * 0.4 + G.T * 0.2 - G.I * 0.3, 0, 1);
}
let lastLift = null;   // where the last stroke left the paper — for 游丝, the linking thread

function sumiBegin(G, src, emo) {
  const control = 1 - src.noise;
  const cursive = cursiveOf(G, src);
  const wet = constrain(0.35 + src.memory * 0.3 + (1 - src.energy) * 0.35, 0.2, 1);
  // the tip is not a nib: seven hairs, a pointed centre and an irregular outside.
  //   centre ×1 — I, precision        inner ×2 — D, structure
  //   outer  ×2 — the body's edge     long  ×2 — T + K, flow and insistence, trailing
  const jit = () => random(-0.04, 0.04) * (1 + G.roughness);
  const fibers = [
    { kind: 'centre', role: 'I', o: 0,                 load: 1,                dry: random(0.1, 0.3) },
    { kind: 'inner',  role: 'D', o: -0.22 + jit(),     load: random(0.8, 0.95), dry: random(0.2, 0.5) },
    { kind: 'inner',  role: 'D', o:  0.22 + jit(),     load: random(0.8, 0.95), dry: random(0.2, 0.5) },
    { kind: 'outer',  role: 'D', o: -0.44 + jit() * 2, load: random(0.45, 0.7), dry: random(0.5, 0.9) },
    { kind: 'outer',  role: 'D', o:  0.44 + jit() * 2, load: random(0.45, 0.7), dry: random(0.5, 0.9) },
    { kind: 'long',   role: 'T', o: -0.58 + jit() * 3, load: random(0.3, 0.55), dry: random(0.6, 1) },
    { kind: 'long',   role: 'K', o:  0.58 + jit() * 3, load: random(0.3, 0.55), dry: random(0.6, 1) },
  ].map(f => Object.assign(f, { s: random(1000) }));

  const grief = src.memory * (1 - src.energy);
  sumi = {
    a: 0, L: (30 + G.length * 110) * (0.7 + cursive * 0.9), ink: wet * random(0.85, 1), wet, seed: random(1000), fibers,
    cursive,
    tip: null,                                   // where the brush's tip points: it turns, it lags the path
    splay: 0.15, splayV: 0,                      // the hairs open under pressure, and spring back
    roles: { I: 0.5 + G.I * 0.7, D: 0.5 + G.D * 0.7, T: 0.5 + G.T * 0.7, K: 0.5 + G.K * 0.7 },
    twist: constrain(G.roughness * 0.7 + cursive * 0.5, 0, 1),
    threads: [],
    width: 1.4 + G.K * 3.6,
    attack: G.K * (0.5 + emo),
    sink: grief,
    tremble: G.hesitation * G.roughness + (1 - control) * 0.2,
    breakP: G.roughness * emo * G.K,
    gapP: G.hesitation * (1 - control),
    gap: 0, dir: 0, w: 1, C: null, op: 1,
    // how this hand's ink dries
    birth: simMillis(),
    dryK: constrain(0.7 + src.energy * 0.8 + G.hesitation * 0.9 - src.memory * 0.4, 0.5, 2.5),
    retain: constrain(0.78 - grief * 0.3, 0.5, 0.85),
    bleedK: constrain(1 + grief * 1.0 - G.hesitation * 0.4, 0.4, 2),
    poolK: G.K * (0.5 + emo),
    crackP: G.roughness * G.K * emo,
    // 濃 0 … 淡 1: how much water is in the ink. a pressed, insistent hand
    // loads it thick; a slow, remembering, untensed one thins it to a wash
    dil: constrain(0.25 + grief * 0.5 + (1 - src.tension) * 0.25 - G.K * 0.35, 0, 1),
    // the brush's tilt: upright is the tip (中鋒), tilted lays the side (側鋒)
    tilt: constrain(G.T * 0.5 + (1 - control) * 0.3, 0, 1),
    id: random(1e9),
    segs: [], hairs: [],
  };
  if (lastLift && cursive > 0.35 && frameCount - lastLift.f < 30 &&
      dist(lastLift.x, lastLift.y, circlePos.x, circlePos.y) < 60) {
    const pts = [], n = 8;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const sag = sin(t * PI) * 6 * (noise(sumi.seed, 3) - 0.5);
      pts.push([lerp(lastLift.x, circlePos.x, t) + sag, lerp(lastLift.y, circlePos.y, t) - sag]);
    }
    sumi.threads.push({ pts, a: 22 * (cursive - 0.35) / 0.65 + 8 });
  }
  wetStrokes.push(sumi);
}

function sumiPressure(b) {
  const u = min(1, b.a / b.L);
  let p = lerp(0.3, 1, pow(sin(PI * max(0.04, u)), 0.8));
  p *= 1 + b.attack * 0.8 * constrain(u / 0.3, 0, 1);
  p += b.sink * 0.6 * u;
  p *= 1 + (noise(b.seed, b.a * 0.25) - 0.5) * b.tremble * 1.2;
  return max(0.08, p);
}

// record one step of the stroke — it is drawn by the ink-age renderer
function sumiStep(g, x0, y0, x1, y1, ctx) {
  const b = sumi;
  const seg = dist(x0, y0, x1, y1);
  b.a += seg;
  b.C = ctx.PEN; b.op = ctx.opacity;
  if (b.gap > 0) { b.gap -= seg; return; }
  const u = b.a / b.L;
  if (u > 0.15 && u < 0.9 && random() < b.breakP * 0.06) { b.gap = random(3, 10); return; }
  if (random() < b.gapP * 0.03) { b.gap = random(4, 14); return; }

  b.ink = max(0, b.ink - (0.003 + seg * 0.0045) * (1.2 - b.wet * 0.5));
  const slowness = 1 - min(1, seg / 5);
  const dryness = constrain(seg * 0.08 + (1 - b.ink) * 0.9 - b.wet * 0.3, 0, 1);
  const p = sumiPressure(b) * (0.55 + ctx.pressure * 0.5);
  // pressure mostly thickens the ink, only a little the line: width moves
  // within 0.75–1.1× of the brush, density and spread carry the rest
  const pn = constrain(p, 0, 1.6);
  const w = b.width * (0.85 + min(1, pn) * 0.2) * (1 + slowness * 0.1) * (1 + b.tilt * 0.4) * ctx.grain.weight;
  b.w = w;
  const dir = atan2(y1 - y0, x1 - x0);
  b.dir = dir;
  // the brush does not only travel, it turns: its tip lags the path and twists,
  // and where the path turns against the tip the hairs splay onto their side
  if (b.tip === null) b.tip = dir;
  b.tip += angDiff(dir, b.tip) * (0.06 + (1 - b.twist) * 0.08)
         + (noise(b.seed + 51, b.a * 0.02) - 0.5) * b.twist * 0.15;
  const turn = sin(dir - b.tip);
  b.lastDirPrev = b.lastDir;
  // pressure decides how many hairs touch the paper, not how wide a line is
  const contact = constrain(0.15 + min(1, pn) * 0.75, 0.15, 1);
  // speed: the faster it moves, the less ink each hair hands to the paper
  const accel = seg - (b.lastSeg ?? seg);
  b.lastSeg = seg;
  const transfer = constrain((1 - seg * 0.05) * (1 - max(0, accel) * 0.06 + max(0, -accel) * 0.04), 0.5, 1);
  b.splayV += (contact - b.splay) * 0.3;
  b.splayV *= 0.6;
  b.splay = constrain(b.splay + b.splayV, 0.05, 1.25);

  // what is already on the paper here: new wet ink laid over old dry ink
  const over = oldInkAt(x1, y1);
  // 破墨: another stroke still wet here — the two inks break into each other
  const under = wetInkAt(x1, y1, b.id);
  const broken = under.wet * (0.4 + abs(b.dil - under.dil));
  const key = floor(x1 / AGE_CELL) + ',' + floor(y1 / AGE_CELL);
  const cell = inkAgeMap.get(key);
  inkAgeMap.set(key, { t: simMillis(), ink: min(2, (cell ? cell.ink * 0.6 : 0) + b.ink), dil: b.dil, id: b.id });
  // 飞白: fast and low on ink, the brush leaves streaks of white along its path
  const feibai = constrain(seg * 0.1 + (1 - b.ink) * 0.7 - b.wet * 0.35, 0, 1);

  b.segs.push({
    x0, y0, x1, y1, nx: -sin(dir), ny: cos(dir), w,
    tr: (noise(b.seed + 7, b.a * 0.6) - 0.5) * b.tremble * 3,
    eU: (noise(b.seed + 11, b.a * 0.015) - 0.5) * w * 0.5,
    eL: (noise(b.seed + 23, b.a * 0.015) - 0.5) * w * 0.5,
    ink: b.ink, dryness, slowness, tooth: toothAt(x1, y1), over,
    a: b.a, feibai, broken, contact, transfer, turn, speed: seg, splay: b.splay,
    density: b.ink * pn,                         // how much ink is pressed in
    spread: b.ink * b.wet,                       // how far it wants to travel
    // ink gathers only where the brush lands, nearly stops, turns hard, or
    // crosses its own earlier ink — never along the whole stroke
    pool: max(u < 0.12 ? 1 - u / 0.12 : 0,
              slowness > 0.85 ? (slowness - 0.85) / 0.15 * 0.7 : 0,
              constrain((abs(angDiff(dir, b.lastDir ?? dir)) - 0.35) / 0.6, 0, 0.8),
              constrain((over + broken) * 0.9, 0, 0.6)),
    tail: smoothstep01((u - 0.75) / 0.25) * 0.6 + smoothstep01((0.3 - b.ink) / 0.3) * 0.6,
    bleed: b.ink * PAPER_ABSORB * b.wet * (0.4 + slowness),
    C: ctx.PEN, op: ctx.opacity, cap: ctx.cap, vary: ctx.vary,
    seed: b.seed * 31 + b.segs.length * 7.13,
  });
  b.lastDir = dir;
}

// the brush leaves the paper: a few hairs carry on past the body
function sumiLift(g) {
  const b = sumi;
  sumi = null;
  if (!b) return;
  if (b.C && b.a >= 4 && b.segs.length) {
    // the pool where the brush lifts — a firm stop (顿) for a controlled hand
    b.segs[b.segs.length - 1].pool = max(b.segs[b.segs.length - 1].pool, b.cursive < 0.35 ? 1 : 0.6);
    lastLift = { x: circlePos.x, y: circlePos.y, f: frameCount };
    const n = constrain(2 + floor((1 - b.ink) * 3), 2, 5);
    const ex = circlePos.x, ey = circlePos.y;
    for (let i = 0; i < n; i++) {
      let a = b.dir + random(-0.12, 0.12);
      const off = random(-0.5, 0.5) * b.w;
      let x = ex - sin(b.dir) * off, y = ey + cos(b.dir) * off;
      const len = random(4, 14) * (0.6 + (1 - b.ink));
      const pts = [[x, y]];
      for (let k = 0; k < max(2, floor(len / 2)); k++) {
        x += cos(a) * 2; y += sin(a) * 2; a += random(-0.06, 0.06);
        pts.push([x, y]);
      }
      b.hairs.push(pts);
    }
  }
}

// where a stroke stands in its drying, at this moment
function inkState(st, now) {
  const t = ((now - st.birth) / 1000) * st.dryK;     // effective seconds
  const dryProgress = smoothstep01(t / 10);           // 0 fresh → 1 dry, continuous
  return {
    t, dryProgress,
    wetness: 1 - smoothstep01(t / 3),                 // FRESH 0–1 s soft, WET 1–3 s the edge firms
    bleedGrow: smoothstep01(t / 1.2),                 // the slight seepage happens in the first second
    toothVis: smoothstep01((t - 3) / 7),              // SETTLING 3–6 s: the paper's tooth emerges
    dryingSep: smoothstep01((t - 6) / 4),             // DRYING 6–10 s: the fibres separate
    retain: lerp(1, st.retain, dryProgress),
    crack: smoothstep01((t - 3) / 5) * st.crackP,     // the fractures open as it dries
  };
}

function renderStroke(g, st, k) {
  g.noFill();
  g.strokeCap(ROUND);
  const n = st.fibers.length;
  for (const sg of st.segs) {
    const C = sg.C;
    const dryness = max(sg.dryness, k.toothVis * 0.85);
    const inkNow = sg.ink * k.retain;
    // pooling lives only where the brush lands and lifts
    const pool = sg.pool * st.poolK;
    const rawCore = (0.16 + 0.63 * inkNow * st.wet * (0.6 + sg.density * 0.5))
                    * (1 + sg.over * 0.3 + pool * 0.5);
    const coreD = min(MAX_CORE_DENSITY, rawCore);
    const excess = max(0, rawCore - MAX_CORE_DENSITY);
    const sep = (1 + excess * 0.8 + sg.spread * 0.15)   // fibres part instead of clotting
              * (1 + sg.speed * 0.03 + abs(sg.turn) * 0.5)     // and with speed and the splayed side
              * (1 + (sg.tail || 0) * 1.2)                      // the end of a stroke loosens
              * (1 + (k.dryingSep || 0) * 0.35);                // and drying parts them further
    const wash = 1 - st.dil * 0.55;                    // 濃 full … 淡 a little over half
    for (let fi = 0; fi < n; fi++) {
      const f = st.fibers[fi];
      // a tilted brush lays its side: the fibres lean to one edge
      const fo = f.o + st.tilt * 0.22 + sg.turn * 0.2;
      // only the hairs pressed onto the paper leave ink: a light touch is the tip alone
      if (abs(f.o) > 0.18 + sg.contact * 0.5) continue;
      // CORE → EDGE → BREAK → FADE: toward the end the hairs drop out one by one,
      // outer ones first, and as it dries a few more let go
      const loosen = (sg.tail || 0) * (0.35 + abs(f.o)) + (k.dryingSep || 0) * 0.15 * abs(f.o) * 2;
      if (hash(sg.seed + fi * 3.3 + 17) < loosen * 0.7) continue;
      // broken ink: where it meets wet ink, the edge feathers into it
      const heart = f.kind === 'centre' || f.kind === 'inner';
      const feather = sg.broken > 0 && !heart
        ? (noise(f.s, sg.a * 0.09) - 0.5) * sg.w * sg.broken * 1.4 : 0;
      // the hairs open with the springy splay; the long ones also wander on their own
      const open = 0.55 + 0.6 * (sg.splay ?? 1);
      const wander = f.kind === 'long' ? (noise(f.s + 5, sg.a * 0.04) - 0.5) * sg.w * 0.35 : 0;
      const off = (fo * sg.w * open + (fo >= 0 ? sg.eU : sg.eL) * abs(fo) * 2) * (heart ? 1 : sep) + feather + wander;
      // several tones in one stroke: the heart of the brush holds the most ink,
      // the outer hairs less, and more so with water in it (and on the side of a tilted brush)
      const toneF = 1 - min(0.8, abs(fo) * 0.6 * (0.5 + st.dil) + st.tilt * 0.15 * max(0, fo));
      // 飞白: whole streaks of white run along the stroke, per fibre
      if (sg.feibai > 0.15 && noise(f.s, sg.a * 0.06) < (sg.feibai - 0.15) * 0.85) continue;
      let cov = inkNow * f.load * toneF * sg.transfer * (1 - sg.tooth * dryness * (0.6 + f.dry * 0.6));
      if (f.kind === 'outer' || f.kind === 'long') cov *= 0.2 * (1 - dryness * 0.5);   // edges carry ~15 % of the core
      cov *= st.roles ? st.roles[f.role] : 1;                     // each hair carries its ancestor
      cov *= 0.86 + 0.28 * noise(f.s + 9, sg.a * 0.03);          // the pigment is never quite even
      if (cov <= 0.03) continue;
      // fractures: a furious stroke cracks open as it dries
      if (k.crack > 0 && hash(sg.seed + fi * 7.7 + 3) < k.crack * 0.5) continue;
      // dry brush: the same fibres drop out as the paper's tooth comes through
      if (hash(sg.seed + fi * 13.1) > min(1, cov * 1.6 + (1 - dryness))) continue;
      let fw, al = (30 + 150 * cov) * sg.op * sg.vary * wash;
      if (heart) fw = max(0.35, (sg.w / 3) * (f.kind === 'centre' ? 1.1 : 0.9)) * (1 + k.wetness * 0.25);
      else { fw = (0.3 + sg.w * 0.04) * (1 + k.wetness * 0.8); al *= 1 - k.wetness * 0.35; }  // wet edges are soft
      g.stroke(C[0], C[1], C[2], min(sg.cap, al));
      g.strokeWeight(fw);
      const ox = sg.nx * (off + sg.tr), oy = sg.ny * (off + sg.tr);
      if (f.kind === 'long') {
        const lag = sg.w * 0.6, tx = sg.ny * lag, ty = -sg.nx * lag;   // back along the path
        g.line(sg.x0 + ox - tx, sg.y0 + oy - ty, sg.x1 + ox - tx * 0.5, sg.y1 + oy - ty * 0.5);
      } else {
        g.line(sg.x0 + ox, sg.y0 + oy, sg.x1 + ox, sg.y1 + oy);
      }
    }
    // the core, deeper where the ink pooled and where it lies over older ink
    if (sg.ink > 0.25 && (sg.tail || 0) < 0.5) {
      g.stroke(C[0], C[1], C[2], min(sg.cap * 1.2, 255 * coreD * sg.op * (1 - st.dil * 0.45) * (1 - (sg.tail || 0))));
      g.strokeWeight(max(0.4, sg.w * 0.38 * (1 + k.wetness * 0.3)));
      g.line(sg.x0 + sg.nx * sg.tr, sg.y0 + sg.ny * sg.tr, sg.x1 + sg.nx * sg.tr, sg.y1 + sg.ny * sg.tr);
    }
    // the bleed: it soaks outward while wet, then stays as a faint halo.
    // over dry ink it hardly spreads — the old layer resists it
    if ((sg.ink > 0.55 || excess > 0) && hash(sg.seed + 99) < 0.5 + excess * 0.4) {
      const r = sg.w * 0.5 * sep + (sg.bleed + sg.spread * 0.6 + excess * 1.2)
                * st.bleedK * (1 - sg.over * 0.6) * k.bleedGrow;
      g.stroke(C[0], C[1], C[2], (7 + excess * 8) * sg.op * st.wet * (0.5 + 0.5 * k.wetness));
      g.strokeWeight(0.5);
      const mx = (sg.x0 + sg.x1) / 2 + sg.nx * sg.tr, my = (sg.y0 + sg.y1) / 2 + sg.ny * sg.tr;
      if (sg.broken > 0.05) {
        const rb = r * (1 + sg.broken * 0.8);
        g.beginShape();
        for (let q = 0; q <= 10; q++) {
          const aq = (q / 10) * TWO_PI;
          const rq = rb * (0.65 + noise(sg.seed + 41, cos(aq) + 2, sin(aq) + 2) * 0.7);
          g.vertex(mx + cos(aq) * rq, my + sin(aq) * rq);
        }
        g.endShape(CLOSE);
      } else {
        g.circle(mx, my, r * 2);
      }
    }
  }
  if (st.C && st.threads) {
    g.strokeWeight(0.3);
    for (const th of st.threads) {
      g.stroke(st.C[0], st.C[1], st.C[2], th.a * st.op * (0.8 + 0.2 * k.wetness));
      g.beginShape();
      for (const p of th.pts) g.vertex(p[0], p[1]);
      g.endShape();
    }
  }
  if (st.C) {
    g.strokeWeight(0.3);
    for (const pts of st.hairs)
      for (let i = 1; i < pts.length; i++) {
        g.stroke(st.C[0], st.C[1], st.C[2], 50 * st.op * (1 - i / pts.length) * (0.85 + 0.15 * k.wetness));
        g.line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
      }
  }
}

// every frame: live strokes are drawn in their current state; the dry ones
// are fixed into field2 and leave the list
function inkAge() {
  const now = simMillis();
  let live = wetStrokes.reduce((p, st) => p + st.segs.length, 0);
  const keep = [];
  for (const st of wetStrokes) {
    const k = inkState(st, now);
    const done = st !== sumi && (k.t >= 10 || live > MAX_LIVE_SEGS);
    if (done) {
      if (field2) renderStroke(field2, st, inkState({ ...st, birth: now - 10000 / st.dryK }, now));
      live -= st.segs.length;
    } else {
      renderStroke(window, st, k);
      keep.push(st);
    }
  }
  wetStrokes = keep;
}

// ── the hand ──────────────────────────────────────────────────────────────
// the feeling in the pen right now: the new hand, mixed with the memory of the
// old one for the first strokes after an impact
const HAND_KEYS = ['energy', 'tension', 'intensity', 'attraction', 'avoidance', 'noise', 'memory', 'forgetting', 'sensitivity', 'orbit', 'deformation'];
function blendHand(a, b, t) {
  if (!a || t >= 1) return b;
  const out = Object.assign({}, b);
  for (const k of HAND_KEYS) out[k] = lerp(a[k], b[k], t);
  return out;
}
function currentHand() {
  const src = penSelf || selfD;
  // eased: the old hand lets go slowly, then all at once
  return blendHand(penPrev, src, penT * penT * (3 - 2 * penT));
}

// ── the pencil's DNA ───────────────────────────────────────────────────────
// 250 feelings, and not one hand-written algorithm. every feeling already has
// coordinates in the engine — arousal, tension, valence, sociality, intensity —
// and those coordinates are read as a body: five ancestors, twelve motions.
function penDNA(d) {
  const arousal = d.energy;
  const tension = d.tension;
  const valence = (d.attraction - d.avoidance + 1) / 2;   // 0 aversive → 1 warm
  const attraction = d.attraction;
  const control = 1 - d.noise;                            // steady → unruly
  const calm = 1 - tension;
  const inten = d.intensity;
  const hesitation = constrain((1 - control) * 0.6 + (1 - valence) * 0.3 - arousal * 0.2, 0, 1);

  // the five ancestors, each from its own source
  const I = constrain(0.1 + control * 0.5 + calm * 0.45, 0, 1);                        // Control + Calm
  const D = constrain(0.05 + tension * 0.5 + inten * 0.45, 0, 1);                      // Tension + Intensity
  const T = constrain(0.05 + arousal * 0.55 + attraction * 0.4, 0, 1);                 // Energy + Attraction
  const K = constrain(inten * 0.55 + d.memory * 0.45, 0, 1);                           // Intensity + Memory
  const W = constrain(d.noise * 0.35 + hesitation * 0.35 + d.forgetting * 0.3, 0.05, 1); // Noise + Hesitation + Forgetting

  return {
    I, D, T, K, W,
    // the twelve micro-movements: how the hand executes, in this moment
    pressure:   constrain(0.1 + tension * 0.5 + inten * 0.3 + d.memory * 0.1, 0, 1),
    speed:      constrain(0.1 + arousal * 0.8, 0, 1),
    continuity: constrain(0.2 + control * 0.6 + calm * 0.3, 0, 1),
    curvature:  constrain(0.2 + valence * 0.6, 0, 1),
    roughness:  constrain(tension * 0.6 + (1 - control) * 0.5, 0, 1),
    repetition: constrain(0.05 + inten * 0.4 + d.memory * 0.5, 0, 1),
    density:    constrain(0.1 + inten * 0.5 + tension * 0.4, 0, 1),
    hesitation,
    pause:      constrain(0.8 - arousal * 0.7, 0, 1),
    length:     constrain(0.2 + control * 0.5 + arousal * 0.3, 0, 1),
    absence:    constrain(d.forgetting * 0.6 + d.noise * 0.3, 0, 1),
    whiteSpace: constrain(0.3 + W * 0.6 - inten * 0.2, 0.05, 1),
    emotion:    constrain(tension * 0.6 + inten * 0.3 + arousal * 0.2, 0, 1),
    tension,
  };
}

// the feeling is not spread evenly over the sheet: it has weather. one corner
// of the paper may be pressed while another is nearly calm.
function emotionFieldAt(x, y) { return sceneFieldAt(x, y).local; }

// one feeling behaves differently in different places of the same image:
//   upper left (toward the light)  → calm, white, I
//   the board's centre             → dense, D + K
//   near the last impact           → pressure, K
//   the path leaving an impact     → flow, T
//   ground already gone over       → silence, W
function sceneFieldAt(x, y) {
  const n = noise(x * 0.0018 + selfD.index * 0.7, y * 0.0018, 31);
  const near = 1 - min(1, dist(x, y, circlePos.x, circlePos.y) / (min(width, height) * 0.45));
  const local = constrain(n * 0.75 + near * 0.45, 0, 1);

  const cx = width / 2, cy = height / 2;
  const light = constrain(1 - dist(x, y, width * 0.18, height * 0.15) / (0.75 * max(width, height)), 0, 1);
  const centre = constrain(1 - dist(x, y, cx, cy) / 220, 0, 1);

  let impact = 0, exit = 0;
  if (lastImpact) {
    const age = frameCount - lastImpact.f;
    const fresh = exp(-age / 90);
    impact = fresh * constrain(1 - dist(x, y, lastImpact.x, lastImpact.y) / 60, 0, 1);
    // the exit path: ahead of the impact, along the direction it was sent
    const dx = x - lastImpact.x, dy = y - lastImpact.y, dl = max(1, mag(dx, dy));
    const along = (dx * cos(lastImpact.a) + dy * sin(lastImpact.a)) / dl;
    exit = exp(-age / 160) * constrain(along, 0, 1) * constrain(1 - dl / 200, 0, 1);
  }
  const key = floor(x / 26) + ',' + floor(y / 26);
  const worn = min(1, (said.get(key) || 0) / 5);

  return {
    local, light, centre, impact, exit, worn,
    I: 1 + light * 0.6 - centre * 0.3,
    D: 1 + centre * 0.7 - light * 0.4,
    T: 1 + exit * 1.2,
    K: 1 + centre * 0.4 + impact * 1.6,
    W: 1 + light * 0.5 + worn * 0.9 - impact * 0.6,
  };
}

// the corner the annotation column is measured from
function sealBox() {
  return { x: width / 2 + 192.5 + 40, y: height / 2 + 192.5 - 34, w: 26, h: 26 };
}


// the transducer: the elements// the transducer: the elements that fire, along the face of the probe

// acquisition: the beam is steered across the sector, line by line
let readoutEnd = 300;

// the depth scale beside the image, the gain curve, and the focal zone

// the beam's own outline: the sector, its depth arcs and its steering guides

// what the instrument draws over its own field — centred on the body it watches,
// and exactly as wide as that body's reach

// the readout, set on the console face

// the name of the feeling, set at the panel's lower right
function label() {
  const R = width / 2 + 192.5;
  const B = height / 2 + 192.5;
  // the cast of this image: each other, its feeling, and where it stands to the self
  const rows = parandehs.map(b => b.dna.name.toUpperCase() + '  ' + b.zone);
  rows.push('');
  rows.push(parandehs.length + ' OTHERS   ' + pairCount(parandehs.length) + ' PAIRS   ' + parandehs.length + ' TO SELF');
  listRows = rows.length;

  push();
  noStroke();
  textFont('Archivo');
  textStyle(NORMAL);
  textSize(7);
  textAlign(LEFT, TOP);
  const LX = R + 52, LY = sealBox().y - 12;
  for (let i = 0; i < rows.length; i++) {
    fill(SUMI[0], SUMI[1], SUMI[2], 120);
    // (متن حذف شد) text(rows[rows.length - 1 - i], LX, LY - i * 9);
  }
  pop();
}

// the panel holds it: hitting an edge reverses the push instead of passing through
function confineCircle() {
  const r = circleRadius / 2;
  const l = width / 2 - 192.5 + r, rt = width / 2 + 192.5 - r;
  const t = height / 2 - 192.5 + r, b = height / 2 + 192.5 - r;
  if (circlePos.x < l) { circlePos.x = l; circleVel.x = abs(circleVel.x) * 0.5; }
  if (circlePos.x > rt) { circlePos.x = rt; circleVel.x = -abs(circleVel.x) * 0.5; }
  if (circlePos.y < t) { circlePos.y = t; circleVel.y = abs(circleVel.y) * 0.5; }
  if (circlePos.y > b) { circlePos.y = b; circleVel.y = -abs(circleVel.y) * 0.5; }
}

// ── the bird — its shape is the original's, its motion is its feeling ─────
class Parandeh {
  constructor(emotionIndex, slot = 0) {
    this.emotion = emotionIndex;
    this.dna = dnaFor(emotionIndex);
    this.d = this.dna;                 // the older name, kept for every caller
    this.slot = slot;
    this.memory = 0;                   // what it has lived in this image
    this.hits = 0;                     // how many times it has struck the self
    this.zone = 'OBSERVE';
    this.relations = [];               // its relation to every other, this frame
    this.toSelf = null;                // its relation to the circle, this frame

    // the others enter from around the board, spread so none starts on another
    const a = (slot / 5) * TWO_PI + random(-0.4, 0.4);
    const r = 192.5 + random(60, 160);
    this.pos = createVector(width / 2 + cos(a) * r, height / 2 + sin(a) * r);
    this.vel = p5.Vector.random2D().mult(random(0.6, 1.6));
    this.acc = createVector(0, 0);
    this.size = 7 + this.dna.intensity * 8;
    this.angle = random(TWO_PI);
    this.ph = random(1000);
    this.spin = random() < 0.5 ? 1 : -1;
    this.touched = 0;
    this.ink = null;   // until it has struck the disc, it draws in its own colour
    this.controlPoints = [this.pos];
    for (let i = 0; i < 4; i++) this.controlPoints.push(createVector(random(0, width), random(0, height)));
  }

  // ── Bird ↔ Circle ──────────────────────────────────────────────────────
  relationToCircle() {
    const d = this.dna;
    const dx = circlePos.x - this.pos.x, dy = circlePos.y - this.pos.y;
    const distance = max(1, mag(dx, dy));
    const raw = constrain(1 - distance / (min(width, height) * 0.5), 0, 1);
    const near = pow(raw, d.sensitivity);
    let want = valence(d);
    if (d.social === 'attack') want = near > 0.5 ? 1 : want;
    else if (d.social === 'flee') want = -1;
    else if (d.social === 'hide') want = near > 0.3 ? -0.8 : 0;
    else if (d.social === 'inspect') want = near > 0.62 ? -0.35 : 0.5;
    else if (d.social === 'withdraw') want = min(want, 0) - near * 0.3;
    else if (d.social === 'independent') want *= 0.35;
    // the self answers back: a feeling close to the self's own is easier to approach
    const affinity = 1 - conflictBetween(d, selfD);
    return { distance, ux: dx / distance, uy: dy / distance, near, want, affinity };
  }

  // ── Bird ↔ Bird ────────────────────────────────────────────────────────
  // every pair is related at any distance; nearness only scales how strongly
  relationToBird(o) {
    const d = this.dna;
    const ox = o.pos.x - this.pos.x, oy = o.pos.y - this.pos.y;
    const od = max(0.001, mag(ox, oy));
    const prox = constrain(1 - od / 320, 0, 1);
    const conflict = conflictBetween(d, o.dna);
    const kin = d.family === o.dna.family ? 1 : 0;
    // what it wants from this other: draw near if they agree, pull away if they clash
    const want = (1 - conflict) * (0.4 + d.attraction) - conflict * (0.4 + d.avoidance) + kin * 0.3;
    return { other: o, dist: od, ux: ox / od, uy: oy / od, prox, conflict, want };
  }

  applyCircleEmotion(c) {
    const d = this.dna;
    const k = 1 / sqrt(parandehs.length);
    const w = c.want * (0.6 + c.affinity * 0.4);
    this.vel.x += c.ux * w * c.near * 0.5 * k;
    this.vel.y += c.uy * w * c.near * 0.5 * k;
    if (d.social === 'play' || d.social === 'connect') {
      this.vel.x += -c.uy * this.spin * 0.25 * c.near;
      this.vel.y += c.ux * this.spin * 0.25 * c.near;
    }
    if (d.social === 'correct') {
      this.vel.x += (width / 2 - this.pos.x) * 0.0006;
      this.vel.y += (height / 2 - this.pos.y) * 0.0006;
    }
    this.vel.x += -c.uy * this.spin * d.orbit * c.near * 0.6;
    this.vel.y += c.ux * this.spin * d.orbit * c.near * 0.6;
  }

  applySocialEmotion(rels) {
    const d = this.dna;
    for (const r of rels) {
      const pull = r.want * (0.015 + r.prox * 0.08);
      this.vel.x += r.ux * pull;
      this.vel.y += r.uy * pull;
      // it falls into step only with those it agrees with, as much as it orbits
      const al = min(d.orbit, r.other.dna.orbit) * r.prox * 0.3 * (1 - r.conflict);
      this.vel.x += (r.other.vel.x - this.vel.x) * al;
      this.vel.y += (r.other.vel.y - this.vel.y) * al;
      // its own room, wider the more tense it is and the more they clash
      const room = 10 + d.tension * 26 + r.conflict * 24;
      if (r.dist < room) {
        const push = (1 - r.dist / room) * (0.2 + d.tension * 0.8);
        this.vel.x -= r.ux * push;
        this.vel.y -= r.uy * push;
      }
      // a touch: the tense one is thrown off course, the calm one absorbs it
      if (r.dist < (this.size + r.other.size) * 0.5) {
        this.vel.rotate(random(-PI / 6, PI / 6) * (0.2 + d.tension * 1.6));
        this.touched = 6;
        this.memory = min(1, this.memory + 0.02 * (0.5 + r.conflict));
      }
    }
  }

  // memory rises with what happens to it and fades at its own forgetting rate
  updateMemory() {
    const d = this.dna;
    if (this.inside) this.memory = min(1, this.memory + 0.004 * d.memory);
    this.memory = max(0, this.memory - d.forgetting * 0.0015);
  }

  // where it stands toward the self
  updateZone() {
    const c = this.toSelf;
    if (!c) return;
    const approaching = (this.vel.x * c.ux + this.vel.y * c.uy) > 0.15;
    if (c.distance < circleRadius) this.zone = 'CONTACT';
    else if (c.near > 0.55) this.zone = approaching ? 'ENGAGE' : 'RETREAT';
    else if (c.near > 0.2) this.zone = approaching ? 'APPROACH' : 'RETREAT';
    else this.zone = 'OBSERVE';
  }

  // the body: speed from energy; the size swells a little with what it remembers
  updateBody() {
    const d = this.dna;
    const lim = 0.6 + d.energy * 2.4;
    if (this.vel.mag() > lim) this.vel.setMag(lim);
    if (window.__hartTurn) this.vel.rotate(window.__hartTurn * (this.slot % 2 ? 1 : -0.7)); // جهت حرکت پرنده‌ها ← صدا
    this.vel.mult(0.985);
    this.pos.add(this.vel);
    this.bodySize = this.size * (1 + this.memory * 0.35);
    // with so few others, none is allowed to drift off the sheet
    const m = 30;
    if (this.pos.x < m) this.vel.x += 0.08;
    if (this.pos.x > width - m) this.vel.x -= 0.08;
    if (this.pos.y < m) this.vel.y += 0.08;
    if (this.pos.y > height - m) this.vel.y -= 0.08;
  }

  // a strike turns it to the next colour of its OWN palette
  updateColor() {
    if (this.hits === this.colorHits) return;
    this.colorHits = this.hits;
    if (!this.hits) return;
    const own = this.dna.paletteInks;
    this.inkStep = ((this.inkStep ?? own.indexOf(this.dna.paletteInk)) + 1) % own.length;
    this.ink = own[this.inkStep];
  }

  updates() {
    this.toSelf = this.relationToCircle();
    this.relations = parandehs.filter(o => o !== this).map(o => this.relationToBird(o));
    this.applyCircleEmotion(this.toSelf);
    this.applySocialEmotion(this.relations);
    // the irregularity of its path
    this.vel.x += (noise(this.ph, frameCount * 0.01) - 0.5) * this.dna.noise * 0.7;
    this.vel.y += (noise(this.ph + 40, frameCount * 0.01) - 0.5) * this.dna.noise * 0.7;
    if (this.touched > 0) this.touched--;
    this.updateMemory();
    this.updateZone();
    this.updateBody();
    this.updateColor();
    this.updateControlPoints();
  }

  updateControlPoints() {
    for (let i = 1; i < this.controlPoints.length - 1; i++) {
      const cp = this.controlPoints[i];
      cp.add(this.vel);
      cp.x = constrain(cp.x, 0, width);
      cp.y = constrain(cp.y, 0, height);
    }
  }

  // ⚠ نمایش پرنده: ادامهٔ کلاس در متنی که فرستادی بریده شده بود.
  // این موقت است تا کد اصلیِ displays() را بفرستی.
  displays() {
    const d = this.d;
    const loud = d.tension > 0.75 || d.energy > 0.8;
    const a = 55 + d.intensity * 165;
    // which pen was in the carriage when this one was drawn
    // the bird's colour comes from its own palette: the base ink, then whichever
    // member of that same palette the last strike turned it to
    const ink = this.ink || d.paletteInk;

    // the exposure is written first, so the trail runs past the frame's edge
    if (this.prevE && field2) {
      const dd = dist(this.pos.x, this.pos.y, this.prevE.x, this.prevE.y);
      const insideFrame = abs(this.pos.x - width / 2) < 192.5 && abs(this.pos.y - height / 2) < 192.5;
      const wasInside = abs(this.prevE.x - width / 2) < 192.5 && abs(this.prevE.y - height / 2) < 192.5;
      // the frame keeps no trace: the exposure is written only outside it
      const overText = inAnnotation(this.pos.x, this.pos.y) || inAnnotation(this.prevE.x, this.prevE.y);
      if (dd > 0.01 && dd < 40 && !insideFrame && !wasInside && !overText) {
        // the trace stays on the sheet, and it is dark enough to read
        field2.stroke(ink[0], ink[1], ink[2], 26 + d.memory * 60);
        field2.strokeWeight(0.6);
        field2.line(this.prevE.x, this.prevE.y, this.pos.x, this.pos.y);
      }
    }
    this.prevE = { x: this.pos.x, y: this.pos.y };

    // the annotations are not drawn into
    if (inAnnotation(this.pos.x, this.pos.y)) return;

    push();
    translate(this.pos.x, this.pos.y);

    const s2 = (this.bodySize || this.size) * (0.5 + d.intensity * 0.9);

    // the body: a small hollow circle, a hairline only
    noFill();
    stroke(ink[0], ink[1], ink[2], a);
    strokeWeight(0.6);
    circle(0, 0, s2);
    if (this.touched > 0) {
      stroke(ACCENT[0], ACCENT[1], ACCENT[2], 40 + this.touched * 30);
      circle(0, 0, s2 + 6);
    }

    pop();

  }
}

// ── controls ──────────────────────────────────────────────────────────────
function keyPressed() {
  if (keyCode === RIGHT_ARROW) setEmotion(selfD.index + 1);
  if (keyCode === LEFT_ARROW) setEmotion(selfD.index - 1);
  if (keyCode === UP_ARROW) setEmotion((selfD.family + 1) * 25);
  if (keyCode === DOWN_ARROW) setEmotion((selfD.family - 1) * 25);
  if (key === 'n' || key === 'N') reseed();
  if (key === 'r' || key === 'R') toggleRecord();
  if (key === 'x' || key === 'X') hartSpeed = hartSpeed === 1 ? 10 : 1;
}

// ── R: record one minute of the canvas to a WebM file ─────────────────────
let rec = null;
function toggleRecord() {
  if (rec) { rec.stop(); return; }
  const cv = document.querySelector('canvas.p5Canvas') || document.querySelector('canvas');
  if (!cv || !cv.captureStream || typeof MediaRecorder === 'undefined') { console.warn('recording is not supported in this browser'); return; }
  const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
  const mime = types.find(t => MediaRecorder.isTypeSupported(t)) || '';
  const mr = new MediaRecorder(cv.captureStream(60), mime ? { mimeType: mime, videoBitsPerSecond: 12e6 } : {});
  const chunks = [];
  mr.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  mr.onstop = () => {
    clearTimeout(rec && rec.timer);
    const ext = (mr.mimeType || mime).includes('mp4') ? 'mp4' : 'webm';
    const blob = new Blob(chunks, { type: mr.mimeType || 'video/webm' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'hart-' + nf(selfD.index + 1, 3) + '-' + selfD.name.toLowerCase() + (hartSpeed > 1 ? '-x10' : '') + '.' + ext;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    rec = null;
  };
  mr.start(1000);
  rec = { mr, start: performance.now(), stop: () => mr.state !== 'inactive' && mr.stop() };
  rec.timer = setTimeout(() => rec && rec.stop(), 60000);
}

// a small mark while recording or running fast — drawn on top, outside the frame
function recIndicator() {
  if (!rec && hartSpeed === 1) return;
  push();
  noStroke();
  textFont('Archivo');
  textSize(9);
  textAlign(LEFT, TOP);
  let x = 40;
  if (rec) {
    const t = (performance.now() - rec.start) / 1000;
    fill(236, 48, 19);
    circle(x + 4, 40, 7);
    fill(32, 30, 29);
    // (متن حذف شد) text('REC ' + nf(floor(t / 60), 2) + ':' + nf(floor(t % 60), 2) + ' / 01:00', x + 14, 35);
    x += 110;
  }
  if (hartSpeed > 1) { fill(32, 30, 29); /* متن حذف شد */ }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (paper) { paper.remove(); paper = null; }
  if (field2) { field2.remove(); field2 = null; }
  makePaper();
  makeControlPoints();
}

function publish() {
  window.__EMOTION__ = {
    index: selfD.index, name: selfD.name, family: selfD.familyName, birds: parandehs.length,
    others: parandehs.map(b => ({ index: b.emotion, name: b.dna.name, zone: b.zone, hits: b.hits, memory: +b.memory.toFixed(2) })),
    pairs: pairCount(parandehs.length),
    field: field ? { contradiction: +field.contradiction.toFixed(3), socialConflict: +field.socialConflict.toFixed(3) } : null,
  };
}

// ── helpers ───────────────────────────────────────────────────────────────
function angDiff(a, b) { let d = a - b; while (d > PI) d -= TWO_PI; while (d < -PI) d += TWO_PI; return d; }
function hash(n) { const x = sin(n) * 43758.5453; return x - floor(x); }
function clamp(v, a, b) { return min(b, max(a, v)); }
function sd(a) { const m = a.reduce((p, c) => p + c, 0) / a.length;
                 return sqrt(a.reduce((p, c) => p + (c - m) * (c - m), 0) / a.length); }
