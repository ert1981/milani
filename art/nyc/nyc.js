// NYC Generative Cover Studio: core + 72 engines in one file, for Milani (art/nyc/index.html runs one template as a Milani artwork).
// Source: nyc-cover-sketches (core/core.js + engines/*.js); only change: no localStorage (the frames share the site's origin).

/* NYC Generative Cover Studio · core library
   Shared by every sketch: palettes, typefaces, sample text, the 270 template definitions,
   noise, text fitting, the text-motion system, photo duotone, the code mixer, voice analysis,
   the WebGL shader runner, the 20 text layouts and render(). Each engine lives in engines/<name>.js.
   Load order in a sketch: core.js, then the engine files, then runSketch(index). */
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=x=>{x=clamp(x);return 1-Math.pow(1-x,3);};
/* ---------- palettes ---------- */
const PAL={
 lajvard:{n:'Hudson Navy',bg:'#152a6b',ink:'#f4ead2',acc:'#e0a83e',soft:'#3550a8'},
 firouzeh:{n:'Liberty Patina',bg:'#3f8f7f',ink:'#f4f1e6',acc:'#f0b33a',soft:'#5aa594'},
 anar:{n:'Red Brick',bg:'#9a3324',ink:'#fbeadc',acc:'#f6c06b',soft:'#b44a38'},
 zafaran:{n:'Taxi',bg:'#f7c31f',ink:'#111111',acc:'#d22d1e',soft:'#e2ac10'},
 kaghaz:{n:'Newsstand',bg:'#e9e4d8',ink:'#1b1a19',acc:'#d1442e',soft:'#c4bcab'},
 shab:{n:'Late Night',bg:'#11151b',ink:'#e8edf2',acc:'#ff5b37',soft:'#2c3540'},
 khabar:{n:'Tabloid',bg:'#f4f3ef',ink:'#121212',acc:'#de1f2c',soft:'#d6d4cc'},
 nana:{n:'Central Park',bg:'#c6e6d3',ink:'#0f2b21',acc:'#e2482c',soft:'#97c9ad'},
 yas:{n:'Chelsea Gallery',bg:'#d6cef1',ink:'#1c1542',acc:'#e8640f',soft:'#b0a3e4'},
 kobalt:{n:'Express',bg:'#1e45f5',ink:'#ffffff',acc:'#ffd200',soft:'#3f61f8'},
 golsorkh:{n:'Bakery Box',bg:'#f2c4bf',ink:'#3a0e16',acc:'#1c4bd4',soft:'#e5a29a'},
 zeytun:{n:'Fire Escape',bg:'#2b302e',ink:'#f1e9da',acc:'#e2552d',soft:'#444b48'},
 shen:{n:'Brownstone',bg:'#7d4f35',ink:'#f6ead8',acc:'#f2b134',soft:'#94634a'},
 darya:{n:'East River',bg:'#08353b',ink:'#e6f5f1',acc:'#f2584f',soft:'#155760'}
};
const FONTS={
 anton:{n:'Anton',fam:'"Anton"',w:400,up:true},
 shoulders:{n:'Big Shoulders',fam:'"Big Shoulders Display"',w:900,up:true},
 unbounded:{n:'Unbounded',fam:'"Unbounded"',w:800,up:false},
 syne:{n:'Syne',fam:'"Syne"',w:800,up:false},
 fraunces:{n:'Fraunces',fam:'"Fraunces"',w:900,up:false},
 dmserif:{n:'DM Serif Display',fam:'"DM Serif Display"',w:400,up:false},
 archivo:{n:'Archivo Black',fam:'"Archivo Black"',w:400,up:false},
 press2p:{n:'Press Start 2P',fam:'"Press Start 2P"',w:400,up:true},
 silkscreen:{n:'Silkscreen',fam:'"Silkscreen"',w:700,up:true},
 vt323:{n:'VT323',fam:'"VT323"',w:400,up:false}
};
const fontStr=(F,s)=>`${F.w} ${Math.round(s*10)/10}px ${F.fam}, "Hanken Grotesk", system-ui, sans-serif`;
const UI=(w,s)=>`${w} ${Math.round(s*10)/10}px "Hanken Grotesk", system-ui, sans-serif`;
const U=(e,s)=>e.F.up?String(s||'').toUpperCase():String(s||'');
/* ---------- shared text ---------- */
const FIELDS=[
 ['show','Show or channel name','Five Borough Radio'],
 ['title','Episode title (interview)','Coding Art in a Brooklyn Studio'],
 ['guest','Guest name','Maya Chen'],
 ['role','Guest description','Creative coder, Bushwick'],
 ['ep','Episode number','24'],
 ['headline','News headline','Generative art festival opens on the Lower East Side'],
 ['kicker','News label','Breaking'],
 ['date','Date and time','Fri, Oct 30 · 8 PM ET'],
 ['artist','Artist','Nora Vale'],
 ['track','Song or album title','Glass River'],
 ['album','Album or credit line','From the album Low Tide'],
 ['release','Release date','Out Nov 6'],
 ['single','Music label','New Single'],
 ['mvLabel','Video label','Official Music Video']
];
const FIELD_BY_TAG={interview:['show','title','guest','role','ep'],news:['show','headline','kicker','date'],music:['artist','track','album','single','release'],mv:['artist','track','mvLabel','release','album']};
/* ---------- templates ---------- */
const ENG_NAME={tileShift:'Kinetic Slices',dotType:'Dot Type',asciiField:'Letter Field',waveRows:'Wave Rows',ringText:'Word Rings',flowLines:'Flow',halftone:'Halftone Sun',waveBars:'Spectrum',ridgeLines:'Ridgelines',contour:'Contours',truchet:'Truchet',streetGrid:'Street Grid',echoStack:'Echo Headline',tickerBands:'Ticker',sunburst:'Breaking Rays',orbits:'Orbits',glitchScan:'Interference',skyline:'Skyline',mosaicBlocks:'Blocks',dripType:'Drip Type',typeGrid:'Letter Grid',spiralText:'Spiral Type',stretchType:'Accordion',swarm:'Swarm',signalBars:'Signal Bars',target:'Target',waveMesh:'Wave Mesh',packing:'Circle Pack',transitLines:'Transit Lines',wordRain:'Word Rain',venetian:'Blinds',ledBoard:'LED Board',blob:'Blob',splitFlap:'Split-Flap',typeWave:'Type Wave',tunnel:'Type Tunnel',cylinder:'Cylinder',needles:'Needles',liquid:'Liquid Type',spotlight:'Spotlight',carousel:'Carousel',droste:'Droste Frames',trails:'Echo Trails',bounce:'Bounce',ribbon:'Ribbons',statement:'Statement',rippleType:'Ripple Type',letterGlobe:'Letter Globe',scanner:'Scanner',audiogram:'Audiogram',radialSpectrum:'Radial Spectrum',speakerSplit:'Speaker Split',voiceType:'Voice Type',voiceBlob:'Voice Blob',dungeon:'Roguelike Dungeon',caves:'Cellular Caves',terrain:'Island Terrain',platformer:'Platformer Run',raycaster:'Raycaster Corridor',boids:'Boids Flock',astar:'A* Search',towerDefense:'Tower Defense',match3:'Match-3',cardHand:'Card Hand',letterPhysics:'Physics Letters',particles:'Fireworks',pixelSprites:'Pixel Invaders',isoVoxel:'Voxel City',parallax:'Parallax Run',breakout:'Breakout Type'};
const LAY_NAME={yt_hud:'Game HUD',sq_hud:'Game HUD',yt_vn:'Visual Novel',yt_title:'Title Screen',sq_cart:'Game Box',sq_card:'Trading Card',yt_mv:'Music Video',sq_album:'Album',yt_hero:'Headline',yt_center:'Panel',yt_split:'Guest',yt_news:'Lower Third',yt_stack:'Minimal',sq_top:'Episode',sq_center:'Disc',sq_photo:'Guest',sq_news:'Bulletin',sq_bottom:'Headline',sq_min:'Minimal',yt_quote:'Quote',sq_quote:'Quote',yt_frame:'Frame',sq_frame:'Frame',yt_bigep:'Big Episode',yt_band:'Tape',sq_band:'Tape'};
const RAW=[
 ['yt','tileShift','yt_hero','interview','lajvard','anton','Interview'],
 ['yt','dotType','yt_hero','interview','shab','unbounded','show'],
 ['yt','asciiField','yt_news','news','khabar','shoulders','NEWS'],
 ['yt','waveRows','yt_center','interview','zafaran','syne','show'],
 ['yt','ringText','yt_split','interview','kaghaz','fraunces','title'],
 ['yt','flowLines','yt_center','interview','darya','dmserif',''],
 ['yt','halftone','yt_news','news','kobalt','archivo',''],
 ['yt','waveBars','yt_split','interview','anar','anton',''],
 ['yt','ridgeLines','yt_hero','news','shen','shoulders',''],
 ['yt','contour','yt_split','interview','nana','unbounded',''],
 ['yt','truchet','yt_news','news','golsorkh','archivo',''],
 ['yt','streetGrid','yt_hero','interview','firouzeh','fraunces',''],
 ['yt','echoStack','yt_stack','news','kaghaz','shoulders','headline'],
 ['yt','tickerBands','yt_news','news','shab','archivo','headline'],
 ['yt','sunburst','yt_center','news','anar','anton',''],
 ['yt','orbits','yt_split','interview','yas','unbounded',''],
 ['yt','glitchScan','yt_hero','news','darya','shoulders','NEWS'],
 ['yt','skyline','yt_center','interview','zeytun','dmserif',''],
 ['yt','mosaicBlocks','yt_news','news','zafaran','anton',''],
 ['yt','dripType','yt_hero','interview','kobalt','syne','show'],
 ['sq','tileShift','sq_bottom','interview','zafaran','anton','show'],
 ['sq','dotType','sq_top','interview','lajvard','unbounded','PODCAST'],
 ['sq','asciiField','sq_news','news','shab','shoulders','NYC'],
 ['sq','waveRows','sq_center','interview','nana','syne','show'],
 ['sq','ringText','sq_photo','interview','anar','fraunces','title'],
 ['sq','flowLines','sq_top','interview','kaghaz','dmserif',''],
 ['sq','halftone','sq_news','news','golsorkh','archivo',''],
 ['sq','waveBars','sq_top','interview','kobalt','anton',''],
 ['sq','ridgeLines','sq_bottom','interview','shab','unbounded',''],
 ['sq','contour','sq_photo','interview','shen','unbounded',''],
 ['sq','truchet','sq_center','news','darya','archivo',''],
 ['sq','streetGrid','sq_center','interview','lajvard','fraunces',''],
 ['sq','echoStack','sq_min','news','khabar','shoulders','headline'],
 ['sq','tickerBands','sq_min','news','anar','archivo','headline'],
 ['sq','sunburst','sq_news','news','zafaran','anton',''],
 ['sq','orbits','sq_photo','interview','darya','unbounded',''],
 ['sq','glitchScan','sq_bottom','news','kobalt','shoulders','NEWS'],
 ['sq','skyline','sq_center','interview','kaghaz','dmserif',''],
 ['sq','mosaicBlocks','sq_top','interview','yas','anton',''],
 ['sq','dripType','sq_bottom','interview','zeytun','syne','show'],
 ['yt','typeGrid','yt_frame','interview','lajvard','anton','show'],
 ['yt','spiralText','yt_quote','interview','kaghaz','fraunces','title'],
 ['yt','stretchType','yt_hero','news','zafaran','anton','NEWS'],
 ['yt','swarm','yt_bigep','interview','shab','syne','show'],
 ['yt','signalBars','yt_band','news','khabar','shoulders',''],
 ['yt','target','yt_center','interview','anar','unbounded',''],
 ['yt','waveMesh','yt_quote','interview','darya','dmserif',''],
 ['yt','packing','yt_hero','interview','golsorkh','syne','show'],
 ['yt','transitLines','yt_news','news','kaghaz','archivo',''],
 ['yt','wordRain','yt_band','news','shab','shoulders','NEWS'],
 ['yt','venetian','yt_hero','interview','kobalt','anton','Interview'],
 ['yt','ledBoard','yt_frame','news','shab','archivo','headline'],
 ['yt','blob','yt_split','interview','nana','fraunces',''],
 ['yt','streetGrid','yt_band','news','zafaran','archivo',''],
 ['yt','skyline','yt_bigep','interview','lajvard','anton',''],
 ['yt','dotType','yt_quote','interview','yas','unbounded','Q&A'],
 ['yt','tileShift','yt_band','news','anar','shoulders','NEWS'],
 ['yt','flowLines','yt_frame','interview','zeytun','dmserif',''],
 ['yt','echoStack','yt_frame','news','golsorkh','shoulders','kicker'],
 ['yt','halftone','yt_bigep','interview','firouzeh','syne',''],
 ['yt','contour','yt_quote','interview','shen','fraunces',''],
 ['yt','orbits','yt_frame','interview','darya','unbounded',''],
 ['yt','typeGrid','yt_news','news','khabar','archivo','NYC'],
 ['yt','swarm','yt_hero','news','kobalt','shoulders','NEWS'],
 ['yt','transitLines','yt_split','interview','firouzeh','syne',''],
 ['sq','typeGrid','sq_frame','interview','zafaran','anton','show'],
 ['sq','spiralText','sq_photo','interview','lajvard','fraunces','show'],
 ['sq','stretchType','sq_bottom','interview','kobalt','anton','PODCAST'],
 ['sq','swarm','sq_top','interview','shab','syne','NYC'],
 ['sq','signalBars','sq_band','news','khabar','shoulders',''],
 ['sq','target','sq_center','interview','anar','unbounded',''],
 ['sq','waveMesh','sq_quote','interview','darya','dmserif',''],
 ['sq','packing','sq_bottom','interview','golsorkh','syne','show'],
 ['sq','transitLines','sq_news','news','kaghaz','archivo',''],
 ['sq','wordRain','sq_band','news','shab','shoulders','NEWS'],
 ['sq','venetian','sq_top','interview','yas','anton','Q&A'],
 ['sq','ledBoard','sq_frame','news','shab','archivo','headline'],
 ['sq','blob','sq_photo','interview','nana','fraunces',''],
 ['sq','streetGrid','sq_band','news','zafaran','archivo',''],
 ['sq','skyline','sq_frame','interview','lajvard','anton',''],
 ['sq','dotType','sq_quote','interview','firouzeh','unbounded','Q&A'],
 ['sq','ridgeLines','sq_frame','interview','zeytun','syne',''],
 ['sq','waveBars','sq_band','news','anar','shoulders',''],
 ['sq','asciiField','sq_bottom','interview','shen','shoulders','show'],
 ['sq','halftone','sq_quote','interview','golsorkh','fraunces',''],
 ['sq','truchet','sq_frame','interview','kobalt','unbounded',''],
 ['sq','glitchScan','sq_top','news','darya','shoulders','NYC'],
 ['sq','mosaicBlocks','sq_band','news','kaghaz','anton',''],
 ['sq','typeGrid','sq_news','news','khabar','shoulders','NEWS'],
 ['sq','sunburst','sq_quote','interview','zafaran','dmserif',''],
 ['yt','splitFlap','yt_stack','news','shab','archivo','','flap'],
 ['yt','typeWave','yt_hero','interview','zafaran','anton','show','rise'],
 ['yt','tunnel','yt_center','interview','shab','unbounded','show','blur'],
 ['yt','cylinder','yt_quote','interview','kaghaz','fraunces','Interview','type'],
 ['yt','needles','yt_frame','interview','darya','syne','','wipe'],
 ['yt','liquid','yt_hero','news','kobalt','shoulders','NEWS','scramble'],
 ['yt','spotlight','yt_bigep','interview','shab','dmserif','show','spot'],
 ['yt','carousel','yt_center','interview','yas','unbounded','title','blur'],
 ['yt','droste','yt_band','news','zafaran','anton','NEWS','flap'],
 ['yt','trails','yt_hero','interview','golsorkh','syne','show','blur'],
 ['yt','bounce','yt_frame','interview','nana','archivo','show','rise'],
 ['yt','ribbon','yt_news','news','kaghaz','archivo','headline','type'],
 ['yt','statement','yt_stack','interview','shab','fraunces','title','blur'],
 ['yt','rippleType','yt_quote','interview','firouzeh','shoulders','show','type'],
 ['yt','letterGlobe','yt_bigep','interview','lajvard','unbounded','NYC','scramble'],
 ['yt','scanner','yt_hero','news','shab','shoulders','NEWS','scramble'],
 ['yt','splitFlap','yt_news','news','lajvard','archivo','','flap'],
 ['yt','tunnel','yt_band','news','anar','anton','kicker','wipe'],
 ['yt','typeWave','yt_center','interview','kobalt','syne','show','type'],
 ['yt','cylinder','yt_frame','news','darya','shoulders','NEWS','scramble'],
 ['yt','spotlight','yt_frame','interview','zeytun','fraunces','show','spot'],
 ['yt','trails','yt_news','news','golsorkh','shoulders','NYC','wipe'],
 ['yt','liquid','yt_bigep','interview','shen','anton','show','rise'],
 ['yt','ribbon','yt_split','interview','nana','dmserif','show','blur'],
 ['yt','dotType','yt_hero','interview','shab','unbounded','show','scramble'],
 ['sq','splitFlap','sq_min','news','shab','archivo','','flap'],
 ['sq','typeWave','sq_bottom','interview','zafaran','anton','show','rise'],
 ['sq','tunnel','sq_center','interview','shab','unbounded','PODCAST','blur'],
 ['sq','cylinder','sq_top','interview','kaghaz','fraunces','show','type'],
 ['sq','needles','sq_quote','interview','darya','syne','','wipe'],
 ['sq','liquid','sq_bottom','news','kobalt','shoulders','NEWS','scramble'],
 ['sq','spotlight','sq_frame','interview','shab','dmserif','show','spot'],
 ['sq','carousel','sq_top','interview','yas','unbounded','show','blur'],
 ['sq','droste','sq_band','news','zafaran','anton','NYC','flap'],
 ['sq','trails','sq_center','interview','golsorkh','syne','show','blur'],
 ['sq','bounce','sq_bottom','interview','nana','archivo','PODCAST','rise'],
 ['sq','ribbon','sq_news','news','kaghaz','archivo','headline','type'],
 ['sq','statement','sq_min','interview','shab','fraunces','title','blur'],
 ['sq','rippleType','sq_quote','interview','firouzeh','shoulders','show','type'],
 ['sq','letterGlobe','sq_top','interview','lajvard','unbounded','NYC','scramble'],
 ['sq','scanner','sq_top','news','shab','shoulders','NEWS','scramble'],
 ['sq','splitFlap','sq_news','news','lajvard','archivo','','flap'],
 ['sq','bounce','sq_frame','news','anar','anton','NEWS','wipe'],
 ['sq','typeWave','sq_center','interview','kobalt','syne','show','type'],
 ['sq','cylinder','sq_bottom','news','darya','shoulders','NEWS','scramble'],
 ['sq','needles','sq_photo','interview','zeytun','fraunces','','spot'],
 ['sq','droste','sq_frame','interview','shen','anton','show','wipe'],
 ['sq','carousel','sq_band','news','khabar','shoulders','NEWS','flap'],
 ['sq','halftone','sq_bottom','interview','firouzeh','syne','','spot'],
 ['sq','wordRain','sq_photo','interview','shab','shoulders','show','scramble'],
 ['sq','ridgeLines','sq_album','music','shab','syne','','rise'],
 ['sq','droste','sq_album','music','zafaran','anton','track','flap'],
 ['sq','blob','sq_album','music','golsorkh','fraunces','','blur'],
 ['sq','letterGlobe','sq_album','music','lajvard','unbounded','artist','scramble'],
 ['sq','liquid','sq_album','music','kobalt','shoulders','track','blur'],
 ['sq','rippleType','sq_album','music','darya','syne','artist','type'],
 ['sq','waveBars','sq_center','music','anar','anton','','rise'],
 ['sq','halftone','sq_album','music','zafaran','dmserif','','spot'],
 ['sq','typeWave','sq_bottom','music','yas','syne','artist','rise'],
 ['sq','spotlight','sq_album','music','shab','fraunces','track','spot'],
 ['yt','waveBars','yt_mv','mv','shab','anton','','blur'],
 ['yt','tunnel','yt_mv','mv','anar','unbounded','track','blur'],
 ['yt','statement','yt_stack','mv','shab','fraunces','track','blur'],
 ['yt','trails','yt_mv','mv','golsorkh','syne','artist','wipe'],
 ['yt','liquid','yt_mv','mv','darya','shoulders','artist','scramble'],
 ['yt','carousel','yt_mv','mv','yas','unbounded','artist','flap'],
 ['yt','ribbon','yt_mv','mv','kaghaz','archivo','track','type'],
 ['yt','flowLines','yt_split','mv','zeytun','dmserif','','blur'],
 ['yt','contour','yt_mv','mv','nana','unbounded','','spot'],
 ['yt','droste','yt_band','mv','zafaran','anton','artist','flap'],
 ['yt','combo','yt_hero','interview','kaghaz','anton','show','rise',{"type":"layer","a":"flowLines","b":"typeGrid","op":"multiply"}],
 ['yt','combo','yt_news','news','zafaran','shoulders','NYC','scramble',{"type":"maskText","a":"streetGrid","b":"flowLines","inv":true}],
 ['yt','combo','yt_center','interview','shab','unbounded','NYC','blur',{"type":"wipe","a":"ridgeLines","b":"letterGlobe"}],
 ['yt','combo','yt_hero','interview','darya','syne','show','wipe',{"type":"iris","a":"skyline","b":"tunnel"}],
 ['yt','combo','yt_frame','interview','golsorkh','archivo','show','flap',{"type":"tiles","a":"truchet","b":"rippleType"}],
 ['yt','combo','yt_split','interview','nana','fraunces','','blur',{"type":"cycle","a":"flowLines","b":"contour","c":"orbits"}],
 ['yt','combo','yt_split','interview','yas','unbounded','','rise',{"type":"voice","a":"contour","b":"needles","audio":true}],
 ['yt','audiogram','yt_hero','interview','shab','syne','','rise',{"audio":true}],
 ['yt','radialSpectrum','yt_split','interview','anar','anton','','blur',{"audio":true}],
 ['yt','speakerSplit','yt_stack','interview','kobalt','unbounded','','type',{"audio":true}],
 ['yt','voiceType','yt_hero','news','shab','shoulders','NEWS','scramble',{"audio":true}],
 ['yt','combo','yt_center','music','golsorkh','fraunces','','blur',{"type":"kaleido","a":"flowLines"}],
 ['yt','combo','yt_mv','mv','yas','anton','artist','flap',{"type":"kaleido","a":"typeGrid","n":8}],
 ['yt','combo','yt_mv','mv','shab','shoulders','','scramble',{"type":"pixel","a":"skyline","audio":true}],
 ['yt','combo','yt_hero','news','kobalt','shoulders','NEWS','wipe',{"type":"rgb","a":"liquid"}],
 ['yt','combo','yt_quote','interview','zafaran','dmserif','','spot',{"type":"halftone","a":"blob"}],
 ['yt','combo','yt_frame','news','shab','archivo','NYC','scramble',{"type":"ascii","a":"tunnel"}],
 ['yt','combo','yt_news','news','khabar','shoulders','','type',{"type":"ascii","a":"skyline"}],
 ['yt','combo','yt_band','news','anar','anton','kicker','flap',{"type":"layer","a":"sunburst","b":"echoStack","op":"difference"}],
 ['yt','combo','yt_mv','mv','shab','anton','artist','blur',{"type":"maskText","a":"ridgeLines","b":"waveBars","audio":true}],
 ['yt','combo','yt_hero','interview','golsorkh','syne','show','rise',{"type":"voice","a":"liquid","b":"trails","audio":true}],
 ['yt','combo','yt_hero','interview','lajvard','unbounded','show','scramble',{"type":"cycle","a":"dotType","b":"asciiField","c":"scanner"}],
 ['yt','combo','yt_news','news','firouzeh','archivo','','wipe',{"type":"iris","a":"transitLines","b":"streetGrid"}],
 ['yt','combo','yt_bigep','interview','shen','fraunces','','rise',{"type":"tiles","a":"halftone","b":"waveMesh"}],
 ['yt','voiceBlob','yt_bigep','interview','darya','syne','','blur',{"audio":true}],
 ['yt','combo','yt_stack','news','shab','archivo','headline','flap',{"type":"wipe","a":"splitFlap","b":"ledBoard"}],
 ['yt','combo','yt_quote','interview','kobalt','unbounded','NYC','type',{"type":"pixel","a":"letterGlobe"}],
 ['yt','combo','yt_mv','mv','zeytun','anton','','blur',{"type":"rgb","a":"audiogram","audio":true}],
 ['yt','combo','yt_center','music','lajvard','fraunces','','spot',{"type":"halftone","a":"skyline"}],
 ['yt','combo','yt_stack','interview','shab','fraunces','title','blur',{"type":"voice","a":"statement","b":"rippleType","audio":true}],
 ['sq','combo','sq_bottom','interview','kaghaz','anton','show','rise',{"type":"layer","a":"contour","b":"typeGrid","op":"multiply"}],
 ['sq','combo','sq_top','interview','kobalt','shoulders','PODCAST','blur',{"type":"maskText","a":"flowLines","b":"halftone","inv":true}],
 ['sq','combo','sq_center','interview','zafaran','syne','','wipe',{"type":"wipe","a":"skyline","b":"streetGrid"}],
 ['sq','combo','sq_album','music','shab','unbounded','artist','scramble',{"type":"iris","a":"ridgeLines","b":"letterGlobe"}],
 ['sq','combo','sq_frame','news','anar','archivo','NEWS','flap',{"type":"tiles","a":"truchet","b":"typeGrid"}],
 ['sq','combo','sq_album','music','golsorkh','fraunces','artist','blur',{"type":"cycle","a":"blob","b":"target","c":"spiralText"}],
 ['sq','combo','sq_photo','interview','darya','unbounded','','rise',{"type":"voice","a":"orbits","b":"contour","audio":true}],
 ['sq','audiogram','sq_bottom','interview','shab','syne','','rise',{"audio":true}],
 ['sq','radialSpectrum','sq_photo','interview','anar','anton','','blur',{"audio":true}],
 ['sq','speakerSplit','sq_min','interview','kobalt','unbounded','','type',{"audio":true}],
 ['sq','voiceType','sq_album','music','lajvard','shoulders','artist','scramble',{"audio":true}],
 ['sq','combo','sq_album','music','yas','fraunces','','blur',{"type":"kaleido","a":"contour"}],
 ['sq','combo','sq_center','interview','zafaran','anton','','wipe',{"type":"kaleido","a":"skyline","n":8}],
 ['sq','combo','sq_album','music','kobalt','syne','','scramble',{"type":"pixel","a":"blob","audio":true}],
 ['sq','combo','sq_top','news','shab','shoulders','NYC','scramble',{"type":"rgb","a":"spiralText"}],
 ['sq','combo','sq_quote','interview','golsorkh','dmserif','show','spot',{"type":"halftone","a":"tunnel"}],
 ['sq','combo','sq_news','news','shab','archivo','','type',{"type":"ascii","a":"blob"}],
 ['sq','combo','sq_album','music','darya','shoulders','artist','scramble',{"type":"ascii","a":"letterGlobe"}],
 ['sq','combo','sq_band','news','anar','anton','NEWS','flap',{"type":"layer","a":"sunburst","b":"wordRain","op":"difference"}],
 ['sq','combo','sq_album','music','shab','anton','artist','blur',{"type":"maskText","a":"skyline","b":"waveBars","audio":true}],
 ['sq','combo','sq_bottom','music','zafaran','anton','track','rise',{"type":"voice","a":"liquid","b":"droste","audio":true}],
 ['sq','combo','sq_top','news','shab','shoulders','NYC','scramble',{"type":"cycle","a":"dotType","b":"swarm","c":"scanner"}],
 ['sq','combo','sq_news','news','firouzeh','archivo','','wipe',{"type":"iris","a":"transitLines","b":"skyline"}],
 ['sq','combo','sq_quote','interview','shen','fraunces','','rise',{"type":"tiles","a":"halftone","b":"waveMesh"}],
 ['sq','voiceBlob','sq_photo','interview','yas','syne','','blur',{"audio":true}],
 ['sq','combo','sq_min','news','shab','archivo','headline','flap',{"type":"wipe","a":"splitFlap","b":"ledBoard"}],
 ['sq','combo','sq_top','interview','kobalt','unbounded','show','type',{"type":"pixel","a":"carousel"}],
 ['sq','combo','sq_album','music','zeytun','anton','','blur',{"type":"rgb","a":"audiogram","audio":true}],
 ['sq','combo','sq_center','music','lajvard','fraunces','','spot',{"type":"halftone","a":"blob"}],
 ['sq','combo','sq_min','interview','shab','fraunces','title','blur',{"type":"voice","a":"statement","b":"rippleType","audio":true}],
 ['yt','shader','yt_hero','interview','lajvard','fraunces','','blur',{"sh":"warp"}],
 ['yt','shader','yt_hero','interview','yas','syne','show','blur',{"sh":"liquidGlass","text":true}],
 ['yt','shader','yt_news','news','shab','shoulders','NYC','flap',{"sh":"textNeon","text":true}],
 ['yt','shader','yt_mv','music','shab','unbounded','','blur',{"sh":"chrome"}],
 ['yt','shader','yt_frame','interview','golsorkh','archivo','','wipe',{"sh":"voronoi"}],
 ['yt','shader','yt_stack','news','shab','archivo','headline','flap',{"sh":"crt","src":"ledBoard"}],
 ['yt','shader','yt_quote','interview','zafaran','dmserif','','spot',{"sh":"flutedGlass","src":"skyline"}],
 ['yt','shader','yt_hero','interview','kobalt','anton','show','rise',{"sh":"textExtrude","text":true}],
 ['yt','shader','yt_band','news','anar','anton','','flap',{"sh":"plasma"}],
 ['yt','shader','yt_split','interview','nana','syne','','blur',{"sh":"metaballs"}],
 ['yt','shader','yt_bigep','interview','khabar','shoulders','NYC','scramble',{"sh":"dither","src":"letterGlobe"}],
 ['yt','shader','yt_mv','mv','yas','fraunces','','blur',{"sh":"aurora"}],
 ['yt','shader','yt_hero','news','darya','shoulders','NEWS','scramble',{"sh":"textMelt","text":true}],
 ['yt','shader','yt_center','interview','khabar','archivo','','wipe',{"sh":"opstripes"}],
 ['yt','shader','yt_mv','mv','golsorkh','anton','','flap',{"sh":"tunnelGL","audio":true}],
 ['yt','shader','yt_center','music','shab','fraunces','','spot',{"sh":"bloomGrain","src":"flowLines"}],
 ['yt','shader','yt_quote','interview','darya','syne','show','type',{"sh":"textRipple","text":true}],
 ['yt','shader','yt_hero','interview','zafaran','syne','','rise',{"sh":"gradientMap","src":"contour"}],
 ['yt','shader','yt_news','news','kobalt','shoulders','NEWS','scramble',{"sh":"chromaGlitch","src":"typeGrid","audio":true}],
 ['yt','shader','yt_split','mv','anar','fraunces','','blur',{"sh":"warp","audio":true}],
 ['yt','shader','yt_mv','mv','shab','anton','artist','flap',{"sh":"textNeon","text":true,"audio":true}],
 ['yt','shader','yt_mv','mv','zafaran','anton','track','blur',{"sh":"liquidGlass","text":true}],
 ['yt','shader','yt_frame','news','lajvard','archivo','','flap',{"sh":"crt","src":"splitFlap"}],
 ['yt','shader','yt_bigep','interview','firouzeh','unbounded','','type',{"sh":"voronoi"}],
 ['yt','shader','yt_bigep','interview','shen','fraunces','','spot',{"sh":"chrome","audio":true}],
 ['sq','shader','sq_album','music','golsorkh','fraunces','','blur',{"sh":"warp"}],
 ['sq','shader','sq_bottom','interview','yas','syne','show','blur',{"sh":"liquidGlass","text":true}],
 ['sq','shader','sq_news','news','shab','shoulders','NYC','flap',{"sh":"textNeon","text":true}],
 ['sq','shader','sq_album','music','kaghaz','unbounded','','blur',{"sh":"chrome"}],
 ['sq','shader','sq_frame','interview','anar','archivo','','wipe',{"sh":"voronoi"}],
 ['sq','shader','sq_min','news','shab','shoulders','NEWS','scramble',{"sh":"crt","src":"asciiField"}],
 ['sq','shader','sq_album','music','zafaran','anton','','blur',{"sh":"flutedGlass","src":"sunburst"}],
 ['sq','shader','sq_top','interview','kobalt','anton','PODCAST','rise',{"sh":"textExtrude","text":true}],
 ['sq','shader','sq_band','news','darya','anton','','flap',{"sh":"plasma"}],
 ['sq','shader','sq_photo','interview','nana','syne','','blur',{"sh":"metaballs","audio":true}],
 ['sq','shader','sq_album','music','khabar','shoulders','','scramble',{"sh":"dither","src":"blob"}],
 ['sq','shader','sq_center','interview','yas','fraunces','','blur',{"sh":"aurora"}],
 ['sq','shader','sq_album','music','zeytun','shoulders','artist','scramble',{"sh":"textMelt","text":true}],
 ['sq','shader','sq_album','music','khabar','archivo','','wipe',{"sh":"opstripes"}],
 ['sq','shader','sq_quote','interview','golsorkh','anton','','flap',{"sh":"tunnelGL"}],
 ['sq','shader','sq_center','music','shab','fraunces','','spot',{"sh":"bloomGrain","src":"skyline"}],
 ['sq','shader','sq_top','interview','darya','syne','show','type',{"sh":"textRipple","text":true}],
 ['sq','shader','sq_bottom','interview','zafaran','syne','show','rise',{"sh":"gradientMap","src":"spiralText"}],
 ['sq','shader','sq_top','news','kobalt','shoulders','NYC','scramble',{"sh":"chromaGlitch","src":"letterGlobe","audio":true}],
 ['sq','shader','sq_photo','interview','anar','fraunces','','blur',{"sh":"warp","audio":true}],
 ['sq','shader','sq_album','music','shab','anton','artist','flap',{"sh":"textNeon","text":true,"audio":true}],
 ['sq','shader','sq_album','music','zafaran','anton','track','blur',{"sh":"liquidGlass","text":true}],
 ['sq','shader','sq_bottom','interview','lajvard','archivo','','rise',{"sh":"crt","src":"audiogram","audio":true}],
 ['sq','shader','sq_center','music','firouzeh','unbounded','','type',{"sh":"voronoi"}],
 ['sq','shader','sq_news','news','anar','anton','NEWS','flap',{"sh":"textExtrude","text":true}],
 ['yt','dungeon','yt_hud','interview','shab','vt323','show','steps'],
 ['yt','platformer','yt_title','interview','kobalt','press2p','','juice'],
 ['yt','raycaster','yt_hud','news','shab','press2p','','steps'],
 ['yt','boids','yt_hero','interview','nana','syne','','juice'],
 ['yt','astar','yt_news','news','kaghaz','silkscreen','','steps'],
 ['yt','towerDefense','yt_hud','interview','zeytun','press2p','','juice'],
 ['yt','match3','yt_title','music','yas','anton','artist','juice'],
 ['yt','cardHand','yt_vn','interview','anar','fraunces','show','type'],
 ['yt','letterPhysics','yt_stack','news','zafaran','anton','NEWS','juice'],
 ['yt','particles','yt_mv','mv','shab','anton','artist','blur'],
 ['yt','pixelSprites','yt_title','news','shab','press2p','','steps'],
 ['yt','isoVoxel','yt_hero','interview','lajvard','unbounded','','rise'],
 ['yt','parallax','yt_vn','interview','darya','silkscreen','','type'],
 ['yt','caves','yt_hud','music','shab','vt323','','steps'],
 ['yt','terrain','yt_news','news','firouzeh','silkscreen','','steps'],
 ['yt','breakout','yt_title','interview','kobalt','press2p','show','juice'],
 ['yt','shader','yt_frame','news','shab','vt323','show','steps',{"sh":"crt","src":"dungeon"}],
 ['yt','shader','yt_title','music','zafaran','press2p','','steps',{"sh":"dither","src":"platformer"}],
 ['yt','combo','yt_bigep','interview','shen','silkscreen','','juice',{"type":"pixel","a":"isoVoxel"}],
 ['yt','combo','yt_hero','news','shab','shoulders','NYC','juice',{"type":"maskText","a":"parallax","b":"particles"}],
 ['yt','combo','yt_hud','interview','shab','press2p','show','steps',{"type":"voice","a":"raycaster","b":"dungeon","audio":true}],
 ['yt','shader','yt_mv','mv','shab','anton','artist','juice',{"sh":"bloomGrain","src":"particles"}],
 ['yt','match3','yt_hud','news','golsorkh','press2p','NEWS','juice'],
 ['yt','boids','yt_vn','music','kaghaz','fraunces','','blur'],
 ['yt','terrain','yt_title','interview','nana','silkscreen','','juice'],
 ['sq','dungeon','sq_card','interview','shab','vt323','show','steps'],
 ['sq','platformer','sq_cart','interview','kobalt','press2p','','juice'],
 ['sq','raycaster','sq_hud','news','shab','press2p','','steps'],
 ['sq','boids','sq_album','music','nana','syne','','blur'],
 ['sq','astar','sq_news','news','kaghaz','silkscreen','','steps'],
 ['sq','towerDefense','sq_cart','interview','zeytun','press2p','','juice'],
 ['sq','match3','sq_album','music','yas','anton','artist','juice'],
 ['sq','cardHand','sq_card','interview','anar','fraunces','show','juice'],
 ['sq','letterPhysics','sq_min','news','zafaran','anton','NEWS','juice'],
 ['sq','particles','sq_album','music','shab','anton','artist','blur'],
 ['sq','pixelSprites','sq_cart','news','shab','press2p','','steps'],
 ['sq','isoVoxel','sq_center','interview','lajvard','unbounded','','rise'],
 ['sq','parallax','sq_bottom','interview','darya','silkscreen','','type'],
 ['sq','caves','sq_album','music','shab','vt323','','steps'],
 ['sq','terrain','sq_hud','news','firouzeh','silkscreen','','steps'],
 ['sq','breakout','sq_cart','interview','kobalt','press2p','NYC','juice'],
 ['sq','shader','sq_card','music','shab','vt323','','steps',{"sh":"crt","src":"caves"}],
 ['sq','shader','sq_top','interview','zafaran','press2p','show','steps',{"sh":"dither","src":"isoVoxel"}],
 ['sq','combo','sq_album','music','shen','silkscreen','','juice',{"type":"pixel","a":"terrain"}],
 ['sq','combo','sq_top','news','shab','shoulders','NYC','juice',{"type":"maskText","a":"parallax","b":"particles"}],
 ['sq','combo','sq_hud','interview','golsorkh','press2p','show','juice',{"type":"voice","a":"match3","b":"breakout","audio":true}],
 ['sq','shader','sq_album','music','shab','press2p','','steps',{"sh":"bloomGrain","src":"pixelSprites"}],
 ['sq','towerDefense','sq_hud','news','anar','press2p','','steps'],
 ['sq','cardHand','sq_album','music','yas','fraunces','artist','juice'],
 ['sq','astar','sq_card','interview','firouzeh','silkscreen','','steps']
];
const SH_NAME={warp:'Domain Warp',plasma:'Plasma',voronoi:'Voronoi Cells',metaballs:'Metaballs',aurora:'Aurora Gradient',opstripes:'Op-Art Stripes',tunnelGL:'Checker Tunnel',chrome:'Liquid Chrome',liquidGlass:'Liquid Glass Type',textMelt:'Melting Type',textRipple:'Water Type',textNeon:'Neon Sign',textExtrude:'3D Extrude',crt:'CRT',flutedGlass:'Fluted Glass',dither:'Bayer Dither',bloomGrain:'Bloom and Grain',gradientMap:'Gradient Map',chromaGlitch:'Chroma Glitch'};
const TL={layer:'Blend',maskText:'Text Mask',wipe:'Split Wipe',iris:'Iris',tiles:'Swap Tiles',cycle:'Code Cycle',voice:'Voice Switch',kaleido:'Kaleidoscope',pixel:'Pixelate',rgb:'Misregister',halftone:'Halftone Filter',ascii:'ASCII Filter'};
function tplName(r){const c=r[8];if(r[1]==='shader')return c.src?ENG_NAME[c.src]+' → '+SH_NAME[c.sh]:SH_NAME[c.sh];if(r[1]!=='combo')return ENG_NAME[r[1]];const N2=k=>ENG_NAME[c[k]];
 if(c.type==='voice')return 'Voice: '+N2('a')+' ⇄ '+N2('b');if(c.type==='cycle')return [N2('a'),N2('b'),N2('c')].filter(Boolean).join(' → ');if(c.b)return N2('a')+' × '+N2('b')+' '+TL[c.type];return N2('a')+' '+TL[c.type];}
