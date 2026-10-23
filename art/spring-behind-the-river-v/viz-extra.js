/* music hooks specific to this piece */
window.VIZ={speed:0,zoom:0,light:0,hue:0}; // Grokly: no extra draws, no zoom — the sound moves only the water and the seeds (wind.js)
(function(){ const orig=AMBIENCE.readLevel.bind(AMBIENCE);
  AMBIENCE.readLevel=function(){ if(window.SONIC&&SONIC.active){ if(this.master) this.master.gain.value=0; if(MUSIC.out&&MUSIC.out.gain) MUSIC.out.gain.value=0; this.level += ((0.45*SONIC.level+0.55*SONIC.bass) - this.level)*0.4; return this.level; } return orig(); };
})();
