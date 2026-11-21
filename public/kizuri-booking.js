(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var BOOKING_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/booking/354c4e09-4913-413b-b740-947174913a8e";
  var KZ_DESIGN_TOKENS_MANIFEST = {"radius":"soft","shadow":"flat","weight":"bold","density":"comfortable"};

  var BK_STYLES = "\n.kz-bk-root,.kz-bk-root *{box-sizing:border-box;}\n.kz-bk-root{font-family:var(--kz-font,inherit);color:#111;color:var(--kz-text,#111);max-width:560px;margin:0 auto;}\n\n.kz-bk-card{display:flex;flex-direction:column;gap:18px;gap:var(--kz-gap,18px);padding:24px;padding:var(--kz-pad,24px);border-radius:16px;border-radius:var(--kz-radius,16px);background:#fff;background:var(--kz-surface,#fff);border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);box-shadow:0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.28);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.28));}\n\n.kz-bk-title{font-size:20px;font-weight:700;font-weight:var(--kz-weight,700);line-height:1.2;margin:0;color:#111;color:var(--kz-text,#111);text-transform:none;letter-spacing:normal;}\n/* step-label weight (600) is deliberately a middle tier — distinct from both the\n   700 heading/button boldness and the 400 body-text baseline, for label\n   emphasis without competing with headings — not tokenized. */\n.kz-bk-step-label{display:block;font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:#667;color:var(--kz-muted,#667);}\n\n.kz-bk-field{display:flex;flex-direction:column;gap:7px;font-size:14px;}\n.kz-bk-fields-row{display:flex;gap:12px;flex-wrap:wrap;}\n.kz-bk-fields-row .kz-bk-field{flex:1;min-width:160px;}\n\n/* service-one weight (600) is deliberately a middle tier, not tokenized (see .kz-bk-step-label above). */\n.kz-bk-service-one{font-size:16px;font-weight:600;color:#111;color:var(--kz-text,#111);}\n\n.kz-bk-root select.kz-bk-select,.kz-bk-root input.kz-bk-date,.kz-bk-root input.kz-bk-f{\n  width:100%;padding:12px 14px;font:inherit;font-size:15px;line-height:1.2;\n  color:#111;color:var(--kz-text,#111);\n  background:#fff;background:var(--kz-surface-2,#fff);\n  border:1px solid #cbd5e1;border:1px solid var(--kz-border,#cbd5e1);border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  -webkit-appearance:none;appearance:none;transition:border-color .15s ease,box-shadow .15s ease;\n}\n.kz-bk-root select.kz-bk-select{\n  padding-right:38px;\n  background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none'/></svg>\");\n  background-repeat:no-repeat;background-position:right 14px center;\n}\n.kz-bk-root input.kz-bk-date{color-scheme:light dark;}\n.kz-bk-root select.kz-bk-select:focus,.kz-bk-root input.kz-bk-date:focus,.kz-bk-root input.kz-bk-f:focus{\n  outline:none;border-color:var(--kz-accent,#111);box-shadow:0 0 0 3px rgba(0,0,0,.12);\n}\n\n.kz-bk-slots-holder,.kz-bk-details-holder{display:flex;flex-direction:column;gap:10px;}\n.kz-bk-slots{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:8px;}\n/* slot weight (600) is deliberately a middle tier, not tokenized (see .kz-bk-step-label above). */\n.kz-bk-slot{cursor:pointer;padding:10px 6px;font:inherit;font-size:14px;font-weight:600;text-align:center;\n  color:#111;color:var(--kz-text,#111);\n  background:#fff;background:var(--kz-surface-2,#fff);\n  border:1px solid #cbd5e1;border:1px solid var(--kz-border,#cbd5e1);border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  transition:border-color .12s ease,transform .12s ease,background .12s ease;}\n.kz-bk-slot:hover{border-color:var(--kz-accent,#111);transform:translateY(-1px);}\n.kz-bk-slot.kz-bk-slot-sel{background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);border-color:transparent;}\n\n.kz-bk-details{display:flex;flex-direction:column;gap:14px;}\n/* Pay button radius (12px) maps to the radiusSm tier, same judgment as\n   tutor-platform's submit button (also 12px -> --kz-radius-sm): a primary\n   CTA button reads closer to the inputs/controls size tier than to the\n   larger card radius tier. */\n.kz-bk-pay{display:block;width:100%;padding:15px 22px;border:0;border-radius:12px;border-radius:var(--kz-radius-sm,12px);cursor:pointer;\n  font:inherit;font-weight:700;font-weight:var(--kz-weight,700);font-size:16px;\n  background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);\n  transition:filter .15s ease,transform .05s ease;}\n.kz-bk-pay:hover{filter:brightness(.92);}\n.kz-bk-pay:active{transform:translateY(1px);}\n.kz-bk-pay[disabled]{opacity:.55;cursor:not-allowed;filter:none;}\n.kz-bk-confirm-note{text-align:center;font-size:13px;color:#667;color:var(--kz-muted,#667);}\n\n.kz-bk-empty{padding:18px 0;font-size:14px;color:#667;color:var(--kz-muted,#667);}\n.kz-bk-msg{padding:12px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font-size:13px;background:#f1f5f9;color:#111;color:var(--kz-text,#111);}\n.kz-bk-msg-error{background:#fef2f2;color:#b91c1c;}\n.kz-bk-msg-success{background:#f0fdf4;color:#15803d;}\n\n/* Mobile override: a tighter card padding at narrow widths is a deliberate,\n   size-independent layout adjustment (same reasoning as tutor-platform's\n   @media overrides, which also stay literal) — not a site-design choice, so\n   this stays a plain literal rather than var(--kz-pad,...). Tokenizing it\n   would make the mobile-specific tightening track the DESKTOP density token,\n   which is not what this rule is for. */\n@media (max-width:480px){\n  .kz-bk-card{padding:18px;}\n  .kz-bk-fields-row{flex-direction:column;gap:14px;}\n}\n\n/* ── Price list: [data-kizuri-shop=\"price-list\"] ──\n   Native <details> accordion, one per service group. Every colour is a\n   --kz-pl-* custom property falling back to the theme vars, so a site can\n   restyle the list from its own CSS without fighting specificity. */\n.kz-pl-root,.kz-pl-root *{box-sizing:border-box;}\n.kz-pl-root{font-family:var(--kz-font,inherit);color:var(--kz-pl-text,var(--kz-text,#111));display:flex;flex-direction:column;gap:12px;}\n.kz-pl-group{border:1px solid var(--kz-pl-border,var(--kz-border,#e5e7eb));border-radius:var(--kz-pl-radius,var(--kz-radius,14px));background:var(--kz-pl-surface,var(--kz-surface,#fff));overflow:hidden;}\n.kz-pl-summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px;cursor:pointer;list-style:none;user-select:none;}\n.kz-pl-summary::-webkit-details-marker{display:none;}\n.kz-pl-summary:focus-visible{outline:2px solid var(--kz-pl-accent,var(--kz-accent,#111));outline-offset:-2px;}\n.kz-pl-group-name{font-family:var(--kz-pl-heading-font,inherit);font-size:20px;font-weight:700;letter-spacing:.02em;}\n.kz-pl-count{font-size:12px;color:var(--kz-pl-muted,var(--kz-muted,#667));margin-left:auto;}\n.kz-pl-chevron{width:10px;height:10px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);transition:transform .2s ease;opacity:.6;flex:none;margin:-4px 4px 0 0;}\n.kz-pl-group[open] .kz-pl-chevron{transform:rotate(225deg);margin-top:4px;}\n.kz-pl-rows{padding:0 20px 8px;}\n.kz-pl-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 0;border-top:1px solid var(--kz-pl-border,var(--kz-border,#e5e7eb));}\n.kz-pl-info{flex:1;min-width:0;}\n.kz-pl-name{font-weight:600;font-size:16px;margin:0;}\n.kz-pl-desc{font-size:14px;line-height:1.55;color:var(--kz-pl-muted,var(--kz-muted,#667));margin:4px 0 0;}\n.kz-pl-meta{font-size:12px;color:var(--kz-pl-muted,var(--kz-muted,#667));margin-top:6px;}\n.kz-pl-side{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:none;}\n.kz-pl-price{font-family:var(--kz-pl-heading-font,inherit);font-size:20px;font-weight:700;color:var(--kz-pl-accent,var(--kz-accent,#111));white-space:nowrap;}\n.kz-pl-book{font:inherit;font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;cursor:pointer;\n  background:transparent;color:var(--kz-pl-accent,var(--kz-accent,#111));border:1px solid var(--kz-pl-accent,var(--kz-accent,#111));transition:background .15s ease,color .15s ease;}\n.kz-pl-book:hover,.kz-pl-book:focus-visible{background:var(--kz-pl-accent,var(--kz-accent,#111));color:var(--kz-pl-accent-contrast,var(--kz-accent-contrast,#fff));outline:none;}\n.kz-pl-note{padding:16px 0;font-size:14px;color:var(--kz-pl-muted,var(--kz-muted,#667));}\n@media (max-width:480px){\n  .kz-pl-summary{padding:16px;}\n  .kz-pl-rows{padding:0 16px 6px;}\n  .kz-pl-group-name{font-size:18px;}\n}\n\n.kz-bk-terms{display:flex;align-items:flex-start;gap:10px;margin:2px 0 12px;font-size:14px;line-height:1.45;cursor:pointer;text-align:left;}\n.kz-bk-terms input{flex:none;width:18px !important;height:18px;margin:1px 0 0;padding:0;accent-color:currentColor;cursor:pointer;}\n.kz-bk-terms a{color:inherit;text-decoration:underline;text-underline-offset:3px;}\n";
  function injectStyles(){
    try{
      if(document.querySelector('style[data-kizuri-booking-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-booking-styles','');
      s.textContent=BK_STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  function escHtml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}

  // ── Terms & Conditions (terms-core) ──
  var _kzTermsUrl=null, _kzTermsLoaded=false, _kzTermsForms=[];
  function kzTermsSettingsUrl(){
    // {api}/api/<vertical>/<siteId> → {api}/api/site-settings/<siteId>
    return String(BOOKING_URL).replace(/\/api\/[a-z-]+\/[^\/?#]+\/?$/,'')+'/api/site-settings/'+encodeURIComponent(SITE_ID);
  }
  function kzTermsInject(form){
    if(!form)return;
    // Forget forms that were redrawn away (carts re-render on every change).
    var live=[];for(var f=0;f<_kzTermsForms.length;f++){if(_kzTermsForms[f].isConnected!==false)live.push(_kzTermsForms[f]);}
    _kzTermsForms=live;
    if(_kzTermsForms.indexOf(form)<0)_kzTermsForms.push(form);
    if(!_kzTermsUrl||form.querySelector('.'+"kz-bk-terms"))return;
    var d=form.ownerDocument||document;
    var label=d.createElement('label'); label.className="kz-bk-terms";
    var box=d.createElement('input'); box.type='checkbox'; box.name='kz_accept_terms'; box.setAttribute('aria-required','true');
    var text=d.createElement('span'); text.appendChild(d.createTextNode('I agree to the '));
    var link=d.createElement('a'); link.href=_kzTermsUrl; link.target='_blank'; link.rel='noopener'; link.textContent='Terms & Conditions';
    text.appendChild(link);
    label.appendChild(box); label.appendChild(text);
    var pay=form.querySelector('button[type="submit"]');
    if(pay&&pay.parentNode===form)form.insertBefore(label,pay);else form.appendChild(label);
  }
  function kzTermsLoad(){
    if(_kzTermsLoaded)return;
    _kzTermsLoaded=true;
    try{
      fetch(kzTermsSettingsUrl(),{headers:{'Accept':'application/json'}})
        .then(function(r){return r.ok?r.json():{};})
        .then(function(s){
          var u=s&&s.terms_pdf_url;
          _kzTermsUrl=(typeof u==='string'&&/^https?:\/\//i.test(u))?u:null;
          // Forms drawn before the settings arrived get their checkbox now.
          for(var i=0;i<_kzTermsForms.length;i++)kzTermsInject(_kzTermsForms[i]);
        })
        .catch(function(){});
    }catch(e){}
  }
  // {ok:false} = the site has T&Cs and the box isn't ticked: do not submit.
  // accept is undefined when there is nothing to agree to (field left out).
  function kzTermsCheck(form){
    if(!_kzTermsUrl)return {ok:true,accept:undefined};
    var box=form&&form.querySelector('[name="kz_accept_terms"]');
    return box&&box.checked?{ok:true,accept:true}:{ok:false,accept:false};
  }
  var KZ_TERMS_MESSAGE='Please tick that you agree to the Terms & Conditions.';

  function fmt(cents){var sign=cents<0?'-':'';var a=Math.abs(Math.round(cents));var r=Math.floor(a/100);var c=(''+(a%100));while(c.length<2)c='0'+c;var g=(''+r).replace(/\B(?=(\d{3})+(?!\d))/g,',');return sign+'R'+g+'.'+c;}

  // SAST (UTC+2, no DST) HH:mm for a slot's ISO instant, so out-of-town visitors see
  // the business's local time. Matches AvailabilityEngine.SastOffset on the server.
  function sastHHmm(iso){
    try{
      var d=new Date(iso);
      var ms=d.getTime()+2*60*60*1000;
      var sd=new Date(ms);
      var hh=sd.getUTCHours();var mm=sd.getUTCMinutes();
      return (hh<10?'0'+hh:''+hh)+':'+(mm<10?'0'+mm:''+mm);
    }catch(e){return iso;}
  }

  function pad2(n){return n<10?'0'+n:''+n;}
  function ymd(d){return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}

  // Parse "rgb(r, g, b)" / "rgba(...)" → [r,g,b] or null.
  function parseRgb(s){
    if(!s)return null;
    var m=s.match(/rgba?\(([^)]+)\)/); if(!m)return null;
    var p=m[1].split(',').map(function(x){return parseFloat(x);});
    if(p.length<3||isNaN(p[0]))return null;
    if(p.length>=4&&p[3]===0)return null; // fully transparent → unusable
    return [p[0],p[1],p[2]];
  }
  function luma(rgb){ return (0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2])/255; }
  function sat(rgb){ var mx=Math.max(rgb[0],rgb[1],rgb[2]),mn=Math.min(rgb[0],rgb[1],rgb[2]); return mx===0?0:(mx-mn)/mx; }
  // Walk up from the mount to find the first ancestor with a non-transparent background.
  function effectiveBg(el){
    var node=el;
    while(node&&node.nodeType===1){
      var rgb=parseRgb(window.getComputedStyle(node).backgroundColor);
      if(rgb)return rgb;
      node=node.parentElement;
    }
    var b=parseRgb(window.getComputedStyle(document.body).backgroundColor);
    return b||[255,255,255];
  }
  function rgbStr(a){return 'rgb('+Math.round(a[0])+','+Math.round(a[1])+','+Math.round(a[2])+')';}
  function mix(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

  // ── adaptive structural design tokens (radius/shadow/weight/density) ──

  var KZ_DT_RADIUS_CSS = {"sharp":{"radius":"4px","radiusSm":"4px"},"soft":{"radius":"14px","radiusSm":"10px"},"pill":{"radius":"28px","radiusSm":"20px"}};
  var KZ_DT_SHADOW_CSS = {"flat":"none","lifted":"0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.18)","dramatic":"0 4px 8px rgba(0,0,0,.12),0 32px 64px rgba(0,0,0,.35)"};
  var KZ_DT_WEIGHT_CSS = {"light":"400","regular":"500","bold":"700"};
  var KZ_DT_DENSITY_CSS = {"compact":{"gap":"10px","pad":"14px"},"comfortable":{"gap":"18px","pad":"22px"},"spacious":{"gap":"28px","pad":"32px"}};
  var KZ_DT_DEFAULTS = {"radius":"soft","shadow":"dramatic","weight":"regular","density":"comfortable"};

  function kzDtValidBucket(map, v){ return typeof v==='string' && Object.prototype.hasOwnProperty.call(map, v); }

  // Median of computed border-radius (px) across up to 20 sampled elements.
  function kzDtSampleRadius(els){
    var vals=[];
    for (var i=0;i<els.length && i<20;i++){
      var r = parseFloat(window.getComputedStyle(els[i]).borderRadius);
      if (!isNaN(r)) vals.push(r);
    }
    if (vals.length < 3) return null; // confidence gate
    vals.sort(function(a,b){return a-b;});
    var median = vals[Math.floor(vals.length/2)];
    if (median < 6) return 'sharp';
    if (median > 20) return 'pill';
    return 'soft';
  }

  function kzDtShadowBlur(boxShadow){
    // naive but sufficient: look for the largest px blur figure in the value
    if (!boxShadow || boxShadow === 'none') return 0;
    var nums = boxShadow.match(/-?\d+(\.\d+)?px/g);
    if (!nums || !nums.length) return 0;
    var max=0;
    for (var i=0;i<nums.length;i++){ var n=parseFloat(nums[i]); if (n>max) max=n; }
    return max;
  }
  function kzDtSampleShadow(els){
    var vals=[];
    for (var i=0;i<els.length && i<20;i++){
      vals.push(kzDtShadowBlur(window.getComputedStyle(els[i]).boxShadow));
    }
    if (vals.length < 3) return null;
    vals.sort(function(a,b){return a-b;});
    var median = vals[Math.floor(vals.length/2)];
    if (median === 0) return 'flat';
    if (median > 40) return 'dramatic';
    return 'lifted';
  }

  function kzDtSampleWeight(){
    var heads = document.querySelectorAll('h1,h2,h3');
    var vals=[];
    for (var i=0;i<heads.length && i<20;i++){
      var w = parseFloat(window.getComputedStyle(heads[i]).fontWeight);
      if (!isNaN(w)) vals.push(w);
    }
    if (vals.length < 3) return null;
    vals.sort(function(a,b){return a-b;});
    var median = vals[Math.floor(vals.length/2)];
    if (median < 500) return 'light';
    if (median > 650) return 'bold';
    return 'regular';
  }

  function kzDtSampleDensity(els){
    var vals=[];
    for (var i=0;i<els.length && i<20;i++){
      var p = parseFloat(window.getComputedStyle(els[i]).paddingTop);
      if (!isNaN(p)) vals.push(p);
    }
    if (vals.length < 3) return null;
    vals.sort(function(a,b){return a-b;});
    var median = vals[Math.floor(vals.length/2)];
    if (median < 10) return 'compact';
    if (median > 24) return 'spacious';
    return 'comfortable';
  }

  function applyDesignTokens(root, manifest){
    try{
      var cands = document.querySelectorAll('a,button,[role=button]');
      var radius = (manifest && kzDtValidBucket(KZ_DT_RADIUS_CSS, manifest.radius)) ? manifest.radius : (kzDtSampleRadius(cands) || KZ_DT_DEFAULTS.radius);
      var shadow = (manifest && kzDtValidBucket(KZ_DT_SHADOW_CSS, manifest.shadow)) ? manifest.shadow : (kzDtSampleShadow(cands) || KZ_DT_DEFAULTS.shadow);
      var weight = (manifest && kzDtValidBucket(KZ_DT_WEIGHT_CSS, manifest.weight)) ? manifest.weight : (kzDtSampleWeight() || KZ_DT_DEFAULTS.weight);
      var density = (manifest && kzDtValidBucket(KZ_DT_DENSITY_CSS, manifest.density)) ? manifest.density : (kzDtSampleDensity(cands) || KZ_DT_DEFAULTS.density);

      var r = KZ_DT_RADIUS_CSS[radius];
      root.style.setProperty('--kz-radius', r.radius);
      root.style.setProperty('--kz-radius-sm', r.radiusSm);
      root.style.setProperty('--kz-shadow', KZ_DT_SHADOW_CSS[shadow]);
      root.style.setProperty('--kz-weight', KZ_DT_WEIGHT_CSS[weight]);
      var den = KZ_DT_DENSITY_CSS[density];
      root.style.setProperty('--kz-gap', den.gap);
      root.style.setProperty('--kz-pad', den.pad);
    }catch(e){
      var rd = KZ_DT_RADIUS_CSS[KZ_DT_DEFAULTS.radius];
      root.style.setProperty('--kz-radius', rd.radius);
      root.style.setProperty('--kz-radius-sm', rd.radiusSm);
      root.style.setProperty('--kz-shadow', KZ_DT_SHADOW_CSS[KZ_DT_DEFAULTS.shadow]);
      root.style.setProperty('--kz-weight', KZ_DT_WEIGHT_CSS[KZ_DT_DEFAULTS.weight]);
      var dd = KZ_DT_DENSITY_CSS[KZ_DT_DEFAULTS.density];
      root.style.setProperty('--kz-gap', dd.gap);
      root.style.setProperty('--kz-pad', dd.pad);
    }
  }
  

  function applyTheme(root){
    var WHITE=[255,255,255], BLACK=[17,17,17];
    try{
      var cs=window.getComputedStyle(document.body);
      root.style.setProperty('--kz-font',(cs&&cs.fontFamily)||'system-ui, -apple-system, Segoe UI, Roboto, sans-serif');

      var bg=effectiveBg(root);
      var dark=luma(bg)<0.5;
      var text=dark?WHITE:BLACK;
      var muted=mix(bg,text,0.55);
      // The card must read as a DISTINCT surface against the page, even when the page is
      // near-black (a 6% lift was nearly invisible). Lift the card clearly; inputs a touch
      // more; a border with real contrast. On light pages a subtle lift + soft border.
      var surface=dark?mix(bg,WHITE,0.14):mix(bg,WHITE,1.0); // dark: clearly lifted; light: pure white card
      var surface2=dark?mix(bg,WHITE,0.20):mix(bg,BLACK,0.03);
      var border=dark?mix(bg,WHITE,0.30):mix(bg,BLACK,0.12);

      // Accent: prefer the site's real brand color. The brand accent is usually a
      // SATURATED button/link BACKGROUND (e.g. a gold CTA), not link text — so scan a
      // handful of links/buttons for the most saturated, non-near-bg background; fall
      // back to a coloured link text; finally to the theme default.
      var accent=dark?WHITE:BLACK;
      var cands=document.querySelectorAll('a,button,[role=button]');
      var best=null,bestSat=0.35; // require some real saturation to count as "brand"
      for(var ci=0;ci<cands.length&&ci<30;ci++){
        var st=window.getComputedStyle(cands[ci]);
        var cbg=parseRgb(st.backgroundColor);
        if(cbg){var s=sat(cbg); if(s>bestSat){bestSat=s;best=cbg;}}
      }
      if(!best){
        // no saturated button bg → try a coloured link text
        for(var li=0;li<cands.length&&li<20;li++){
          var lc=parseRgb(window.getComputedStyle(cands[li]).color);
          if(lc&&sat(lc)>0.35){best=lc;break;}
        }
      }
      if(best)accent=best;
      // Contrast against the accent for legible button text.
      var contrast=luma(accent)<0.55?WHITE:BLACK;

      root.style.setProperty('--kz-text',rgbStr(text));
      root.style.setProperty('--kz-muted',rgbStr(muted));
      root.style.setProperty('--kz-surface',rgbStr(surface));
      root.style.setProperty('--kz-surface-2',rgbStr(surface2));
      root.style.setProperty('--kz-border',rgbStr(border));
      root.style.setProperty('--kz-accent',rgbStr(accent));
      root.style.setProperty('--kz-accent-contrast',rgbStr(contrast));
    }catch(e){
      root.style.setProperty('--kz-font','system-ui, -apple-system, Segoe UI, Roboto, sans-serif');
      root.style.setProperty('--kz-text','#111');
      root.style.setProperty('--kz-muted','#667');
      root.style.setProperty('--kz-surface','#fff');
      root.style.setProperty('--kz-surface-2','#f8fafc');
      root.style.setProperty('--kz-border','#e5e7eb');
      root.style.setProperty('--kz-accent','#111');
      root.style.setProperty('--kz-accent-contrast','#fff');
    }
  }

  // ── step machine state (single active widget) ──
  // _step: 0=services, 1=date, 2=details, 3=done. Auto-repaint after React hydration
  // is ONLY safe at step 0 (the service list); once the visitor advances we must not
  // re-assert, or a late hydration node-swap would snap them back to the start.
  var _root=null, _services=[], _svc=null, _date='', _slots=[], _slot=null, _submitting=false, _step=0;

  function setRoot(el){
    _root=el;
    if((' '+el.className+' ').indexOf(' kz-bk-root ')<0)el.className=(el.className+' kz-bk-root').trim();
    applyTheme(el);
    applyDesignTokens(el, KZ_DESIGN_TOKENS_MANIFEST);
  }

  function msg(text,kind){
    if(!_root)return;
    var host=_root.querySelector('.kz-bk-card')||_root;
    var m=host.querySelector('.kz-bk-msg');
    if(!m){m=_root.ownerDocument.createElement('div');m.className='kz-bk-msg';host.appendChild(m);}
    m.textContent=text||'';
    m.className='kz-bk-msg'+(kind?' kz-bk-msg-'+kind:'');
  }

  // Progressive single panel: service + date always shown; the slots holder fills when a
  // date is picked; the details holder fills when a slot is picked. Sub-renders fill the
  // HOLDERS in place (no full _root re-render), so advancing never re-runs the whole panel
  // (and the hydration self-heal only ever has to repaint the idle base panel).
  function renderServices(){ renderPanel(); }

  function renderPanel(){
    _step=0;
    _root.innerHTML='';
    var d=_root.ownerDocument;
    var card=d.createElement('div'); card.className='kz-bk-card';

    var title=d.createElement('h3'); title.className='kz-bk-title'; title.textContent='Book an appointment';
    card.appendChild(title);

    if(!_services.length){
      var e=d.createElement('div'); e.className='kz-bk-empty'; e.textContent="Booking isn't set up yet.";
      card.appendChild(e); _root.appendChild(card); return;
    }

    if(!_svc) _svc=_services[0]; // default to the first service

    // Service picker — a compact <select> when there's more than one; a static label otherwise.
    var svcField=d.createElement('label'); svcField.className='kz-bk-field';
    svcField.appendChild(labelSpan(d,'Service'));
    if(_services.length>1){
      var sel=d.createElement('select'); sel.className='kz-bk-select';
      for(var i=0;i<_services.length;i++){
        var o=d.createElement('option'); o.value=String(i);
        o.textContent=_services[i].name+' · '+fmt(_services[i].price_cents)+' · '+_services[i].duration_minutes+' min';
        if(_services[i]===_svc)o.selected=true;
        sel.appendChild(o);
      }
      sel.addEventListener('change',function(ev){
        _svc=_services[parseInt(ev.target.value,10)]||_services[0];
        _slot=null; _slots=[]; clearHolder('.kz-bk-details-holder');
        if(_date) loadSlots(); else clearHolder('.kz-bk-slots-holder');
        updatePayLabel();
      });
      svcField.appendChild(sel);
    } else {
      var one=d.createElement('div'); one.className='kz-bk-service-one';
      one.textContent=_svc.name+' · '+fmt(_svc.price_cents)+' · '+_svc.duration_minutes+' min';
      svcField.appendChild(one);
    }
    card.appendChild(svcField);

    // Date picker — always visible.
    var dateField=d.createElement('label'); dateField.className='kz-bk-field';
    dateField.appendChild(labelSpan(d,'Date'));
    var today=new Date(); var max=new Date(); max.setDate(max.getDate()+60);
    var input=d.createElement('input'); input.type='date'; input.className='kz-bk-date';
    input.setAttribute('min',ymd(today)); input.setAttribute('max',ymd(max));
    if(_date)input.value=_date;
    input.addEventListener('change',function(ev){
      _date=ev.target.value; _slot=null; clearHolder('.kz-bk-details-holder');
      if(_date)loadSlots(); else clearHolder('.kz-bk-slots-holder');
    });
    dateField.appendChild(input);
    card.appendChild(dateField);

    // Holders the later steps fill in place.
    var slotsHolder=d.createElement('div'); slotsHolder.className='kz-bk-slots-holder'; card.appendChild(slotsHolder);
    var detailsHolder=d.createElement('div'); detailsHolder.className='kz-bk-details-holder'; card.appendChild(detailsHolder);

    _root.appendChild(card);
    if(_date)renderSlots();
  }

  function labelSpan(d,text){ var s=d.createElement('span'); s.className='kz-bk-step-label'; s.textContent=text; return s; }
  function clearHolder(sel){ var h=_root&&_root.querySelector(sel); if(h)h.innerHTML=''; }
  function updatePayLabel(){ var b=_root&&_root.querySelector('.kz-bk-pay'); if(b&&_svc)b.textContent='Pay '+fmt(_svc.price_cents); }

  function renderSlots(){
    var holder=_root.querySelector('.kz-bk-slots-holder'); if(!holder)return;
    var d=_root.ownerDocument;
    holder.innerHTML='';
    holder.appendChild(labelSpan(d,'Pick a time'));
    if(!_slots.length){
      var e=d.createElement('div'); e.className='kz-bk-empty'; e.textContent='No times available on this day.';
      holder.appendChild(e); return;
    }
    var grid=d.createElement('div'); grid.className='kz-bk-slots';
    for(var i=0;i<_slots.length;i++){(function(iso){
      var b=d.createElement('button'); b.type='button'; b.className='kz-bk-slot'; b.setAttribute('data-iso',iso); b.textContent=sastHHmm(iso);
      if(iso===_slot)b.className='kz-bk-slot kz-bk-slot-sel';
      b.addEventListener('click',function(){
        _slot=iso;
        // mark selection without re-rendering the grid
        var all=grid.querySelectorAll('.kz-bk-slot');
        for(var j=0;j<all.length;j++)all[j].className='kz-bk-slot';
        b.className='kz-bk-slot kz-bk-slot-sel';
        renderDetails();
      });
      grid.appendChild(b);
    })(_slots[i]);}
    holder.appendChild(grid);
  }

  function renderDetails(){
    _step=2;
    var holder=_root.querySelector('.kz-bk-details-holder'); if(!holder)return;
    var d=_root.ownerDocument;
    holder.innerHTML='';
    var form=d.createElement('form'); form.className='kz-bk-details';
    form.innerHTML=''+
      '<div class="kz-bk-fields-row">'+
        '<label class="kz-bk-field"><span class="kz-bk-step-label">Your name</span><input class="kz-bk-f" name="name" placeholder="Full name"></label>'+
        '<label class="kz-bk-field"><span class="kz-bk-step-label">Email</span><input class="kz-bk-f" name="email" type="email" placeholder="you@example.com"></label>'+
      '</div>'+
      '<label class="kz-bk-field"><span class="kz-bk-step-label">Phone (optional)</span><input class="kz-bk-f" name="phone" placeholder="Phone"></label>'+
      '<button type="submit" class="kz-bk-pay">Pay '+escHtml(fmt(_svc.price_cents))+'</button>'+
      '<div class="kz-bk-confirm-note">'+escHtml(_svc.name)+' · '+escHtml(_date)+' at '+sastHHmm(_slot)+'</div>';
    form.addEventListener('submit',function(e){e.preventDefault();submit(form);});
    holder.appendChild(form);
    kzTermsInject(form);
    // bring the details into view (the panel grew downward)
    try{ form.scrollIntoView({block:'nearest'}); }catch(e){}
  }

  function val(form,name){var el=form.querySelector('[name="'+name+'"]');return el?(''+el.value).replace(/^\s+|\s+$/g,''):'';}

  function submit(form){
    if(_submitting)return;
    var name=val(form,'name'),email=val(form,'email');
    if(!name||!email){msg('Please enter your name and email.','error');return;}
    var terms=kzTermsCheck(form);
    if(!terms.ok){msg(KZ_TERMS_MESSAGE,'error');return;}
    _submitting=true;
    var btn=form.querySelector('button[type="submit"]');
    if(btn){btn.disabled=true;btn.textContent='Processing…';}
    var payload={service_id:_svc.id,starts_at:_slot,customer:{name:name,email:email,phone:val(form,'phone')}};
    if(terms.accept!==undefined)payload.accept_terms=terms.accept;
    msg('Redirecting to payment…','');
    fetch(BOOKING_URL+'/checkout',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)}).then(function(r){
      return r.json().then(function(d){return {status:r.status,ok:r.ok,data:d};},function(){return {status:r.status,ok:r.ok,data:{}};});
    }).then(function(res){
      if(res.ok&&res.data&&res.data.payment_url){window.location.href=res.data.payment_url;return;}
      _submitting=false;
      if(res.status===409){
        // The slot was taken between list + pay. Drop back to the panel's time-pick,
        // clear the details, and refresh the open slots so they can re-pick.
        _step=1; _slot=null;
        clearHolder('.kz-bk-details-holder');
        msg('That time was just taken — here are the latest times.','error');
        loadSlots();
        return;
      }
      if(btn){btn.disabled=false;btn.textContent='Pay '+fmt(_svc.price_cents);}
      msg((res.data&&res.data.error)||'Could not start your booking. Please try again.','error');
    }).catch(function(){_submitting=false;if(btn){btn.disabled=false;btn.textContent='Pay '+fmt(_svc.price_cents);}msg('Could not start your booking. Please try again.','error');});
  }

  function loadSlots(){
    if(!_svc||!_date)return;
    renderSlotsLoading();
    fetch(BOOKING_URL+'/slots?service_id='+encodeURIComponent(_svc.id)+'&date='+encodeURIComponent(_date),{headers:{'Accept':'application/json'}})
      .then(function(r){return r.ok?r.json():{slots:[]};})
      .then(function(d){_slots=(d&&d.slots)||[];renderSlots();})
      .catch(function(){_slots=[];renderSlots();});
  }
  function renderSlotsLoading(){
    var holder=_root.querySelector('.kz-bk-slots-holder');
    if(holder)holder.innerHTML='<div class="kz-bk-step-label">Loading times…</div>';
  }

  function hideMount(el){try{el.innerHTML='';el.style.display='none';}catch(e){}}

  function renderAll(){
    var blocks=document.querySelectorAll('[data-kizuri-shop="booking"]');
    if(!blocks.length)return;
    for(var i=0;i<blocks.length;i++){
      if(i===0){setRoot(blocks[0]);renderServices();}
      else hideMount(blocks[i]);
    }
  }

  // React hydration on the published (client-rendered) site re-renders the page
  // AFTER our deferred script runs, resetting the booking mount to its empty SSR
  // markup (and swapping the node). ensureRendered() (re)paints the widget whenever
  // the current mount is missing/empty — but ONLY while the visitor is still at the
  // service-pick step, so it never clobbers a date/slot/details flow in progress.
  // Idle = the visitor is still on the service list (step 0). Once they advance, a late
  // hydration repaint must NOT fire, or it would snap them back to the start (the bug:
  // click service -> date step shows -> hydration swaps the node -> repaint -> services).
  function widgetIsIdle(){ return _step===0; }
  function mountEmpty(el){ return !el || !el.querySelector('.kz-bk-title'); }
  function ensureRendered(){
    ensurePriceLists();
    var block=document.querySelector('[data-kizuri-shop="booking"]');
    if(!block)return;
    if(!widgetIsIdle())return; // never repaint mid-flow
    // A fresh node (hydration swapped it) or an emptied mount → repaint the service list.
    if(block!==_root || mountEmpty(block)) renderAll();
  }
  function watchForHydration(){
    try{
      // Re-assert after hydration. Tick FAST in the first ~1.2s (when React hydration is
      // most likely to wipe our first render — a slow heal here is the "empty for a second"
      // bug), then a couple of slower follow-ups, plus a MutationObserver for late/again
      // hydration. Cheap + idempotent.
      var fast=0;
      var fastIv=setInterval(function(){ ensureRendered(); if(++fast>=12)clearInterval(fastIv); },100); // 12×100ms ≈ 1.2s
      var slow=0;
      var slowIv=setInterval(function(){ ensureRendered(); if(++slow>=6)clearInterval(slowIv); },500); // out to ~3s
      if(typeof MutationObserver!=='undefined'){
        var mo=new MutationObserver(function(){ ensureRendered(); });
        mo.observe(document.body,{childList:true,subtree:true});
        setTimeout(function(){ try{mo.disconnect();}catch(e){} },8000);
      }
    }catch(e){}
  }

  function handleReturn(){
    var s=window.location.search||'';var m2=s.match(/[?&]kizuri_booking=([^&]+)/);if(!m2)return;
    var v=decodeURIComponent(m2[1]);
    if(!_root)return;
    if(v==='success'){_step=3;_root.innerHTML='<div class="kz-bk-card"><h3 class="kz-bk-title">Booking confirmed</h3></div>';msg('Booking confirmed — a confirmation is on its way.','success');}
    else if(v==='cancel'){msg('Payment cancelled — you can pick another time.','error');}
  }

  // ── price list: [data-kizuri-shop="price-list"] ──
  // Drawn from the SAME services the widget sells, grouped by the dashboard's
  // "Group" field, so the published prices can never drift from what booking
  // charges. Stateless (native <details>), so repainting after hydration is safe.
  var _loaded=false, _servicesFailed=false;

  // R150 for whole rands (a price list, not a receipt); cents kept when present.
  function fmtPrice(cents){ return (Math.round(cents)%100===0)?fmt(cents).replace(/\.00$/,''):fmt(cents); }

  function priceGroups(){
    var order=[], byName={}, loose=[];
    for(var i=0;i<_services.length;i++){
      var s=_services[i];
      if(!s||s.status!=='active')continue;
      var g=(s.category==null?'':String(s.category)).replace(/^\s+|\s+$/g,'');
      if(!g){loose.push(s);continue;}
      if(!byName.hasOwnProperty(g)){byName[g]=[];order.push(g);}
      byName[g].push(s);
    }
    var out=[];
    for(var j=0;j<order.length;j++)out.push({name:order[j],items:byName[order[j]]});
    // Ungrouped services: a plain "Services" list on a site that never grouped
    // anything; "More services" at the end on one that did.
    if(loose.length)out.push({name:order.length?'More services':'Services',items:loose});
    return out;
  }

  function bookService(id){
    if(!_root)return;
    var pick=null;
    for(var i=0;i<_services.length;i++){if(_services[i].id===id){pick=_services[i];break;}}
    if(!pick)return;
    _svc=pick; _slot=null; _slots=[];
    renderPanel();
    if(_date)loadSlots();
    try{ _root.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
  }

  function plNote(mount,text){
    mount.style.display='';
    mount.innerHTML='';
    var n=mount.ownerDocument.createElement('div'); n.className='kz-pl-note'; n.textContent=text;
    mount.appendChild(n);
  }

  function renderPriceList(mount){
    if((' '+mount.className+' ').indexOf(' kz-pl-root ')<0)mount.className=(mount.className+' kz-pl-root').trim();
    applyTheme(mount);
    applyDesignTokens(mount, KZ_DESIGN_TOKENS_MANIFEST);
    if(!_loaded){plNote(mount,'Loading prices…');return;}
    // A failed fetch is not "no prices" — say so, never vanish.
    if(_servicesFailed){plNote(mount,"Prices couldn't load right now. Please refresh, or message us.");return;}
    var groups=priceGroups();
    if(!groups.length){mount.innerHTML='';mount.style.display='none';return;}
    mount.style.display='';
    mount.innerHTML='';
    var d=mount.ownerDocument;
    var canBook=!!document.querySelector('[data-kizuri-shop="booking"]');
    for(var gi=0;gi<groups.length;gi++){
      var g=groups[gi];
      var det=d.createElement('details'); det.className='kz-pl-group';
      if(gi===0)det.open=true;
      var sum=d.createElement('summary'); sum.className='kz-pl-summary';
      var gn=d.createElement('span'); gn.className='kz-pl-group-name'; gn.textContent=g.name; sum.appendChild(gn);
      var cnt=d.createElement('span'); cnt.className='kz-pl-count'; cnt.textContent=g.items.length+(g.items.length===1?' service':' services'); sum.appendChild(cnt);
      var chev=d.createElement('span'); chev.className='kz-pl-chevron'; chev.setAttribute('aria-hidden','true'); sum.appendChild(chev);
      det.appendChild(sum);
      var rows=d.createElement('div'); rows.className='kz-pl-rows';
      for(var ri=0;ri<g.items.length;ri++){(function(s){
        var row=d.createElement('div'); row.className='kz-pl-row';
        var info=d.createElement('div'); info.className='kz-pl-info';
        var nm=d.createElement('h4'); nm.className='kz-pl-name'; nm.textContent=s.name; info.appendChild(nm);
        if(s.description){var ds=d.createElement('p'); ds.className='kz-pl-desc'; ds.textContent=s.description; info.appendChild(ds);}
        var meta=d.createElement('div'); meta.className='kz-pl-meta'; meta.textContent=s.duration_minutes+' min'; info.appendChild(meta);
        row.appendChild(info);
        var side=d.createElement('div'); side.className='kz-pl-side';
        var pr=d.createElement('span'); pr.className='kz-pl-price'; pr.textContent=fmtPrice(s.price_cents); side.appendChild(pr);
        if(canBook){
          var bk=d.createElement('button'); bk.type='button'; bk.className='kz-pl-book'; bk.textContent='Book';
          bk.setAttribute('aria-label','Book '+s.name);
          bk.addEventListener('click',function(){bookService(s.id);});
          side.appendChild(bk);
        }
        row.appendChild(side);
        rows.appendChild(row);
      })(g.items[ri]);}
      det.appendChild(rows);
      mount.appendChild(det);
    }
  }

  function renderPriceLists(){
    var mounts=document.querySelectorAll('[data-kizuri-shop="price-list"]');
    for(var i=0;i<mounts.length;i++)renderPriceList(mounts[i]);
  }

  // Hydration can wipe a price list just like the widget. Repaint any mount that
  // lost its content (a hidden empty list stays hidden).
  function ensurePriceLists(){
    var mounts=document.querySelectorAll('[data-kizuri-shop="price-list"]');
    for(var i=0;i<mounts.length;i++){
      var m=mounts[i];
      if(m.style.display==='none')continue;
      if(!m.querySelector('.kz-pl-group,.kz-pl-note'))renderPriceList(m);
    }
  }

  function boot(services,failed){
    injectStyles();
    _services=services||[];
    _loaded=true; _servicesFailed=!!failed;
    renderAll();
    renderPriceLists();
    handleReturn();
  }

  if (typeof window!=='undefined' && window.__KIZURI_BOOKING_TEST__){
    var t=window.__KIZURI_BOOKING_TEST__;
    if(t.loadTerms)kzTermsLoad();
    boot(t.services||[]);
    return;
  }

  // Draw an immediate placeholder card so the booking section is NEVER visibly empty while
  // the services fetch is in flight (and so hydration has a titled card to preserve). The
  // self-heal keeps this present; boot() replaces it with the real panel when data lands.
  function renderPlaceholder(){
    var block=document.querySelector('[data-kizuri-shop="booking"]');
    if(!block)return;
    setRoot(block);
    _root.innerHTML='<div class="kz-bk-card"><h3 class="kz-bk-title">Book an appointment</h3>'+
      '<div class="kz-bk-step-label">Loading…</div></div>';
  }

  function run(){
    injectStyles();
    renderPlaceholder();   // visible instantly
    renderPriceLists();    // "Loading prices…" until the services land
    watchForHydration();   // start re-asserting immediately, not after the fetch
    // T&Cs checkbox for the Pay form. Only where a booking widget exists: this
    // script bakes on every site, and a site with no bookings needn't ask.
    if(document.querySelector('[data-kizuri-shop="booking"]'))kzTermsLoad();
    fetch(BOOKING_URL+'/services',{headers:{'Accept':'application/json'}})
      .then(function(r){return r.ok?r.json().then(function(d){boot((d&&d.services)||[]);}):boot([],true);})
      .catch(function(){boot([],true);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();