const TPLS=RAW.map((r,i)=>({i,fmt:r[0],engine:r[1],layout:r[2],tag:r[3],pal:r[4],font:r[5],word:r[6],set:i<40?'a':i<90?'b':i<140?'c':i<160?'d':i<220?'e':i<270?'f':'g',motion:r[7]||'rise',cfg:r[8]||null,audio:!!(r[8]&&r[8].audio),name:tplName(r)+' · '+LAY_NAME[r[2]]}));
const BOX={yt_hero:[0,0,1,.68],yt_center:[0,0,1,1],yt_split:[.5,0,.5,1],yt_news:[0,.11,1,.5],yt_stack:[0,0,1,1],
 sq_top:[0,.13,1,.5],sq_center:[0,0,1,1],sq_photo:[0,.12,1,.66],sq_news:[0,.13,1,.42],sq_bottom:[0,.11,1,.45],sq_min:[0,.1,1,.8],
 yt_quote:[.66,0,.34,1],yt_hud:[0,.2,1,.5],sq_hud:[0,.19,1,.45],yt_vn:[0,.05,.66,.6],yt_title:[0,0,1,1],sq_cart:[0,.14,1,.5],sq_card:[.09,.17,.82,.43],yt_mv:[0,0,1,.62],sq_album:[0,.16,1,.62],sq_quote:[0,.8,1,.2],yt_frame:[.05,.08,.9,.55],sq_frame:[.05,.1,.9,.45],yt_bigep:[0,0,.5,1],yt_band:[0,0,1,1],sq_band:[0,0,1,1]};
const PHOTO_LAYOUTS=new Set(['yt_split','sq_photo']);
/* ---------- state ---------- */
const LS='cover-studio-nyc-v1';
const state={text:Object.fromEntries(FIELDS.map(f=>[f[0],f[2]])),tpl:{}};
try{const s=null;if(s){Object.assign(state.text,s.text||{});state.tpl=s.tpl||{};state.sync=s.sync;}}catch(e){}
const save=()=>{};
const tst=i=>{const d=TPLS[i],o=state.tpl[i]||{};return{seed:o.seed??(i*977+131),pal:o.pal??d.pal,font:(o.font&&FONTS[o.font])?o.font:d.font,motion:(o.motion&&MOTIONS[o.motion])?o.motion:d.motion,tag:(o.tag&&FIELD_BY_TAG[o.tag])?o.tag:d.tag};};
const setT=(i,k,v)=>{state.tpl[i]=Object.assign({},state.tpl[i],{[k]:v});save();};
/* ---------- rng / noise ---------- */
function rng(a){a>>>=0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const noiseCache=new Map();
function noise(seed){
 if(noiseCache.has(seed))return noiseCache.get(seed);
 const r=rng(seed^0x9e3779b9),p=new Uint8Array(512),v=new Float32Array(256);
 for(let i=0;i<256;i++){p[i]=i;v[i]=r();}
 for(let i=255;i>0;i--){const j=Math.floor(r()*(i+1));const t=p[i];p[i]=p[j];p[j]=t;}
 for(let i=0;i<256;i++)p[i+256]=p[i];
 const s=x=>x*x*(3-2*x),L=(a,b,t)=>a+(b-a)*t,h=(x,y,z)=>v[p[p[p[x&255]+(y&255)]+(z&255)]];
 const f=(x,y=0,z=0)=>{const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),u=s(x-xi),w=s(y-yi),q=s(z-zi);
  return L(L(L(h(xi,yi,zi),h(xi+1,yi,zi),u),L(h(xi,yi+1,zi),h(xi+1,yi+1,zi),u),w),L(L(h(xi,yi,zi+1),h(xi+1,yi,zi+1),u),L(h(xi,yi+1,zi+1),h(xi+1,yi+1,zi+1),u),w),q);};
 noiseCache.set(seed,f);return f;
}
/* ---------- color helpers ---------- */
function lum(hex){const n=parseInt(hex.slice(1),16);const c=[n>>16,(n>>8)&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2];}
const cr=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const on=(P,c)=>cr(c,P.ink)>=cr(c,P.bg)?P.ink:P.bg;
const rgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16,(n>>8)&255,n&255];};
/* ---------- canvas helpers ---------- */
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c;};
const cache=new Map();
const cacheSet=(k,v)=>{cache.set(k,v);if(cache.size>140)cache.delete(cache.keys().next().value);};
function wrap(ctx,words,maxW){const lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(!cur||ctx.measureText(t).width<=maxW)cur=t;else{lines.push(cur);cur=w;}}if(cur)lines.push(cur);return lines;}
function fit(ctx,text,fontFn,maxW,maxH,maxSize,minSize,maxLines,lhK=1.25){
 const words=String(text||'').trim().split(/\s+/).filter(Boolean);
 if(!words.length)return{size:minSize,lines:[]};
 let size=maxSize,lines;
 for(;;){ctx.font=fontFn(size);lines=wrap(ctx,words,maxW);
  const ok=lines.length<=maxLines&&lines.every(l=>ctx.measureText(l).width<=maxW)&&lines.length*size*lhK<=maxH;
  if(ok||size<=minSize)break;size=Math.max(minSize,size*.94);}
 if(lines.length>maxLines){lines=lines.slice(0,maxLines);lines[maxLines-1]+='…';}
 return{size,lines};
}
function rr(ctx,x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);}
function disc(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,Math.max(0,r),0,TAU);}
/* ---------- text motion ----------
   Every text element runs one 9-second loop: staggered entrance (letters rise in),
   a hold with a gentle letter wave and pulsing live dots, then a quick exit.
   Stills (thumbnails, PNG export) render the settled hold frame. */
const CYC=9;
function vis(e,d){if(e.still)return 1;if(e.vt)return e.vt(d);const c=e.tt%CYC;return clamp(ease((c-d)/.7)-ease((c-(CYC-1.05)+d*.25)/.55));}
const GLY='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+?';
const hsh=(a,b)=>(((a*73856093)^(b*19349663))>>>0);
const MOTIONS={rise:'Rise and wave',blur:'Blur in, word by word',type:'Typewriter',scramble:'Decode scramble',flap:'Split-flap',wipe:'Wipe reveal',spot:'Spotlight sweep',juice:'Juicy pop (squash and stretch)',steps:'8-bit steps'};
function kin(e,s,x,y,size,font,color,p,align,amp){
 const ctx=e.ctx;if(p<=0||!s)return;ctx.font=font;ctx.textBaseline='middle';ctx.direction='ltr';ctx.textAlign='left';ctx.fillStyle=color;
 const tw=ctx.measureText(s).width,sx=align==='left'?x:align==='right'?x-tw:x-tw/2,mo=e.motion||'rise',n=s.length,a0=ctx.globalAlpha;
 if(e.still){ctx.fillText(s,sx,y);return;}
 if(p>=1&&e.M){drawSynced(e,s,sx,y,size,font,a0,amp);return;}
 if(p>=1&&(mo!=='rise'||!amp)){ctx.fillText(s,sx,y);return;}
 const pw=prefixW(ctx,font,s),pre=i=>pw[i],gy=e.M?-.3*size*e.M.scale*.2:0;
 if(mo==='blur'){const ws=s.split(' '),nw=ws.length;let off=0;ws.forEach((w,k)=>{const loc=ease((p-(k/nw)*.5)/.5);if(loc>0&&w){ctx.globalAlpha=a0*loc;ctx.filter=loc<1?`blur(${((1-loc)*size*.16*e.S).toFixed(1)}px)`:'none';ctx.fillText(w,sx+pre(off),y+gy+(1-loc)*size*.2);}off+=w.length+1;});ctx.filter='none';ctx.globalAlpha=a0;return;}
 if(mo==='type'){const str=s.slice(0,Math.floor(clamp(p)*n));ctx.fillText(str,sx,y+gy);if(p<1&&Math.floor(e.tt*5)%2===0)ctx.fillRect(sx+ctx.measureText(str).width+size*.05,y-size*.42,size*.09,size*.84);return;}
 if(mo==='steps'){const k=Math.floor(Math.floor(clamp(p)*14)/14*n),str=s.slice(0,k);ctx.fillText(str,sx,y+gy);if(p<1)ctx.fillRect(sx+ctx.measureText(str).width,y-size*.45,ctx.measureText(s[k]||'M').width,size*.9);return;}
 if(mo==='wipe'){const q=ease(p);ctx.save();ctx.beginPath();ctx.rect(sx-size*.2,y-size,tw*q+size*.2,size*2);ctx.clip();ctx.fillText(s,sx,y+gy);ctx.restore();if(q<1)ctx.fillRect(sx+tw*q,y-size*.55,size*.12,size*1.1);return;}
 const fr=Math.floor(e.tt*16);
 for(let i=0;i<n;i++){const ch=s[i];if(ch===' ')continue;const xi=sx+pre(i),yy=y-(e.M?letterSync(e,i,n)*size*.3:0);
  if(mo==='scramble'){const loc=(p-(i/n)*.55)/.45;if(loc<=-.4)continue;ctx.globalAlpha=a0*(loc<1?clamp(.35+.65*clamp(loc+.4)):1);ctx.fillText(loc<1?GLY[hsh(i,fr)%GLY.length]:ch,xi,yy);}
  else if(mo==='flap'){const loc=(p-(i/n)*.5)/.5;if(loc<=0)continue;if(loc<1){ctx.save();ctx.translate(xi,yy);ctx.scale(1,Math.max(.12,Math.abs(Math.cos(((e.tt*10)%1)*Math.PI))));ctx.fillText(GLY[hsh(i,Math.floor(e.tt*10))%26],0,0);ctx.restore();}else ctx.fillText(ch,xi,yy);}
  else if(mo==='juice'){const loc=clamp((p-(i/n)*.5)/.5);if(loc<=0)continue;const cw=pw[i+1]-pw[i],c1=1.70158,b=1+(c1+1)*Math.pow(loc-1,3)+c1*Math.pow(loc-1,2),sq=Math.sin(loc*Math.PI);ctx.save();ctx.translate(xi+cw/2,yy);ctx.rotate((1-loc)*.5);ctx.scale(b*(1+.22*sq),b*(1-.18*sq));ctx.fillText(ch,-cw/2,0);ctx.restore();}
  else if(mo==='spot'){const loc=ease((p-(i/n)*.6)/.4),g=p*(n+6)-3,glow=Math.exp(-((i-g)**2)/6);ctx.globalAlpha=a0*clamp(Math.max(loc*.85,glow));ctx.fillText(ch,xi,yy-glow*size*.06);}
  else{const loc=ease((p-(i/n)*.45)/.55);if(loc<=0)continue;ctx.globalAlpha=a0*loc;ctx.fillText(ch,xi,yy+(1-loc)*size*.55+Math.sin(e.tt*2.4+i*.45)*amp*loc);}}
 ctx.globalAlpha=a0;
}
function txt(e,lines,font,size,x,yTop,lh,color,align='left',d=0,amp=0){
 lines.forEach((l,i)=>kin(e,l,x,yTop+i*lh+lh/2,size,font,color,vis(e,d+i*.1),align,amp));
}
function hl(e,lines,size,fontFn,x,yTop,lh,fill,color,align='left',d=0,wave=false){
 const ctx=e.ctx,bv=e.M?Math.min(1.5,e.M.bars):0,pad=size*.34*(1+.9*bv),gap=Math.max(4,size*.1),h=lh-gap,ex=size*.14*bv;
 lines.forEach((l,i)=>{ctx.font=fontFn(size);const w=ctx.measureText(l).width,bw=w+pad*2;
  const p=vis(e,d+i*.12),q=vis(e,d+.18+i*.12);if(p<=0)return;const bwp=bw*p,y=yTop+i*lh;
  const x0=align==='left'?x:align==='right'?x-bwp:x-bwp/2;
  ctx.fillStyle=fill;ctx.fillRect(x0,y-ex/2,bwp,h+ex);
  ctx.save();ctx.beginPath();const m=e.M?size*.7:size*.3;ctx.rect(x0,y-m,bwp,h+m*2);ctx.clip();
  const cx=align==='left'?x+pad:align==='right'?x-pad:x;
  kin(e,l,cx,y+h/2+size*.03,size,fontFn(size),color,q,align,wave?size*.025:0);ctx.restore();});
}
function pill(e,text,x,y,size,fill,color,align='left',d=0,live=false){
 if(!text)return 0;const ctx=e.ctx,p=vis(e,d);if(p<=0)return 0;text=String(text).toUpperCase();
 ctx.font=UI(800,size);const w=ctx.measureText(text).width,px=size*.75,h=size*1.8,extra=live?size*.95:0,bw=w+px*2+extra;
 const x0=align==='left'?x:align==='right'?x-bw:x-bw/2;
 ctx.save();ctx.globalAlpha*=p;ctx.translate(0,(1-p)*size*.9);
 if(e.M&&e.M.labels>.01){const k=1+.16*Math.min(1.4,e.M.labels);ctx.translate(x0+bw/2,y);ctx.scale(k,k);ctx.translate(-(x0+bw/2),-y);}
 rr(ctx,x0,y-h/2,bw,h,h/2);ctx.fillStyle=fill;ctx.fill();
 if(live){const r=size*.22*(1+liveK(e,.4));ctx.fillStyle=color;disc(ctx,x0+px+size*.25,y,r);ctx.fill();}
 ctx.fillStyle=color;ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText(text,x0+px+extra,y+size*.04);
 ctx.restore();return bw;
}
function drawBoxText(x,e,text,color){
 x.direction='ltr';x.textAlign='center';x.textBaseline='middle';
 const f=fit(x,text,s=>fontStr(e.F,s),e.bw*.9,e.bh*.86,e.bh*.62,12,2,1.02);
 x.font=fontStr(e.F,f.size);x.fillStyle=color;const lh=f.size*1.02,y0=e.by+e.bh/2-(f.lines.length-1)*lh/2;
 f.lines.forEach((l,i)=>x.fillText(l,e.bx+e.bw/2,y0+i*lh));
}
function textLayer(e,text,color){
 const k=['L',text,color,e.F.fam,e.W,e.H,e.S.toFixed(3),e.bx,e.by,e.bw,e.bh].join('|');
 if(cache.has(k))return cache.get(k);
 const c=mk(e.W*e.S,e.H*e.S),x=c.getContext('2d');x.scale(e.S,e.S);drawBoxText(x,e,text,color);cacheSet(k,c);return c;
}
function maskGrid(e,text,cell){
 const k=['M',text,e.F.fam,cell.toFixed(2),e.W,e.H,e.bx,e.by,e.bw,e.bh].join('|');
 if(cache.has(k))return cache.get(k);
 const cols=Math.ceil(e.W/cell),rows=Math.ceil(e.H/cell),c=mk(cols,rows),x=c.getContext('2d',{willReadFrequently:true});
 x.scale(1/cell,1/cell);drawBoxText(x,e,text,'#fff');
 const img=x.getImageData(0,0,cols,rows).data,d=new Uint8Array(cols*rows);
 for(let i=0;i<d.length;i++)d[i]=img[i*4+3]>100?1:0;
 const r={cols,rows,d};cacheSet(k,r);return r;
}
/* ---------- photo ---------- */
let photo=null;
const duoCache=new Map();
function duo(P){
 if(duoCache.has(P.n))return duoCache.get(P.n);
 const s=640,c=mk(s,s),x=c.getContext('2d',{willReadFrequently:true});
 const iw=photo.naturalWidth,ih=photo.naturalHeight,sc=Math.max(s/iw,s/ih);
 x.drawImage(photo,(s-iw*sc)/2,(s-ih*sc)/2,iw*sc,ih*sc);
 const dark=lum(P.ink)<lum(P.bg)?P.ink:P.bg,light=dark===P.ink?P.bg:P.ink;
 const A=rgb(dark),B=rgb(P.acc),C=rgb(light),im=x.getImageData(0,0,s,s),d=im.data;
 for(let i=0;i<d.length;i+=4){let l=(.3*d[i]+.59*d[i+1]+.11*d[i+2])/255;l=l*l*(3-2*l);
  const [p,q,t]=l<.5?[A,B,l*2]:[B,C,(l-.5)*2];d[i]=p[0]+(q[0]-p[0])*t;d[i+1]=p[1]+(q[1]-p[1])*t;d[i+2]=p[2]+(q[2]-p[2])*t;}
 x.putImageData(im,0,0);duoCache.set(P.n,c);return c;
}
function drawPhoto(e,cx,cy,r,d=0){
 const {ctx,P,M}=e,p=vis(e,d);if(p<=0)return;ctx.save();ctx.globalAlpha*=p;
 ctx.save();disc(ctx,cx,cy,r);ctx.clip();
 if(photo){ctx.drawImage(duo(P),cx-r,cy-r,r*2,r*2);}
 else{ctx.fillStyle=P.soft;ctx.fillRect(cx-r,cy-r,r*2,r*2);ctx.fillStyle=P.bg;disc(ctx,cx,cy-r*.16,r*.33);ctx.fill();
  ctx.beginPath();ctx.ellipse(cx,cy+r*.78,r*.64,r*.52,0,0,TAU);ctx.fill();}
 const rv=M?Math.min(1.5,M.ring):0;
 ctx.restore();ctx.strokeStyle=P.acc;ctx.lineWidth=r*.045*(1+2.2*rv);
 ctx.beginPath();const a0=-Math.PI/2+(e.still?0:(e.t-T0)*.4);ctx.arc(cx,cy,r*1.07,a0,a0+TAU*ease(vis(e,d+.2)));ctx.stroke();
 if(rv>.03){ctx.globalAlpha*=clamp(rv);ctx.lineWidth=r*.02;disc(ctx,cx,cy,r*(1.12+.14*rv));ctx.stroke();}ctx.restore();
}
/* ---------- engines ---------- */
const FA_LET='ABCDEFGHIJKLMNOPQRSTUVWXYZ&?!#'.split('');
const E={};
const bg=e=>{e.ctx.fillStyle=e.P.bg;e.ctx.fillRect(0,0,e.W,e.H);};
/* ---------- set B engines ---------- */
function ledMask(text,rows){const k='LED|'+text+'|'+rows;if(cache.has(k))return cache.get(k);
 const fs=Math.round(rows*.84),font=`800 ${fs}px "Hanken Grotesk", system-ui, sans-serif`,m=mk(4,4).getContext('2d');m.font=font;
 const w=Math.ceil(m.measureText(text).width)+rows*2,c=mk(w,rows),x=c.getContext('2d',{willReadFrequently:true});
 x.font=font;x.textBaseline='middle';x.fillStyle='#fff';x.fillText(text,rows,rows/2+1);
 const d=x.getImageData(0,0,w,rows).data,o=new Uint8Array(w*rows);for(let i=0;i<o.length;i++)o[i]=d[i*4+3]>110?1:0;
 const r={w,o};cacheSet(k,r);return r;}
/* ---------- set C engines: motion first ---------- */
const FLAP=' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/* ---------- set E: voice + mixing ----------
   e.audio comes from a real voice track (analyser) or, when none is loaded, a simulated
   two-person conversation: speakers alternate every 4.5 s with different pitch. */
const NB=32;
/* ---------- voice parameters ----------
   20 parameters come out of the voice, from a loaded track (Web Audio analyser) or, with no
   track, from a simulated two-person conversation. Every value is 0..1 except spec and wave
   (arrays) and beats (a syllable counter). clk holds one clock per parameter: it advances
   faster when that parameter is high, and drives motion speed and ticker speed. */
const PARAMS={
 env:['Envelope','Loudness envelope: smoothed level with a fast attack and slow release'],
 lv:['RMS','Instant loudness (root mean square of the waveform)'],
 onset:['Onset','Syllable attacks: jumps to 1 on each new syllable, then decays'],
 bass:['Bass','Energy from 60 to 250 Hz: chest voice, plosives'],
 lowmid:['Low-mid','Energy from 250 to 800 Hz: body of the vowels'],
 mid:['Mid','Energy from 0.8 to 2.5 kHz: vowel formants and clarity'],
 pres:['Presence','Energy from 2.5 to 6 kHz: consonants and edge'],
 air:['Air','Energy from 6 to 12 kHz: breath and sibilants'],
 cen:['Brightness','Spectral centroid: where the weight of the spectrum sits'],
 flux:['Flux','Spectral flux: how fast the sound is changing'],
 pitch:['Pitch','Fundamental frequency, 70 to 400 Hz'],
 into:['Intonation','Pitch movement around the speaker\'s own average'],
 zcr:['Noisiness','Zero-crossing rate: high on s, sh, f'],
 flat:['Flatness','Spectral flatness: noise-like versus tonal'],
 vad:['Voice','Voice activity: 1 while someone is speaking'],
 pause:['Pause','Rises during silence, full after 1.5 s'],
 rate:['Rate','Speech rate in syllables per second'],
 mix:['Speaker','Which voice is talking: 0 first, 1 second'],
 spec:['Spectrum','32 log-spaced bands from 80 Hz to 8 kHz'],
 wave:['Waveform','128 samples of the current waveform']
};
const SCALAR=Object.keys(PARAMS).filter(k=>k!=='spec'&&k!=='wave');
const crate=v=>.25+1.5*v;
/* simulated conversation: speaker A (lower, slower) and B (higher, faster) alternate every 4.5 s,
   each turn ends with a 0.6 s pause; syllables, word gaps, sibilants and intonation are modelled */
