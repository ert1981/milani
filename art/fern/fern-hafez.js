/* fern-hafez.js — پالت‌های رنگ «سرخس» در گروکلی
   پالت‌های «نقش‌خط حافظ» (palet-hafez): ۴۰ تمپلت گبه و جاجیم و گلیم، ۱۳ پالت Anticyclone و ۳ رشتهٔ ابریشم
   (نیلی، لاکی، مشکی) با رنگ‌های گیاهی — داده‌ها همان داده‌های app/art/emotions/emo-hafez.js است.
   قانون:
   • کد پیش‌فرض گروکلی (0x6d696c616e69617274652d6772 و ۳۸ صفر) و کد پیش‌فرض خود اثر (0x7abb…) → همان رنگ‌های اصلی اثر، بی‌هیچ تغییر.
   • هر کد دیگر (Generate) → از روی خودِ هش (نه از رشتهٔ تصادفی hl) یکی از این‌ها انتخاب می‌شود:
       ۵۰٪ یکی از ۵۶ پالت حافظ، ۳۰٪ یکی از زیرپالت‌های خود اثر، ۲۰٪ همان ترکیب کامل اصلی.
     چون رشتهٔ تصادفی اثر مصرف نمی‌شود و randomElement همیشه همان تعداد عدد تصادفی برمی‌دارد،
     جای ذره‌ها و ترکیب‌بندی هر کد ثابت می‌ماند و فقط رنگ عوض می‌شود. */
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
  var hex = function (c) { return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join(''); };
  var LIST = [];
  TEXTILE.forEach(function (t) { LIST.push({ name: t[0], cols: t[1].split(' ').map(function (k) { return hex(DYE[k]); }) }); });
  ORIGINALS.forEach(function (o, i) { LIST.push({ name: 'Anticyclone o' + i, cols: o.map(hex) }); });
  Object.keys(SILK).forEach(function (k) { LIST.push({ name: k, cols: SILK[k].map(hex) }); });

  // زیرپالت‌های خود اثر: آرایهٔ بلند colors در sketch.js از کنار هم گذاشتن همین چند پالت ساخته شده است
  var OWN = [
    { name: 'fern · lavender coral', cols: ['#52489c', '#4062bb', '#59c3c3', '#ebebeb', '#f45b69', '#454545'] },
    { name: 'fern · sea glass', cols: ['#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'] },
    { name: 'fern · ocean', cols: ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00B4D8', '#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8'] },
    { name: 'fern · neon', cols: ['#FFBE0B', '#FB5607', '#FF006E', '#3A86FF', '#F72585', '#3A0CA3', '#4361EE', '#4CC9F0'] },
    { name: 'fern · clay garden', cols: ['#817c77', '#403b3f', '#cd4446', '#f2bc45', '#e9e0d6', '#2fa494', '#87a4aa', '#bbd7c9', '#c8958b', '#e2c48c', '#efb4a5', '#396c68', '#89e3b7', '#f59647', '#d63644', '#893f49', '#4d3240'] },
    { name: 'fern · spectrum', cols: ['#fd3741', '#fe4f11', '#ff6800', '#ffa61a', '#ffc219', '#ffd114', '#fcd82e', '#f4d730', '#ced562', '#8ac38f', '#79b7a0', '#72b5b1', '#5b9bae', '#6ba1b7', '#49619d', '#604791', '#721e7f', '#9b2b77', '#ab2562', '#ca2847'] },
    { name: 'fern · frost', cols: ['#1c344a', '#325e86', '#c4d7e9', '#fdfeff', '#cee7f3', '#2c89b5', '#689aa2', '#d4d5c7', '#bac3b7', '#a0b3ab', '#87a3a0'] },
    { name: 'fern · ember', cols: ['#03045e', '#023e8a', '#0077b6', '#f55200', '#ff6d00', '#ff8500', '#ff9100', '#ff9e00'] },
    { name: 'fern · rose', cols: ['#590d22', '#800f2f', '#a4133c', '#c9184a', '#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5', '#e05780', '#b9375e', '#8a2846', '#602437', '#522e38'] }
  ];

  var h = (new URLSearchParams(location.search).get('h') || '').toLowerCase();
  var ORIGINAL_SEEDS = ['0x6d696c616e69617274652d6772' + '0'.repeat(38), '0x7abb6c6bbd05bd54ed0e58da98dbebea82592c899bd4a43cd5fd1d107511f0c2'];
  var pick = null;
  if (/^0x[0-9a-f]{64}$/.test(h) && ORIGINAL_SEEDS.indexOf(h) < 0) {
    // درهم‌سازی خود هش با نمک «fern» تا انتخاب رنگ با اثرهای دیگر هم‌بسته نباشد
    var x = 2166136261 >>> 0, s = 'fern|' + h;
    for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619) >>> 0; }
    var y = Math.imul(x ^ (x >>> 15), 2246822507) >>> 0; y = (y ^ (y >>> 13)) >>> 0;
    var r = x % 10;
    if (r < 5) pick = LIST[y % LIST.length];
    else if (r < 8) pick = OWN[y % OWN.length];
    // r = 8, 9 → ترکیب کامل اصلی (pick = null)
  }
  window.FERN_PALETTE = {
    list: LIST, own: OWN, pick: pick,
    // قلاب sketch.js: آرایهٔ اصلی را می‌گیرد و یا همان را برمی‌گرداند یا پالت انتخاب‌شده را
    apply: function (orig) { return pick ? pick.cols.slice() : orig; }
  };
})();