function simCore(t,arrays){const seg=Math.floor(t/4.5),spk=seg%2,inS=t-seg*4.5,vad=clamp((3.9-inS)/.15);
 const srt=spk?6.2:4.8,ph=t*srt+seg*1.7,sp=ph-Math.floor(ph),idx=Math.floor(ph);
 const gap=(idx%4===3)?.3:1,amp=.55+.45*h01s(idx,seg);
 const syl=vad*Math.pow(Math.sin(Math.PI*sp),2)*amp*gap;
 const sib=vad*((h01s(idx,9)>.72&&sp>.55)?Math.sin(Math.PI*(sp-.55)/.45):0);
 const lv=clamp(.03+.9*syl+.25*sib),cen=clamp((spk?.52:.36)+.18*syl+.35*sib);
 const A={lv,env:clamp(vad*(.42+.18*Math.sin(t*1.1+seg)+.2*gap*amp)+.04*(1-vad)),onset:vad*gap*Math.exp(-sp*10)*(.5+.5*amp),
  bass:clamp(lv*(spk?.55:.95)),lowmid:clamp(lv*.85),mid:clamp(lv*(.55+.4*cen)),pres:clamp(lv*(.3+.6*cen)+.5*sib),air:clamp(.08*lv+.85*sib),cen,
  flux:0,pitch:clamp((spk?.6:.28)+.09*Math.sin(t*1.3+seg*2)-.07*inS/3.9+.04*syl),into:clamp(.5+vad*(.36*Math.sin(t*1.3+seg*2)+.1*syl)),
  zcr:clamp(.12*vad+.85*sib),flat:clamp(.12+.55*sib+.5*(1-vad)),vad,pause:clamp((inS-3.9)/.6),rate:vad*srt/8,mix:spk?ease(inS/.6):1-ease(inS/.6),
  spk,beats:idx,talk:vad>.5,sim:true};
 A.flux=clamp(A.onset*.9+Math.abs(Math.sin(2*Math.PI*sp))*syl*.4+sib*.3);
 if(arrays){const spec=new Float32Array(NB),wave=new Float32Array(128),f1=.12+.06*spk+.04*Math.sin(idx),f2=.36+.12*h01s(idx,3);
  for(let b=0;b<NB;b++){const x=b/NB;spec[b]=clamp(lv*(Math.exp(-((x-f1)**2)/.006)+.7*Math.exp(-((x-f2)**2)/.01)+.35*Math.exp(-x*4))*(.8+.2*Math.sin(t*13+b*1.7))+sib*Math.exp(-((x-.85)**2)/.02));}
  const fw=spk?7:4;for(let i=0;i<128;i++){const x=i/128;wave[i]=lv*(Math.sin(x*TAU*fw+t*20)*.7+Math.sin(x*TAU*fw*2.3-t*31)*.3)*Math.sin(Math.PI*x)+sib*(h01s(i,Math.floor(t*60))-.5);}
  A.spec=spec;A.wave=wave;}
 return A;}
function h01s(a,b){return (hsh(a+1,b+7)%100003)/100003;}
const SIMC={dt:1/30,n:1,cum:null};
function simClockAt(t){if(!SIMC.cum){SIMC.cum={};SCALAR.forEach(p=>SIMC.cum[p]=[0]);}
 t=Math.max(0,Math.min(t,7200));const need=Math.ceil(t/SIMC.dt)+2;
 while(SIMC.n<need){const A=simCore((SIMC.n-.5)*SIMC.dt,false);SCALAR.forEach(p=>{const c=SIMC.cum[p];c.push(c[c.length-1]+SIMC.dt*crate(A[p]));});SIMC.n++;}
 const k=Math.floor(t/SIMC.dt),f=t/SIMC.dt-k,o={};SCALAR.forEach(p=>{const c=SIMC.cum[p];o[p]=c[k]+(c[k+1]-c[k])*f;});return o;}
let SIM0=null;
function simAudio(t){const A=simCore(t,true),c=simClockAt(t);if(!SIM0)SIM0=simClockAt(T0);
 A.clk={};SCALAR.forEach(p=>A.clk[p]=c[p]-SIM0[p]);A.ph=A.clk.env;return A;}
/* live extraction from the analyser */
const AU={ctx:null,an:null,el:null,src:null,dest:null,url:null,name:'',live:null,freq:null,time:null,fd:null,td:null,
 st:{env:0,vad:0,sil:2,on:0,beats:0,since:9,fluxAvg:0,ons:[],now:0,pitch:.4,pS:.4,pL:.4,spk:0,mix:0,hold:0,clk:{},prev:null,cen:.4}};
const AG={};
function agc(k,v,dt,floor){let m=AG[k]||floor;m=Math.max(v,m*Math.pow(.5,dt/3),floor);AG[k]=m;return clamp(v/m);}
function audioUpdate(dt){
 if(!AU.an||!AU.el||AU.el.paused){AU.live=null;return;}
 const an=AU.an,sr=AU.ctx.sampleRate,n=an.frequencyBinCount,N=an.fftSize,s=AU.st;s.now+=dt;
 if(!AU.fd||AU.fd.length!==n){AU.fd=new Float32Array(n);AU.td=new Float32Array(N);AU.mag=new Float32Array(n);s.prev=new Float32Array(NB);}
 an.getFloatFrequencyData(AU.fd);an.getFloatTimeDomainData(AU.td);const fd=AU.fd,td=AU.td,mag=AU.mag;
 for(let i=0;i<n;i++){const db=fd[i];mag[i]=isFinite(db)?Math.pow(10,db/20):0;}
 const bin=f=>Math.max(1,Math.min(n-1,Math.round(f/sr*N)));
 const band=(a,b)=>{let m=0;const i0=bin(a),i1=bin(b);for(let i=i0;i<=i1;i++)m+=mag[i];return m/Math.max(1,i1-i0+1);};
 let sum=0,zc=0;for(let i=0;i<N;i++){sum+=td[i]*td[i];if(i&&(td[i]>=0)!==(td[i-1]>=0))zc++;}const rms=Math.sqrt(sum/N);
 const lv=agc('rms',rms,dt,.004),speaking=rms>Math.max(.004,(AG.rms||.01)*.14);
 s.vad+=((speaking?1:0)-s.vad)*Math.min(1,dt*(speaking?10:3));s.sil=speaking?0:s.sil+dt;
 s.env+=(lv-s.env)*Math.min(1,dt*(lv>s.env?12:2.5));
 const raw={bass:band(60,250),lowmid:band(250,800)*1.2,mid:band(800,2500)*1.8,pres:band(2500,6000)*3.2,air:band(6000,12000)*5},B={};
 let bm=1e-7;for(const k in raw)bm=Math.max(bm,raw[k]);const bn=agc('bands',bm,dt,1e-5)/bm;for(const k in raw)B[k]=Math.sqrt(clamp(raw[k]*bn));
 const spec=new Float32Array(NB);let pk=1e-6;for(let b=0;b<NB;b++){const f0=80*Math.pow(100,b/NB),f1=80*Math.pow(100,(b+1)/NB);let m=0;for(let i=bin(f0);i<=bin(f1);i++)m=Math.max(m,mag[i]);spec[b]=m;pk=Math.max(pk,m);}
 const sp=agc('spec',pk,dt,1e-5)/pk;for(let b=0;b<NB;b++)spec[b]=Math.sqrt(clamp(spec[b]*sp));
 let fl=0;for(let b=0;b<NB;b++)fl+=Math.max(0,spec[b]-s.prev[b]);s.prev.set(spec);const flux=agc('flux',fl,dt,.05);
 let cw=0,ct=0,lg=0,ar=0,cnt=0;for(let i=bin(80);i<=bin(8000);i++){cw+=mag[i];ct+=mag[i]*i*sr/N;if(i>=bin(300)){lg+=Math.log(mag[i]+1e-9);ar+=mag[i];cnt++;}}
 const cen=cw?clamp(Math.log2(Math.max(250,ct/cw)/250)/Math.log2(24)):s.cen;s.cen=cen;
 const flat=cnt&&ar?clamp(Math.exp(lg/cnt)/(ar/cnt)*2.2):0;
 /* pitch by autocorrelation on the waveform, downsampled by 2 */
 if(speaking){const ds=2,M=N>>1,sr2=sr/ds,lo=Math.floor(sr2/400),hi=Math.ceil(sr2/70);let r0=0,best=0,bl=0;
  for(let i=0;i<M;i++){const v=td[i*ds];r0+=v*v;}
  if(r0>0)for(let L=lo;L<=hi&&L<M-32;L++){let r=0;for(let i=0;i<M-L;i++)r+=td[i*ds]*td[(i+L)*ds];r/=r0;if(r>best){best=r;bl=L;}}
  if(best>.35&&bl){const pn=clamp(Math.log2(sr2/bl/80)/Math.log2(5));s.pitch+=(pn-s.pitch)*Math.min(1,dt*10);}}
 s.pS+=(s.pitch-s.pS)*Math.min(1,dt*3);s.pL+=(s.pitch-s.pL)*Math.min(1,dt*.12);
 if(speaking){const cand=s.pS>s.pL+.035?1:s.pS<s.pL-.035?0:s.spk;if(cand!==s.spk){s.hold+=dt;if(s.hold>.6){s.spk=cand;s.hold=0;}}else s.hold=0;}
 s.mix+=(s.spk-s.mix)*Math.min(1,dt*4);
 s.fluxAvg+=(fl-s.fluxAvg)*Math.min(1,dt*2);s.since+=dt;
 if(speaking&&fl>s.fluxAvg*1.5+.02&&s.since>.12){s.on=1;s.beats++;s.since=0;s.ons.push(s.now);}
 s.on*=Math.pow(.5,dt/.12);while(s.ons.length&&s.now-s.ons[0]>2)s.ons.shift();
 const wave=new Float32Array(128),wg=1/Math.max(.02,(AG.rms||.05)*2.5);for(let i=0;i<128;i++)wave[i]=clamp(td[Math.floor(i/128*N)]*wg,-1,1);
 const A={lv,env:s.env,onset:s.on,...B,cen,flux,pitch:s.pitch,into:clamp(.5+(s.pitch-s.pL)*3)*s.vad+.5*(1-s.vad),zcr:clamp((zc/N-.02)/.18),flat,
  vad:s.vad,pause:clamp(s.sil/1.5),rate:clamp(s.ons.length/2/7),mix:s.mix,spk:s.spk,beats:s.beats,spec,wave,talk:speaking,sim:false};
 SCALAR.forEach(p=>s.clk[p]=(s.clk[p]||0)+dt*crate(A[p]));A.clk=s.clk;A.ph=s.clk.env;AU.live=A;
}
const pool=new Map();
function buf(slot,e){const w=Math.ceil(e.W*e.S),h=Math.ceil(e.H*e.S),k=slot+w+'x'+h;let c=pool.get(k);if(!c){c=mk(w,h);pool.set(k,c);}
 const x=c.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='source-over';x.globalAlpha=1;x.filter='none';x.clearRect(0,0,w,h);x.setTransform(e.S,0,0,e.S,0,0);return c;}
function bufSmall(slot,w,h){const k='s'+slot+w+'x'+h;let c=pool.get(k);if(!c){c=mk(w,h);pool.set(k,c);}c.getContext('2d',{willReadFrequently:true}).clearRect(0,0,w,h);return c;}
const inv=P=>Object.assign({},P,{bg:P.ink,ink:P.bg});
function runE(e,name,ctx,o={}){const e2=Object.assign({},e,{ctx,R:rng(e.seed+(o.salt||0)),P:o.P||e.P,t:o.t??e.t});ctx.save();if(e.M)strokeHook(ctx,1+1.3*e.M.stroke);try{E[name](e2);}finally{unhook(ctx);ctx.restore();}}
/* ---------- set F: WebGL shaders ----------
   One shared WebGL canvas renders a fragment shader at the cover's pixel size; the result is drawn
   into the 2D cover. Inputs: TX = another engine rendered to a texture (post shaders), TT = the
   cover's word as a white text texture (type shaders). C0..C3 = palette bg, soft, ink, accent;
   AU = voice level, speaker mix, onset. */
const SH_HEAD=`precision highp float;
varying vec2 vUv;
uniform vec2 R;uniform float T;uniform vec3 C0,C1,C2,C3;uniform float SEED;uniform vec3 AU;uniform vec2 F;uniform sampler2D TX;uniform sampler2D TT;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21)+SEED);p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*vn(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 ramp(float t){t=clamp(t,0.,1.);if(t<.333)return mix(C0,C1,t*3.);if(t<.666)return mix(C1,C2,(t-.333)*3.);return mix(C2,C3,(t-.666)*3.);}
vec2 AS(){return vec2(R.x/R.y,1.);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float bay2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}
float bay4(vec2 a){return bay2(.5*a)*.25+bay2(a);}
`;
const SH={
warp:`void main(){vec2 p=(vUv-.5)*AS()*2.;float t=T*.15*(1.+AU.x);vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2)+.15*T),fbm(p+4.*q+vec2(8.3,2.8)-.12*T));float f=fbm(p+4.*r);gl_FragColor=vec4(ramp(clamp(f*f*1.7+length(q)*.35,0.,1.)),1.);}`,
plasma:`void main(){vec2 p=(vUv-.5)*AS()*6.;float t=T*.6*(1.+AU.x);float v=sin(p.x+t)+sin(p.y*.8+t*1.3)+sin((p.x+p.y)*.6+t*.7)+sin(length(p+vec2(sin(t*.5),cos(t*.4))*2.)*1.5-t);
v=v*.125+.5;gl_FragColor=vec4(ramp(floor(v*6.)/5.),1.);}`,
voronoi:`void main(){vec2 p=(vUv-.5)*AS()*5.;vec2 i=floor(p),f=fract(p);float d1=8.,d2=8.;vec2 id=vec2(0.);
for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 g=vec2(float(x),float(y));vec2 o=vec2(h21(i+g),h21(i+g+7.3));o=.5+.45*sin(T*.6*(1.+AU.x)+6.28*o);float d=length(g+o-f);if(d<d1){d2=d1;d1=d;id=i+g;}else if(d<d2)d2=d;}
vec3 c=ramp(.12+h21(id)*.55);if(h21(id+3.)>.84)c=C3;c=mix(C2,c,smoothstep(.02,.07,d2-d1));gl_FragColor=vec4(c,1.);}`,
metaballs:`void main(){vec2 p=(vUv-.5)*AS();float s=0.;for(int k=0;k<7;k++){float fk=float(k);vec2 c=vec2(sin(T*.4*(1.+fk*.13)+fk*2.1)*.42*AS().x,cos(T*.31*(1.+fk*.11)+fk*1.3)*.32);s+=(.016+.012*AU.x)/dot(p-c,p-c);}
vec3 c=s<.5?C0:s<.8?C1:s<1.1?C3:C2;c=mix(c,C2,smoothstep(.04,.0,abs(fract(s*2.)-.5)-.47)*step(s,.5)*.0);gl_FragColor=vec4(c,1.);}`,
aurora:`void main(){vec2 p=vUv;float t=T*.12;vec3 c=C0;
for(int k=0;k<4;k++){float fk=float(k);vec2 c0=vec2(.5+.42*sin(t*(1.+fk*.3)+fk*1.7),.5+.36*cos(t*(.8+fk*.2)+fk*2.3));float d=length((p-c0)*AS());vec3 col=k==0?C3:k==1?C1:k==2?C2:C3;c=mix(c,col,smoothstep(.62,0.,d)*(.5+.2*AU.x));}
c+=(h21(p*R+fract(T)*10.)-.5)*.07;gl_FragColor=vec4(c,1.);}`,
opstripes:`void main(){vec2 p=(vUv-.5)*AS();vec2 f=(F-.5)*AS();float inC=step(length(p-f),.3+.03*sin(T)+AU.x*.06);
float w=inC>.5?p.x*22.+cos(p.y*5.-T)*2.:p.y*18.+sin(p.x*4.+T)*2.5*(1.+AU.x)+fbm(p*2.+T*.1)*3.;float s=step(.5,fract(w));
vec3 c=inC>.5?mix(C3,C0,s):mix(C0,C2,s);gl_FragColor=vec4(c,1.);}`,
tunnelGL:`void main(){vec2 p=(vUv-F)*AS();float a=atan(p.y,p.x),r=length(p);vec2 uv=vec2(a/6.2832*8.+T*.12*(1.+AU.x),.35/max(r,.001));
float ch=mod(floor(uv.x*2.)+floor(uv.y*2.),2.);vec3 c=mix(C2,C1,ch);if(mod(floor(uv.y*2.),7.)<.5)c=C3;c=mix(C0,c,smoothstep(.0,.3,r));gl_FragColor=vec4(c,1.);}`,
chrome:`float map(vec3 q){float t=T*.6;float d=length(q-vec3(sin(t*.7)*.7,cos(t*.5)*.3,0.))-.48-AU.x*.12;
d=smin(d,length(q-vec3(cos(t*.6)*.8,sin(t*.8)*.4,sin(t*.4)*.3))-.36,.4);d=smin(d,length(q-vec3(sin(t*.45+2.)*.6,-cos(t*.65)*.45,.2))-.32,.4);return d;}
void main(){vec2 p=(vUv-.5)*AS()*2.;vec3 ro=vec3(0.,0.,3.2),rd=normalize(vec3(p,-2.));float d=0.,hit=0.;
for(int i=0;i<64;i++){float s=map(ro+rd*d);if(s<.002){hit=1.;break;}d+=s;if(d>8.)break;}
vec3 c=mix(C0,C1,vUv.y*.6);
if(hit>.5){vec3 q=ro+rd*d;vec2 e=vec2(.002,0.);vec3 n=normalize(vec3(map(q+e.xyy)-map(q-e.xyy),map(q+e.yxy)-map(q-e.yxy),map(q+e.yyx)-map(q-e.yyx)));
vec3 rf=reflect(rd,n);float env=.5+.5*rf.y;float fr=pow(1.-max(dot(n,-rd),0.),2.);c=mix(C2,C3,smoothstep(.45,.55,fract(env*2.+.25)));c=mix(c,C1,fr*.6);
c+=pow(max(dot(rf,normalize(vec3(.4,.8,.6))),0.),24.)*.8;}gl_FragColor=vec4(c,1.);}`,
liquidGlass:`void main(){vec2 uv=vUv,p=(uv-.5)*AS();float lens=0.;vec2 off=vec2(0.);
for(int k=0;k<3;k++){float fk=float(k);vec2 c=(vec2(.5+.33*sin(T*.4+fk*2.1),.5+.25*cos(T*.5+fk*1.7))-.5)*AS();float r=.22+.04*sin(T+fk)+AU.x*.05;float d=length(p-c);
float m=smoothstep(r,r-.006,d);float z=sqrt(max(0.,1.-pow(d/r,2.)));off+=m*(p-c)*(1.-z)*-.45;lens=max(lens,m*(1.-d/r));}
vec3 bgc=mix(C0,C1,fbm(p*1.5+T*.05));float tx=texture2D(TT,uv+off/AS()).a;vec3 c=mix(bgc,C2,tx);
float inL=step(.0001,lens);c=mix(c,c*.9+C3*.1,inL);c+=pow(lens,5.)*.55;c+=inL*smoothstep(.06,.0,lens)*.25;gl_FragColor=vec4(c,1.);}`,
textMelt:`void main(){vec2 uv=vUv;float n=fbm(vec2(uv.x*9.,T*.15));float drip=pow(n,3.)*.4*(.55+.45*sin(T*.5+uv.x*3.))*(1.+AU.x);float a=0.;
for(int k=0;k<14;k++){float fk=float(k)/13.;a=max(a,texture2D(TT,uv+vec2(0.,drip*fk)).a*(1.-fk*.35));}
float core=texture2D(TT,uv).a;vec3 c=mix(C0,C1,fbm(uv*3.)*.4);c=mix(c,C2,a);c=mix(c,C3,clamp(a-core,0.,1.)*.85);gl_FragColor=vec4(c,1.);}`,
textRipple:`void main(){vec2 p=(vUv-F)*AS();float r=length(p);float w=sin(r*60.-T*6.)*exp(-r*3.)*(.012+AU.x*.02);vec2 uv=vUv+normalize(p+1e-5)/AS()*w;
float a=texture2D(TT,uv).a;vec3 bgc=mix(C0,C1,.5+.5*sin(r*60.-T*6.)*exp(-r*2.5));gl_FragColor=vec4(mix(bgc,C2,a),1.);}`,
textNeon:`void main(){float a=texture2D(TT,vUv).a;float g=0.;for(int i=0;i<16;i++){float an=float(i)/16.*6.2832;for(int j=1;j<=3;j++){vec2 o=vec2(cos(an),sin(an))*float(j)*.007/AS();g+=texture2D(TT,vUv+o).a;}}g/=48.;
float fl=.82+.18*step(.35,h21(vec2(floor(T*9.),2.)))+AU.x*.3;vec3 c=C0*.75+C1*.15*fbm(vUv*4.+T*.05);c+=C3*pow(g,.8)*1.3*fl;c=mix(c,mix(C3,vec3(1.),.65),a*fl);gl_FragColor=vec4(c,1.);}`,
textExtrude:`void main(){vec2 dir=vec2(cos(T*.5),.6+.35*sin(T*.5))*vec2(.0028,.0028*AS().x)*(1.+AU.x*.6);vec3 c=mix(C0,C1,vUv.y*.5);
for(int k=26;k>=1;k--){float fk=float(k);float a=texture2D(TT,vUv+dir*fk).a;c=mix(c,mix(C2,C1,fk/40.),a);}c=mix(c,C3,texture2D(TT,vUv).a);gl_FragColor=vec4(c,1.);}`,
crt:`void main(){vec2 uv=vUv-.5;float r2=dot(uv,uv);uv*=1.+r2*.2;uv+=.5;if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(C2*.06+C0*.1,1.);return;}
float ab=.003+AU.x*.008;vec3 c=vec3(texture2D(TX,uv+vec2(ab,0.)).r,texture2D(TX,uv).g,texture2D(TX,uv-vec2(ab,0.)).b);c*=.78+.22*sin(uv.y*1400.);c*=1.-r2*1.3;
c+=(h21(uv*R+fract(T)*50.)-.5)*.06;c+=.05*smoothstep(.97,1.,fract(uv.y*.5-T*.15));gl_FragColor=vec4(c,1.);}`,
flutedGlass:`void main(){float n=AS().x>1.2?28.:20.;float f=fract(vUv.x*n),b=f-.5;vec2 uv=vUv+vec2(b*.055*(1.+AU.x)+sin(vUv.y*3.+T*.3)*.004,0.);
vec3 c=texture2D(TX,uv).rgb;c+=pow(1.-abs(b*2.),10.)*.13;c*=.9+.1*cos(b*3.1416);gl_FragColor=vec4(c,1.);}`,
dither:`void main(){vec2 cell=floor(vUv*AS()*300.);vec3 col=texture2D(TX,(cell+.5)/(AS()*300.)).rgb;float l=dot(col,vec3(.3,.59,.11));float b=bay4(cell)-.5;
float q=clamp(floor(l*3.+.5+b*(1.+AU.x))/3.,0.,1.);gl_FragColor=vec4(ramp(q),1.);}`,
bloomGrain:`void main(){vec3 c=texture2D(TX,vUv).rgb;vec3 b=vec3(0.);for(int i=0;i<12;i++){float an=float(i)*.5236;vec2 o=vec2(cos(an),sin(an))/AS();b+=texture2D(TX,vUv+o*.012).rgb+texture2D(TX,vUv+o*.026).rgb;}b/=24.;
c+=max(b-.5,0.)*1.5*(1.+AU.x);vec2 q=vUv-.5;c*=1.-dot(q,q)*.9;c+=(h21(vUv*R+fract(T)*100.)-.5)*.09;gl_FragColor=vec4(c,1.);}`,
gradientMap:`void main(){vec3 col=texture2D(TX,vUv+vec2(sin(vUv.y*10.+T)*.004,0.)).rgb;float l=dot(col,vec3(.3,.59,.11));gl_FragColor=vec4(ramp(.5+.5*sin(l*6.2832+T*.6*(1.+AU.x))),1.);}`,
chromaGlitch:`void main(){vec2 uv=vUv;float band=floor(uv.y*24.);float k=floor(T*6.);float g=step(.8-AU.x*.3,h21(vec2(band,k)));uv.x+=g*(h21(vec2(band,k+1.))-.5)*.12;float ab=.005+g*.02;
vec3 c=vec3(texture2D(TX,uv+vec2(ab,0.)).r,texture2D(TX,uv).g,texture2D(TX,uv-vec2(ab,0.)).b);c=mix(c,C3,g*step(.9,h21(vec2(floor(uv.x*40.),band)))*.7);gl_FragColor=vec4(c,1.);}`
};
const GL={cv:null,gl:null,progs:{},buf:null,tex:[],blank:null,ok:null};
function glInit(){if(GL.ok!==null)return GL.ok;
 try{GL.cv=document.createElement('canvas');const gl=GL.cv.getContext('webgl',{preserveDrawingBuffer:true,premultipliedAlpha:false,antialias:false});
  if(!gl){GL.ok=false;return false;}GL.gl=gl;GL.buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,GL.buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  for(let k=0;k<2;k++){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));GL.tex.push(t);}
  GL.ok=true;}catch(err){GL.ok=false;}return GL.ok;}
function glProg(name){if(name in GL.progs)return GL.progs[name];const gl=GL.gl;
 const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('shader '+name,gl.getShaderInfoLog(s));return null;}return s;};
 const vs=sh(gl.VERTEX_SHADER,'attribute vec2 a;varying vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}'),fs=sh(gl.FRAGMENT_SHADER,SH_HEAD+SH[name]);
 if(!vs||!fs){GL.progs[name]=null;return null;}const p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);
 if(!gl.getProgramParameter(p,gl.LINK_STATUS)){GL.progs[name]=null;return null;}
 const u={};['R','T','C0','C1','C2','C3','SEED','AU','F','TX','TT'].forEach(k=>u[k]=gl.getUniformLocation(p,k));GL.progs[name]={p,u,a:gl.getAttribLocation(p,'a')};return GL.progs[name];}
const rgbF=h=>rgb(h).map(v=>v/255);
function runShader(e,name,texA,texT,time){const gl=GL.gl,pr=glProg(name);if(!pr)return false;const w=Math.ceil(e.W*e.S),h=Math.ceil(e.H*e.S);
 if(GL.cv.width!==w||GL.cv.height!==h){GL.cv.width=w;GL.cv.height=h;}gl.viewport(0,0,w,h);gl.useProgram(pr.p);
 gl.bindBuffer(gl.ARRAY_BUFFER,GL.buf);gl.enableVertexAttribArray(pr.a);gl.vertexAttribPointer(pr.a,2,gl.FLOAT,false,0,0);
 gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
 [[texA,0,'TX'],[texT,1,'TT']].forEach(([src,unit,k])=>{gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,GL.tex[unit]);if(src)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);
  else gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));gl.uniform1i(pr.u[k],unit);});
 const P=e.P,a=e.audio;gl.uniform2f(pr.u.R,w,h);gl.uniform1f(pr.u.T,time);gl.uniform3fv(pr.u.C0,rgbF(P.bg));gl.uniform3fv(pr.u.C1,rgbF(P.soft));gl.uniform3fv(pr.u.C2,rgbF(P.ink));gl.uniform3fv(pr.u.C3,rgbF(P.acc));
 gl.uniform1f(pr.u.SEED,(e.seed%997)/97);gl.uniform3f(pr.u.AU,a.lv,a.mix,a.onset);gl.uniform2f(pr.u.F,e.fx/e.W,1-e.fy/e.H);gl.drawArrays(gl.TRIANGLES,0,3);return true;}
/* ---------- set G: game-dev engines (procedural gen, game feel, genres, game UI) ---------- */
const mixHex=(a,b,t)=>{const A=rgb(a),B=rgb(b);return `rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')})`;};
const h01=(a,b)=>(hsh(a+1,b+7)%100003)/100003;
const easeOutBack=x=>{x=clamp(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const easeOutBounce=x=>{x=clamp(x);const n=7.5625,d=2.75;if(x<1/d)return n*x*x;if(x<2/d)return n*(x-=1.5/d)*x+.75;if(x<2.5/d)return n*(x-=2.25/d)*x+.9375;return n*(x-=2.625/d)*x+.984375;};
const darkOf=P=>lum(P.ink)<lum(P.bg)?P.ink:P.bg,lightOf=P=>lum(P.ink)<lum(P.bg)?P.bg:P.ink;
function dungeonMap(e,cols,rows){const k='DG|'+e.seed+'|'+cols+'|'+rows;if(cache.has(k))return cache.get(k);const R=rng(e.seed*7+3),g=new Uint8Array(cols*rows),rooms=[];
 const carve=(x,y)=>{if(x>0&&y>0&&x<cols-1&&y<rows-1)g[y*cols+x]=1;};
 (function sp(x,y,w,h,d){if(d>=4||(w<14&&h<10)){const rw=Math.max(3,Math.min(w-2,Math.floor(w*(.5+R()*.35)))),rh=Math.max(3,Math.min(h-2,Math.floor(h*(.5+R()*.35)))),rx=x+1+Math.floor(R()*Math.max(1,w-rw-1)),ry=y+1+Math.floor(R()*Math.max(1,h-rh-1));
   rooms.push([rx+(rw>>1),ry+(rh>>1)]);for(let j=ry;j<ry+rh;j++)for(let i=rx;i<rx+rw;i++)carve(i,j);return;}
  if(w/h>1.2||(h/w<=1.2&&R()<.5)){const s=Math.floor(w*(.35+R()*.3));sp(x,y,s,h,d+1);sp(x+s,y,w-s,h,d+1);}else{const s=Math.floor(h*(.35+R()*.3));sp(x,y,w,s,d+1);sp(x,y+s,w,h-s,d+1);}})(0,0,cols,rows,0);
 const path=[];for(let r=0;r<rooms.length-1;r++){let[x,y]=rooms[r];const[tx,ty]=rooms[r+1];while(x!==tx){carve(x,y);path.push([x,y]);x+=Math.sign(tx-x);}while(y!==ty){carve(x,y);path.push([x,y]);y+=Math.sign(ty-y);}}
 path.push(rooms[rooms.length-1]);const out={g,rooms,path};cacheSet(k,out);return out;}
function caveMap(e,cols,rows){const k='CV|'+e.seed+'|'+cols+'|'+rows;if(cache.has(k))return cache.get(k);const R=rng(e.seed*13+5);let g=new Uint8Array(cols*rows);for(let i=0;i<g.length;i++)g[i]=R()<.46?1:0;
 for(let it=0;it<5;it++){const n=new Uint8Array(cols*rows);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let w=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const X=x+dx,Y=y+dy;w+=(X<0||Y<0||X>=cols||Y>=rows)?1:g[Y*cols+X];}n[y*cols+x]=(w>4||(w===4&&g[y*cols+x]))?1:0;}g=n;}
 cacheSet(k,g);return g;}
const RUN=[['..XXX...','..XXX...','...X....','.XXXXX..','X.XXX.X.','..X.X...','.X...X..','X.....X.'],['..XXX...','..XXX...','...X....','..XXXX..','..XXX...','..X.X...','..X..X..','..X..X..']];
function rcMap(e){const k='RC|'+e.seed;if(cache.has(k))return cache.get(k);const R=rng(e.seed*3+11),n=24,m=new Uint8Array(n*n);
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const edge=!x||!y||x===n-1||y===n-1;m[y*n+x]=edge?1:(R()<.2?1+Math.floor(R()*3):0);}
 for(let a=0;a<360;a+=2){const x=Math.round(12+Math.cos(a*Math.PI/180)*7),y=Math.round(12+Math.sin(a*Math.PI/180)*7);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)m[(y+dy)*n+x+dx]=0;}
 const r={n,m};cacheSet(k,r);return r;}
function stepBoids(b,W,H,t,e){const ax=e.fx+Math.cos(t*.5)*W*.25,ay=e.fy+Math.sin(t*.7)*H*.25;
 for(let i=0;i<b.length;i++){const p=b[i];let sx=0,sy=0,ax2=0,ay2=0,cx=0,cy=0,n=0;
  for(let j=0;j<b.length;j++){if(i===j)continue;const q=b[j],dx=q[0]-p[0],dy=q[1]-p[1],d=dx*dx+dy*dy;if(d<4900){n++;ax2+=q[2];ay2+=q[3];cx+=q[0];cy+=q[1];if(d<600){sx-=dx/(d+1)*20;sy-=dy/(d+1)*20;}}}
  if(n){p[2]+=(ax2/n-p[2])*.05+(cx/n-p[0])*.0012;p[3]+=(ay2/n-p[3])*.05+(cy/n-p[1])*.0012;}p[2]+=sx*.06+(ax-p[0])*.00025;p[3]+=sy*.06+(ay-p[1])*.00025;
  const s=Math.hypot(p[2],p[3])||1,lim=4.5;if(s>lim){p[2]*=lim/s;p[3]*=lim/s;}}
 for(const p of b){p[0]=(p[0]+p[2]+W)%W;p[1]=(p[1]+p[3]+H)%H;}}
function astarRun(e,cols,rows){const k='AS|'+e.seed+'|'+cols+'|'+rows;if(cache.has(k))return cache.get(k);const N=e.N;let res=null;
 for(let at=0,thr=.6;at<5&&!res;at++,thr+=.06){const ob=new Uint8Array(cols*rows);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)ob[y*cols+x]=N(x*.18+7,y*.18+3)>thr?1:0;
  const s=[1,rows>>1],g=[cols-2,rows>>1];[s,g].forEach(([x,y])=>{for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<cols&&Y<rows)ob[Y*cols+X]=0;}});
  const id=(x,y)=>y*cols+x,gs=new Float32Array(cols*rows).fill(1e9),from=new Int32Array(cols*rows).fill(-1),closed=new Uint8Array(cols*rows),order=[],open=[id(s[0],s[1])],G=id(g[0],g[1]),hf=i=>Math.abs(i%cols-g[0])+Math.abs((i/cols|0)-g[1]);gs[open[0]]=0;let found=false;
  while(open.length){let bi=0;for(let q=1;q<open.length;q++)if(gs[open[q]]+hf(open[q])<gs[open[bi]]+hf(open[bi]))bi=q;const cur=open.splice(bi,1)[0];if(closed[cur])continue;closed[cur]=1;order.push(cur);if(cur===G){found=true;break;}
   const cx=cur%cols,cy=cur/cols|0;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cols||ny>=rows)return;const ni=id(nx,ny);if(ob[ni]||closed[ni])return;const ng=gs[cur]+1;if(ng<gs[ni]){gs[ni]=ng;from[ni]=cur;open.push(ni);}});}
  if(found){const path=[];let c=G;while(c!==-1){path.unshift(c);c=from[c];}res={ob,order,path};}}
 if(!res)res={ob:new Uint8Array(cols*rows),order:[],path:[]};cacheSet(k,res);return res;}
/* ---------- layouts (LTR, every element animated) ---------- */
const L={};
const isNews=e=>e.tag==='news'||e.tag==='mv';
const kick=e=>e.tag==='music'?e.T.single:isNews(e)?e.T.kicker:'Interview';
const main=e=>isNews(e)?e.T.headline:e.T.title;
function epBadge(e,cx,cy,r,d){const{ctx,P,T}=e,p=vis(e,d);if(p<=0||!T.ep)return;
 ctx.save();ctx.globalAlpha*=p;ctx.translate(cx,cy);ctx.rotate((1-p)*-.8+(e.M?e.M.tiltS*.3:0));{const k=(.5+.5*p)*(1+(e.M?.15*Math.min(1.4,e.M.labels):0));ctx.scale(k,k);}
 ctx.fillStyle=P.acc;disc(ctx,0,0,r);ctx.fill();const c=on(P,P.acc);ctx.fillStyle=c;
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.font=UI(900,r*.24);ctx.fillText('EP',0,-r*.44);
 const f=fit(ctx,T.ep,s=>fontStr(e.F,s),r*1.4,r*.9,r*.92,10,1,1);ctx.font=fontStr(e.F,f.size);ctx.fillText(f.lines[0]||'',0,r*.14);ctx.restore();}
L.yt_hero=e=>{const{ctx,W,H,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 pill(e,kick(e),72,96,30,P.acc,on(P,P.acc),'left',0,news);
 if(news)pill(e,T.date,W-72,96,26,P.ink,P.bg,'right',.1);else epBadge(e,W-150,150,82,.1);
 const sub=news?T.show:(T.guest?'with '+T.guest:''),subH=sub?72:0;
 const f=fit(ctx,U(e,main(e)),DF,W*.74,H*.5,124,50,2,1.22),lh=f.size*1.22,top=H-70-subH-f.lines.length*lh;
 hl(e,f.lines,f.size,DF,72,top,lh,P.ink,P.bg,'left',.2,true);
 if(sub)pill(e,sub,72,H-70-subH/2+6,26,P.bg,P.ink,'left',.6);
 if(!news)pill(e,T.show,W-72,H-96,22,P.bg,P.ink,'right',.7);
};
L.yt_center=e=>{const{ctx,W,H,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 const f=fit(ctx,U(e,main(e)),DF,W*.62,H*.42,112,46,2,1.12),lh=f.size*1.12,ph=150+f.lines.length*lh+90,pw=W*.72;
 const p=vis(e,0);if(p<=0)return;const php=ph*ease(p),x0=(W-pw)/2,y0=(H-php)/2;
 ctx.fillStyle=P.acc;ctx.fillRect(x0+18,y0+18,pw,php);ctx.fillStyle=P.bg;ctx.fillRect(x0,y0,pw,php);ctx.strokeStyle=P.ink;ctx.lineWidth=5;ctx.strokeRect(x0,y0,pw,php);
 ctx.save();ctx.beginPath();ctx.rect(x0,y0,pw,php);ctx.clip();
 const yy=(H-ph)/2;
 pill(e,kick(e),W/2,yy+72,26,P.ink,P.bg,'center',.15,news);
 txt(e,f.lines,DF(f.size),f.size,W/2,yy+124,lh,P.ink,'center',.25,f.size*.02);
 const sub=news?[T.date,T.show].filter(Boolean).join('  ·  '):[T.guest&&('with '+T.guest),T.ep&&('Episode '+T.ep)].filter(Boolean).join('  ·  ');
 ctx.globalAlpha=.8;txt(e,[sub],UI(600,30),30,W/2,yy+ph-80,50,P.ink,'center',.55);ctx.globalAlpha=1;ctx.restore();
};
L.yt_split=e=>{const{ctx,W,H,P,T}=e,sx=W*.48,DF=s=>fontStr(e.F,s),p0=ease(vis(e,0));
 ctx.fillStyle=P.bg;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sx,0);ctx.lineTo(sx+W*.06,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
 ctx.strokeStyle=P.acc;ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(sx+7,0);ctx.lineTo(sx+7+W*.06*p0,H*p0);ctx.stroke();
 drawPhoto(e,e.fx,e.fy,H*.33,.1);
 const x=90,mw=W*.38;pill(e,kick(e),x,130,28,P.acc,on(P,P.acc),'left',.15,true);
 const g=fit(ctx,U(e,T.guest),DF,mw,250,120,46,2,1.06),glh=g.size*1.06;let y=196;
 txt(e,g.lines,DF(g.size),g.size,x,y,glh,P.ink,'left',.25,g.size*.02);y+=g.lines.length*glh+10;
 if(T.role){ctx.globalAlpha=.72;txt(e,[T.role],UI(600,32),32,x,y,50,P.ink,'left',.42);ctx.globalAlpha=1;y+=64;}
 ctx.fillStyle=P.acc;ctx.fillRect(x,y,90*ease(vis(e,.5)),8);y+=34;
 const f=fit(ctx,main(e),s=>UI(800,s),mw,180,50,28,3,1.32);txt(e,f.lines,UI(800,f.size),f.size,x,y,f.size*1.32,P.ink,'left',.55);
 ctx.globalAlpha=.75;txt(e,[[T.show,T.ep&&('Episode '+T.ep)].filter(Boolean).join('   |   ')],UI(600,26),26,x,H-110,44,P.ink,'left',.75);ctx.globalAlpha=1;
};
L.yt_news=e=>{const{ctx,W,H,P,T}=e,DF=s=>fontStr(e.F,s);
 ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,100);ctx.fillStyle=P.ink;ctx.fillRect(0,100,W*ease(vis(e,0)),4);
 const sf=fit(ctx,U(e,T.show),DF,W*.5,90,50,24,1);txt(e,sf.lines,DF(sf.size),sf.size,72,22,56,P.ink,'left',.05);
 ctx.font=DF(sf.size);const swd=ctx.measureText(sf.lines[0]||'').width,dp=vis(e,.3);
 if(dp>0){ctx.fillStyle=P.acc;disc(ctx,72+swd+28,50,11*dp*(1+liveK(e,.35)));ctx.fill();}
 txt(e,[T.date],UI(600,28),28,W-72,22,56,P.ink,'right',.12);
 const f=fit(ctx,U(e,T.headline),DF,W-240,220,84,38,2,1.16),lh=f.size*1.16,barH=f.lines.length*lh+50,y1=H-70-barH;
 if(T.kicker){const K=T.kicker.toUpperCase();ctx.font=UI(900,38);const kw=ctx.measureText(K).width+100,kp=ease(vis(e,.2));
  if(kp>0){ctx.fillStyle=P.acc;ctx.fillRect(72,y1-76,kw*kp,76);ctx.save();ctx.beginPath();ctx.rect(72,y1-76,kw*kp,76);ctx.clip();
   const c=on(P,P.acc);ctx.fillStyle=c;disc(ctx,72+30,y1-38,8*(1+liveK(e,.45)));ctx.fill();
   kin(e,K,72+52,y1-36,38,UI(900,38),c,vis(e,.3),'left',0);ctx.restore();}}
 const bp=ease(vis(e,.3));ctx.fillStyle=P.ink;ctx.fillRect(72,y1,(W-144)*bp,barH);
 ctx.save();ctx.beginPath();ctx.rect(72,y1,(W-144)*bp,barH);ctx.clip();txt(e,f.lines,DF(f.size),f.size,110,y1+25,lh,P.bg,'left',.4,f.size*.02);ctx.restore();
 ctx.fillStyle=P.acc;ctx.fillRect(0,H-70,W,70);const tk=([T.show,T.headline].filter(Boolean).join('  ●  ')+'  ●  ').toUpperCase();
 ctx.font=UI(800,26);const u=ctx.measureText(tk).width||1;let off=-((e.tk*80)%u);ctx.fillStyle=on(P,P.acc);ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';
 ctx.globalAlpha=vis(e,.5);for(let x=off;x<W;x+=u)ctx.fillText(tk,x,H-34);ctx.globalAlpha=1;
};
L.yt_stack=e=>{const{W,H,P,T}=e;pill(e,kick(e),72,90,30,P.acc,on(P,P.acc),'left',0,true);pill(e,T.show,72,H-82,26,P.ink,P.bg,'left',.2);pill(e,T.date,W-72,H-82,24,P.bg,P.ink,'right',.3);};
L.sq_top=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 const f0=fit(ctx,U(e,T.show),DF,840,130,92,36,1);hl(e,f0.lines,f0.size,DF,60,52,f0.size*1.32,P.ink,P.bg,'left',0);
 if(!news&&T.ep){const ef=fit(ctx,T.ep,DF,380,300,290,80,1,1),p=vis(e,.3);
  if(p>0){ctx.save();ctx.globalAlpha*=p;ctx.translate(0,(1-ease(p))*140);ctx.font=DF(ef.size);ctx.direction='ltr';ctx.textAlign='right';ctx.textBaseline='alphabetic';
   ctx.lineJoin='round';ctx.lineWidth=10;ctx.strokeStyle=P.ink;ctx.strokeText(ef.lines[0],942,945);ctx.fillStyle=P.acc;ctx.fillText(ef.lines[0],942,945);ctx.restore();}
  pill(e,'Episode',940,945-ef.size*.86,22,P.ink,P.bg,'right',.4);}
 else if(news)pill(e,kick(e),940,915,30,P.acc,on(P,P.acc),'right',.3,true);
 const f=fit(ctx,U(e,main(e)),DF,news?560:500,330,64,28,4,1.22),lh=f.size*1.22,top=940-f.lines.length*lh;
 hl(e,f.lines,f.size,DF,60,top,lh,P.bg,P.ink,'left',.15,true);
 pill(e,news?T.date:T.guest,60,top-44,22,P.acc,on(P,P.acc),'left',.55);
};
L.sq_center=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s),cx=500,cy=500,r0=320,p=vis(e,0);if(p<=0)return;const r=r0*ease(p);
 ctx.fillStyle=P.acc;disc(ctx,cx+14,cy+14,r);ctx.fill();ctx.fillStyle=P.bg;disc(ctx,cx,cy,r);ctx.fill();ctx.strokeStyle=P.ink;ctx.lineWidth=5;ctx.stroke();
 ctx.save();disc(ctx,cx,cy,r);ctx.clip();
 pill(e,T.show,cx,262,24,P.ink,P.bg,'center',.15);
 const f=fit(ctx,U(e,main(e)),DF,470,290,84,30,3,1.12),lh=f.size*1.12;txt(e,f.lines,DF(f.size),f.size,cx,cy+5-f.lines.length*lh/2,lh,P.ink,'center',.25,f.size*.02);
 ctx.globalAlpha=.8;txt(e,[news?T.date:(T.guest&&'with '+T.guest)||''],UI(600,28),28,cx,cy+r0-150,48,P.ink,'center',.5);ctx.globalAlpha=1;
 pill(e,news?kick(e):(T.ep&&'Episode '+T.ep),cx,cy+r0-62,22,P.acc,on(P,P.acc),'center',.6,news);ctx.restore();
};
L.sq_photo=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 ctx.fillStyle=P.ink;ctx.fillRect(0,0,1000*ease(vis(e,0)),124);
 const sf=fit(ctx,U(e,T.show),DF,560,100,58,26,1);txt(e,sf.lines,DF(sf.size),sf.size,60,22,80,P.bg,'left',.08);
 txt(e,[news?T.date:(T.ep&&'Episode '+T.ep)||''],UI(800,26),26,940,22,80,P.bg,'right',.15);
 drawPhoto(e,500,445,228,.15);
 const g=fit(ctx,U(e,news?T.headline:T.guest),DF,860,130,86,36,1),glh=g.size*1.3;hl(e,g.lines,g.size,DF,500,735,glh,P.ink,P.bg,'center',.35,true);
 const f=fit(ctx,news?T.kicker:main(e),s=>UI(800,s),840,110,36,22,2,1.4);hl(e,f.lines,f.size,s=>UI(800,s),500,735+glh+6,f.size*1.4,P.bg,P.ink,'center',.5);
};
L.sq_news=e=>{const{ctx,P,T}=e,DF=s=>fontStr(e.F,s),c=on(P,P.acc);
 ctx.fillStyle=P.acc;ctx.fillRect(0,0,1000*ease(vis(e,0)),130);
 const lp=vis(e,.1);if(lp>0){ctx.fillStyle=c;disc(ctx,82,65,13*lp*(1+liveK(e,.4)));ctx.fill();}
 const kf=fit(ctx,U(e,T.kicker),DF,520,110,64,28,1);txt(e,kf.lines,DF(kf.size),kf.size,112,25,80,c,'left',.1);
 txt(e,[T.date],UI(600,28),28,940,25,80,c,'right',.15);
 const f=fit(ctx,U(e,T.headline),DF,800,330,86,34,4,1.18),lh=f.size*1.18,ph=f.lines.length*lh+140,y0=940-ph,pp=ease(vis(e,.2));
 if(pp>0){ctx.fillStyle=P.bg;ctx.fillRect(60,y0,880,ph*pp);ctx.strokeStyle=P.ink;ctx.lineWidth=6;ctx.strokeRect(60,y0,880,ph*pp);
  ctx.save();ctx.beginPath();ctx.rect(60,y0,880,ph*pp);ctx.clip();txt(e,f.lines,DF(f.size),f.size,100,y0+38,lh,P.ink,'left',.3,f.size*.02);
  pill(e,T.show,900,y0+ph-52,22,P.ink,P.bg,'right',.55);ctx.restore();}
};
L.sq_bottom=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 pill(e,news?kick(e):(T.ep&&'Episode '+T.ep),940,82,26,P.acc,on(P,P.acc),'right',.3,news);
 const s0=fit(ctx,U(e,T.show),DF,520,90,56,24,1);hl(e,s0.lines,s0.size,DF,60,48,s0.size*1.32,P.ink,P.bg,'left',0);
 const f=fit(ctx,U(e,main(e)),DF,840,380,94,36,3,1.2),lh=f.size*1.2,top=935-f.lines.length*lh;
 hl(e,f.lines,f.size,DF,60,top,lh,P.ink,P.bg,'left',.15,true);pill(e,news?T.date:T.guest,60,top-46,24,P.bg,P.ink,'left',.55);
};
L.sq_min=e=>{const{P,T}=e;pill(e,T.show,60,82,28,P.ink,P.bg,'left',0);pill(e,kick(e),940,82,26,P.acc,on(P,P.acc),'right',.1,true);pill(e,T.date,940,922,24,P.bg,P.ink,'right',.2);};
/* ---------- set B layouts ---------- */
function quoteBlock(e,x0,y0,pw,ph,qs,maxS,maxH){const{ctx,P,T}=e,DF=s=>fontStr(e.F,s),p=ease(vis(e,0));if(p<=0)return;
 ctx.fillStyle=P.acc;ctx.fillRect(x0+16,y0+16,pw*p,ph);ctx.fillStyle=P.bg;ctx.fillRect(x0,y0,pw*p,ph);ctx.strokeStyle=P.ink;ctx.lineWidth=4;ctx.strokeRect(x0,y0,pw*p,ph);
 ctx.save();ctx.beginPath();ctx.rect(x0,y0,pw*p,ph);ctx.clip();
 const qp=vis(e,.12);if(qp>0){ctx.save();ctx.globalAlpha*=qp;ctx.font=DF(qs);ctx.fillStyle=P.acc;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.direction='ltr';ctx.translate(0,(1-qp)*60);ctx.fillText('“',x0+44,y0+qs*.85);ctx.restore();}
 const tx=x0+60,ty=y0+qs*.72,f=fit(ctx,main(e),DF,pw-120,maxH,maxS,36,4,1.12),lh=f.size*1.12;
 txt(e,f.lines,DF(f.size),f.size,tx,ty,lh,P.ink,'left',.25,f.size*.02);
 const by=ty+f.lines.length*lh+28;ctx.fillStyle=P.acc;ctx.fillRect(tx,by,70*ease(vis(e,.5)),6);
 txt(e,['— '+[T.guest,T.role].filter(Boolean).join(', ')],UI(600,28),28,tx,by+18,44,P.ink,'left',.55);ctx.restore();
}
L.yt_quote=e=>{const{W,H,P,T}=e;quoteBlock(e,60,60,W*.66-60,H-120,300,92,H-120-300);
 pill(e,T.show,W-72,H-96,22,P.bg,P.ink,'right',.6);if(T.ep)pill(e,'Episode '+T.ep,W-72,96,22,P.acc,on(P,P.acc),'right',.65);};
L.sq_quote=e=>{const{P,T}=e;quoteBlock(e,60,60,880,730,280,84,380);
 pill(e,T.show,60,895,24,P.bg,P.ink,'left',.6);if(T.ep)pill(e,'Episode '+T.ep,940,895,24,P.acc,on(P,P.acc),'right',.65);};
function frame(e,b0,m,maxW,maxH,maxS,bottom){const{ctx,W,H,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s),b=b0*ease(vis(e,0));
 ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,b);ctx.fillRect(0,H-b,W,b);ctx.fillRect(0,0,b,H);ctx.fillRect(W-b,0,b,H);
 if(b>1){ctx.strokeStyle=P.ink;ctx.lineWidth=3;ctx.strokeRect(b,b,W-2*b,H-2*b);}
 pill(e,T.show,m,m+20,24,P.bg,P.ink,'left',.1);
 pill(e,news?T.date:(T.ep&&'Episode '+T.ep),W-m,m+20,22,P.acc,on(P,P.acc),'right',.15);
 const f=fit(ctx,U(e,main(e)),DF,maxW,maxH,maxS,36,3,1.2),lh=f.size*1.2,top=bottom-f.lines.length*lh;
 pill(e,kick(e),m,top-44,24,P.acc,on(P,P.acc),'left',.2,news);hl(e,f.lines,f.size,DF,m,top,lh,P.ink,P.bg,'left',.25,true);
 if(!news&&T.guest)pill(e,'with '+T.guest,W-m,bottom+28,22,P.bg,P.ink,'right',.55);}
L.yt_frame=e=>frame(e,46,100,1600*.7,900*.42,110,900-120);
L.sq_frame=e=>frame(e,36,80,760,360,84,872);
L.yt_bigep=e=>{const{ctx,W,H,P,T}=e,DF=s=>fontStr(e.F,s),p=ease(vis(e,0)),pw=W*.5*p;
 ctx.fillStyle=P.bg;ctx.fillRect(W-pw,0,pw,H);ctx.fillStyle=P.acc;ctx.fillRect(W-pw,0,10,H);
 if(T.ep){const ef=fit(ctx,T.ep,DF,W*.42,H*.78,560,80,1,1),q=vis(e,.15);
  if(q>0){ctx.save();ctx.globalAlpha*=q;ctx.translate(0,(1-ease(q))*140);ctx.font=DF(ef.size);ctx.direction='ltr';ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.lineJoin='round';ctx.lineWidth=14;ctx.strokeStyle=P.ink;ctx.strokeText(ef.lines[0],W*.25,H*.52);ctx.fillStyle=P.acc;ctx.fillText(ef.lines[0],W*.25,H*.52);ctx.restore();}
  pill(e,'Episode',72,90,26,P.ink,P.bg,'left',.1);}
 const x=W*.5+80,mw=W*.5-150;pill(e,kick(e),x,140,26,P.acc,on(P,P.acc),'left',.2,true);
 const f=fit(ctx,U(e,main(e)),DF,mw,400,100,40,4,1.1),lh=f.size*1.1;txt(e,f.lines,DF(f.size),f.size,x,190,lh,P.ink,'left',.28,f.size*.02);
 let y=190+f.lines.length*lh+20;if(T.guest){txt(e,['with '+T.guest],UI(800,34),34,x,y,50,P.ink,'left',.5);y+=50;}
 if(T.role){ctx.globalAlpha=.7;txt(e,[T.role],UI(600,26),26,x,y,40,P.ink,'left',.56);ctx.globalAlpha=1;}
 pill(e,T.show,x,H-96,22,P.ink,P.bg,'left',.65);};
function tape(e,y1,y2,ks,maxW,maxH,maxS){const{ctx,W,H,P}=e,DF=s=>fontStr(e.F,s),p1=ease(vis(e,0)),p2=ease(vis(e,.2));
 if(p1>0){ctx.save();ctx.translate(W/2-(1-p1)*W*1.3,y1);ctx.rotate(-.07);ctx.fillStyle=P.acc;ctx.fillRect(-W,-ks*1.05,W*2,ks*2.1);
  const K=(kick(e)+'  ●  ').toUpperCase();ctx.font=UI(900,ks);const u=ctx.measureText(K).width||1;ctx.fillStyle=on(P,P.acc);ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';
  for(let x=-W-((e.tk*90)%u);x<W;x+=u)ctx.fillText(K,x,ks*.05);ctx.restore();}
 const f=fit(ctx,U(e,main(e)),DF,maxW,maxH,maxS,36,2,1.12),lh=f.size*1.12,bh=f.lines.length*lh+44;
 if(p2>0){ctx.save();ctx.translate(W/2+(1-p2)*W*1.3,y2);ctx.rotate(.035);ctx.fillStyle=P.ink;ctx.fillRect(-W,-bh/2,W*2,bh);
  txt(e,f.lines,DF(f.size),f.size,-maxW/2,-bh/2+22,lh,P.bg,'left',.35,f.size*.02);ctx.restore();}}
L.yt_band=e=>{const{W,H,P,T}=e;tape(e,H*.3,H*.62,40,W*.84,H*.34,92);pill(e,T.show,72,80,24,P.bg,P.ink,'left',.4);pill(e,isNews(e)?T.date:(T.ep&&'Episode '+T.ep),W-72,H-70,22,P.bg,P.ink,'right',.5);};
L.sq_band=e=>{const{P,T}=e;tape(e,300,600,36,860,300,86);pill(e,T.show,60,80,24,P.bg,P.ink,'left',.4);pill(e,isNews(e)?T.date:(T.ep&&'Episode '+T.ep),940,920,22,P.bg,P.ink,'right',.5);};
/* ---------- set D layouts: music ---------- */
L.sq_album=e=>{const{ctx,P,T}=e,DF=s=>fontStr(e.F,s);
 const a=fit(ctx,U(e,T.show),DF,640,220,104,36,2,1.08);hl(e,a.lines,a.size,DF,60,56,a.size*1.3,P.ink,P.bg,'left',0,true);
 pill(e,kick(e),940,82,22,P.acc,on(P,P.acc),'right',.2,true);
 const p=ease(vis(e,.15)),bh=180;ctx.fillStyle=P.bg;ctx.fillRect(0,1000-bh*p,1000,bh);ctx.fillStyle=P.ink;ctx.fillRect(0,1000-bh*p,1000*p,4);
 const f=fit(ctx,U(e,main(e)),DF,600,120,74,28,2,1.08),lh=f.size*1.08;txt(e,f.lines,DF(f.size),f.size,60,1000-36-f.lines.length*lh,lh,P.ink,'left',.3,f.size*.02);
 txt(e,[T.date||''],UI(800,24),24,940,1000-150,40,P.ink,'right',.45);
 if(T.role){ctx.globalAlpha=.7;txt(e,[T.role],UI(600,22),22,940,1000-110,36,P.ink,'right',.5);ctx.globalAlpha=1;}
};
L.yt_mv=e=>{const{ctx,W,H,P,T}=e,DF=s=>fontStr(e.F,s);
 pill(e,kick(e),72,90,26,P.acc,on(P,P.acc),'left',0,true);pill(e,T.date,W-72,90,22,P.bg,P.ink,'right',.1);
 const f=fit(ctx,'“'+U(e,main(e))+'”',DF,W*.8,H*.4,150,50,2,1.14),lh=f.size*1.14,top=H-80-f.lines.length*lh;
 pill(e,T.show,72,top-42,34,P.bg,P.ink,'left',.12);
 hl(e,f.lines,f.size,DF,72,top,lh,P.ink,P.bg,'left',.25,true);
 if(T.role){ctx.globalAlpha=.85;pill(e,T.role,W-72,H-70,20,P.bg,P.ink,'right',.55);ctx.globalAlpha=1;}
};
/* ---------- set G layouts: game UI ---------- */
const PX=s=>`400 ${Math.round(s)}px "Press Start 2P", monospace`;
function gbox(ctx,x,y,w,h,P){ctx.fillStyle=P.bg;ctx.fillRect(x,y,w,h);ctx.strokeStyle=P.ink;ctx.lineWidth=6;ctx.strokeRect(x+3,y+3,w-6,h-6);ctx.strokeStyle=P.acc;ctx.lineWidth=2;ctx.strokeRect(x+12,y+12,w-24,h-24);}
function hud(e,pw,lw,dh,ts){const{ctx,W,H,P,T}=e,news=isNews(e),p=ease(vis(e,0));if(p<=0)return;ctx.save();ctx.globalAlpha=p;
 gbox(ctx,36,30,pw,150,P);const sn=fit(ctx,String(T.show||'').toUpperCase(),PX,pw-70,40,22*ts,10,1);txt(e,sn.lines,PX(sn.size),sn.size,66,50,40,P.ink,'left',.1);
 const hp=.55+.35*Math.sin(e.t*.6),xp=(e.t*.07)%1;ctx.font=PX(14*ts);ctx.fillStyle=P.ink;ctx.textBaseline='middle';ctx.textAlign='left';ctx.direction='ltr';ctx.fillText('HP',66,112);ctx.fillText('XP',66,146);
 const bw=pw-120;ctx.fillStyle=P.soft;ctx.fillRect(112,102,bw,20);ctx.fillRect(112,136,bw,20);ctx.fillStyle=P.acc;ctx.fillRect(112,102,bw*hp,20);ctx.fillStyle=P.ink;ctx.fillRect(112,136,bw*xp,20);
 gbox(ctx,W-36-lw,30,lw,150,P);const lvl=news?String(T.kicker||'').toUpperCase():(T.ep?'LEVEL '+T.ep:'LEVEL 1'),lf=fit(ctx,lvl,PX,lw-60,40,26*ts,10,1);
 txt(e,lf.lines,PX(lf.size),lf.size,W-66,50,44,P.ink,'right',.15);txt(e,['SCORE '+String(Math.floor(e.t*137)%1e6).padStart(6,'0')],PX(15*ts),15*ts,W-66,112,40,P.acc,'right',.2);
 const bx=36,by=H-dh-36,bwd=W-72;gbox(ctx,bx,by,bwd,dh,P);const name=String(news?T.show:(T.guest||T.show)||'').toUpperCase();
 if(name){ctx.font=PX(17*ts);const nw=ctx.measureText(name).width+40;ctx.fillStyle=P.acc;ctx.fillRect(bx+30,by-36,nw,46);ctx.fillStyle=on(P,P.acc);ctx.textAlign='left';ctx.fillText(name,bx+50,by-12);}
 const f=fit(ctx,U(e,main(e)),s=>fontStr(e.F,s),bwd-130,dh-70,60*ts,20,2,1.3);txt(e,f.lines,fontStr(e.F,f.size),f.size,bx+56,by+36,f.size*1.3,P.ink,'left',.25);
 if(vis(e,.95)>=1&&Math.floor(e.tt*2.5)%2===0){ctx.fillStyle=P.acc;ctx.beginPath();ctx.moveTo(bx+bwd-72,by+dh-52);ctx.lineTo(bx+bwd-40,by+dh-52);ctx.lineTo(bx+bwd-56,by+dh-32);ctx.closePath();ctx.fill();}
 ctx.restore();}
L.yt_hud=e=>hud(e,560,464,224,1);
L.sq_hud=e=>hud(e,520,330,250,.85);
L.yt_vn=e=>{const{ctx,W,H,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);
 const pp=vis(e,.05);if(pp>0){ctx.save();ctx.globalAlpha*=pp;const px=W*.68,py=H*.05+(1-ease(pp))*40,pw=W*.27,ph=H*.64;ctx.save();rr(ctx,px,py,pw,ph,24);ctx.clip();
  if(photo){const D=duo(P),s=Math.max(pw,ph);ctx.drawImage(D,px+(pw-s)/2,py+(ph-s)/2,s,s);}else{ctx.fillStyle=P.soft;ctx.fillRect(px,py,pw,ph);ctx.fillStyle=P.bg;disc(ctx,px+pw/2,py+ph*.36,pw*.2);ctx.fill();ctx.beginPath();ctx.ellipse(px+pw/2,py+ph*.98,pw*.42,ph*.4,0,0,TAU);ctx.fill();}
  ctx.restore();ctx.strokeStyle=P.ink;ctx.lineWidth=5;rr(ctx,px,py,pw,ph,24);ctx.stroke();ctx.restore();}
 pill(e,news?T.kicker:(T.ep?'Chapter '+T.ep:'Chapter 1'),60,70,24,P.acc,on(P,P.acc),'left',.1);
 const ch=e.tag==='news'?['> Read the story','> Watch the report']:(e.tag==='music'||e.tag==='mv')?['> Play the track','> See the credits']:['> Listen to the episode','> Read the show notes'];
 ch.forEach((c,k)=>{const q=vis(e,.55+k*.1);if(q<=0)return;ctx.save();ctx.globalAlpha*=q;ctx.translate((1-ease(q))*-60,0);ctx.fillStyle=P.bg;rr(ctx,60,130+k*72,560,56,12);ctx.fill();ctx.strokeStyle=k?P.ink:P.acc;ctx.lineWidth=3;ctx.stroke();
  ctx.fillStyle=P.ink;ctx.font=UI(800,24);ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText(c,86,158+k*72);ctx.restore();});
 const by=H*.71,bh=H*.25;ctx.save();ctx.globalAlpha=.95;ctx.fillStyle=P.bg;rr(ctx,40,by,W-80,bh,18);ctx.fill();ctx.restore();ctx.strokeStyle=P.ink;ctx.lineWidth=4;rr(ctx,40,by,W-80,bh,18);ctx.stroke();
 const name=news?T.show:(T.guest||T.show);if(name){ctx.font=UI(900,26);const nw=ctx.measureText(name).width+44;ctx.fillStyle=P.ink;rr(ctx,80,by-26,nw,50,10);ctx.fill();ctx.fillStyle=P.bg;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(name,102,by);}
 const f=fit(ctx,main(e),DF,W-220,bh-60,64,26,2,1.22);txt(e,f.lines,DF(f.size),f.size,92,by+38,f.size*1.22,P.ink,'left',.3);
 if(vis(e,.95)>=1&&Math.floor(e.tt*2.5)%2===0){ctx.fillStyle=P.acc;ctx.beginPath();ctx.moveTo(W-110,by+bh-40);ctx.lineTo(W-78,by+bh-40);ctx.lineTo(W-94,by+bh-22);ctx.closePath();ctx.fill();}
};
function arcade(e,lines,size,cx,yc,lh,d){const{ctx,P}=e,p=vis(e,d);if(p<=0)return;const DF=s=>fontStr(e.F,s);ctx.save();ctx.translate(cx,yc);const b=easeOutBack(p);ctx.scale(b,b);ctx.globalAlpha*=clamp(p*2);
 ctx.font=DF(size);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.lineJoin='round';const y0=-(lines.length-1)*lh/2;
 lines.forEach((l,i)=>{const y=y0+i*lh;ctx.fillStyle=P.acc;ctx.fillText(l,10,y+10);ctx.strokeStyle=P.ink;ctx.lineWidth=Math.max(6,size*.09);ctx.strokeText(l,0,y);ctx.fillStyle=P.bg;ctx.fillText(l,0,y);});ctx.restore();}
L.yt_title=e=>{const{ctx,W,H,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s);const logo=U(e,T.show||''),f=fit(ctx,logo,DF,W*.84,H*.42,190,40,2,1);arcade(e,f.lines,f.size,W/2,H*.34,f.size*1.02,0);
 const sf=fit(ctx,main(e),s=>UI(800,s),W*.74,60,36,18,1);hl(e,sf.lines,sf.size,s=>UI(800,s),W/2,H*.56,sf.size*1.5,P.ink,P.bg,'center',.3);
 const q=vis(e,.5);if(q>0&&(e.still||Math.floor(e.tt*2)%2===0)){ctx.font=PX(26);const w=ctx.measureText('PRESS START').width+50;ctx.fillStyle=P.bg;ctx.fillRect(W/2-w/2,H*.76-30,w,60);ctx.fillStyle=P.acc;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('PRESS START',W/2,H*.76+2);}
 const foot=[news?T.date:(e.tag==='interview'&&T.ep?'EP '+T.ep:T.date||''),T.show].filter(Boolean).join('  ·  ').toUpperCase();ctx.font=PX(13);const fw=ctx.measureText(foot).width+30;
 if(vis(e,.6)>0){ctx.fillStyle=P.bg;ctx.fillRect(W/2-fw/2,H-70,fw,36);ctx.fillStyle=P.ink;ctx.textAlign='center';ctx.fillText(foot,W/2,H-51);}
};
L.sq_cart=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s),p=ease(vis(e,0));
 ctx.fillStyle=P.ink;ctx.fillRect(0,0,1000*p,120);ctx.fillStyle=P.acc;ctx.fillRect(0,120,1000*p,10);
 const sn=fit(ctx,String(T.show||'').toUpperCase(),PX,620,40,26,10,1);txt(e,sn.lines,PX(sn.size),sn.size,50,40,44,P.bg,'left',.1);txt(e,['1 PLAYER'],PX(16),16,950,42,40,P.acc,'right',.15);
 const f=fit(ctx,U(e,main(e)),DF,860,280,116,40,3,1.02);arcade(e,f.lines,f.size,500,700,f.size*1.04,.2);
 ctx.fillStyle=P.ink;ctx.fillRect(0,1000-104,1000*p,104);txt(e,[(news?T.date:(T.guest||'')).toUpperCase()],PX(16),16,50,1000-72,40,P.bg,'left',.4);
 txt(e,[news?String(T.kicker||'').toUpperCase():(T.ep?'LEVEL '+T.ep:'')],PX(20),20,950,1000-72,40,P.acc,'right',.45);
};
L.sq_card=e=>{const{ctx,P,T}=e,news=isNews(e),DF=s=>fontStr(e.F,s),p=ease(vis(e,0));if(p<=0)return;const x0=60,y0=40,w=880,h=920,ax=90,ay=170,aw=820,ah=430;
 ctx.save();ctx.globalAlpha=p;ctx.translate(0,(1-p)*80);ctx.fillStyle=P.acc;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x0,y0,w,h,34);else ctx.rect(x0,y0,w,h);ctx.rect(ax,ay,aw,ah);ctx.fill('evenodd');
 ctx.strokeStyle=P.ink;ctx.lineWidth=8;rr(ctx,x0,y0,w,h,34);ctx.stroke();ctx.lineWidth=5;ctx.strokeRect(ax,ay,aw,ah);
 const name=news?T.show:(T.guest||T.show);ctx.fillStyle=P.bg;ctx.fillRect(ax,70,aw,82);ctx.lineWidth=4;ctx.strokeRect(ax,70,aw,82);
 const nf=fit(ctx,U(e,name),DF,600,70,52,20,1);txt(e,nf.lines,DF(nf.size),nf.size,ax+24,70,82,P.ink,'left',.1);
 txt(e,[news?String(T.kicker||'').toUpperCase():(T.ep?'EP '+T.ep:'')],PX(18),18,ax+aw-24,70,82,P.ink,'right',.15);
 ctx.fillStyle=P.bg;ctx.fillRect(ax,ay+ah+14,aw,56);ctx.strokeRect(ax,ay+ah+14,aw,56);txt(e,[(news?T.date:(T.role||'')).toUpperCase()],UI(800,22),22,ax+20,ay+ah+14,56,P.ink,'left',.3);
 const ty=ay+ah+84,thh=y0+h-ty-40;ctx.fillStyle=P.bg;ctx.fillRect(ax,ty,aw,thh);ctx.strokeRect(ax,ty,aw,thh);
 const f=fit(ctx,main(e),DF,aw-60,thh-40,54,22,3,1.2);txt(e,f.lines,DF(f.size),f.size,ax+30,ty+20,f.size*1.2,P.ink,'left',.35);ctx.restore();
};
/* ---------- sync map ----------
   Every visual layer of every template reads one voice parameter through this map.
   [label, group, default parameter, 's' = scalar only, 'a' = scalar or per-letter arrays] */
const SYNC_CH={
 speed:['Motion speed','Art','env','s'],
 shake:['Camera shake','Art','onset','s'],
 stroke:['Line weight','Art','mid','s'],
 warp:['Noise-field warp','Art','flux','s'],
 palette:['Palette swap','Color','mix','s'],
 accent:['Accent intensity','Color','cen','s'],
 glow:['Glow','Color','env','s'],
 flash:['Flash','Color','onset','s'],
 dim:['Fade in silence','Color','pause','s'],
 grain:['Film grain','Texture','zcr','s'],
 letters:['Letter bounce','Type','spec','a'],
 scale:['Letter scale','Type','bass','s'],
 tilt:['Letter tilt','Type','into','s'],
 word:['Word pulse','Type','onset','s'],
 bars:['Highlight bars','Type','env','s'],
 labels:['Labels, badges and live dots','Type','onset','s'],
 ticker:['Ticker speed','Type','rate','s'],
 ring:['Photo ring','Photo','lv','s']
};
const SYNC_DEF=()=>Object.fromEntries(Object.entries(SYNC_CH).map(([k,v])=>[k,v[2]]));
state.sync=Object.assign({on:true,amt:1},state.sync||{});
state.sync.map=Object.assign(SYNC_DEF(),state.sync.map||{});
function syncVals(A,still){const S=state.sync;if(still||!S.on||!(S.amt>0))return null;const g=S.amt,M={A,g};
 for(const k in SYNC_CH){const p=S.map[k];M[k]=p==='off'?0:(p==='spec'||p==='wave')?g:clamp(A[p]||0)*g;}
 M.tiltS=S.map.tilt==='off'?0:(clamp(A[S.map.tilt]||0)-.5)*2*(A.vad??1)*g;return M;}
/* color helpers */
const toHex=a=>'#'+a.map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');
const hexMix=(a,b,t)=>{const A=rgb(a),B=rgb(b);return toHex(A.map((v,i)=>v+(B[i]-v)*t));};
const hexA=(h,a)=>{const c=rgb(h);return `rgba(${c[0]},${c[1]},${c[2]},${a})`;};
function rgb2hsl(c){const r=c[0]/255,g=c[1]/255,b=c[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
 if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6;}return[h,s,l];}
function hsl2hex(h,s,l){const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1));};return toHex([f(0),f(8),f(4)].map(v=>v*255));}
/* palette swap is two-state (one palette per speaker); accent intensity has four steps, so cached text layers stay few */
const modCache=new Map();
function modPal(P,M){if(!M)return P;const sw=M.palette>.5?1:0,br=Math.round(clamp(M.accent)*3)/3;if(!sw&&br<.01)return P;
 const k=P.n+'|'+sw+'|'+br;let r=modCache.get(k);if(r)return r;let[h,s,l]=rgb2hsl(rgb(P.acc));if(sw)h=(h+150/360)%1;
 s=Math.min(1,s+.4*br);l=l+(.55-l)*.3*br;const acc=hsl2hex(h,s,l);
 r=Object.assign({},P,{n:k,acc,soft:sw?hexMix(P.soft,acc,.22):P.soft});modCache.set(k,r);return r;}
/* line weight: every stroke an engine draws is multiplied while the hook is on */
const LWD=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'lineWidth');
function strokeHook(ctx,k){if(!LWD||Math.abs(k-1)<.01)return;Object.defineProperty(ctx,'lineWidth',{configurable:true,get(){return LWD.get.call(this);},set(v){LWD.set.call(this,v*k);}});ctx.__hk=1;}
function unhook(ctx){if(ctx.__hk){delete ctx.lineWidth;ctx.__hk=0;}}
/* per-letter values for type */
function letterSync(e,i,n){const M=e.M,A=M.A,p=state.sync.map.letters;if(p==='off')return 0;
 if(p==='spec')return A.spec[Math.min(NB-1,Math.floor(i/Math.max(1,n)*NB*.8))]*M.letters;
 if(p==='wave')return A.wave[(i*11)%128]*M.letters*1.2;
 return M.letters*(.6+.4*Math.sin(i*1.9+(A.beats|0)*.7));}
const preC=new Map();
function prefixW(ctx,font,s){const k=font+'\u0001'+s;let a=preC.get(k);if(a)return a;a=new Float32Array(s.length+1);
 for(let i=1;i<=s.length;i++)a[i]=ctx.measureText(s.slice(0,i)).width;preC.set(k,a);if(preC.size>800)preC.delete(preC.keys().next().value);return a;}
function drawSynced(e,s,sx,y,size,font,a0,amp){const ctx=e.ctx,M=e.M,A=M.A,n=s.length,pw=prefixW(ctx,font,s),words=[];
 {let st=-1;for(let i=0;i<=n;i++){const blank=i===n||s[i]===' ';if(!blank&&st<0)st=i;if(blank&&st>=0){words.push([st,i]);st=-1;}}}
 const act=words.length?(((A.beats|0)+(s.charCodeAt(0)||0)+n)%words.length):-1,wp=M.word,rot=M.tiltS*.2,sc0=1+.12*M.scale;
 for(let i=0;i<n;i++){const ch=s[i];if(ch===' ')continue;const cw=pw[i+1]-pw[i],v=letterSync(e,i,n),inW=act>=0&&i>=words[act][0]&&i<words[act][1];
  const sc=sc0*(1+.08*Math.abs(v))*(inW?1+.16*wp:1),dy=-v*size*.3-(inW?wp*size*.08:0)+(amp?Math.sin(e.tt*2.4+i*.45)*amp:0);
  ctx.save();ctx.translate(sx+pw[i]+cw/2,y+dy);if(rot)ctx.rotate(rot);if(sc!==1)ctx.scale(sc,sc);ctx.fillText(ch,-cw/2,0);ctx.restore();}
 if(act>=0&&wp>.04){const[a,b]=words[act];ctx.globalAlpha=a0*clamp(wp);ctx.fillRect(sx+pw[a],y+size*.5,pw[b]-pw[a],Math.max(2,size*.07));ctx.globalAlpha=a0;}}
const liveK=(e,k)=>e.still?0:(e.M?1.3*Math.min(1,e.M.labels):k*Math.sin(e.tt*6));
/* art-layer effects */
function postFX(e,M){const{ctx,W,H,P}=e,dark=lum(P.bg)<.4,op=dark?'screen':'multiply';
 if(M.glow>.02){const r=Math.max(W,H)*.65,g=ctx.createRadialGradient(e.fx,e.fy,0,e.fx,e.fy,r);g.addColorStop(0,hexA(P.acc,1));g.addColorStop(1,hexA(P.acc,0));
  ctx.save();ctx.globalCompositeOperation=op;ctx.globalAlpha=.3*Math.min(1.4,M.glow);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();}
 if(M.flash>.04){ctx.save();ctx.globalCompositeOperation=op;ctx.globalAlpha=.2*Math.min(1.4,M.flash);ctx.fillStyle=P.acc;ctx.fillRect(0,0,W,H);ctx.restore();}
 if(M.dim>.02){ctx.save();ctx.globalAlpha=.5*Math.min(1.4,M.dim);ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);ctx.restore();}}
let GRAIN=null;
function grainTex(){if(GRAIN)return GRAIN;const c=mk(256,256),x=c.getContext('2d'),im=x.createImageData(256,256),d=im.data,R=rng(777);
 for(let i=0;i<d.length;i+=4){const v=R();if(v<.14){d[i]=d[i+1]=d[i+2]=255;d[i+3]=60+Math.floor(R()*170);}else if(v>.86)d[i+3]=60+Math.floor(R()*170);}x.putImageData(im,0,0);GRAIN=c;return c;}
function grain(e,g){const{ctx,W,H,tt}=e,f=Math.floor(tt*24);ctx.save();ctx.globalAlpha=Math.min(.85,.5*g);ctx.translate(-(hsh(f,1)%256),-(hsh(f,2)%256));
 ctx.fillStyle=ctx.createPattern(grainTex(),'repeat');ctx.fillRect(0,0,W+256,H+256);ctx.restore();}
/* ---------- render ----------
   tt = time inside the text loop; engines run on T0+tt; still=true draws the settled frame. */
const T0=2.2;
function viewText(tag){const T=state.text;
 if(tag==='music')return Object.assign({},T,{show:T.artist,title:T.track,guest:'',role:T.album,ep:'',date:T.release});
 if(tag==='mv')return Object.assign({},T,{show:T.artist,headline:T.track,title:T.track,guest:T.artist,role:T.album,date:T.release,kicker:T.mvLabel,ep:''});
 return T;}
let RLAST=null;
function render(i,ctx,pxW,tt,still,live){
 const d=TPLS[i],W=d.fmt==='yt'?1600:1000,H=d.fmt==='yt'?900:1000,S=pxW/W,st=tst(i),F=FONTS[st.font],b=BOX[d.layout];
 const T=viewText(st.tag);let word=d.word?(d.word in T?T[d.word]:d.word):'';word=word||T.show||' ';if(F.up)word=word.toUpperCase();
 const A=(live&&AU.live)?AU.live:simAudio(T0+tt),M=syncVals(A,still),SM=state.sync.map,P=modPal(PAL[st.pal],M);
 const ks=M&&SM.speed!=='off'?Math.min(1,M.g):0,kt=M&&SM.ticker!=='off'?Math.min(1,M.g):0;
 const et=T0+tt+ks*(((A.clk&&A.clk[SM.speed])||0)-tt),ek=T0+tt+kt*(((A.clk&&A.clk[SM.ticker])||0)-tt);
 const e={ctx,W,H,S,t:et,tk:ek,tt,still,M,motion:st.motion,tag:st.tag,seed:st.seed,audio:A,P,F,T,tpl:d,fmt:d.fmt,word,R:rng(st.seed),N:noise(st.seed),bx:b[0]*W,by:b[1]*H,bw:b[2]*W,bh:b[3]*H};
 e.fx=e.bx+e.bw/2;e.fy=e.by+e.bh/2;
 e.inner=d.layout==='yt_split'?H*.33+46:d.layout==='sq_photo'?290:Math.min(W,H)*.1;
 if(M&&M.warp>.01){const N0=e.N,w=Math.min(1.5,M.warp);e.N=(x,y=0,z=0)=>N0(x+w*.35*Math.sin(y*2.3+tt*1.7),y+w*.35*Math.cos(x*2.1+tt*1.3),z+w*.4);}
 ctx.setTransform(S,0,0,S,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';let shx=0,shy=0;ctx.save();
 if(M){ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);const sh=Math.min(1.5,M.shake);
  shx=(Math.sin(tt*91.7)+Math.sin(tt*53.1))*.5*sh*W*.011;shy=(Math.cos(tt*77.3)+Math.sin(tt*41.9))*.5*sh*H*.011;
  ctx.translate(shx,shy);strokeHook(ctx,1+1.3*M.stroke);}
 try{E[d.engine](e);}finally{unhook(ctx);ctx.restore();}
 if(M)postFX(e,M);
 ctx.save();if(M)ctx.translate(shx*.3,shy*.3);L[d.layout](e);ctx.restore();
 if(M&&M.grain>.02)grain(e,M.grain);
 ctx.setTransform(1,0,0,1,0,0);if(live)RLAST={A,M};
}

/* ---------- sketch runner ----------
   Space: pause or play  ·  S: save PNG  ·  R: new seed  ·  0: replay the text intro
   Drop an audio file on the page to drive the voice-reactive codes, or an image to set the guest photo. */
function runSketch(i){
 const d=TPLS[i],cv=document.getElementById('c'),W=d.fmt==='yt'?1280:1080,H=d.fmt==='yt'?720:1080;cv.width=W;cv.height=H;
 const ctx=cv.getContext('2d');let tt=0,last=performance.now(),run=true;
 const fl=[...Object.values(FONTS).map(f=>`${f.w} 40px ${f.fam}`),'600 40px "Hanken Grotesk"','800 40px "Hanken Grotesk"','900 40px "Hanken Grotesk"'];
 const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;if(run){tt+=dt;audioUpdate(dt);}render(i,ctx,W,tt,false,true);requestAnimationFrame(loop);};
 Promise.race([Promise.all(fl.map(s=>document.fonts.load(s,'Aa').catch(()=>{}))),new Promise(r=>setTimeout(r,3000))]).then(()=>{cache.clear();requestAnimationFrame(loop);});
 addEventListener('keydown',ev=>{const k=ev.key.toLowerCase();
  if(k===' '){run=!run;ev.preventDefault();}
  if(k==='s'){const c2=mk(W,H);render(i,c2.getContext('2d'),W,tt,true,true);const a=document.createElement('a');a.download=`cover-${String(i+1).padStart(3,'0')}-${W}x${H}.png`;a.href=c2.toDataURL('image/png');a.click();}
  if(k==='r'){setT(i,'seed',Math.floor(Math.random()*99999));noiseCache.clear();}
  if(k==='0')tt=0;});
 addEventListener('dragover',ev=>ev.preventDefault());
 addEventListener('drop',async ev=>{ev.preventDefault();const f=ev.dataTransfer.files[0];if(!f)return;
  if(f.type.startsWith('image/')){const im=new Image();im.onload=()=>{photo=im;duoCache.clear();};im.src=URL.createObjectURL(f);return;}
  if(!f.type.startsWith('audio/'))return;
  if(!AU.el){AU.el=new Audio();AU.el.loop=true;}AU.el.src=URL.createObjectURL(f);
  if(!AU.ctx){AU.ctx=new (window.AudioContext||window.webkitAudioContext)();AU.src=AU.ctx.createMediaElementSource(AU.el);AU.an=AU.ctx.createAnalyser();AU.an.fftSize=2048;AU.an.smoothingTimeConstant=.6;
   AU.src.connect(AU.an);AU.an.connect(AU.ctx.destination);AU.freq=new Uint8Array(AU.an.frequencyBinCount);AU.time=new Uint8Array(AU.an.fftSize);}
  await AU.ctx.resume();AU.el.play();});
}


/* engine: asciiField · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.asciiField=e=>{bg(e);const{ctx,W,t,P,N}=e,cell=W/84,M=maskGrid(e,e.word,cell);
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 ctx.font=UI(900,cell*1.02);
 for(let j=0;j<M.rows;j++)for(let i=0;i<M.cols;i++){if(!M.d[j*M.cols+i])continue;const n=N(i*.12,j*.12,t*.25);
  ctx.fillStyle=n>.62?P.acc:P.ink;ctx.fillText(FA_LET[(i*7+j*13+Math.floor(t*2+n*8))%FA_LET.length],i*cell+cell/2,j*cell+cell/2);}
 ctx.fillStyle=P.soft;
 for(let j=0;j<M.rows;j++)for(let i=0;i<M.cols;i++){if(M.d[j*M.cols+i])continue;const n=N(i*.12,j*.12,t*.25);if(n<.45)continue;
  ctx.font=UI(400,cell*(.3+Math.round(n*4)/8));ctx.fillText(n>.7?FA_LET[(i+j*3)%FA_LET.length]:'·',i*cell+cell/2,j*cell+cell/2);}
};


/* engine: astar · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.astar=e=>{bg(e);const{ctx,W,H,t,P}=e,cols=e.fmt==='yt'?48:30,c=W/cols,rows=Math.floor(H/c),A=astarRun(e,cols,rows),lt=e.still?9:t%7.5;
 const ne=Math.floor(clamp(lt/4)*A.order.length),np=Math.floor(clamp((lt-4)/1.5)*A.path.length);
 for(let i=0;i<cols*rows;i++)if(A.ob[i]){ctx.fillStyle=P.ink;ctx.fillRect((i%cols)*c+1,(i/cols|0)*c+1,c-2,c-2);}
 for(let k=0;k<ne;k++){const i=A.order[k];ctx.fillStyle=k>ne-25?P.acc:P.soft;ctx.globalAlpha=k>ne-25?.8:.7;ctx.fillRect((i%cols)*c+3,(i/cols|0)*c+3,c-6,c-6);}ctx.globalAlpha=1;
 if(np>1){ctx.strokeStyle=P.ink;ctx.lineWidth=c*.35;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();for(let k=0;k<np;k++){const i=A.path[k],x=(i%cols)*c+c/2,y=(i/cols|0)*c+c/2;k?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();
  const i=A.path[np-1];ctx.fillStyle=P.acc;disc(ctx,(i%cols)*c+c/2,(i/cols|0)*c+c/2,c*.45);ctx.fill();}
 if(A.path.length){[A.path[0],A.path[A.path.length-1]].forEach((i,k)=>{ctx.fillStyle=k?P.acc:P.ink;ctx.fillRect((i%cols)*c,(i/cols|0)*c,c,c);});}
};


/* engine: audiogram · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.audiogram=e=>{bg(e);const{ctx,W,P,fy}=e,a=e.audio,w=a.wave,amp=e.bh*.42;ctx.lineJoin='round';
 [[P.soft,2.5,1.3,.7],[P.acc,2.5,-1,.8],[P.ink,5,1,1]].forEach(([c,lw,k,al])=>{ctx.beginPath();for(let i=0;i<128;i++){const x=W*.06+i/127*W*.88,y=fy+w[i]*amp*k;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.globalAlpha=al;ctx.stroke();});
 ctx.globalAlpha=1;const n=24;for(let k=0;k<n;k++){ctx.fillStyle=k/n<a.lv?(k>n*.75?P.acc:P.ink):P.soft;disc(ctx,W*.06+k*(W*.88/(n-1)),fy+e.bh*.4,6);ctx.fill();}
};


/* engine: blob · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.blob=e=>{bg(e);const{ctx,W,H,t,P,N,fx,fy}=e,R0=Math.min(W,H)*.3;
 for(let k=9;k>=0;k--){const sc=1+k*.13;ctx.beginPath();
  for(let s=0;s<=110;s++){const a=s/110*TAU,r=R0*sc*(1+(N(Math.cos(a)*1.1+3,Math.sin(a)*1.1+3,t*.3-k*.06)-.5)*.7);const x=fx+Math.cos(a)*r,y=fy+Math.sin(a)*r;s?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  ctx.closePath();if(k===0){ctx.fillStyle=P.acc;ctx.fill();}else{ctx.strokeStyle=P.ink;ctx.globalAlpha=1-k*.08;ctx.lineWidth=2.2;ctx.stroke();ctx.globalAlpha=1;}}
};


/* engine: boids · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.boids=e=>{bg(e);const{ctx,W,H,t,P}=e,k='BO|'+e.seed+'|'+e.fmt,init=()=>{const R=rng(e.seed+99),b=[];for(let i=0;i<150;i++)b.push([R()*W,R()*H,(R()-.5)*4,(R()-.5)*4,R()<.08]);return{b,t:null};};
 let S;if(e.still){S=init();for(let s=0;s<120;s++)stepBoids(S.b,W,H,s/30,e);}else{S=pool.get(k);if(!S){S=init();pool.set(k,S);}if(S.t!==e.t){stepBoids(S.b,W,H,e.t,e);S.t=e.t;}}
 for(const p of S.b){const a=Math.atan2(p[3],p[2]),s=p[4]?18:12;ctx.save();ctx.translate(p[0],p[1]);ctx.rotate(a);ctx.fillStyle=p[4]?P.acc:P.ink;ctx.beginPath();ctx.moveTo(s,0);ctx.lineTo(-s*.7,s*.5);ctx.lineTo(-s*.4,0);ctx.lineTo(-s*.7,-s*.5);ctx.closePath();ctx.fill();ctx.restore();}
};


/* engine: bounce · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.bounce=e=>{bg(e);const{ctx,t,P,fx,fy}=e,s=String(e.word).toUpperCase(),f=fit(ctx,s,q=>fontStr(e.F,q),e.bw*.8,e.bh*.5,e.bh*.42,14,1,1),size=f.size;
 ctx.font=fontStr(e.F,size);ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.direction='ltr';const tw=ctx.measureText(s).width,floor=fy+size*.35;
 ctx.fillStyle=P.soft;ctx.fillRect(e.bx+e.bw*.05,floor+6,e.bw*.9,4);
 let x=fx-tw/2;for(let i=0;i<s.length;i++){const ch=s[i],cw=ctx.measureText(ch).width;if(ch!==' '){
  const T2=2.6,lt=((t-i*.07)%T2+T2)%T2,hgt=Math.abs(Math.cos(lt*Math.PI*1.7))*e.bh*.45*Math.exp(-lt*1.7),y=floor-hgt,sq=clamp(1-hgt/(size*.25));
  ctx.fillStyle=P.ink;ctx.globalAlpha=.25*(1-clamp(hgt/(e.bh*.45)));ctx.beginPath();ctx.ellipse(x+cw/2,floor+8,cw*.45,5,0,0,TAU);ctx.fill();ctx.globalAlpha=1;
  ctx.save();ctx.translate(x+cw/2,y);ctx.scale(1+.18*sq,1-.16*sq);ctx.fillStyle=i%3===1?P.acc:P.ink;ctx.fillText(ch,-cw/2,0);ctx.restore();}x+=cw;}
};


/* engine: breakout · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.breakout=e=>{bg(e);const{ctx,W,H,t,P}=e,cell=W/64,M=maskGrid(e,e.word,cell),cyc=8,lt=e.still?0:t%cyc,tri=x=>1-Math.abs((((x%2)+2)%2)-1);
 for(let j=0;j<M.rows;j++)for(let i=0;i<M.cols;i++){if(!M.d[j*M.cols+i])continue;const h=h01(i,j+e.seed%50),at=1+h*5.6;let sc=1,dy=0,al=1;
  if(lt>7.3)sc=easeOutBack((lt-7.3)/.7);else if(lt>at){const q=(lt-at)/.5;if(q>1)continue;dy=q*q*cell*6;al=1-q;}
  ctx.globalAlpha=al;ctx.fillStyle=j%2?P.ink:P.acc;const w=cell*.9*sc;ctx.fillRect(i*cell+(cell-w)/2,j*cell+(cell-w)/2+dy,w,w*.7);}
 ctx.globalAlpha=1;const bx=W*.05+tri(t*.53)*W*.9,by=H*.15+tri(t*.71)*H*.7;for(let k=3;k>=0;k--){const tk=t-k*.025;ctx.globalAlpha=1-k*.25;ctx.fillStyle=P.acc;disc(ctx,W*.05+tri(tk*.53)*W*.9,H*.15+tri(tk*.71)*H*.7,cell*.55);ctx.fill();}
 ctx.globalAlpha=1;ctx.fillStyle=P.ink;const pw=W*.14;ctx.fillRect(clamp(bx-pw/2,0,W-pw),H*.92,pw,cell*.6);
};


/* engine: cardHand · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.cardHand=e=>{const{ctx,t,P,fx,fy}=e,s=String(e.word).replace(/\s+/g,'').toUpperCase()||'A',n=7,ch=e.bh*.6,cw=ch*.68,Rr=e.bh*1.2;bg(e);
 for(let i=0;i<n;i++){const ang=(i-(n-1)/2)*.15,lift=Math.pow(Math.max(0,Math.sin(t*1.3-i*.7)),6)*ch*.2,f=(t*.4+i*.53)%6,sx=f<1?Math.cos(f*Math.PI*2):1,back=sx<0;
  ctx.save();ctx.translate(fx,fy+Rr*.82);ctx.rotate(ang);ctx.translate(0,-Rr*.82-lift);
  ctx.fillStyle='rgba(0,0,0,.18)';rr(ctx,-cw/2+10,-ch/2+14,cw,ch,cw*.08);ctx.fill();ctx.scale(Math.max(.03,Math.abs(sx)),1);
  if(back){ctx.fillStyle=P.acc;rr(ctx,-cw/2,-ch/2,cw,ch,cw*.08);ctx.fill();ctx.strokeStyle=P.bg;ctx.lineWidth=4;rr(ctx,-cw/2+14,-ch/2+14,cw-28,ch-28,cw*.05);ctx.stroke();
   ctx.save();ctx.clip();ctx.globalAlpha=.35;for(let k=-ch;k<ch;k+=18){ctx.beginPath();ctx.moveTo(-cw,k);ctx.lineTo(cw,k+cw);ctx.stroke();}ctx.restore();}
  else{ctx.fillStyle=P.bg;rr(ctx,-cw/2,-ch/2,cw,ch,cw*.08);ctx.fill();ctx.strokeStyle=P.ink;ctx.lineWidth=4;ctx.stroke();const L=s[i%s.length],col=i%2?P.acc:P.ink;
   ctx.fillStyle=col;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.font=fontStr(e.F,ch*.45);ctx.fillText(L,0,ch*.02);
   ctx.font=UI(900,ch*.1);ctx.fillText(L,-cw/2+cw*.14,-ch/2+ch*.1);ctx.beginPath();ctx.moveTo(-cw/2+cw*.14,-ch/2+ch*.17);ctx.lineTo(-cw/2+cw*.19,-ch/2+ch*.22);ctx.lineTo(-cw/2+cw*.14,-ch/2+ch*.27);ctx.lineTo(-cw/2+cw*.09,-ch/2+ch*.22);ctx.closePath();ctx.fill();
   ctx.save();ctx.rotate(Math.PI);ctx.fillText(L,-cw/2+cw*.14,-ch/2+ch*.1);ctx.restore();}
  ctx.restore();}
};


/* engine: carousel · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.carousel=e=>{bg(e);const{ctx,t,P,fx,fy}=e,s=String(e.word).replace(/\s+/g,'').toUpperCase()||'A',n=Math.min(10,Math.max(6,s.length)),Rx=e.bw*.36,Ry=e.bh*.08,items=[];
 ctx.strokeStyle=P.soft;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(fx,fy+e.bh*.36,Rx*1.05,Ry*1.4,0,0,TAU);ctx.stroke();
 for(let i=0;i<n;i++){const a=i/n*TAU+t*.45,z=Math.cos(a);items.push({z,x:fx+Math.sin(a)*Rx,y:fy+z*Ry,ch:s[i%s.length]});}
 items.sort((a,b)=>a.z-b.z);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 items.forEach(o=>{const k=(o.z+1)/2,sc=.5+.5*k,w=e.bh*.42*sc,h=e.bh*.6*sc,front=o.z>.85;
  ctx.globalAlpha=.45+.55*k;ctx.fillStyle=front?P.acc:(o.z>0?P.ink:P.soft);rr(ctx,o.x-w/2,o.y-h/2,w,h,w*.08);ctx.fill();
  ctx.fillStyle=front?on(P,P.acc):(o.z>0?P.bg:P.ink);ctx.font=fontStr(e.F,h*.6);ctx.fillText(o.ch,o.x,o.y+h*.03);});
 ctx.globalAlpha=1;
};


/* engine: caves · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.caves=e=>{const{ctx,W,H,t,P}=e,c=e.fmt==='yt'?W/96:W/64,cols=Math.ceil(W/c),rows=Math.ceil(H/c),g=caveMap(e,cols,rows),dark=darkOf(P),light=lightOf(P);
 ctx.fillStyle=dark;ctx.fillRect(0,0,W,H);const lx=W*(.5+.38*Math.sin(t*.4)),ly=H*(.5+.3*Math.sin(t*.63+1)),Rl=Math.min(W,H)*.5;
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){if(!g[y*cols+x])continue;const top=y>0&&!g[(y-1)*cols+x],lit=clamp(1-Math.hypot(x*c-lx,y*c-ly)/Rl);
  ctx.globalAlpha=.22+.78*lit;ctx.fillStyle=top?light:P.soft;if(top&&h01(x,y+e.seed%100)<.07){ctx.fillStyle=P.acc;ctx.globalAlpha=.5+.5*Math.abs(Math.sin(t*3+x));}ctx.fillRect(x*c,y*c,c+.6,c+.6);}
 ctx.globalAlpha=.22;const gr=ctx.createRadialGradient(lx,ly,0,lx,ly,Rl*.6);gr.addColorStop(0,P.acc);gr.addColorStop(1,dark);ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;ctx.fillStyle=P.acc;disc(ctx,lx,ly,c*.8);ctx.fill();
};


/* engine: combo · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.combo=e=>{const c=e.tpl.cfg,{ctx,W,H,S,P,fx,fy}=e,a=e.audio,t2=c.audio&&!a.sim?T0+a.ph:e.t,lv=c.audio?a.lv:0;
 const draw=(name,tc,x={})=>runE(e,name,tc,Object.assign({t:t2},x));
 const full=(cv,al=1,op='source-over',dx=0,dy=0)=>{ctx.save();ctx.globalAlpha=al;ctx.globalCompositeOperation=op;ctx.drawImage(cv,dx,dy,W,H);ctx.restore();};
 const B2=()=>{const B=buf('B',e);draw(c.b,B.getContext('2d'),{salt:7,P:c.inv?inv(P):P});return B;};
 switch(c.type){
 case 'layer':{draw(c.a,ctx);full(B2(),c.alpha??1,c.op||'multiply');break;}
 case 'maskText':{draw(c.a,ctx);const B=B2(),bx=B.getContext('2d');bx.save();bx.setTransform(1,0,0,1,0,0);bx.globalCompositeOperation='destination-in';bx.drawImage(textLayer(e,e.word,'#000'),0,0);bx.restore();
  ctx.save();ctx.globalAlpha=.3;ctx.drawImage(textLayer(e,e.word,P.ink),7,7,W,H);ctx.restore();full(B);break;}
 case 'wipe':{draw(c.a,ctx);const B=B2(),x0=W*(.5+.32*Math.sin(t2*.45))+lv*W*.05,sl=H*.35;
  ctx.save();ctx.beginPath();ctx.moveTo(x0+sl,0);ctx.lineTo(W,0);ctx.lineTo(W,H);ctx.lineTo(x0-sl,H);ctx.closePath();ctx.clip();full(B);ctx.restore();
  ctx.strokeStyle=P.acc;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(x0+sl,0);ctx.lineTo(x0-sl,H);ctx.stroke();break;}
 case 'iris':{draw(c.a,ctx);const B=B2(),r=Math.min(W,H)*(.3+.06*Math.sin(t2*.9))*(1+lv*.25);
  ctx.save();disc(ctx,fx,fy,r);ctx.clip();full(B);ctx.restore();ctx.strokeStyle=P.acc;ctx.lineWidth=8;disc(ctx,fx,fy,r);ctx.stroke();ctx.strokeStyle=P.ink;ctx.lineWidth=2;disc(ctx,fx,fy,r+14);ctx.stroke();break;}
 case 'tiles':{draw(c.a,ctx);const B=B2(),cols=e.fmt==='yt'?8:5,cw=W/cols,rows=Math.round(H/cw),chh=H/rows;
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const v=Math.sin(t2*1.1-(i+j)*.55);if(v<=0)continue;const sc=clamp(v*1.6),w=cw*sc,h=chh*sc,x=i*cw+(cw-w)/2,y=j*chh+(chh-h)/2;
   ctx.drawImage(B,x*S,y*S,w*S,h*S,x,y,w,h);ctx.strokeStyle=P.bg;ctx.lineWidth=3;ctx.strokeRect(x,y,w,h);}break;}
 case 'cycle':case 'voice':{const Ls=[c.a,c.b,c.c].filter(Boolean);let i0,i1,f;
  if(c.type==='voice'){i0=0;i1=1;f=a.mix;}else{const ph=t2/3.2;i0=Math.floor(ph)%Ls.length;i1=(i0+1)%Ls.length;f=clamp(((ph%1)-.78)/.22);f=f*f*(3-2*f);}
  draw(Ls[i0],ctx,{salt:i0*7});
  if(f>.01){const B=buf('B',e);draw(Ls[i1],B.getContext('2d'),{salt:i1*7});const R=Math.hypot(W,H)*f;ctx.save();disc(ctx,fx,fy,R);ctx.clip();full(B);ctx.restore();
   if(f<.99){ctx.strokeStyle=P.acc;ctx.lineWidth=6;disc(ctx,fx,fy,R);ctx.stroke();}}break;}
 case 'kaleido':{const B=buf('B',e);draw(c.a,B.getContext('2d'));const n=c.n||6,r=Math.hypot(W,H);ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);
  for(let k=0;k<n;k++){ctx.save();ctx.translate(fx,fy);ctx.rotate((k+(k%2))*TAU/n+t2*.05);if(k%2)ctx.scale(1,-1);ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,0,TAU/n+.004);ctx.closePath();ctx.clip();ctx.drawImage(B,-W*.5,-H*.5,W,H);ctx.restore();}break;}
 case 'pixel':{const B=buf('B',e);draw(c.a,B.getContext('2d'));const px=Math.max(3,9*(1+1.4*(.5+.5*Math.sin(t2*.8)))*(1+lv*2)),cols=Math.ceil(W/px),rows=Math.ceil(H/px),sm=bufSmall('px',cols,rows);
  sm.getContext('2d').drawImage(B,0,0,cols,rows);ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(sm,0,0,cols,rows,0,0,cols*px,rows*px);ctx.restore();
  ctx.strokeStyle=P.bg;ctx.globalAlpha=.22;ctx.lineWidth=1;ctx.beginPath();for(let x=0;x<W;x+=px){ctx.moveTo(x,0);ctx.lineTo(x,H);}for(let y=0;y<H;y+=px){ctx.moveTo(0,y);ctx.lineTo(W,y);}ctx.stroke();ctx.globalAlpha=1;break;}
 case 'rgb':{const B=buf('B',e);draw(c.a,B.getContext('2d'));const d=W*(.006+.01*(.5+.5*Math.sin(t2*1.3)))*(1+lv*3);ctx.drawImage(B,0,0,W,H);full(B,1,'difference',d,0);full(B,.5,'multiply',-d*.6,d*.3);break;}
 case 'halftone':case 'ascii':{const B=buf('B',e);draw(c.a,B.getContext('2d'));const asc=c.type==='ascii',cols=asc?(e.fmt==='yt'?80:56):(e.fmt==='yt'?96:64),rows=Math.round(cols*H/W),cell=W/cols;
  const sm=bufSmall('smp',cols,rows),sx=sm.getContext('2d',{willReadFrequently:true});sx.drawImage(B,0,0,cols,rows);const d=sx.getImageData(0,0,cols,rows).data,b0=rgb(P.bg),ac=rgb(P.acc),LB=(b0[0]*.3+b0[1]*.59+b0[2]*.11)/255;
  ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);const RAMP=' .:-=+*#%@';ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';if(asc)ctx.font=UI(800,cell*1.05);
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const k=(j*cols+i)*4,r=d[k],g=d[k+1],b=d[k+2];if(d[k+3]<20)continue;const L=(r*.3+g*.59+b*.11)/255,v=clamp(Math.abs(L-LB)*1.6+lv*.2);if(v<.04)continue;
   ctx.fillStyle=Math.abs(r-ac[0])+Math.abs(g-ac[1])+Math.abs(b-ac[2])<90?P.acc:P.ink;const x=(i+.5)*cell,y=(j+.5)*cell;
   if(asc)ctx.fillText(RAMP[Math.min(RAMP.length-1,Math.floor(v*RAMP.length))],x,y);else{disc(ctx,x,y,cell*.55*Math.sqrt(v));ctx.fill();}}break;}
 }
 if(c.audio&&a.onset>.05){ctx.save();ctx.globalAlpha=a.onset*.12;ctx.fillStyle=P.acc;ctx.fillRect(0,0,W,H);ctx.restore();}
};


/* engine: contour · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.contour=e=>{bg(e);const{ctx,W,H,t,P,N,fx,fy,R}=e;
 const C=[[fx,fy,e.inner*.95,0],[R()*W,R()*H,20,1]];
 C.forEach(([cx,cy,r0,ci])=>{const maxR=Math.hypot(Math.max(cx,W-cx),Math.max(cy,H-cy));let k=0;
  for(let r=r0;r<maxR;r+=17,k++){ctx.beginPath();
   for(let s=0;s<=120;s++){const a=s/120*TAU,rr2=r+(N(Math.cos(a)*1.3+ci*9+5,Math.sin(a)*1.3+5,t*.15+r*.004)-.5)*r*.5;
    const x=cx+Math.cos(a)*rr2,y=cy+Math.sin(a)*rr2;s?ctx.lineTo(x,y):ctx.moveTo(x,y);}
   const hot=k%6===2&&ci===0;ctx.strokeStyle=hot?P.acc:(ci?P.soft:P.ink);ctx.lineWidth=hot?4.5:2;ctx.stroke();}});
};


/* engine: cylinder · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.cylinder=e=>{bg(e);const{ctx,t,P,fx,fy}=e,s=(e.word+' · ').toUpperCase(),rows=3,rh=e.bh*.8/rows,size=rh*.8,Rc=Math.min(e.bw*.42,e.bh*.9);
 ctx.font=fontStr(e.F,size);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 const count=Math.max(8,Math.floor(TAU*Rc/(size*.72))),items=[];
 for(let r=0;r<rows;r++){const y=fy+(r-(rows-1)/2)*rh,sp=t*.6*(r%2?1:-1);
  for(let i=0;i<count;i++){const a=i/count*TAU+sp,z=Math.cos(a);items.push([z,fx+Math.sin(a)*Rc,y,s[(i+r*3)%s.length],r]);}}
 items.sort((a,b)=>a[0]-b[0]);
 items.forEach(([z,x,y,ch,r])=>{ctx.save();ctx.translate(x,y);ctx.scale(Math.max(.04,Math.abs(z)),1);ctx.globalAlpha=z>0?1:.35;ctx.fillStyle=z>0?(r===1?P.acc:P.ink):P.soft;ctx.fillText(ch,0,0);ctx.restore();});
 ctx.globalAlpha=1;
};


/* engine: dotType · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.dotType=e=>{bg(e);const{ctx,W,H,t,P,N}=e,cell=W/110,M=maskGrid(e,e.word,cell);
 ctx.fillStyle=P.soft;for(let j=1;j<M.rows;j+=3)for(let i=1;i<M.cols;i+=3){disc(ctx,i*cell,j*cell,cell*.13);ctx.fill();}
 for(let j=0;j<M.rows;j++)for(let i=0;i<M.cols;i++){if(!M.d[j*M.cols+i])continue;
  const x=i*cell+cell/2,y=j*cell+cell/2,n=N(x*.006,y*.006,t*.35),r=cell*(.16+.52*n),a=n*TAU*2;
  ctx.fillStyle=n>.7?P.acc:P.ink;disc(ctx,x+Math.cos(a)*cell*.7*n,y+Math.sin(a)*cell*.7*n,r);ctx.fill();}
};


/* engine: dripType · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.dripType=e=>{bg(e);const{ctx,W,H,t,P,N}=e,cell=W/200,M=maskGrid(e,e.word,cell);
 for(let i=0;i<M.cols;i++){let lo=-1;for(let j=M.rows-1;j>=0;j--)if(M.d[j*M.cols+i]){lo=j;break;}if(lo<0)continue;
  const n=N(i*.09,3.3);if(n<.5)continue;const len=Math.pow((n-.5)*2,2)*H*.42*(.55+.45*Math.sin(t*.6+i*.05)),x=i*cell,y=lo*cell;
  ctx.fillStyle=n>.9?P.acc:P.ink;ctx.fillRect(x,y,cell*1.04,len);disc(ctx,x+cell/2,y+len,cell*.95);ctx.fill();}
 ctx.drawImage(textLayer(e,e.word,P.ink),0,0,W,H);
};


/* engine: droste · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.droste=e=>{const{ctx,W,H,t,P,fx,fy}=e,base=.5,fl=Math.floor(t*.6),cols=[P.ink,P.bg,P.acc,P.soft],s=String(e.word).toUpperCase();
 ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let k=0;k<12;k++){const sc=Math.pow(.62,k-base)*1.25,w=W*sc,h=H*sc;if(w<4)break;const col=cols[((k-fl)%4+4)%4],x=fx-w/2,y=fy-h/2+h*.06;
  ctx.fillStyle=col;ctx.fillRect(x,y,w,h);let fs=h*.12;ctx.font=fontStr(e.F,fs);const mw=ctx.measureText(s).width;if(mw>w*.9){fs*=w*.9/mw;ctx.font=fontStr(e.F,fs);}
  ctx.fillStyle=on(P,col);ctx.fillText(s,fx,y+h*.09);}
};


/* engine: dungeon · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.dungeon=e=>{const{ctx,W,H,t,P}=e,c=e.fmt==='yt'?W/64:W/40,cols=Math.round(W/c),rows=Math.round(H/c),D=dungeonMap(e,cols,rows),dark=darkOf(P),light=lightOf(P);
 ctx.fillStyle=dark;ctx.fillRect(0,0,W,H);const pos=D.path[Math.floor((t*6)%D.path.length)],px=pos[0],py=pos[1],rad=9;
 ctx.font=`400 ${c*1.2}px "VT323", monospace`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 const G=(x,y)=>x<0||y<0||x>=cols||y>=rows?0:D.g[y*cols+x];
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const f=G(x,y);if(!f&&!(G(x-1,y)||G(x+1,y)||G(x,y-1)||G(x,y+1)))continue;
  const lit=clamp(1-Math.hypot(x-px,y-py)/rad);ctx.globalAlpha=Math.max(.14,lit);ctx.fillStyle=f?light:(lit>.05?light:P.soft);ctx.fillText(f?'.':'#',x*c+c/2,y*c+c/2);}
 const word=String(e.word).replace(/\s+/g,'').toUpperCase()||'G';
 D.rooms.forEach((r,i)=>{const lit=clamp(1-Math.hypot(r[0]+1-px,r[1]-py)/rad);ctx.globalAlpha=Math.max(.25,lit);ctx.fillStyle=P.acc;ctx.fillText(i%2?'$':word[i%word.length],(r[0]+1)*c+c/2,r[1]*c+c/2);});
 ctx.globalAlpha=1;const g=ctx.createRadialGradient(px*c+c/2,py*c+c/2,0,px*c+c/2,py*c+c/2,c*rad);g.addColorStop(0,P.acc);g.addColorStop(1,dark);ctx.globalAlpha=.16;ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
 ctx.fillStyle=P.acc;ctx.font=`400 ${c*1.5}px "VT323", monospace`;ctx.fillText('@',px*c+c/2,py*c+c/2);
};


/* engine: echoStack · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.echoStack=e=>{bg(e);const{ctx,W,H,t,P}=e;ctx.direction='ltr';ctx.textAlign='center';ctx.textBaseline='middle';
 const f=fit(ctx,e.word,s=>fontStr(e.F,s),W*.88,H,H*.17,20,1,1),size=f.size,tx=f.lines[0]||'';ctx.font=fontStr(e.F,size);
 const lh=size*1.12,mid=H/2,n=Math.ceil(H/lh/2)+1;
 for(let k=-n;k<=n;k++){if(!k)continue;const off=Math.sin(t*.9+k*.6)*W*.05*Math.abs(k)/2;
  ctx.globalAlpha=Math.max(.14,1-Math.abs(k)*.15);ctx.strokeStyle=k===-1||k===1?P.acc:P.ink;ctx.lineWidth=1.8;ctx.strokeText(tx,W/2+off,mid+k*lh);}
 ctx.globalAlpha=1;const tw=ctx.measureText(tx).width;ctx.fillStyle=P.ink;ctx.fillRect(W/2-tw/2-30,mid-lh/2+4,tw+60,lh-8);ctx.fillStyle=P.bg;ctx.fillText(tx,W/2,mid+size*.04);
};


/* engine: flowLines · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.flowLines=e=>{bg(e);const{ctx,W,H,t,P,N,R}=e,n=Math.round(W*H/1800);ctx.lineCap='round';
 for(let i=0;i<n;i++){let x=R()*W,y=R()*H;const a1=R()<.07;
  ctx.strokeStyle=a1?P.acc:P.ink;ctx.globalAlpha=a1?.95:.36;ctx.lineWidth=a1?3.2:1.6;ctx.beginPath();ctx.moveTo(x,y);
  for(let s=0;s<28;s++){const a=(N(x*.0022,y*.0022,t*.08)*2+N(x*.006,y*.006)*.5)*TAU;x+=Math.cos(a)*7;y+=Math.sin(a)*7;ctx.lineTo(x,y);}
  ctx.stroke();}
 ctx.globalAlpha=1;
};


/* engine: glitchScan · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.glitchScan=e=>{bg(e);const{ctx,W,H,S,t,P,N,R}=e,A=textLayer(e,e.word,P.acc),B=textLayer(e,e.word,P.ink);
 const sh=W*.012*(1.2+Math.sin(t*3));ctx.drawImage(A,sh,sh*.3,W,H);
 const n=34,sl=H/n;
 for(let i=0;i<n;i++){let o=N(i*.4,t*1.5)-.5;o=Math.abs(o)>.16?o*W*.28:0;ctx.drawImage(B,0,i*sl*S,B.width,sl*S,o,i*sl,W,sl+.6);}
 ctx.fillStyle=P.ink;ctx.globalAlpha=.08;for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,1.6);ctx.globalAlpha=1;
 ctx.fillStyle=P.acc;for(let k=0;k<7;k++){const x=R()*W,y=R()*H,w=W*(.02+R()*.12),h=H*.008+R()*H*.02;if(N(k,t*2)>.45)ctx.fillRect(x,y,w,h);}
};


/* engine: halftone · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.halftone=e=>{bg(e);const{ctx,W,H,t,P,N,fx,fy}=e,R0=Math.min(W,H)*.36,sx=fx+W*.12;
 ctx.fillStyle=P.acc;disc(ctx,sx,fy,R0);ctx.fill();const cell=W/64;
 for(let y=cell/2;y<H;y+=cell)for(let x=cell/2;x<W;x+=cell){const d=Math.hypot(x-fx,y-fy);
  let v=.5+.5*Math.sin(d*.018-t*1.2);v*=.35+.65*N(x*.004,y*.004,t*.1);const r=cell*.55*v;if(r<.6)continue;
  ctx.fillStyle=Math.hypot(x-sx,y-fy)<R0?on(P,P.acc):P.ink;disc(ctx,x,y,r);ctx.fill();}
};


/* engine: isoVoxel · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.isoVoxel=e=>{bg(e);const{ctx,W,H,t,P,N}=e,n=e.fmt==='yt'?14:12,tw=Math.min(W*.92/n,H*1.5/n),th=tw*.5,zh=th*1.15,cx=W/2,cy=H*.52-n*th*.5+H*.06;
 const top=P.soft,lf=mixHex(P.ink,P.bg,.15),rf=mixHex(P.ink,P.bg,.42),gnd=mixHex(P.bg,P.soft,.4);
 const poly=(pts,fill)=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=fill;ctx.fill();};
 for(let s=0;s<2*n-1;s++)for(let x=0;x<n;x++){const y=s-x;if(y<0||y>=n)continue;const h=Math.max(0,Math.floor((N(x*.22,y*.22,t*.08)-.36)*14)),sx=cx+(x-y)*tw/2,sy=cy+(x+y)*th/2,z=h*zh;
  if(!h){poly([[sx,sy-th/2],[sx+tw/2,sy],[sx,sy+th/2],[sx-tw/2,sy]],(x*7+y*3)%5===0?P.acc:gnd);continue;}
  poly([[sx-tw/2,sy-z],[sx,sy+th/2-z],[sx,sy+th/2],[sx-tw/2,sy]],lf);poly([[sx,sy+th/2-z],[sx+tw/2,sy-z],[sx+tw/2,sy],[sx,sy+th/2]],rf);poly([[sx,sy-th/2-z],[sx+tw/2,sy-z],[sx,sy+th/2-z],[sx-tw/2,sy-z]],top);
  ctx.fillStyle=P.acc;for(let k=0;k<h;k++)for(let w=0;w<2;w++){if(hsh(x+y*n,k*3+w)%3)continue;if(N(x+k,y+w,t*.5)<.45)continue;const u=(w+.5)/2,bx=sx+u*tw/2,by=sy+th/2-u*th/2-(k+.5)*zh;ctx.fillRect(bx-tw*.06,by-zh*.25,tw*.12,zh*.4);}}
};


/* engine: ledBoard · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.ledBoard=e=>{const{ctx,W,H,t,P}=e,cell=W/(e.fmt==='yt'?110:80),cols=Math.ceil(W/cell),rows=Math.ceil(H/cell);
 const dark=lum(P.ink)<lum(P.bg)?P.ink:P.bg;ctx.fillStyle=dark;ctx.fillRect(0,0,W,H);
 const bandR=Math.max(9,Math.round(e.bh/cell*.7)),r0=Math.round((e.by+e.bh/2)/cell-bandR/2),M=ledMask((e.word+'     ').toUpperCase(),bandR),off=Math.floor(t*16)%M.w;
 const sz=cell*.72,o=(cell-sz)/2;
 ctx.fillStyle=P.soft;ctx.globalAlpha=.35;
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const jj=j-r0;if(jj>=0&&jj<bandR&&M.o[jj*M.w+(i+off)%M.w])continue;ctx.fillRect(i*cell+o,j*cell+o,sz,sz);}
 ctx.globalAlpha=1;ctx.fillStyle=P.acc;
 for(let jj=0;jj<bandR;jj++)for(let i=0;i<cols;i++){if(M.o[jj*M.w+(i+off)%M.w])ctx.fillRect(i*cell+o,(r0+jj)*cell+o,sz,sz);}
};


/* engine: letterGlobe · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.letterGlobe=e=>{bg(e);const{ctx,t,P,fx,fy}=e,s=String(e.word).replace(/\s+/g,'').toUpperCase()||'A',R0=Math.min(e.bw,e.bh)*.42,rot=t*.4,ct=Math.cos(.35),st=Math.sin(.35),pts=[];
 let k=0;for(let lat=-75;lat<=75;lat+=12.5){const la=lat*Math.PI/180,cl=Math.cos(la),n=Math.max(6,Math.round(32*cl));
  for(let i=0;i<n;i++){const lo=i/n*TAU+rot,x=Math.sin(lo)*cl,z0=Math.cos(lo)*cl,y0=Math.sin(la);pts.push([y0*st+z0*ct,fx+x*R0,fy+(y0*ct-z0*st)*R0,s[k++%s.length],lat===0]);}}
 pts.sort((a,b)=>a[0]-b[0]);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 ctx.strokeStyle=P.soft;ctx.lineWidth=2;disc(ctx,fx,fy,R0*1.04);ctx.stroke();
 pts.forEach(([z,x,y,ch,eq])=>{ctx.font=fontStr(e.F,R0*(.06+.05*(z+1)/2));ctx.globalAlpha=z>0?1:.3;ctx.fillStyle=eq?P.acc:(z>0?P.ink:P.soft);ctx.fillText(ch,x,y);});ctx.globalAlpha=1;
};


/* engine: letterPhysics · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.letterPhysics=e=>{bg(e);const{ctx,t,P,fx,fy}=e,s=String(e.word).toUpperCase(),f=fit(ctx,s,q=>fontStr(e.F,q),e.bw*.86,e.bh*.55,e.bh*.4,14,1,1),size=f.size,cyc=6,lt=e.still?3.5:t%cyc;
 ctx.font=fontStr(e.F,size);ctx.direction='ltr';ctx.textBaseline='alphabetic';ctx.textAlign='left';const tw=ctx.measureText(s).width,floor=fy+size*.4,xs=[];let x=fx-tw/2;
 for(let i=0;i<s.length;i++){const cw=ctx.measureText(s[i]).width;xs.push([x,cw]);x+=cw;}const land=i=>.3+i*.16;let shake=0;
 for(let i=0;i<s.length;i++){const d=lt-land(i);if(d>0&&d<.4)shake+=Math.exp(-d*14)*size*.07;}
 ctx.save();ctx.translate(Math.sin(t*90)*shake,Math.cos(t*77)*shake);ctx.fillStyle=P.soft;ctx.fillRect(e.bx+e.bw*.04,floor+6,e.bw*.92,5);
 for(let i=0;i<s.length;i++){if(s[i]===' ')continue;const d=lt-land(i),[x0,cw]=xs[i];let y,sq=0,rot=0;
  if(lt>cyc-.8){const q=(lt-(cyc-.8))/.8;y=floor-ease(q)*e.bh*1.3;rot=q*(i%2?1:-1);}
  else if(d<0){const q=(d+.5)/.5;if(q<0)continue;y=floor-(1-q*q)*e.bh*.9;}else{y=floor;sq=Math.exp(-d*10)*Math.cos(d*30)*.35;
   if(d<.5){ctx.fillStyle=P.soft;ctx.globalAlpha=1-d*2;for(let k=0;k<6;k++){const sgn=k%2?1:-1;disc(ctx,x0+cw/2+sgn*(d*size*1.3)*(k/6+.3),floor-Math.sin(k+1)*d*size*.35,size*.05);ctx.fill();}ctx.globalAlpha=1;}}
  ctx.save();ctx.translate(x0+cw/2,y);ctx.rotate(rot);ctx.scale(1+sq*.6,1-sq);ctx.fillStyle=i%3===1?P.acc:P.ink;ctx.fillText(s[i],-cw/2,0);ctx.restore();}
 const last=land(s.length-1);if(!e.still&&lt>last&&lt<last+1.3){const q=(lt-last)/1.3;ctx.globalAlpha=1-q;ctx.fillStyle=P.acc;ctx.font=`400 ${size*.22}px "Press Start 2P", monospace`;ctx.textAlign='center';ctx.fillText('COMBO x'+s.replace(/\s/g,'').length,fx,fy-size*.9-q*size*.4);ctx.globalAlpha=1;}
 ctx.restore();
};


/* engine: liquid · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.liquid=e=>{bg(e);const{ctx,W,H,S,t,P}=e,A=textLayer(e,e.word,P.acc),B=textLayer(e,e.word,P.ink),n=90,sh=H/n;
 const off=y=>Math.sin(y*.018+t*2.2)*W*.035+Math.sin(y*.05-t*1.3)*W*.012;
 for(let k=0;k<n;k++){const y=k*sh;ctx.drawImage(A,0,y*S,W*S,sh*S,off(y)*1.7,y,W,sh+.6);}
 for(let k=0;k<n;k++){const y=k*sh;ctx.drawImage(B,0,y*S,W*S,sh*S,off(y),y,W,sh+.6);}
};


/* engine: match3 · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.match3=e=>{bg(e);const{ctx,W,H,t,P}=e,cols=e.fmt==='yt'?14:8,rows=8,c=Math.min(W*.92/cols,H*.9/rows),ox=(W-cols*c)/2,oy=(H-rows*c)/2,cyc=2.2,k=Math.floor(t/cyc),lt=e.still?0:t%cyc,s=String(e.word).replace(/\s+/g,'').toUpperCase()||'A';
 const ver=new Uint16Array(cols*rows),mOf=q=>{const h=hsh(q,e.seed%997),hor=h%2===0,x0=hor?h%(cols-2):(h>>3)%cols,y0=hor?(h>>5)%rows:(h>>7)%(rows-2);return[0,1,2].map(d=>hor?[x0+d,y0]:[x0,y0+d]);};
 for(let q=Math.max(0,k-300);q<k;q++)mOf(q).forEach(([x,y])=>ver[y*cols+x]++);const cur=mOf(k),isC=(x,y)=>cur.some(m=>m[0]===x&&m[1]===y);
 ctx.fillStyle=mixHex(P.bg,P.ink,.08);rr(ctx,ox-c*.15,oy-c*.15,cols*c+c*.3,rows*c+c*.3,c*.3);ctx.fill();const CL=[P.acc,P.ink,P.soft,mixHex(P.acc,P.ink,.5),mixHex(P.soft,P.ink,.5)];
 const gem=(type,x,y,sc,letter)=>{ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);const r=c*.38;ctx.fillStyle=CL[type];ctx.beginPath();
  if(type===0)ctx.arc(0,0,r,0,TAU);else if(type===1){ctx.moveTo(0,-r);ctx.lineTo(r,0);ctx.lineTo(0,r);ctx.lineTo(-r,0);}else if(type===2)ctx.rect(-r*.85,-r*.85,r*1.7,r*1.7);else if(type===3){ctx.moveTo(0,-r);ctx.lineTo(r*.95,r*.75);ctx.lineTo(-r*.95,r*.75);}else{for(let q=0;q<6;q++){const a=q*TAU/6;q?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(r,0);}}
  ctx.closePath();ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';disc(ctx,-r*.3,-r*.35,r*.18);ctx.fill();
  if(letter){ctx.fillStyle=on(P,CL[type].startsWith('#')?CL[type]:P.soft);ctx.font=fontStr(e.F,r*1.1);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText(letter,0,r*.05);}ctx.restore();};
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const cx=ox+(x+.5)*c,cy=oy+(y+.5)*c,v=ver[y*cols+x],L=(x+y)%3===0?s[(x+y*cols)%s.length]:'';
  if(!isC(x,y)){gem(hsh(x*31+y,v+e.seed%97)%5,cx,cy,1,L);continue;}
  if(lt<.5)gem(hsh(x*31+y,v+e.seed%97)%5,cx,cy,1+.12*Math.sin(lt*30),L);
  else if(lt<.8){const q=(lt-.5)/.3;gem(hsh(x*31+y,v+e.seed%97)%5,cx,cy,1-ease(q),L);for(let p=0;p<8;p++){const a=p*TAU/8;ctx.fillStyle=P.acc;ctx.globalAlpha=1-q;disc(ctx,cx+Math.cos(a)*q*c,cy+Math.sin(a)*q*c,c*.08);ctx.fill();}ctx.globalAlpha=1;}
  else gem(hsh(x*31+y,v+1+e.seed%97)%5,cx,cy-(1-easeOutBounce((lt-.8)/.7))*c*3,1,L);}
};


/* engine: mosaicBlocks · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.mosaicBlocks=e=>{const{ctx,W,H,t,P,R}=e,leaves=[];
 (function sp(x,y,w,h,d){if(d<5&&(d<2||R()<.7)&&Math.min(w,h)>W*.08){if(w>h?R()<.8:R()<.2){const s=w*(.3+R()*.4);sp(x,y,s,h,d+1);sp(x+s,y,w-s,h,d+1);}else{const s=h*(.3+R()*.4);sp(x,y,w,s,d+1);sp(x,y+s,w,h-s,d+1);}}else leaves.push([x,y,w,h,R(),R(),R()]);})(0,0,W,H,0);
 const fills=[P.bg,P.soft,P.acc,P.ink,P.bg];
 leaves.forEach(([x,y,w,h,r1,r2,r3])=>{const f=fills[Math.floor(r1*fills.length)],fg=f===P.acc?on(P,P.acc):(f===P.ink?P.bg:(r3<.4?P.acc:P.ink));
  ctx.fillStyle=f;ctx.fillRect(x,y,w,h);ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();const m=Math.min(w,h),cx=x+w/2,cy=y+h/2;ctx.fillStyle=fg;ctx.strokeStyle=fg;
  if(r2<.3){ctx.translate(cx,cy);ctx.rotate(Math.floor(r3*4)*Math.PI/2+Math.sin(t*.8+r1*9)*.6);ctx.beginPath();ctx.moveTo(-m/2,-m/2);ctx.arc(-m/2,-m/2,m,0,Math.PI/2);ctx.closePath();ctx.fill();}
  else if(r2<.52){disc(ctx,cx,cy,m*.34*(1+.08*Math.sin(t+r3*6)));ctx.fill();}
  else if(r2<.7){ctx.font=fontStr(e.F,m*.72);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText(FA_LET[Math.floor(r3*FA_LET.length)],cx,cy);}
  else if(r2<.85){ctx.lineWidth=m*.05;const o=(t*20)%(m*.18);for(let k=-h;k<w+h;k+=m*.18){ctx.beginPath();ctx.moveTo(x+k+o,y);ctx.lineTo(x+k+o-h,y+h);ctx.stroke();}}
  ctx.restore();ctx.strokeStyle=P.ink;ctx.lineWidth=5;ctx.strokeRect(x,y,w,h);});
};


/* engine: needles · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.needles=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,m=Math.min(W,H),g=m/24,ax=fx+Math.sin(t*.7)*e.bw*.32,ay=fy+Math.sin(t*1.1+1)*e.bh*.32;
 ctx.lineCap='round';ctx.lineWidth=g*.13;
 for(let y=g/2;y<H;y+=g)for(let x=g/2;x<W;x+=g){const dx=ax-x,dy=ay-y,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx),Ln=g*(.25+.55*clamp(1-d/(m*.9)));
  ctx.strokeStyle=d<m*.16?P.acc:P.ink;ctx.globalAlpha=.35+.65*clamp(1-d/(m*1.1));ctx.beginPath();ctx.moveTo(x-Math.cos(a)*Ln/2,y-Math.sin(a)*Ln/2);ctx.lineTo(x+Math.cos(a)*Ln/2,y+Math.sin(a)*Ln/2);ctx.stroke();}
 ctx.globalAlpha=1;ctx.fillStyle=P.acc;disc(ctx,ax,ay,g*.45*(1+.2*Math.sin(t*5)));ctx.fill();
};


/* engine: orbits · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.orbits=e=>{bg(e);const{ctx,W,H,t,P,R,fx,fy}=e,pts=[],tilt=-.35,ct=Math.cos(tilt),st=Math.sin(tilt);
 ctx.lineWidth=1.5;
 for(let k=1;k<=8;k++){const rx=e.inner+k*H*.1,ry=rx*.6;ctx.strokeStyle=P.soft;ctx.beginPath();ctx.ellipse(fx,fy,rx,ry,tilt,0,TAU);ctx.stroke();
  for(let d=0;d<2+k;d++){const a=R()*TAU+t*.25/k*(k%2?1:-1),x0=Math.cos(a)*rx,y0=Math.sin(a)*ry;pts.push([fx+x0*ct-y0*st,fy+x0*st+y0*ct,R()<.14]);}}
 ctx.strokeStyle=P.ink;const lim=H*.22;
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1]);if(d>lim)continue;
  ctx.globalAlpha=(1-d/lim)*.55;ctx.beginPath();ctx.moveTo(pts[i][0],pts[i][1]);ctx.lineTo(pts[j][0],pts[j][1]);ctx.stroke();}
 ctx.globalAlpha=1;pts.forEach(p=>{ctx.fillStyle=p[2]?P.acc:P.ink;disc(ctx,p[0],p[1],p[2]?11:6);ctx.fill();});
};


/* engine: packing · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.packing=e=>{bg(e);const{ctx,W,H,t,P,R}=e,k=Math.min(W,H)/1000,cs=[],s=String(e.word).replace(/\s+/g,'')||'A';
 for(let n=0;n<900&&cs.length<170;n++){const x=R()*W,y=R()*H;let r=130*k;for(const c of cs){const d=Math.hypot(x-c[0],y-c[1])-c[2]-6*k;if(d<r)r=d;if(r<9*k)break;}if(r>=9*k)cs.push([x,y,r]);}
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 cs.forEach(([x,y,r],i)=>{const sc=1+.07*Math.sin(t*1.5+i*.7),m=i%6;disc(ctx,x,y,r*sc);
  if(m===0){ctx.fillStyle=P.acc;ctx.fill();}else if(m<3){ctx.fillStyle=P.soft;ctx.fill();}else if(m===3){ctx.fillStyle=P.ink;ctx.fill();}else{ctx.strokeStyle=P.ink;ctx.lineWidth=3*k;ctx.stroke();}
  if(r>40*k&&(m===0||m===3)){ctx.fillStyle=m===0?on(P,P.acc):P.bg;ctx.font=fontStr(e.F,r*1.05*sc);ctx.fillText(s[i%s.length],x,y+r*.05);}});
};


/* engine: parallax · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.parallax=e=>{bg(e);const{ctx,W,H,t,P,N}=e,sh=Math.sin(t*23)*Math.pow(Math.max(0,Math.sin(t*.9)),12)*6;ctx.save();ctx.translate(sh,0);
 const sx=W*.72,sy=H*.32,sr=H*.15;ctx.fillStyle=P.acc;disc(ctx,sx,sy,sr);ctx.fill();ctx.fillStyle=P.bg;for(let k=0;k<5;k++){const y=sy+k*sr*.22;ctx.fillRect(sx-sr,y,sr*2,sr*.05+k*1.5);}
 [[mixHex(P.soft,P.bg,.45),20,.55,.2,'m'],[P.soft,45,.66,.16,'m'],[mixHex(P.ink,P.soft,.5),90,.72,.22,'c'],[P.ink,170,.84,.14,'c']].forEach(([col,spd,base,amp,kind],li)=>{const off=t*spd;ctx.fillStyle=col;
  if(kind==='m'){ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=10)ctx.lineTo(x,H*base-N((x+off)*.004,li*3)*H*amp*2);ctx.lineTo(W,H);ctx.closePath();ctx.fill();}
  else{const bw=W*.05;for(let b=Math.floor(off/bw)-1;b<(off+W)/bw+1;b++){const h=H*amp*(.4+.6*h01(b,li)),x=b*bw-off;ctx.fillStyle=col;ctx.fillRect(x,H*base-h,bw-3,h+H);
   if(li===3){ctx.fillStyle=P.acc;for(let wy=H*base-h+10;wy<H*base-6;wy+=16)for(let wx=x+6;wx<x+bw-10;wx+=12)if(hsh(b*13+wx|0,wy|0)%5===0)ctx.fillRect(wx,wy,5,7);}}}});
 ctx.fillStyle=P.ink;ctx.fillRect(-10,H*.93,W+20,H*.07);ctx.fillStyle=P.acc;for(let x=-((t*400)%120);x<W;x+=120)ctx.fillRect(x,H*.96,60,5);ctx.restore();
};


/* engine: particles · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.particles=e=>{bg(e);const{ctx,W,H,t,P,R}=e;ctx.fillStyle=P.soft;let x=0;while(x<W){const w=40+R()*70,h=H*(.08+R()*.2);ctx.fillRect(x,H-h,w-3,h);x+=w;}
 const per=1.1,k0=Math.floor(t/per);ctx.lineCap='round';
 for(let k=k0-2;k<=k0;k++){const age=t-k*per;if(age<0||age>2.2)continue;const cx=W*(.12+.76*h01(k,1)),cy=H*(.12+.36*h01(k,2)),col=k%3?P.acc:P.ink,n=70;
  if(age<.15){ctx.globalAlpha=1-age/.15;ctx.fillStyle=col;disc(ctx,cx,cy,H*.06);ctx.fill();}
  ctx.strokeStyle=col;ctx.lineWidth=3;ctx.globalAlpha=clamp(1-age/2.2);
  for(let j=0;j<n;j++){const a=j/n*TAU+h01(k,j)*.2,sp=(.6+.4*h01(k,j+99))*H*.28,P2=ag=>{const d=sp*(1-Math.exp(-ag*2.2));return[cx+Math.cos(a)*d,cy+Math.sin(a)*d+ag*ag*H*.05];},p1=P2(Math.max(0,age-.08)),p2=P2(age);
   ctx.beginPath();ctx.moveTo(p1[0],p1[1]);ctx.lineTo(p2[0],p2[1]);ctx.stroke();}}
 ctx.globalAlpha=1;const M=maskGrid(e,e.word,W/110);ctx.drawImage(textLayer(e,e.word,P.ink),0,0,W,H);
 for(let j=0;j<M.rows;j+=2)for(let i=0;i<M.cols;i+=2){if(!M.d[j*M.cols+i])continue;const ph=(t*1.3+h01(i,j))%1,x2=(i+.5)*(W/110)+(h01(i,j+5)-.5)*30*ph,y2=(j+.5)*(W/110)-ph*H*.12;ctx.globalAlpha=1-ph;ctx.fillStyle=(i+j)%3?P.acc:P.ink;disc(ctx,x2,y2,2.5);ctx.fill();}
 ctx.globalAlpha=1;
};


/* engine: pixelSprites · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.pixelSprites=e=>{bg(e);const{ctx,W,H,t,P}=e,cols=e.fmt==='yt'?11:7,rows=4,cell=Math.min(W*.8/cols,H*.5/rows),b=cell/8,step=Math.floor(t*2),frame=step%2,m=step%16,off=(m<8?m:16-m)*b*1.2-4*b*1.2;
 const ox=(W-cols*cell)/2+off,oy=e.by+e.bh*.06,boom=hsh(Math.floor(t/1.5),3)%(rows*cols),bt=t%1.5;
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const h=hsh(r+7,e.seed%997),x0=ox+c*cell+b,y0=oy+r*cell;ctx.fillStyle=r===0?P.acc:P.ink;
  if(r*cols+c===boom&&bt<.5&&!e.still){ctx.strokeStyle=P.acc;ctx.lineWidth=b*.8;for(let k=0;k<8;k++){const a=k*TAU/8;ctx.beginPath();ctx.moveTo(x0+3*b+Math.cos(a)*b,y0+3*b+Math.sin(a)*b);ctx.lineTo(x0+3*b+Math.cos(a)*b*3.5,y0+3*b+Math.sin(a)*b*3.5);ctx.stroke();}continue;}
  for(let y=0;y<6;y++)for(let x=0;x<3;x++){let bit=(h>>(y*3+x))&1;if(y===5&&frame)bit=(h>>(y*3+((x+1)%3)))&1;if(y===2&&x===1)bit=0;if(!bit)continue;
   ctx.fillRect(x0+x*b,y0+y*b,b+.5,b+.5);ctx.fillRect(x0+(4-x)*b,y0+y*b,b+.5,b+.5);}}
 const sx=W/2+Math.sin(t*.9)*W*.3,sy=H*.9;ctx.fillStyle=P.acc;ctx.fillRect(sx-3*b,sy,6*b,b*1.5);ctx.fillRect(sx-b,sy-b,2*b,b);
 const bp=(t%.7)/.7;ctx.fillRect(sx-b*.25,sy-bp*H*.6,b*.5,b*2);ctx.fillStyle=P.soft;ctx.fillRect(0,H*.95,W,3);
};


/* engine: platformer · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.platformer=e=>{bg(e);const{ctx,W,H,t,P,R}=e,u=W/200,plats=[];let x=0;
 while(plats.length<30){const w=(30+R()*60)*u*1.6,y=H*(.58+R()*.22);plats.push([x,x+w,y]);x+=w+(14+R()*26)*u*1.6;}const Lw=x,sp=130*u,cam=(t*sp)%Lw;
 [[mixHex(P.soft,P.bg,.45),.2],[P.soft,.45]].forEach(([col,f],li)=>{ctx.fillStyle=col;const bw=60*u,off=cam*f;for(let b=Math.floor(off/bw)-1;b<(off+W)/bw+1;b++){const h=H*(.18+.32*h01(b,li+3))+li*H*.05;ctx.fillRect(b*bw-off,H*.75-h,bw-4*u,h+H);}});
 const surf=X=>{X=((X%Lw)+Lw)%Lw;for(let i=0;i<plats.length;i++){const p=plats[i],q=plats[(i+1)%plats.length],qx=i===plats.length-1?q[0]+Lw:q[0];if(X>=p[0]&&X<=p[1])return p[2];if(X>p[1]&&X<qx){const s=(X-p[1])/(qx-p[1]);return p[2]+(q[2]-p[2])*s-Math.sin(Math.PI*s)*H*.16;}}return plats[0][2];};
 plats.forEach(p=>[0,Lw].forEach(rep=>{const sx=p[0]+rep-cam,w=p[1]-p[0];if(sx>W||sx+w<0)return;ctx.fillStyle=P.ink;ctx.fillRect(sx,p[2],w,H);ctx.fillStyle=P.acc;ctx.fillRect(sx,p[2],w,4*u);
  ctx.fillStyle=P.bg;ctx.globalAlpha=.18;for(let yy=p[2]+10*u;yy<H;yy+=8*u)for(let xx=sx+((yy/(8*u))%2)*6*u;xx<sx+w;xx+=12*u)ctx.fillRect(xx,yy,1.2*u,8*u);ctx.globalAlpha=1;
  const cx=(p[0]+p[1])/2+rep,cy=p[2]-26*u,rx=W*.3+cam,age=(rx-cx)/sp;
  if(age<0){ctx.fillStyle=P.acc;ctx.beginPath();ctx.ellipse(cx-cam,cy,5*u*Math.abs(Math.cos(t*4+cx)),5*u,0,0,TAU);ctx.fill();}
  else if(age<.7){ctx.globalAlpha=1-age/.7;ctx.fillStyle=P.acc;ctx.font=`400 ${7*u}px "Press Start 2P", monospace`;ctx.textAlign='center';ctx.fillText('+1',cx-cam,cy-age*40*u);ctx.globalAlpha=1;}}));
 const X=cam+W*.3,gy=surf(X),fr=RUN[Math.floor(t*10)%2],s=u*1.7;ctx.fillStyle=P.acc;
 fr.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch==='X')ctx.fillRect(W*.3-4*s+i*s,gy-8*s+j*s,s+.5,s+.5);}));
};


/* engine: radialSpectrum · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.radialSpectrum=e=>{bg(e);const{ctx,P,fx,fy,t}=e,a=e.audio,r0=e.inner,n=96;ctx.lineCap='round';ctx.lineWidth=r0*.035;
 for(let k=0;k<n;k++){const b=a.spec[Math.floor((k<n/2?k:n-k)/(n/2)*(NB-1))],ang=k/n*TAU-Math.PI/2+t*.05,Ln=r0*.08+b*r0*.9;
  ctx.strokeStyle=b>.55?P.acc:P.ink;ctx.beginPath();ctx.moveTo(fx+Math.cos(ang)*r0,fy+Math.sin(ang)*r0);ctx.lineTo(fx+Math.cos(ang)*(r0+Ln),fy+Math.sin(ang)*(r0+Ln));ctx.stroke();}
 ctx.strokeStyle=P.soft;ctx.lineWidth=2;disc(ctx,fx,fy,r0*(1.02+a.onset*.05));ctx.stroke();
};


/* engine: raycaster · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.raycaster=e=>{const{ctx,W,H,t,P}=e,{n,m}=rcMap(e),a=t*.25,px=12+Math.cos(a)*7,py=12+Math.sin(a)*7,dir=a+Math.PI/2+Math.sin(t*.7)*.25,fov=1.1,cols=e.fmt==='yt'?320:200,cw=W/cols,hz=H*.5+Math.sin(t*6)*H*.006;
 ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,hz);ctx.fillStyle=mixHex(P.soft,P.bg,.3);ctx.fillRect(0,hz,W,H-hz);
 ctx.fillStyle=P.ink;ctx.globalAlpha=.15;for(let k=1;k<12;k++){const y=hz+(H-hz)*Math.pow(k/12,2);ctx.fillRect(0,y,W,2);}ctx.globalAlpha=1;
 const WC=[P.ink,P.acc,P.soft];
 for(let i=0;i<cols;i++){const ra=dir+(i/cols-.5)*fov,dx=Math.cos(ra),dy=Math.sin(ra);let mx=Math.floor(px),my=Math.floor(py);const ddx=Math.abs(1/dx),ddy=Math.abs(1/dy);
  let sx,sy,sdx,sdy;if(dx<0){sx=-1;sdx=(px-mx)*ddx;}else{sx=1;sdx=(mx+1-px)*ddx;}if(dy<0){sy=-1;sdy=(py-my)*ddy;}else{sy=1;sdy=(my+1-py)*ddy;}
  let side=0,hit=0,st=0;while(!hit&&st<64){if(sdx<sdy){sdx+=ddx;mx+=sx;side=0;}else{sdy+=ddy;my+=sy;side=1;}hit=m[my*n+mx]||0;st++;}
  const raw=side?sdy-ddy:sdx-ddx,dist=raw*Math.cos(ra-dir),h=Math.min(H*3,H/Math.max(.05,dist)*.9);let wx=side?px+raw*dx:py+raw*dy;wx-=Math.floor(wx);
  ctx.fillStyle=mixHex(WC[(hit-1+3)%3]||P.ink,P.bg,clamp(clamp(dist/14)*.9+(side?.18:0)+(Math.floor(wx*6)%2?.07:0)));ctx.fillRect(i*cw,hz-h/2,cw+.6,h);}
};


/* engine: ribbon · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.ribbon=e=>{bg(e);const{ctx,W,H,t,P}=e,s=(e.word+'  —  ').toUpperCase(),size=H*.05;ctx.font=fontStr(e.F,size);ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';
 const ws=[...s].map(c=>ctx.measureText(c).width),uw=ws.reduce((a,b)=>a+b,0)||1;
 for(let r=0;r<4;r++){const y0=H*(.18+r*.22),A=H*.07,f=.004+r*.0008,ph=t*.8+r*1.7,Y=x=>y0+Math.sin(x*f+ph)*A;
  ctx.strokeStyle=r%2?P.acc:P.soft;ctx.lineWidth=size*1.5;ctx.lineCap='butt';ctx.beginPath();for(let x=-20;x<=W+20;x+=10){x===-20?ctx.moveTo(x,Y(x)):ctx.lineTo(x,Y(x));}ctx.stroke();
  ctx.fillStyle=r%2?on(P,P.acc):P.ink;let x=-((((t*70*(r%2?-1:1))%uw)+uw)%uw),k=0;
  while(x<W){const i=k%s.length,cw=ws[i],xm=x+cw/2;ctx.save();ctx.translate(xm,Y(xm));ctx.rotate(Math.atan(Math.cos(xm*f+ph)*A*f));ctx.fillText(s[i],-cw/2,0);ctx.restore();x+=cw;k++;}}
};


/* engine: ridgeLines · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.ridgeLines=e=>{bg(e);const{ctx,W,H,t,P,N,fx}=e,Ln=Math.round(H/26),top=H*.12,bot=H*.94,step=(bot-top)/Ln,x0=W*.08,x1=W*.92;
 ctx.lineWidth=2.2;ctx.lineJoin='round';
 for(let l=0;l<Ln;l++){const y=top+l*step,pts=[];
  for(let x=x0;x<=x1;x+=6){const env=Math.exp(-Math.pow((x-fx)/(W*.14),2)),n=N(x*.012,l*.35,t*.25);pts.push([x,y-Math.pow(n,2.2)*H*.24*env-N(x*.05,l)*4]);}
  ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.lineTo(x1,H);ctx.lineTo(x0,H);ctx.closePath();ctx.fillStyle=P.bg;ctx.fill();
  ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=l===Math.floor(Ln*.62)?P.acc:P.ink;ctx.lineWidth=l===Math.floor(Ln*.62)?4:2.2;ctx.stroke();}
};


/* engine: ringText · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.ringText=e=>{bg(e);const{ctx,t,P,fx,fy,W,H}=e;
 const words=(e.word+' '+e.T.show).split(/\s+/).filter(Boolean);if(!words.length)return;
 ctx.direction='ltr';ctx.textAlign='center';ctx.textBaseline='middle';
 const maxR=Math.hypot(Math.max(fx,W-fx),Math.max(fy,H-fy));let k=0;
 for(let r=e.inner+H*.03;r<maxR;r+=H*.072,k++){const size=H*.03+k*1.1;ctx.font=fontStr(e.F,size);
  ctx.strokeStyle=P.soft;ctx.lineWidth=1.5;disc(ctx,fx,fy,r-size*.85);ctx.stroke();
  ctx.fillStyle=k%4===1?P.acc:(k%2?P.ink:P.soft);if(k%2===0&&k%4!==1)ctx.fillStyle=P.ink;
  let a=t*.08*(k%2?1:-1)+k*.7;const end=a+TAU;let wi=k;
  while(a<end){const w=words[wi++%words.length],da=(ctx.measureText(w).width+size*.9)/r;if(a+da>end)break;
   const am=a+da/2;ctx.save();ctx.translate(fx+Math.cos(am)*r,fy+Math.sin(am)*r);ctx.rotate(am+Math.PI/2);ctx.fillText(w,0,0);ctx.restore();a+=da;}}
};


/* engine: rippleType · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.rippleType=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,s=String(e.word).replace(/\s+/g,'').toUpperCase()||'A',cols=e.fmt==='yt'?26:16,c=W/cols,rows=Math.ceil(H/c),B=[[],[],[],[],[],[],[]];
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=(i+.5)*c,y=(j+.5)*c,v=.5+.5*Math.sin(Math.hypot(x-fx,y-fy)*.02-t*2.4);B[Math.round(v*6)].push([x,y,s[(i+j*cols)%s.length]]);}
 B.forEach((b,q)=>{const v=q/6;ctx.font=fontStr(e.F,c*(.25+.95*v));ctx.fillStyle=v>.85?P.acc:(v<.3?P.soft:P.ink);b.forEach(([x,y,ch])=>ctx.fillText(ch,x,y));});
};


/* engine: scanner · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.scanner=e=>{bg(e);const{ctx,W,H,t,P}=e,cell=W/120,M=maskGrid(e,e.word,cell),sy=e.still?H*2:((t*170)%(H*1.5))-H*.25;
 for(let j=0;j<M.rows;j++){const y=j*cell+cell/2,d=sy-y;for(let i=0;i<M.cols;i++){if(!M.d[j*M.cols+i])continue;const x=i*cell+cell/2;
  if(e.still||d>=0){ctx.globalAlpha=e.still?1:Math.max(.15,1-d/(H*.9));ctx.fillStyle=!e.still&&d<cell*3?P.acc:P.ink;ctx.fillRect(x-cell*.35,y-cell*.35,cell*.7,cell*.7);}
  else{ctx.globalAlpha=.18;ctx.fillStyle=P.soft;ctx.fillRect(x-cell*.2,y-cell*.2,cell*.4,cell*.4);}}}
 ctx.globalAlpha=1;if(!e.still){ctx.fillStyle=P.acc;ctx.fillRect(0,sy-1.5,W,3);ctx.globalAlpha=.12;ctx.fillRect(0,sy-40,W,40);ctx.globalAlpha=1;}
};


/* engine: shader · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.shader=e=>{const c=e.tpl.cfg,a=e.audio,time=c.audio&&!a.sim?T0+a.ph:e.t;let src=null,tt=null;
 if(c.src){src=buf('B',e);runE(e,c.src,src.getContext('2d'),{salt:3});}
 if(c.text)tt=textLayer(e,e.word,'#fff');
 if(!glInit()||!runShader(e,c.sh,src,tt,time)){if(src)e.ctx.drawImage(src,0,0,e.W,e.H);else{bg(e);if(tt)e.ctx.drawImage(textLayer(e,e.word,e.P.ink),0,0,e.W,e.H);}return;}
 e.ctx.drawImage(GL.cv,0,0,e.W,e.H);
 if(c.audio&&a.onset>.05){e.ctx.save();e.ctx.globalAlpha=a.onset*.1;e.ctx.fillStyle=e.P.acc;e.ctx.fillRect(0,0,e.W,e.H);e.ctx.restore();}
};


/* engine: signalBars · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.signalBars=e=>{bg(e);const{ctx,W,H,t,P,R,N}=e;let x=0;const bars=[];
 while(x<W*1.5){const w=2+R()*(R()<.15?40:14);bars.push([x,w,R()]);x+=w+3+R()*12;}
 const span=x,off=(t*50)%span;
 bars.forEach(([bx,w,r],i)=>{const X=((bx+off)%span)-W*.25;if(X>W||X+w<0)return;const h=H*(.55+.45*N(i*.07,t*.5));
  ctx.fillStyle=r<.1?P.acc:(r<.3?P.soft:P.ink);ctx.fillRect(X,(H-h)/2,w,h);});
};


/* engine: skyline · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.skyline=e=>{bg(e);const{ctx,W,H,t,P,R,N}=e;
 ctx.fillStyle=P.acc;disc(ctx,W*.78,H*.22,Math.min(W,H)*.07);ctx.fill();
 const layers=[[P.soft,.42,.75],[P.ink,.6,1]];
 layers.forEach(([col,hmax,lit],li)=>{let x=-20;
  while(x<W){const w=(li?60:44)+R()*(li?90:70),h=H*(.12+R()*hmax),y=H-h;
   ctx.fillStyle=col;ctx.fillRect(x,y,w,h);
   if(R()<.35){ctx.fillRect(x+w*.4,y-h*.12,w*.2,h*.12);if(R()<.4){ctx.fillRect(x+w*.48,y-h*.22,w*.04,h*.12);}}
   if(li&&R()<.4){const tx=x+w*(.2+R()*.5),ty=y;ctx.fillRect(tx-2,ty-22,4,22);ctx.fillRect(tx+18,ty-22,4,22);
    ctx.beginPath();ctx.moveTo(tx-6,ty-22);ctx.lineTo(tx+26,ty-22);ctx.lineTo(tx+26,ty-50);ctx.lineTo(tx+10,ty-62);ctx.lineTo(tx-6,ty-50);ctx.closePath();ctx.fill();}
   if(li){const cw=10,ch=14;for(let wy=y+14;wy<H-10;wy+=ch+8)for(let wx=x+8;wx<x+w-cw-4;wx+=cw+8){
     const n=N(wx*.05,wy*.05,t*.25+li);if(n>.58){ctx.fillStyle=n>.8?P.acc:P.bg;ctx.globalAlpha=.85;ctx.fillRect(wx,wy,cw,ch);ctx.globalAlpha=1;}}ctx.fillStyle=col;}
   x+=w+(li?4:2);}
 });
};


/* engine: speakerSplit · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.speakerSplit=e=>{bg(e);const{ctx,W,P,T}=e,a=e.audio,m=a.mix,names=[T.show||'Host',T.guest||'Guest'];
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let s=0;s<2;s++){const act=s?m:1-m,cx=W*(s?.72:.28),cy=e.by+e.bh*.48,r=Math.min(W*.2,e.bh*.28)*(.82+.18*act);
  ctx.globalAlpha=.35+.65*act;ctx.fillStyle=act>.5?P.acc:P.soft;disc(ctx,cx,cy,r);ctx.fill();
  ctx.strokeStyle=P.ink;ctx.lineWidth=r*.04;for(let k=0;k<48;k++){const b=a.spec[k%NB]*act,ang=k/48*TAU;ctx.beginPath();ctx.moveTo(cx+Math.cos(ang)*r*1.05,cy+Math.sin(ang)*r*1.05);ctx.lineTo(cx+Math.cos(ang)*r*(1.08+b*.5),cy+Math.sin(ang)*r*(1.08+b*.5));ctx.stroke();}
  ctx.globalAlpha=1;ctx.fillStyle=act>.5?on(P,P.acc):P.ink;ctx.font=fontStr(e.F,r*.42);
  ctx.fillText(String(names[s]).split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase(),cx,cy);
  ctx.font=UI(800,Math.max(14,r*.12));ctx.fillStyle=P.ink;ctx.fillText(String(names[s]).toUpperCase(),cx,cy+r*1.28);}
};


/* engine: spiralText · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.spiralText=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,s=(e.word+'  ·  ').toUpperCase(),maxR=Math.hypot(Math.max(fx,W-fx),Math.max(fy,H-fy));
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 let th=0,r=e.inner,k=0,last=-1;const rot=t*.25;
 while(r<maxR&&k<2600){const size=Math.round(12+r*.055);if(size!==last){ctx.font=fontStr(e.F,size);last=size;}
  const ch=s[k%s.length],cw=ctx.measureText(ch).width+size*.12,a=th+rot,turn=Math.floor(th/TAU);
  ctx.fillStyle=turn%4===1?P.acc:(turn%2?P.soft:P.ink);
  ctx.save();ctx.translate(fx+Math.cos(a)*r,fy+Math.sin(a)*r);ctx.rotate(a+Math.PI/2);ctx.fillText(ch,0,0);ctx.restore();
  const dth=cw/r;th+=dth;r+=size*1.2*dth/TAU;k++;}
};


/* engine: splitFlap · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.splitFlap=e=>{const{ctx,W,H,P,T,R}=e,dark=lum(P.ink)<lum(P.bg)?P.ink:P.bg,light=dark===P.ink?P.bg:P.ink,news=isNews(e);
 ctx.fillStyle=dark;ctx.fillRect(0,0,W,H);
 const cols=e.fmt==='yt'?22:13,gap=W*.006,tw=(W*.92-gap*(cols-1))/cols,th=tw*1.5,maxRows=Math.max(2,Math.floor((e.bh*.92+gap)/(th+gap)));
 const lines=[T.show,news?T.kicker:'Interview',news?T.date:(T.guest||''),news?T.headline:T.title].map(s=>String(s||'').toUpperCase()),rows=Math.min(maxRows,lines.length);
 const x0=(W-(cols*tw+(cols-1)*gap))/2,y0=e.by+(e.bh-(rows*th+(rows-1)*gap))/2,c=e.tt%CYC;
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.font=UI(800,th*.62);
 for(let r=0;r<rows;r++){const str=lines[r].slice(0,cols);
  for(let i=0;i<cols;i++){const ch=str[i]||' ',x=x0+i*(tw+gap),y=y0+r*(th+gap),ts=.25+i*.045+r*.22+R()*.25;
   ctx.fillStyle=light;ctx.globalAlpha=.09;rr(ctx,x,y,tw,th,tw*.12);ctx.fill();ctx.globalAlpha=1;
   let shown=ch,sy=1;
   if(!e.still){if(c<ts-1.1)shown=' ';else if(c<ts||c>CYC-.9){shown=FLAP[(Math.floor(e.tt*14)+i*7+r*13)%FLAP.length];sy=Math.abs(Math.cos(((e.tt*14)%1)*Math.PI));}}
   if(shown!==' '){ctx.save();ctx.translate(x+tw/2,y+th/2);ctx.scale(1,Math.max(.12,sy));ctx.fillStyle=r===1?P.acc:light;ctx.fillText(shown,0,th*.04);ctx.restore();}
   ctx.fillStyle=dark;ctx.fillRect(x,y+th/2-1,tw,2);}}
};


/* engine: spotlight · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.spotlight=e=>{bg(e);const{ctx,W,H,t,P,R}=e,m=Math.min(W,H);ctx.drawImage(textLayer(e,e.word,P.soft),0,0,W,H);
 const sx=e.bx+e.bw*(.5+.42*Math.sin(t*.55)),sy=e.by+e.bh*(.5+.3*Math.sin(t*.9+1)),r=m*.3;
 ctx.save();disc(ctx,sx,sy,r);ctx.clip();const g=ctx.createRadialGradient(sx,sy,0,sx,sy,r);g.addColorStop(0,P.acc);g.addColorStop(1,P.bg);
 ctx.globalAlpha=.35;ctx.fillStyle=g;ctx.fillRect(sx-r,sy-r,r*2,r*2);ctx.globalAlpha=1;ctx.drawImage(textLayer(e,e.word,P.ink),0,0,W,H);
 ctx.fillStyle=P.ink;ctx.globalAlpha=.4;for(let k=0;k<40;k++){const a=R()*TAU,d=R()*r,x=sx+Math.cos(a+t*.1)*d,y=sy+Math.sin(a+t*.1)*d-((t*20+R()*100)%40);disc(ctx,x,y,1.5+R()*2);ctx.fill();}
 ctx.restore();ctx.globalAlpha=1;ctx.strokeStyle=P.acc;ctx.lineWidth=2;disc(ctx,sx,sy,r);ctx.stroke();
};


/* engine: statement · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.statement=e=>{bg(e);const{ctx,S,t,P}=e,words=String(e.word).split(/\s+/).filter(Boolean),DF=q=>fontStr(e.F,q);if(!words.length)return;
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 if(e.still){const f=fit(ctx,String(e.word),DF,e.bw*.85,e.bh*.7,e.bh*.3,20,3,1.05),lh=f.size*1.05;ctx.font=DF(f.size);ctx.fillStyle=P.ink;f.lines.forEach((l,i)=>ctx.fillText(l,e.fx,e.fy-(f.lines.length-1)*lh/2+i*lh));return;}
 const slot=1.1,idx=Math.floor(t/slot)%words.length,lt=(t%slot)/slot,w=words[idx],f=fit(ctx,w,DF,e.bw*.86,e.bh*.6,e.bh*.55,20,1,1),a=lt<.25?ease(lt/.25):lt>.8?1-ease((lt-.8)/.2):1;
 ctx.save();ctx.globalAlpha=a;ctx.filter=`blur(${((1-a)*14*S).toFixed(1)}px)`;ctx.font=DF(f.size*(1.06-.06*a));ctx.fillStyle=idx%3===2?P.acc:P.ink;ctx.fillText(w,e.fx,e.fy);ctx.restore();
 for(let i=0;i<words.length;i++){ctx.fillStyle=i===idx?P.acc:P.soft;disc(ctx,e.fx+(i-(words.length-1)/2)*22,e.fy+e.bh*.36,6);ctx.fill();}
};


/* engine: streetGrid · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.streetGrid=e=>{bg(e);const{ctx,W,H,t,P,R}=e,u=e.fmt==='yt'?W/1600:W/1000;
 /* Manhattan's street grid runs about 29 degrees off true north: long blocks between avenues, short ones between streets */
 const av=150*u,st=46*u,road=12*u,ang=-29*Math.PI/180,span=Math.hypot(W,H);
 ctx.save();ctx.translate(W/2,H/2);ctx.rotate(ang);
 ctx.fillStyle=P.soft;
 for(let x=-span;x<span;x+=av)for(let y=-span;y<span;y+=st){ctx.fillRect(x+road/2,y+road*.3,av-road,st-road*.6);}
 ctx.strokeStyle=P.acc;ctx.lineWidth=road*1.1;ctx.beginPath();ctx.moveTo(-span*.6,-span);ctx.lineTo(span*.25,span);ctx.stroke();
 for(let k=0;k<120;k++){const ax=Math.floor((R()-.5)*2*span/av)*av,dir=R()<.5?1:-1,sp=40+R()*90,off=R()*span*2;
  let y=((off+dir*t*sp)%(span*2)+span*2)%(span*2)-span;const taxi=R()<.3;
  ctx.fillStyle=taxi?P.acc:P.ink;ctx.fillRect(ax-road*.35,y,road*.7,road*1.6);}
 for(let k=0;k<80;k++){const sy=Math.floor((R()-.5)*2*span/st)*st,dir=R()<.5?1:-1,sp=30+R()*60,off=R()*span*2;
  let x=((off+dir*t*sp)%(span*2)+span*2)%(span*2)-span;ctx.fillStyle=R()<.3?P.acc:P.ink;ctx.fillRect(x,sy-road*.3,road*1.5,road*.6);}
 ctx.restore();
};


/* engine: stretchType · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.stretchType=e=>{bg(e);const{ctx,W,H,S,t,P}=e,Lr=textLayer(e,e.word,P.ink),La=textLayer(e,e.word,P.acc),n=36,sh=e.bh/n;
 ctx.fillStyle=P.soft;for(let y=0;y<H;y+=H/30)ctx.fillRect(0,y,W,1.5);
 const ws=[];let tot=0;for(let k=0;k<n;k++){const w=1+.85*Math.sin(t*1.6-k*.32);ws.push(w);tot+=w;}
 let y=e.by;for(let k=0;k<n;k++){const dh=e.bh*ws[k]/tot;ctx.drawImage(ws[k]>1.7?La:Lr,0,(e.by+k*sh)*S,W*S,sh*S,0,y,W,dh+.6);y+=dh;}
};


/* engine: sunburst · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.sunburst=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,n=28,R0=Math.hypot(W,H),rot=t*.06;
 ctx.fillStyle=P.soft;for(let i=0;i<n;i+=2){ctx.beginPath();ctx.moveTo(fx,fy);ctx.arc(fx,fy,R0,rot+i*TAU/n,rot+(i+1)*TAU/n);ctx.closePath();ctx.fill();}
 ctx.strokeStyle=P.acc;ctx.lineWidth=6;for(let k=1;k<=5;k++){disc(ctx,fx,fy,H*.13*k*(1+.05*Math.sin(t*2-k)));ctx.stroke();}
 ctx.fillStyle=P.acc;disc(ctx,fx,fy,H*.06);ctx.fill();
};


/* engine: swarm · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.swarm=e=>{bg(e);const{ctx,W,H,t,P,N,R}=e,cell=W/130,M=maskGrid(e,e.word,cell);
 const ph=e.still?1:clamp(.5+.62*Math.sin(t*.55-1.4));
 for(let j=0;j<M.rows;j++)for(let i=0;i<M.cols;i++){if(!M.d[j*M.cols+i])continue;
  const sx=R()*W,sy=R()*H,dl=R()*.35,hot=R()<.08,q=ease((ph-dl)/.65),tx=i*cell+cell/2,ty=j*cell+cell/2;
  const dx=(N(sx*.003,sy*.003,t*.2)-.5)*W*.2*(1-q);
  ctx.fillStyle=hot?P.acc:P.ink;disc(ctx,sx+(tx-sx)*q+dx,sy+(ty-sy)*q,cell*(.32+.18*(1-q)));ctx.fill();}
};


/* engine: target · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.target=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,step=Math.min(W,H)*.055,v=0,sh=0,base=0,K=Math.ceil(Math.hypot(W,H)*.75/step)+1;
 ctx.save();ctx.translate(fx,fy);ctx.rotate(Math.PI/4+t*.04);
 for(let k=K;k>=0;k--){const r=k*step+sh,idx=k-base,m5=((idx%5)+5)%5,m2=((idx%2)+2)%2;ctx.fillStyle=m5===0?P.acc:(m2?P.ink:P.bg);rr(ctx,-r,-r,r*2,r*2,r*.18);ctx.fill();}
 ctx.restore();
};


/* engine: terrain · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.terrain=e=>{const{ctx,W,H,t,P,N}=e,c=e.fmt==='yt'?W/120:W/80,cols=Math.ceil(W/c)+1,rows=Math.ceil(H/c),ox=t*1.2,ix=Math.floor(ox),shift=(ox-ix)*c;
 const C=[P.bg,mixHex(P.bg,P.soft,.6),mixHex(P.acc,'#ffffff',.35),P.soft,mixHex(P.soft,P.ink,.45),mixHex(P.ink,P.bg,.3),P.ink],shal=C[1];
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const wx=x+ix,h=N(wx*.045,y*.045)*.65+N(wx*.12,y*.12,3)*.35;
  let col=h<.38?C[0]:h<.44?C[1]:h<.48?C[2]:h<.6?C[3]:h<.7?C[4]:h<.78?C[5]:C[6];if(h<.38&&N(wx*.3,y*.3,t*.8)>.74)col=shal;ctx.fillStyle=col;ctx.fillRect(x*c-shift,y*c,c+.6,c+.6);}
};


/* engine: tickerBands · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.tickerBands=e=>{const{ctx,W,H,t,P}=e,n=7,bh=H/n,cols=[P.ink,P.bg,P.soft,P.bg,P.acc,P.bg,P.ink];
 ctx.direction='ltr';ctx.textAlign='left';ctx.textBaseline='middle';
 for(let r=0;r<n;r++){const c=cols[r];ctx.fillStyle=c;ctx.fillRect(0,r*bh,W,bh+1);const size=bh*(r%2?.42:.5);
  ctx.font=r%2?UI(600,size):fontStr(e.F,size);const s=(e.word||'')+'   ●   ',u=ctx.measureText(s).width||1;
  let off=t*(40+r*14)*(r%2?1:-1)+r*97;off=((off%u)+u)%u-u;ctx.fillStyle=on(P,c);if(c===P.bg&&r%2)ctx.fillStyle=P.ink;
  ctx.globalAlpha=r%2?.55:1;for(let x=off;x<W;x+=u)ctx.fillText(s,x,r*bh+bh/2);ctx.globalAlpha=1;}
};


/* engine: tileShift · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.tileShift=e=>{bg(e);const{ctx,W,H,S,t,P}=e;
 ctx.drawImage(textLayer(e,e.word,P.soft),0,0,W,H);
 const Lr=textLayer(e,e.word,P.ink),cols=16,rows=12,tw=W/cols,th=H/rows;
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const w=Math.sin(t*1.3+x*.42+y*.55)*tw*1.1*Math.cos(t*.4+y*.2);
  const sx=Math.max(0,Math.min(W-tw,x*tw+w));
  ctx.drawImage(Lr,sx*S,y*th*S,tw*S,th*S,x*tw,y*th,tw+.6,th+.6);}
 ctx.fillStyle=P.acc;for(let y=1;y<rows;y+=3){ctx.fillRect(0,y*th-1.5,W*(.2+.6*(.5+.5*Math.sin(t*.7+y))),3);}
};


/* engine: towerDefense · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.towerDefense=e=>{const{ctx,W,H,t,P,R}=e,c=e.fmt==='yt'?W/32:W/20,cols=Math.round(W/c),rows=Math.round(H/c);
 ctx.fillStyle=P.bg;ctx.fillRect(0,0,W,H);ctx.fillStyle=P.soft;ctx.globalAlpha=.35;for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if((x+y)%2)ctx.fillRect(x*c,y*c,c,c);ctx.globalAlpha=1;
 const r1=Math.floor(rows*.22),r2=Math.floor(rows*.5),r3=Math.floor(rows*.78),pts=[[-1,r1],[cols-4,r1],[cols-4,r2],[3,r2],[3,r3],[cols+1,r3]].map(([x,y])=>[x*c+c/2,y*c+c/2]);
 const seg=[];let len=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);len+=d;}
 const at=s=>{let i=0;while(i<seg.length-1&&s>seg[i]){s-=seg[i];i++;}const a=pts[i],b=pts[i+1],q=clamp(s/seg[i]);return[a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q];};
 ctx.strokeStyle=mixHex(P.soft,P.ink,.25);ctx.lineWidth=c*.9;ctx.lineJoin='miter';ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
 ctx.strokeStyle=P.bg;ctx.lineWidth=3;ctx.setLineDash([c*.3,c*.3]);ctx.stroke();ctx.setLineDash([]);
 const en=[];for(let k=0;k<40;k++){const s=(t-k*.75)*c*2.2;if(s<0||s>len)continue;en.push([...at(s),s/len,k]);}
 const towers=[];for(let k=0;k<7;k++){const p=at(len*(.08+k*.13)),side=k%2?1:-1;towers.push([p[0]+(k%3===1?side*c*1.5:0),p[1]+(k%3===1?0:side*c*1.5)]);}
 towers.forEach(([x,y],k)=>{let best=null,bd=c*3.2;en.forEach(q=>{const d=Math.hypot(q[0]-x,q[1]-y);if(d<bd){bd=d;best=q;}});
  ctx.strokeStyle=P.ink;ctx.globalAlpha=.25;ctx.lineWidth=2;disc(ctx,x,y,c*3.2);ctx.stroke();ctx.globalAlpha=1;
  const a=best?Math.atan2(best[1]-y,best[0]-x):t+k;if(best&&Math.sin(t*20+k)>-.2){ctx.strokeStyle=P.acc;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(best[0],best[1]);ctx.stroke();ctx.fillStyle=P.acc;disc(ctx,best[0],best[1],c*.35);ctx.fill();}
  ctx.fillStyle=P.ink;ctx.fillRect(x-c*.45,y-c*.45,c*.9,c*.9);ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle=P.acc;ctx.fillRect(0,-c*.1,c*.55,c*.2);disc(ctx,0,0,c*.25);ctx.fill();ctx.restore();});
 en.forEach(([x,y,f,k])=>{ctx.fillStyle=k%5===0?P.acc:P.ink;disc(ctx,x,y,c*.32);ctx.fill();ctx.fillStyle=P.bg;ctx.fillRect(x-c*.35,y-c*.6,c*.7,c*.12);ctx.fillStyle=P.acc;ctx.fillRect(x-c*.35,y-c*.6,c*.7*(1-f*.8),c*.12);});
};


/* engine: trails · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.trails=e=>{bg(e);const{ctx,t,P,fx,fy}=e,n=16,s=String(e.word),f=fit(ctx,s,q=>fontStr(e.F,q),e.bw*.62,e.bh*.5,e.bh*.38,14,1,1),line=f.lines[0]||s;
 ctx.font=fontStr(e.F,f.size);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let k=n-1;k>=0;k--){const tk=t-k*.08;ctx.save();ctx.translate(fx+Math.sin(tk*.9)*e.bw*.2,fy+Math.sin(tk*1.3)*e.bh*.2);ctx.rotate(Math.sin(tk*.7)*.2);
  if(!k){ctx.fillStyle=P.ink;ctx.fillText(line,0,0);}else{ctx.globalAlpha=(1-k/n)*.8;ctx.strokeStyle=k%4===0?P.acc:P.ink;ctx.lineWidth=2;ctx.strokeText(line,0,0);}ctx.restore();}
 ctx.globalAlpha=1;
};


/* engine: transitLines · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.transitLines=e=>{bg(e);const{ctx,W,H,t,P,R}=e,k=Math.min(W,H)/1000,cols=[P.acc,P.ink,P.soft,P.acc,P.ink,P.soft],lw=24*k,paths=[];
 ctx.lineJoin='round';ctx.lineCap='round';
 for(let l=0;l<6;l++){let x=-40,y=H*(.12+R()*.76);const pts=[[x,y]];
  while(x<W+40){x+=(80+R()*220)*k;pts.push([x,y]);if(x>W+40)break;const dir=y<H*.2?1:y>H*.8?-1:(R()<.5?-1:1),d=(50+R()*120)*k;x+=d;y+=dir*d;pts.push([x,y]);}
  paths.push(pts);}
 ctx.strokeStyle=P.soft;ctx.lineWidth=1;ctx.globalAlpha=.5;for(let x=0;x<W;x+=40*k){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}ctx.globalAlpha=1;
 paths.forEach((pts,l)=>{ctx.strokeStyle=cols[l];ctx.lineWidth=lw;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();});
 paths.forEach((pts,l)=>{for(let i=1;i<pts.length-1;i+=2){ctx.fillStyle=P.bg;disc(ctx,pts[i][0],pts[i][1],lw*.55);ctx.fill();ctx.strokeStyle=P.ink;ctx.lineWidth=4*k;ctx.stroke();}
  let len=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);len+=d;}
  let s=(t*140*k+l*300)%len,i=0;while(i<seg.length-1&&s>seg[i]){s-=seg[i];i++;}const a=pts[i],b=pts[i+1],q=seg[i]?s/seg[i]:0;
  ctx.fillStyle=cols[l]===P.ink?P.acc:P.ink;disc(ctx,a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q,lw*.75);ctx.fill();});
};


/* engine: truchet · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.truchet=e=>{bg(e);const{ctx,W,H,t,P,R}=e,cols=e.fmt==='yt'?16:10,c=W/cols,rows=Math.ceil(H/c);
 ctx.lineWidth=c*.2;
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const o=R()<.5?0:1,hot=R()<.09,ph=Math.sin(t*.9+(i+j)*.35),sm=ph>0?ph*ph*(3-2*ph):0;
  ctx.save();ctx.translate((i+.5)*c,(j+.5)*c);ctx.rotate((o+sm)*Math.PI/2);
  if(hot){ctx.fillStyle=P.acc;ctx.fillRect(-c/2,-c/2,c,c);}
  ctx.strokeStyle=hot?on(P,P.acc):P.ink;ctx.beginPath();ctx.arc(-c/2,-c/2,c/2,0,Math.PI/2);ctx.stroke();ctx.beginPath();ctx.arc(c/2,c/2,c/2,Math.PI,Math.PI*1.5);ctx.stroke();ctx.restore();}
};


/* engine: tunnel · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.tunnel=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,N=14,s=(e.word+'  ·  ').toUpperCase(),L=[];
 for(let k=0;k<N;k++)L.push({z:(k+.5)/N,k});L.sort((a,b)=>a.z-b.z);
 const cx=fx+Math.sin(t*.4)*W*.04,cy=fy+Math.cos(t*.5)*H*.04;ctx.textBaseline='middle';ctx.textAlign='left';ctx.direction='ltr';
 L.forEach(({z,k})=>{const s2=.04+Math.pow(z,2.6)*2.6,w=W*s2,h=H*s2,x=cx-w/2,y=cy-h/2,fs=Math.max(4,h*.09);
  ctx.globalAlpha=Math.min(1,z*1.6);ctx.strokeStyle=P.ink;ctx.lineWidth=Math.max(1,fs*.06);ctx.strokeRect(x,y,w,h);
  ctx.font=fontStr(e.F,fs);ctx.fillStyle=k%4===0?P.acc:P.ink;ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  const u=ctx.measureText(s).width||1;for(let xx=x-u*((t*.3+k*.17)%1);xx<x+w;xx+=u){ctx.fillText(s,xx,y+fs*.75);ctx.fillText(s,xx,y+h-fs*.75);}ctx.restore();});
 ctx.globalAlpha=1;
};


/* engine: typeGrid · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.typeGrid=e=>{bg(e);const{ctx,W,H,t,P,N}=e,s=String(e.word).replace(/\s+/g,'')||'A',cols=e.fmt==='yt'?16:10,c=W/cols,rows=Math.ceil(H/c);
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const n=N(i*.18,j*.18,t*.3),ch=s[(i+j*cols)%s.length];
  ctx.save();ctx.translate((i+.5)*c,(j+.5)*c);ctx.rotate((n-.5)*Math.PI*1.4);ctx.font=fontStr(e.F,c*(.35+n*1.05));
  ctx.fillStyle=n>.68?P.acc:(n<.36?P.soft:P.ink);ctx.fillText(ch,0,c*.04);ctx.restore();}
};


/* engine: typeWave · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.typeWave=e=>{bg(e);const{ctx,W,H,t,P}=e,s=(e.word+'  ').toUpperCase(),rows=7,rh=H/rows,size=rh*.82;
 ctx.font=fontStr(e.F,size);ctx.textAlign='left';ctx.textBaseline='middle';ctx.direction='ltr';
 const ws=[...s].map(ch=>ctx.measureText(ch).width),uw=ws.reduce((a,b)=>a+b,0)||1;
 for(let r=0;r<rows;r++){const yc=rh*(r+.5);let x=-((((t*50*(r%2?1:-1)+r*uw*.31)%uw)+uw)%uw),k=0;
  ctx.fillStyle=r===3?P.acc:(r%2?P.soft:P.ink);
  while(x<W){const i=k%s.length;if(s[i]!==' ')ctx.fillText(s[i],x,yc+Math.sin(t*2.2+x*.008+r*.7)*size*.32);x+=ws[i];k++;}}
};


/* engine: venetian · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.venetian=e=>{bg(e);const{ctx,W,H,S,t,P}=e,A=textLayer(e,e.word,P.ink),B=textLayer(e,e.word,P.acc),n=26,sh=H/n;
 for(let k=0;k<n;k++){const c=Math.cos(t*1.2-k*.2),h=sh*Math.abs(c),y=k*sh;
  ctx.fillStyle=c<0?P.soft:P.bg;ctx.fillRect(0,y+(sh-h)/2,W,h);ctx.drawImage(c<0?B:A,0,y*S,W*S,sh*S,0,y+(sh-h)/2,W,h);}
};


/* engine: voiceBlob · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.voiceBlob=e=>{bg(e);const{ctx,P,fx,fy,t,N}=e,a=e.audio,R0=Math.min(e.bw,e.bh)*.3*(1+a.onset*.06);
 for(let l=3;l>=0;l--){ctx.beginPath();for(let s=0;s<=120;s++){const ang=s/120*TAU,b=a.spec[Math.floor(Math.abs(Math.sin(ang*1.5))*(NB-1))],r=R0*(1+l*.18)*(1+b*.45+(N(Math.cos(ang)+5,Math.sin(ang)+5,t*.4)-.5)*.2);const x=fx+Math.cos(ang)*r,y=fy+Math.sin(ang)*r;s?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  ctx.closePath();if(!l){ctx.fillStyle=a.mix>.5?P.acc:P.ink;ctx.fill();}else{ctx.strokeStyle=P.ink;ctx.globalAlpha=1-l*.25;ctx.lineWidth=2.5;ctx.stroke();ctx.globalAlpha=1;}}
};


/* engine: voiceType · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.voiceType=e=>{bg(e);const{ctx,P,fx,fy}=e,a=e.audio,s=String(e.word).toUpperCase(),f=fit(ctx,s,q=>fontStr(e.F,q),e.bw*.86,e.bh*.5,e.bh*.34,14,1,1),size=f.size;
 ctx.font=fontStr(e.F,size);ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.direction='ltr';const tw=ctx.measureText(s).width,base=fy+size*.45;let x=fx-tw/2;
 for(let i=0;i<s.length;i++){const ch=s[i],cw=ctx.measureText(ch).width,b=a.spec[Math.floor(i/Math.max(1,s.length)*NB*.7)];
  ctx.save();ctx.translate(x,base);ctx.scale(1,.5+b*1.6);ctx.fillStyle=b>.55?P.acc:P.ink;ctx.fillText(ch,0,0);ctx.restore();
  ctx.fillStyle=P.soft;ctx.fillRect(x,base+8,Math.max(0,cw-4),6*(.3+b));x+=cw;}
};


/* engine: waveBars · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.waveBars=e=>{bg(e);const{ctx,W,H,t,P,N,fx,fy}=e,n=72,gap=W/n;ctx.lineCap='round';ctx.lineWidth=gap*.5;
 ctx.fillStyle=P.soft;ctx.fillRect(0,fy-1.5,W,3);
 for(let i=0;i<n;i++){const x=gap*(i+.5),env=Math.exp(-Math.pow((x-fx)/(W*.32),2)),h=(.08+Math.pow(N(i*.18,t*.9),1.6)*.92)*H*.42*(.25+.75*env);
  ctx.strokeStyle=i%9===4?P.acc:P.ink;ctx.beginPath();ctx.moveTo(x,fy-h);ctx.lineTo(x,fy+h);ctx.stroke();}
};


/* engine: waveMesh · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.waveMesh=e=>{bg(e);const{ctx,W,H,t,P,fx,fy}=e,m=Math.min(W,H),A=m*.05,g=m/18,sg=2*(m*.45)**2;
 const D=(x,y)=>{const env=Math.exp(-((x-fx)**2+(y-fy)**2)/sg);return[x+Math.sin(y*.011+t*1.1)*A*env*1.4,y+Math.cos(x*.009+t*.9)*A*env*1.8];};
 ctx.lineWidth=1.8;ctx.strokeStyle=P.ink;ctx.globalAlpha=.75;
 for(let y=-g;y<=H+g;y+=g){ctx.beginPath();let first=true;for(let x=-g;x<=W+g;x+=12){const p=D(x,y);first?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);first=false;}ctx.stroke();}
 ctx.globalAlpha=1;ctx.strokeStyle=P.soft;
 for(let x=-g;x<=W+g;x+=g){ctx.beginPath();let first=true;for(let y=-g;y<=H+g;y+=12){const p=D(x,y);first?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);first=false;}ctx.stroke();}
 ctx.fillStyle=P.acc;for(let k=0;k<5;k++){const p=D(fx+(k-2)*g*3,fy+Math.sin(k)*g*2);disc(ctx,p[0],p[1],g*.22);ctx.fill();}
};


/* engine: waveRows · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.waveRows=e=>{bg(e);const{ctx,W,H,t,P}=e,rows=9,rh=H/rows,size=rh*.74;
 ctx.textBaseline='middle';ctx.direction='ltr';ctx.textAlign='left';ctx.font=fontStr(e.F,size);
 const ww=ctx.measureText(e.word).width,gap=size*.8,unit=ww+gap;
 for(let r=0;r<rows;r++){const y=rh*(r+.5),dir=r%2?1:-1;
  let off=t*70*dir+Math.sin(t*.7+r*.9)*unit*.3+r*unit*.37;off=((off%unit)+unit)%unit-unit;
  const mode=(r===1||r===rows-2)?'acc':(r%3===0?'stroke':'fill');
  for(let x=off;x<W;x+=unit){
   if(mode==='stroke'){ctx.strokeStyle=P.ink;ctx.lineWidth=2;ctx.strokeText(e.word,x,y);}
   else{ctx.fillStyle=mode==='acc'?P.acc:P.soft;ctx.fillText(e.word,x,y);}
   ctx.fillStyle=P.ink;disc(ctx,x+ww+gap/2,y,size*.08);ctx.fill();}}
};


/* engine: wordRain · draws into e.ctx in virtual units (1600×900 or 1000×1000) */
E.wordRain=e=>{bg(e);const{ctx,W,H,t,P,R}=e,s=String(e.word).replace(/\s+/g,'')||'A',c=Math.min(W,H)/24,cols=Math.ceil(W/c),trail=16,loopH=H+trail*c;
 ctx.font=fontStr(e.F,c*.92);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';
 for(let i=0;i<cols;i++){const sp=(3+R()*7)*c,head=(t*sp+R()*loopH)%loopH;
  for(let k=0;k<trail;k++){const y=head-k*c;if(y<-c||y>H+c)continue;
   ctx.globalAlpha=k===0?1:(1-k/trail)*.8;ctx.fillStyle=k===0?P.acc:(k<4?P.ink:P.soft);ctx.fillText(s[(i+k+Math.floor(t*3))%s.length],i*c+c/2,y);}}
 ctx.globalAlpha=1;
};
