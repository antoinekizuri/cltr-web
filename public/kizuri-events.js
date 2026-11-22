(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var EVENTS_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/events/354c4e09-4913-413b-b740-947174913a8e";
  var KZ_DESIGN_TOKENS_MANIFEST = {"radius":"soft","shadow":"flat","weight":"bold","density":"comfortable"};
  // The shared checkout core POSTs to STOREFRONT_URL + checkoutPath; for events that is
  // {eventsUrl}/checkout, so STOREFRONT_URL is the events catalog base.
  var STOREFRONT_URL = EVENTS_URL;

  var EV_STYLES = "\n.kz-ev-root,.kz-ev-root *{box-sizing:border-box;}\n.kz-ev-root{font-family:var(--kz-font,inherit);color:#111;color:var(--kz-text,#111);max-width:1080px;margin:0 auto;}\n\n.kz-ev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;gap:var(--kz-gap,20px);}\n.kz-ev-card{display:flex;flex-direction:column;cursor:pointer;overflow:hidden;border-radius:16px;border-radius:var(--kz-radius,16px);\n  background:#fff;background:var(--kz-surface,#fff);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);\n  box-shadow:0 1px 2px rgba(0,0,0,.06),0 12px 32px rgba(0,0,0,.12);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 12px 32px rgba(0,0,0,.12));\n  transition:transform .12s ease,box-shadow .12s ease;}\n/* Hover shadow is a deliberate interaction affordance (the card visibly lifts\n   further on hover), distinct from the resting --kz-shadow token — stays a\n   literal so hover feedback keeps its own distinctiveness regardless of what\n   the site's resting shadow bucket resolves to. */\n.kz-ev-card:hover{transform:translateY(-2px);box-shadow:0 1px 2px rgba(0,0,0,.06),0 18px 44px rgba(0,0,0,.22);}\n.kz-ev-card-img{display:block;width:100%;height:170px;object-fit:cover;background:#f1f5f9;background:var(--kz-surface-2,#f1f5f9);}\n.kz-ev-card-ph{display:flex;align-items:center;justify-content:center;width:100%;height:170px;font-size:34px;\n  background:#f1f5f9;background:var(--kz-surface-2,#f1f5f9);color:#94a3b8;color:var(--kz-muted,#94a3b8);}\n.kz-ev-card-body{display:flex;flex-direction:column;gap:6px;padding:16px;}\n.kz-ev-card-title{font-size:17px;font-weight:700;font-weight:var(--kz-weight,700);line-height:1.25;margin:0;color:#111;color:var(--kz-text,#111);}\n.kz-ev-card-meta{font-size:13px;color:#667;color:var(--kz-muted,#667);}\n/* card-price weight (600) is deliberately a middle tier — distinct from both\n   the 700/800 heading boldness and the 400 body-text baseline — not tokenized. */\n.kz-ev-card-price{margin-top:4px;font-size:14px;font-weight:600;color:#111;color:var(--kz-text,#111);}\n\n.kz-ev-detail{display:flex;flex-direction:column;gap:18px;gap:var(--kz-gap,18px);padding:24px;padding:var(--kz-pad,24px);border-radius:16px;border-radius:var(--kz-radius,16px);\n  background:#fff;background:var(--kz-surface,#fff);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);\n  box-shadow:0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.24);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.24));}\n.kz-ev-detail-img{display:block;width:100%;max-height:320px;object-fit:cover;border-radius:12px;border-radius:var(--kz-radius,12px);\n  background:#f1f5f9;background:var(--kz-surface-2,#f1f5f9);}\n.kz-ev-detail-title{font-size:24px;font-weight:800;line-height:1.15;margin:0;color:#111;color:var(--kz-text,#111);}\n.kz-ev-detail-meta{font-size:14px;color:#667;color:var(--kz-muted,#667);}\n.kz-ev-detail-desc{font-size:15px;line-height:1.5;color:#111;color:var(--kz-text,#111);margin:0;}\n/* back-link weight (600) is deliberately a middle tier, not tokenized (see .kz-ev-card-price above). */\n.kz-ev-back{align-self:flex-start;cursor:pointer;padding:8px 14px;font:inherit;font-size:13px;font-weight:600;\n  background:transparent;color:#111;color:var(--kz-text,#111);\n  border:1px solid #cbd5e1;border:1px solid var(--kz-border,#cbd5e1);border-radius:10px;border-radius:var(--kz-radius-sm,10px);}\n\n.kz-ev-tiers{display:flex;flex-direction:column;gap:10px;gap:var(--kz-gap,10px);}\n.kz-ev-tier{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:12px;border-radius:var(--kz-radius-sm,12px);\n  background:#fff;background:var(--kz-surface-2,#fff);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n/* tier-name weight (600) is deliberately a middle tier, not tokenized (see .kz-ev-card-price above). */\n.kz-ev-tier-name{flex:1;min-width:120px;font-size:15px;font-weight:600;color:#111;color:var(--kz-text,#111);}\n.kz-ev-tier-price{font-size:15px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;color:var(--kz-text,#111);}\n/* tier-remaining weight (600) is deliberately a middle tier, not tokenized (see .kz-ev-card-price above). */\n.kz-ev-tier-remaining{font-size:12px;font-weight:600;letter-spacing:.02em;color:#667;color:var(--kz-muted,#667);}\n.kz-ev-tier-soldout{font-size:12px;font-weight:700;font-weight:var(--kz-weight,700);color:#b91c1c;}\n.kz-ev-qty{width:64px;padding:9px 10px;font:inherit;font-size:15px;text-align:center;\n  color:#111;color:var(--kz-text,#111);\n  background:#fff;background:var(--kz-surface,#fff);\n  border:1px solid #cbd5e1;border:1px solid var(--kz-border,#cbd5e1);border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  -webkit-appearance:none;appearance:textfield;}\n.kz-ev-get{cursor:pointer;padding:10px 18px;border:0;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font:inherit;font-weight:700;font-weight:var(--kz-weight,700);font-size:14px;\n  background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);\n  transition:filter .15s ease,transform .05s ease;}\n.kz-ev-get:hover{filter:brightness(.92);}\n.kz-ev-get:active{transform:translateY(1px);}\n.kz-ev-get[disabled]{opacity:.5;cursor:not-allowed;filter:none;}\n\n.kz-ev-empty{padding:24px 0;font-size:14px;color:#667;color:var(--kz-muted,#667);}\n\n/* Mobile overrides: a tighter detail padding/tier gap at narrow widths is a\n   deliberate, size-independent layout adjustment (same reasoning as booking's\n   @media overrides, which also stay literal) — not a site-design choice, so\n   these stay plain literals rather than var(--kz-pad,...)/var(--kz-gap,...).\n   Tokenizing them would make the mobile-specific tightening track the\n   DESKTOP density token, which is not what these rules are for. */\n@media (max-width:480px){\n  .kz-ev-detail{padding:18px;}\n  .kz-ev-tier{gap:8px;}\n}\n";
  function injectStyles(){
    try{
      if(document.querySelector('style[data-kizuri-events-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-events-styles','');
      s.textContent=EV_STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  function escHtml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}
  function fmt(cents){var sign=cents<0?'-':'';var a=Math.abs(Math.round(cents));var r=Math.floor(a/100);var c=(''+(a%100));while(c.length<2)c='0'+c;var g=(''+r).replace(/\B(?=(\d{3})+(?!\d))/g,',');return sign+'R'+g+'.'+c;}

  // SAST (UTC+2, no DST) human date for an event's ISO instant, so out-of-town visitors
  // see the business's local time. Matches AvailabilityEngine.SastOffset on the server.
  // Renders like "Sun 12 Jul, 8:00 PM".
  var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function sastDate(iso){
    try{
      var d=new Date(iso);
      var sd=new Date(d.getTime()+2*60*60*1000);
      var dow=DAYS[sd.getUTCDay()];
      var day=sd.getUTCDate();
      var mon=MONTHS[sd.getUTCMonth()];
      var h24=sd.getUTCHours();var mm=sd.getUTCMinutes();
      var ap=h24<12?'AM':'PM';
      var h12=h24%12;if(h12===0)h12=12;
      var mmS=mm<10?'0'+mm:''+mm;
      return dow+' '+day+' '+mon+', '+h12+':'+mmS+' '+ap;
    }catch(e){return iso;}
  }

  function minTierPrice(ev){
    var t=ev&&ev.tiers||[];var mn=null;
    for(var i=0;i<t.length;i++){var p=t[i].price_cents;if(mn===null||p<mn)mn=p;}
    return mn===null?0:mn;
  }
  function tierRemaining(t){
    if(t.remaining!=null)return t.remaining;
    var cap=t.capacity||0,sold=t.sold||0;return cap-sold;
  }

  // Parse "rgb(r, g, b)" / "rgba(...)" → [r,g,b] or null.
  function parseRgb(s){
    if(!s)return null;
    var m=s.match(/rgba?\(([^)]+)\)/); if(!m)return null;
    var p=m[1].split(',').map(function(x){return parseFloat(x);});
    if(p.length<3||isNaN(p[0]))return null;
    if(p.length>=4&&p[3]===0)return null;
    return [p[0],p[1],p[2]];
  }
  function luma(rgb){ return (0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2])/255; }
  function sat(rgb){ var mx=Math.max(rgb[0],rgb[1],rgb[2]),mn=Math.min(rgb[0],rgb[1],rgb[2]); return mx===0?0:(mx-mn)/mx; }
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
  var KZ_DT_DEFAULTS = {"radius":"soft","shadow":"lifted","weight":"regular","density":"comfortable"};

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
      var surface=dark?mix(bg,WHITE,0.14):mix(bg,WHITE,1.0);
      var surface2=dark?mix(bg,WHITE,0.20):mix(bg,BLACK,0.03);
      var border=dark?mix(bg,WHITE,0.30):mix(bg,BLACK,0.12);
      var accent=dark?WHITE:BLACK;
      var cands=document.querySelectorAll('a,button,[role=button]');
      var best=null,bestSat=0.35;
      for(var ci=0;ci<cands.length&&ci<30;ci++){
        var st=window.getComputedStyle(cands[ci]);
        var cbg=parseRgb(st.backgroundColor);
        if(cbg){var s=sat(cbg); if(s>bestSat){bestSat=s;best=cbg;}}
      }
      if(!best){
        for(var li=0;li<cands.length&&li<20;li++){
          var lc=parseRgb(window.getComputedStyle(cands[li]).color);
          if(lc&&sat(lc)>0.35){best=lc;break;}
        }
      }
      if(best)accent=best;
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

  // ── shared client checkout core (cart store + drawer + checkout + return) ──
  // Single-sourced from checkout-core.ts; configured for events (tierId lines, name/email/
  // phone, /checkout, kz_ev_cart_ prefix). Exposes the events-owned
  // window.__kizuriEventsCheckout (per-vertical name — never clobber the shop's).
(function(){
  var CHECKOUT_STYLES = "\n.kz-checkout-cart-toggle{position:fixed;bottom:20px;right:20px;z-index:2147483000;border:0;border-radius:999px;padding:14px 20px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);font:inherit;font-weight:600;font-size:14px;}\n.kz-checkout-cart{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:92vw;z-index:2147483001;background:#fff;color:#111;box-shadow:-8px 0 40px rgba(0,0,0,.25);display:flex;flex-direction:column;padding:20px;overflow:auto;font:inherit;}\n.kz-checkout-cart-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}\n.kz-checkout-cart-head strong{font-size:18px;color:#111;}\n.kz-checkout-cart-close{cursor:pointer;border:0;background:transparent;color:#111;font:inherit;font-size:14px;opacity:.6;}\n.kz-checkout-cart-close:hover{opacity:1;}\n.kz-checkout-cart-item{display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #eee;}\n.kz-checkout-cart-item-name{flex:1;font-size:14px;color:#111;}\n.kz-checkout-cart-item-price{font-weight:600;font-size:14px;color:#111;}\n.kz-checkout-cart-qty{width:60px;padding:6px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;color:#111;}\n.kz-checkout-cart-remove{cursor:pointer;border:0;background:transparent;color:#111;opacity:.55;font:inherit;font-size:13px;}\n.kz-checkout-cart-remove:hover{opacity:1;}\n.kz-checkout-cart-subtotal{font-weight:700;font-size:16px;margin:14px 0;color:#111;}\n.kz-checkout-checkout-btn{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;width:100%;}\n.kz-checkout-checkout{display:flex;flex-direction:column;gap:10px;margin-top:12px;}\n.kz-checkout-checkout input{padding:11px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;font-size:14px;color:#111;background:#fff;width:100%;}\n.kz-checkout-pay{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;}\n.kz-checkout-empty{opacity:.7;padding:24px;text-align:center;color:#111;}\n.kz-checkout-cart-msg{padding:11px;border-radius:8px;background:#f1f5f9;color:#111;margin:10px 0;font-size:13px;}\n\n.kz-checkout-terms{display:flex;align-items:flex-start;gap:10px;margin:2px 0 12px;font-size:14px;line-height:1.45;cursor:pointer;text-align:left;}\n.kz-checkout-terms input{flex:none;width:18px !important;height:18px;margin:1px 0 0;padding:0;accent-color:currentColor;cursor:pointer;}\n.kz-checkout-terms a{color:inherit;text-decoration:underline;text-underline-offset:3px;}\n.kz-checkout-terms-secure{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;margin:10px 0 0;font-size:12px;line-height:16px;opacity:.75;}\n.kz-checkout-terms-secure-logo{display:inline-block;height:16px;flex:none;}\n.kz-checkout-terms-secure-logo svg{display:block;width:100%;height:100%;}\n";
  function injectCheckoutStyles(){
    try{
      if(document.querySelector('style[data-kizuri-checkout-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-checkout-styles','');
      s.textContent=CHECKOUT_STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}

  // ── Terms & Conditions + "Secure payment by [logo]" (terms-core) ──
  var _kzTermsUrl=null, _kzTermsLoaded=false, _kzTermsForms=[];
  // id → [name, logo SVG, width/height] for the "Secure payment by [logo]" line.
  var _kzPayProvider=null, _kzPayProviders={"payfast":["PayFast","<svg viewBox=\"0 0 160 56\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><g clip-path=\"url(#kzpl-payfast-a)\"><path fill=\"currentColor\" d=\"M150.5 8.5H145l9.4 11-9.3 10.8h5.5l9.3-10.9z\"/><path fill=\"currentColor\" d=\"M22.7 19.3q0 2.7-.9 4.7-.8 2.1-2.2 3.6-1.4 1.4-3.3 2.2-1.8.7-3.7.7c-1.4 0-3.3-.3-4.5-1q-1.9-1.2-3-2.7v9.8H0v-28h5V12a11 11 0 0 1 3-2.8A8 8 0 0 1 12.7 8c1.7 0 2.5.3 3.7.7q1.8.7 3.3 2.2a10 10 0 0 1 3 8.3m-5.2 0q0-1.6-.5-2.9t-1.4-2.2a5 5 0 0 0-2-1.4q-1-.4-2.4-.4t-2.4.4q-1.2.6-2 1.5t-1.5 2.2a9 9 0 0 0 0 5.7l1.4 2.2q.8.9 2 1.4 1.3.4 2.5.4 1.3 0 2.5-.4a7 7 0 0 0 2-1.4q.8-1 1.3-2.2t.5-3M45 30h-5v-2.7q-1 1.3-2.9 2.2-1.7 1-4.2 1c-1.6 0-2-.2-3-.5q-1.5-.4-2.5-1.2a8 8 0 0 1-1.7-2.1q-.6-1.3-.7-3a6 6 0 0 1 2.6-5.3q1.2-.8 2.8-1.2a15 15 0 0 1 3.5-.5q2 0 3.4.3 1.5.2 2.7.6v-.5q0-2.3-1.4-3.4t-4-1.2a11 11 0 0 0-3.4.4q-1.5.3-3 1l-1.4-4A19 19 0 0 1 35 8.2q5 0 7.4 2.4 2.3 2.2 2.3 6.7V30zm-5-7.8v-1.4q-1-.4-2.2-.6-1.3-.3-2.8-.3-2.4 0-3.7 1a3 3 0 0 0-1.3 2.5q0 1.6 1.2 2.5 1.3.8 3 .8 1.4 0 2.2-.4 1-.3 2-.9.7-.7 1.1-1.5.5-.7.5-1.8zM69.7 8.5 61 30.6l-1.4 2.9q-.7 1.1-1.6 1.8t-2 1.1a9 9 0 0 1-5.1 0q-1.3-.3-2.4-.9l1.7-3.7 1.4.6 1.5.3q.9 0 1.8-.6t1.3-2L47.1 8.8h5.4l6.3 16 5.7-16h5.2zM106.2 30h-5v-2.7q-1.1 1.3-3 2.2-1.6 1-4.1 1c-1.6 0-2-.2-3-.5q-1.4-.4-2.6-1.2a8 8 0 0 1-1.6-2.1q-.7-1.3-.7-3a6 6 0 0 1 2.5-5.3q1.3-.8 2.8-1.2a15 15 0 0 1 3.6-.5q1.8 0 3.4.3t2.7.6v-.5q0-2.3-1.4-3.4-1.5-1.2-4-1.2a11 11 0 0 0-3.4.4q-1.5.3-3 1l-1.4-4a19 19 0 0 1 8.3-1.7q5 0 7.3 2.4 2.4 2.2 2.4 6.7V30zm-5-7.8v-1.4q-.9-.4-2.2-.6-1.3-.3-2.7-.3-2.4 0-3.7 1t-1.3 2.5 1.2 2.5 3 .8q1.4 0 2.2-.4 1.1-.3 1.9-.9.9-.7 1.2-1.5.5-.7.5-1.8zm25 1.5q0 1.5-.6 2.9t-1.8 2A8 8 0 0 1 121 30q-1.5.4-3.1.3a17 17 0 0 1-5-.8q-2.3-.8-4.4-2.4l2.2-3.3q1.8 1.4 3.7 2 1.8.7 3.5.7 1.8 0 2.6-.6 1-.7 1-1.8 0-.7-.5-1-.3-.6-1-.8l-1.7-.7-1.9-.5-2.4-.8-2.2-1.1q-1-.7-1.6-1.8-.7-1-.7-2.5 0-1.6.6-2.9a6 6 0 0 1 1.6-2q1.1-.8 2.6-1.4 1.5-.4 3-.4a15 15 0 0 1 8.1 2.4l-2 3.5q-1.5-.8-3.1-1.4t-3-.6-2.3.7q-.7.5-.7 1.5 0 .7.3 1.1.5.5 1.2.8l1.6.6 1.9.6 2.4.8q1.2.4 2.1 1.2 1.1.6 1.6 1.7.7 1 .7 2.5m8-11v10.6q0 1.5.7 2 .8.7 2 .7a8 8 0 0 0 3-.7v4l-2 .8a11 11 0 0 1-5 0q-1.2-.3-2.1-1.1-.9-.7-1.3-2-.5-1.2-.5-3V2.7h5v5.8h6v4.3h-6zm-54.5-4h5.8v4h-5.7V30h-5V12.7h-2.8V8.6h2.7V7q0-3.5 1.8-5.3t5-1.7a13 13 0 0 1 4 .6v4.1a10 10 0 0 0-3-.5q-2.8 0-2.8 3.2zM96 46.7a3 3 0 0 0-.6-1.7l-.7-.5q-.5-.2-1.1-.2t-1 .2-.9.5l-.5.7q-.3.4-.3 1zm1.8.6v.6h-6.9q0 .5.3 1 .1.5.6.8.3.3.9.5.5.3 1 .2a3 3 0 0 0 2.5-1.3l1.2 1a4 4 0 0 1-3.7 1.7 5 5 0 0 1-3.2-1.2l-1-1.4q-.3-.7-.3-1.8 0-1 .3-1.8.4-.9 1-1.4a4 4 0 0 1 3.1-1.3q1 0 1.8.3t1.3.9.8 1.4.3 1.8m17.2-4-2 6.5-2-6.5h-1.8l-2.1 6.5-2-6.5h-1.8l2.9 8.4h1.7l2.1-6.3 2.2 6.3h1.8l2.8-8.4zm9.2 4.2-.2-1.2a3 3 0 0 0-1.5-1.6l-1.2-.3q-.7 0-1.2.3l-1 .7a3 3 0 0 0-.7 2q0 .7.2 1.2l.5 1 1 .7 1.2.2 1.2-.2 1-.7.5-1zm1.8 0a4 4 0 0 1-2.9 4 5 5 0 0 1-3.6 0 4 4 0 0 1-2.8-4 4 4 0 0 1 2.8-4.1 5 5 0 0 1 3.6 0q.9.3 1.5.9a4 4 0 0 1 1.4 3.1m8.2-6.7h-1.7v11h1.7zm-31.6 3.8v-1.2h-2.2v-2.7h-1.7v8.6q0 1.3.7 2t1.9.6h.7l.6-.2v-1.3h-.4l-.5.1q-.7 0-1-.3-.3-.4-.3-1v-4.6zM131 43q-.7 0-1.5.5a3 3 0 0 0-1.1 1.2v-1.4h-1.6v8.4h1.7v-4.4l.1-1 .5-1a2 2 0 0 1 1.8-.8l.8.1v-1.5zm-43 2.1-.5-1-1-.8a4 4 0 0 0-2.4-.2 3 3 0 0 0-1.4 1l-.5.5v-1.3h-1.6v8.4h1.7v-4.5q0-1.2.6-2a2 2 0 0 1 1.7-.8l1 .2.6.6.3.8v5.7h1.8v-5.2q0-.8-.2-1.4m49.8-1.8h2l-3.5 4.2 3.5 4.2h-2l-3.7-4.2zm-74.7 7.1q.6 0 1.1-.2l1-.6.5-1a3 3 0 0 0 0-2.2 2 2 0 0 0-1.5-1.5q-.5-.2-1.1-.2a3 3 0 0 0-2 .8q-.4.3-.6.9l-.2 1.1.2 1.2.6.9.8.6zm-4.4-11.8h1.6v6l1.3-1 1.7-.4q.9 0 1.8.4.8.3 1.3.9t.9 1.3q.3.9.3 1.7 0 1-.3 1.7a4 4 0 0 1-2.2 2.3 4 4 0 0 1-3.5 0 3 3 0 0 1-1.2-1v1.2h-1.7zm9 4.8h1.8l2.5 6.4 2.4-6.4h1.7l-4 10-.4 1-.6.7-.7.5-1.1.2-1.5-.3.2-1.4q.6.3 1 .2h.6l.5-.4.3-.4.2-.5.5-1.3z\"/></g><defs><clipPath id=\"kzpl-payfast-a\"><path fill=\"currentColor\" d=\"M0 0h160v56H0z\"/></clipPath></defs></svg>",2.857142857142857],"yoco":["Yoco","<svg fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 110 42\"><path fill-rule=\"evenodd\" d=\"M36 20.9q.2 5 5.3 4.9c3.3 0 5.4-1.4 5.4-5q-.2-5.2-5.3-5.1-5.1 0-5.3 5.1m5.4-12.4q4 0 6.8 1.5 6.2 3 6.4 10.8v.1q0 4-1.7 6.8Q49.5 33 41.4 33q-4 0-7-1.3Q28.1 29 28 20.9v-.1q0-3.9 1.7-6.6 3.6-5.6 11.6-5.7m-24.6 9.3L22 9.1h9L20.7 25.8v6.5h-8v-6.6L3 9.1h8.8zm76 8q-5.1 0-5.3-5 .2-5.1 5.3-5.1 5.1-.1 5.3 5.2-.2 5-5.3 4.9m7-15.8q-3-1.5-6.9-1.5-8 0-11.5 5.7-1.7 2.7-1.7 6.6.1 8.3 6.2 10.9 3 1.3 7 1.3 8 0 11.5-5.3 1.7-2.6 1.7-6.8v-.1c0-5.2-2.4-9-6.3-10.8m-41.9 4.2q3.6-5.6 11.6-5.7 4 0 6.8 1.5 1 .4 1.8 1v7.4s-4-2.7-7.6-2.7c-3.3 0-6 1.7-6 5.1s2.7 5 6 5c3.7 0 7.6-2.7 7.6-2.7v7.6a15 15 0 0 1-8.6 2.3q-4 0-7-1.3Q56.2 29 56 20.9v-.1q0-3.9 1.7-6.6\" clip-rule=\"evenodd\"/></svg>",2.619047619047619],"ikhokha":["iKhokha","<svg viewBox=\"0 0 86 18\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><g fill=\"currentColor\" clip-path=\"url(#kzpl-ikhokha-a)\"><path d=\"m22.9 14.8-.3.8-.7.2h-.4q-.8 0-1.3-.4a1 1 0 0 1-.4-1V7.7l.3-.8q.3-.2.7-.2h.4q.7 0 1.3.3a1 1 0 0 1 .4 1.2zM20 3.2a2 2 0 0 1 2.5 0 2 2 0 0 1 0 2.4 2 2 0 0 1-2.5 0 2 2 0 0 1 0-2.4m8.1 8v3.4a1 1 0 0 1-.3 1l-.8.1h-.4q-.7 0-1.3-.3a2 2 0 0 1-.4-1.3V4.7l.3-.8q.4-.3.8-.2h.4q.8 0 1.3.3a2 2 0 0 1 .4 1.3v3l3.3-4a1 1 0 0 1 1.2-.5q.6 0 1.1.5l.4 1.1-.2 1-.7 1-2.3 2.4 1.4 1.7.5.5 1.3 1.5.3.4v.8l-.4.6a2 2 0 0 1-1.2.5l-1.1-.3-1-1zm16.5 3.6-.3.8-.7.2h-.4q-.6 0-1.3-.4a1 1 0 0 1-.4-1v-4q0-1.5-1.3-1.4-.6 0-1.2.3v5.5l-.3.8-.7.2h-.3q-.8 0-1.4-.4a1 1 0 0 1-.3-1V4.6l.2-.8.7-.2h.4q.8 0 1.3.3A1 1 0 0 1 39 5v2l1.8-.3q1.5-.2 2.8.9a4 4 0 0 1 1 2.6zm5-1.8a1 1 0 0 0 1.2.5 1 1 0 0 0 1.1-.6q.5-.7.4-1.7.1-.9-.4-1.6a1.5 1.5 0 0 0-2.3 0 4 4 0 0 0 0 3.3m4.6 1.8a5 5 0 0 1-3.4 1.2 5 5 0 0 1-3.5-1.3 4 4 0 0 1-1.3-3.4q0-1 .4-1.9A4 4 0 0 1 48.9 7q.9-.5 1.9-.3 1 0 1.9.3t1.5 1l1 1.4q.3 1 .3 2a5 5 0 0 1-1.3 3.4M65 13.5a1 1 0 0 1 .4.9v.3a2 2 0 0 1-1.6 1q-.6.1-1-.2-.6-.3-1-1L60 12.4v2.5l-.3.8-.7.2h-.4q-.7 0-1.3-.4a1 1 0 0 1-.4-1V4.6l.3-.8q.4-.3.7-.2h.4q.8 0 1.3.3A1 1 0 0 1 60 5v5l2.6-2.7a1 1 0 0 1 1-.4h.2q.6 0 1 .5a1 1 0 0 1 .4.9l-.2.8-.8.8-.6.4-1 1zm10.5 1.3-.3.8-.7.2h-.3q-.8 0-1.3-.4a1 1 0 0 1-.4-1v-4q0-1.5-1.3-1.4-.7 0-1.2.3v5.5l-.3.8-.7.2h-.4q-.8 0-1.3-.4a1 1 0 0 1-.4-1V4.6l.3-.8q.3-.2.7-.2h.4q.7 0 1.3.3A1 1 0 0 1 70 5v2l1.7-.3q1.5-.1 2.9.9a3 3 0 0 1 1 2.6zm6.4-1.2q.3 0 .5-.2V12H81q-1.2 0-1.2.8t1.3.8zm2.3-6.3a3 3 0 0 1 1.2 2.5v4l-.2.7-.7.6q-1.6.8-3.3.7-1.7 0-3.1-.7A3 3 0 0 1 77 13a2 2 0 0 1 .7-2 4 4 0 0 1 2.3-.8l2.4-.2v-.2q0-1-1.8-1l-1.8.3-.5.1-.6-.3-.2-.7.2-.8.7-.5q1.3-.4 2.6-.3 1.8-.1 3.2.8M13.6 14q0 .3-.3.5l-.8.3-.8-.3q-.5-.3-.8-1l-2.3-2.8v2.7q0 .5-.2.6-.2.2-.5.2h-.3l-1-.2c-.2-.3-.2-.3-.2-1V5l.1-.7.6-.1h.2q.6 0 1 .3.3.3.2 1v2.8l2.8-4c.3-.5.3-.4.6-.5h.2q.5 0 .8.3l.4.7-.1.7-.6 1-2 3 1.3 1.7.5.6 1.2 2zm-8.7-.2-.5.1h-.3l-.9-.2q-.2-.2-.2-.8V7.4q.3-.3.6-.2h.2q.6 0 1 .3l.2.8v4.9zM3 4.5l.8-.3a1 1 0 0 1 1 .7l.1.4q0 .4-.3.9a1 1 0 0 1-.8.4 1 1 0 0 1-.8-.4q-.3-.4-.3-1zM13.4.8 2.4 2a2 2 0 0 0-2 2v10.3a2 2 0 0 0 2 2.1l11 1.3a2 2 0 0 0 2-2.1V2.9a2 2 0 0 0-2-2.1\"/></g><defs><clipPath id=\"kzpl-ikhokha-a\"><path fill=\"currentColor\" d=\"M.4.8h85v17H.4z\"/></clipPath></defs></svg>",4.777777777777778]};
  function kzTermsSettingsUrl(){
    // {api}/api/<vertical>/<siteId> → {api}/api/site-settings/<siteId>
    return String(STOREFRONT_URL).replace(/\/api\/[a-z-]+\/[^\/?#]+\/?$/,'')+'/api/site-settings/'+encodeURIComponent(SITE_ID);
  }
  // The site's own provider, under its Pay button. No provider known (none
  // connected, or the settings failed): no line, never a guessed logo.
  function kzPayBadge(form){
    var p=_kzPayProvider&&_kzPayProviders[_kzPayProvider];
    if(!p||form.querySelector('.'+"kz-checkout-terms-secure"))return;
    var d=form.ownerDocument||document;
    var line=d.createElement('p'); line.className="kz-checkout-terms-secure";
    var text=d.createElement('span'); text.textContent='Secure payment by';
    var logo=d.createElement('span'); logo.className="kz-checkout-terms-secure"+'-logo';
    logo.setAttribute('role','img'); logo.setAttribute('aria-label',p[0]); logo.title=p[0];
    logo.style.width=Math.round(16*p[2])+'px';
    logo.innerHTML=p[1];
    line.appendChild(text); line.appendChild(logo);
    var pay=form.querySelector('button[type="submit"]');
    if(pay&&pay.parentNode)pay.parentNode.insertBefore(line,pay.nextSibling);else form.appendChild(line);
  }
  function kzTermsInject(form){
    if(!form)return;
    // Forget forms that were redrawn away (carts re-render on every change).
    var live=[];for(var f=0;f<_kzTermsForms.length;f++){if(_kzTermsForms[f].isConnected!==false)live.push(_kzTermsForms[f]);}
    _kzTermsForms=live;
    if(_kzTermsForms.indexOf(form)<0)_kzTermsForms.push(form);
    kzPayBadge(form);
    if(!_kzTermsUrl||form.querySelector('.'+"kz-checkout-terms"))return;
    var d=form.ownerDocument||document;
    var label=d.createElement('label'); label.className="kz-checkout-terms";
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
          var pp=s&&s.payment_provider;
          _kzPayProvider=(typeof pp==='string'&&Object.prototype.hasOwnProperty.call(_kzPayProviders,pp))?pp:null;
          // Forms drawn before the settings arrived get their checkbox and logo now.
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

  // ── cart storage (localStorage, keyed by site) ──
  var ID_FIELD="tierId";
  var CART_KEY="kz_ev_cart_"+SITE_ID;
  function loadCart(){try{var raw=window.localStorage.getItem(CART_KEY);if(!raw)return [];var c=JSON.parse(raw);return (c&&c.length!==undefined)?c:[];}catch(e){return [];}}
  function saveCart(c){try{window.localStorage.setItem(CART_KEY,JSON.stringify(c||[]));}catch(e){}}
  function cartAdd(c,item){for(var i=0;i<c.length;i++){if(c[i][ID_FIELD]===item[ID_FIELD]){c[i].qty=c[i].qty+item.qty;return c;}}c.push(item);return c;}
  function cartSubtotal(c){var t=0;for(var i=0;i<c.length;i++){t=t+c[i].unitPriceCents*c[i].qty;}return t;}
  var toLineItem=function(item){return {tier_id:item.tierId,quantity:item.qty};};
  function toCheckoutItems(c){var out=[];for(var i=0;i<c.length;i++){out.push(toLineItem(c[i]));}return out;}

  // ── cart drawer + checkout UI ──
  var _toggleEl=null,_panelEl=null,_checkoutOpen=false,_checkingOut=false;
  function ensureCartUI(){
    if(_panelEl)return;
    kzTermsLoad(); // first time a cart exists on this page: does the site have T&Cs?
    var d=document;
    _toggleEl=d.createElement('button');_toggleEl.type='button';_toggleEl.className='kz-checkout-cart-toggle';
    // Another vertical's toggle may already occupy bottom-right (shop and
    // events cores are BOTH alive on every published site) - offset upward so
    // neither is unreachable under the other.
    if(d.querySelector('.kz-checkout-cart-toggle'))_toggleEl.style.bottom='84px';
    _toggleEl.addEventListener('click',function(){toggleCart();});
    _panelEl=d.createElement('div');_panelEl.className='kz-checkout-cart';_panelEl.style.display='none';
    d.body.appendChild(_toggleEl);d.body.appendChild(_panelEl);
  }
  function setMsg(text,kind){if(!_panelEl)return;var m=_panelEl.querySelector('.kz-checkout-cart-msg');if(m){m.textContent=text||'';m.className='kz-checkout-cart-msg'+(kind?' kz-checkout-cart-msg-'+kind:'');}}
  function openCart(){ensureCartUI();_panelEl.style.display='';}
  function closeCart(){if(_panelEl)_panelEl.style.display='none';}
  function toggleCart(){ensureCartUI();_panelEl.style.display=(_panelEl.style.display==='none')?'':'none';}
  function renderCart(){
    var c=loadCart();var count=0;for(var i=0;i<c.length;i++)count=count+c[i].qty;
    // Lazy UI: never CREATE the drawer for an empty cart. Every vertical's
    // runtime bakes on every published site and each boot renders its cart -
    // eager creation floats a stray 'Cart (0)' pill on non-shop pages too.
    if(!_panelEl&&count===0)return;
    ensureCartUI();
    _toggleEl.textContent='Cart ('+count+')';
    var rows='';
    for(var k=0;k<c.length;k++){var it=c[k];var iid=it[ID_FIELD];
      rows+='<div class="kz-checkout-cart-item" data-vid="'+escAttr(iid)+'">'+
        '<span class="kz-checkout-cart-item-name">'+escHtml(it.name)+'</span>'+
        '<input type="number" min="1" class="kz-checkout-cart-qty" data-vid="'+escAttr(iid)+'" value="'+escAttr(''+it.qty)+'">'+
        '<span class="kz-checkout-cart-item-price">'+fmt(it.unitPriceCents*it.qty)+'</span>'+
        '<button type="button" class="kz-checkout-cart-remove" data-vid="'+escAttr(iid)+'">Remove</button>'+
      '</div>';
    }
    var checkoutForm=''+
      '<form class="kz-checkout-checkout"'+(_checkoutOpen?'':' style="display:none"')+'>'+
        "<input class=\"kz-checkout-f\" name=\"name\" placeholder=\"Full name\"><input class=\"kz-checkout-f\" name=\"email\" type=\"email\" placeholder=\"Email\"><input class=\"kz-checkout-f\" name=\"phone\" placeholder=\"Phone\">"+
        '<button type="submit" class="kz-checkout-pay">Pay now</button>'+
      '</form>';
    _panelEl.innerHTML=''+
      '<div class="kz-checkout-cart-head"><strong>Your cart</strong><button type="button" class="kz-checkout-cart-close">Close</button></div>'+
      '<div class="kz-checkout-cart-items">'+(c.length?rows:'<div class="kz-checkout-empty">Your cart is empty.</div>')+'</div>'+
      '<div class="kz-checkout-cart-subtotal">Subtotal: '+fmt(cartSubtotal(c))+'</div>'+
      (c.length?'<button type="button" class="kz-checkout-checkout-btn">Checkout</button>':'')+
      checkoutForm+
      '<div class="kz-checkout-cart-msg"></div>';
    _panelEl.querySelector('.kz-checkout-cart-close').addEventListener('click',function(){closeCart();});
    var qtys=_panelEl.querySelectorAll('.kz-checkout-cart-qty');
    for(var q=0;q<qtys.length;q++){qtys[q].addEventListener('change',function(e){var vid=e.target.getAttribute('data-vid');var n=parseInt(e.target.value,10);var cur=loadCart();var next=[];for(var x=0;x<cur.length;x++){if(cur[x][ID_FIELD]===vid){if(n>0){cur[x].qty=n;next.push(cur[x]);}}else next.push(cur[x]);}saveCart(next);renderCart();});}
    var rms=_panelEl.querySelectorAll('.kz-checkout-cart-remove');
    for(var rr=0;rr<rms.length;rr++){rms[rr].addEventListener('click',function(e){var vid=e.target.getAttribute('data-vid');var cur=loadCart();var next=[];for(var x=0;x<cur.length;x++){if(cur[x][ID_FIELD]!==vid)next.push(cur[x]);}saveCart(next);renderCart();});}
    var cob=_panelEl.querySelector('.kz-checkout-checkout-btn');
    if(cob)cob.addEventListener('click',function(){_checkoutOpen=true;var f=_panelEl.querySelector('.kz-checkout-checkout');if(f)f.style.display='';});
    var form=_panelEl.querySelector('.kz-checkout-checkout');
    if(form){kzTermsInject(form);form.addEventListener('submit',function(e){e.preventDefault();submitCheckout(form);});}
  }
  function val(form,name){var el=form.querySelector('[name="'+name+'"]');return el?(''+el.value).replace(/^\s+|\s+$/g,''):'';}
  var REQUIRED=["name","email"];
  var ADDRESS_FIELDS=[];
  var HAS_ADDRESS=false;
  function submitCheckout(form){
    if(_checkingOut)return;
    var cart=loadCart();
    if(!cart.length){setMsg('Your cart is empty.','error');return;}
    var missing=false;
    for(var ri=0;ri<REQUIRED.length;ri++){if(!val(form,REQUIRED[ri])){missing=true;break;}}
    if(missing){setMsg("Please fill in the required fields.",'error');return;}
    var terms=kzTermsCheck(form);
    if(!terms.ok){setMsg(KZ_TERMS_MESSAGE,'error');return;}
    _checkingOut=true;
    var submitBtn=form.querySelector('button[type="submit"]');
    if(submitBtn){submitBtn.disabled=true;submitBtn.textContent='Processing…';}
    var customer={name:val(form,'name'),email:val(form,'email'),phone:val(form,'phone')};
    var payload={items:toCheckoutItems(cart),customer:customer};
    if(terms.accept!==undefined)payload.accept_terms=terms.accept;
    if(HAS_ADDRESS){var address={};for(var ai=0;ai<ADDRESS_FIELDS.length;ai++){address[ADDRESS_FIELDS[ai]]=val(form,ADDRESS_FIELDS[ai]);}if(!address.country)address.country='South Africa';payload.address=address;}
    setMsg('Redirecting to payment...','');
    // Stamp which vertical started this checkout: both cores parse the SAME
    // ?kizuri_order= return param, so the return must be scoped to the owner
    // (a shop success must not clear the events cart, or open two drawers).
    try{window.sessionStorage.setItem('kz_kizuri_checkout_v',CART_KEY);}catch(eMk){}
    fetch(STOREFRONT_URL+"/checkout",{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)}).then(function(r){
      return r.json().then(function(data){return {ok:r.ok,data:data};},function(){return {ok:r.ok,data:{}};});
    }).then(function(res){
      if(res.ok&&res.data&&res.data.free){saveCart([]);renderCart();_checkingOut=false;if(submitBtn){submitBtn.disabled=false;submitBtn.textContent='Register';}setMsg('You\u2019re registered \u2014 check your email for confirmation.','success');return;}
      if(res.ok&&res.data&&res.data.payment_url){window.location.href=res.data.payment_url;return;}
      _checkingOut=false;if(submitBtn){submitBtn.disabled=false;submitBtn.textContent='Pay now';}
      setMsg((res.data&&res.data.error)||'Checkout failed. Please try again.','error');
    }).catch(function(){_checkingOut=false;if(submitBtn){submitBtn.disabled=false;submitBtn.textContent='Pay now';}setMsg('Checkout failed. Please try again.','error');});
  }
  function handleReturn(){
    var s=window.location.search||'';var m=s.match(/[?&]kizuri_order=([^&]+)/);if(!m)return;
    // Only the vertical that STARTED the checkout may react (both cores parse
    // this same param). Marker missing (old tab/cleared storage): fall back to
    // 'my cart holds pending items'. The marker is left in place - the winner
    // deleting it would re-expose the other core to the fallback on this same
    // load; the next checkout simply overwrites it.
    var mk=null;try{mk=window.sessionStorage.getItem('kz_kizuri_checkout_v');}catch(eRt){}
    if(mk){if(mk!==CART_KEY)return;}
    else if(!loadCart().length)return;
    // We own this return - force the drawer into existence BEFORE rendering
    // (on success the cart empties first, and lazy renderCart won't create UI
    // for an empty cart; the panel must exist to carry the outcome message).
    ensureCartUI();
    var v=decodeURIComponent(m[1]);
    if(v==='success'){saveCart([]);renderCart();openCart();setMsg('Order received \u2014 a confirmation is on its way.','success');}
    else if(v==='cancel'){renderCart();openCart();setMsg('Payment cancelled \u2014 your cart is still here.','error');}
  }

  function add(item){injectCheckoutStyles();var c=loadCart();cartAdd(c,item);saveCart(c);renderCart();openCart();}

  // Drop cart lines whose id is not in the LIVE catalog (deleted/draft/re-seeded
  // items would only die server-side at pricing with a confusing error). Callers
  // must pass ids from a SUCCESSFUL catalog fetch only — never prune on fetch
  // failure, or a transient outage empties every visitor's cart.
  function prune(validIds){
    var c=loadCart();var map={};for(var i=0;i<validIds.length;i++)map[validIds[i]]=1;
    var keep=[];for(var j=0;j<c.length;j++){if(map[c[j][ID_FIELD]])keep.push(c[j]);}
    if(keep.length!==c.length){saveCart(keep);renderCart();}
  }

  injectCheckoutStyles();

  // Expose for a vertical runtime to drive the shared drawer.
  window.__kizuriEventsCheckout={add:add,renderCart:renderCart,openCart:openCart,closeCart:closeCart,toggleCart:toggleCart,handleReturn:handleReturn,loadCart:loadCart,saveCart:saveCart,prune:prune};
})();

  // ── widget state ──
  // _view: 0=list, 1=detail. The hydration self-heal only repaints when idle (the list
  // view); once the visitor opens an event detail a late hydration repaint must NOT fire,
  // or it would snap them back to the list.
  var _root=null, _events=[], _view=0;

  function activeEvents(){
    var out=[];
    for(var i=0;i<_events.length;i++){if((_events[i].status||'active')==='active')out.push(_events[i]);}
    return out;
  }

  function setRoot(el){
    _root=el;
    if((' '+el.className+' ').indexOf(' kz-ev-root ')<0)el.className=(el.className+' kz-ev-root').trim();
    applyTheme(el);
    applyDesignTokens(el, KZ_DESIGN_TOKENS_MANIFEST);
  }

  function renderEventList(){
    _view=0;
    if(!_root)return;
    var d=_root.ownerDocument;
    _root.innerHTML='';
    var list=activeEvents();
    if(!list.length){
      var e=d.createElement('div'); e.className='kz-ev-empty'; e.textContent='No events yet.';
      _root.appendChild(e); return;
    }
    var grid=d.createElement('div'); grid.className='kz-ev-grid';
    for(var i=0;i<list.length;i++){(function(ev){
      var card=d.createElement('div'); card.className='kz-ev-card'; card.setAttribute('data-event-id',ev.id);
      var img=(ev.images&&ev.images[0])||'';
      var media=img
        ? '<img class="kz-ev-card-img" src="'+escAttr(img)+'" alt="'+escAttr(ev.title)+'">'
        : '<div class="kz-ev-card-ph">\uD83C\uDF9F\uFE0F</div>';
      card.innerHTML=media+
        '<div class="kz-ev-card-body">'+
          '<h3 class="kz-ev-card-title">'+escHtml(ev.title)+'</h3>'+
          '<div class="kz-ev-card-meta">'+escHtml(sastDate(ev.starts_at))+'</div>'+
          (ev.venue?'<div class="kz-ev-card-meta">'+escHtml(ev.venue)+'</div>':'')+
          '<div class="kz-ev-card-price">'+(minTierPrice(ev)===0?'Free':'from '+escHtml(fmt(minTierPrice(ev))))+'</div>'+
        '</div>';
      card.addEventListener('click',function(){renderEventDetail(ev);});
      grid.appendChild(card);
    })(list[i]);}
    _root.appendChild(grid);
  }

  function renderEventDetail(ev){
    _view=1;
    if(!_root)return;
    var d=_root.ownerDocument;
    _root.innerHTML='';
    var wrap=d.createElement('div'); wrap.className='kz-ev-detail';

    var back=d.createElement('button'); back.type='button'; back.className='kz-ev-back'; back.textContent='\u2190 All events';
    back.addEventListener('click',function(){renderEventList();});
    wrap.appendChild(back);

    var img=(ev.images&&ev.images[0])||'';
    var tiers=ev.tiers||[];
    // An all-free event (every tier R0) is a registration/RSVP — label its CTA "Register".
    // A mixed event (some paid) keeps "Get tickets" (the cart total will be > 0 → paid path).
    var allFree=tiers.length>0;
    for(var af=0;af<tiers.length;af++){if(tiers[af].price_cents!==0){allFree=false;break;}}
    var cta=allFree?'Register':'Get tickets';
    var rows='';
    for(var i=0;i<tiers.length;i++){
      var t=tiers[i];var rem=tierRemaining(t);var out=rem<=0;
      rows+='<div class="kz-ev-tier" data-tier-id="'+escAttr(t.id)+'">'+
        '<span class="kz-ev-tier-name">'+escHtml(t.name)+'</span>'+
        '<span class="kz-ev-tier-price">'+(t.price_cents===0?'Free':escHtml(fmt(t.price_cents)))+'</span>'+
        (out?'<span class="kz-ev-tier-soldout">Sold out</span>'
            :'<span class="kz-ev-tier-remaining">'+rem+' left</span>'+
             '<input type="number" min="1" value="1" class="kz-ev-qty" data-tier-id="'+escAttr(t.id)+'">')+
        '<button type="button" class="kz-ev-get" data-tier-id="'+escAttr(t.id)+'"'+(out?' disabled':'')+'>'+cta+'</button>'+
      '</div>';
    }

    wrap.innerHTML+=(img?'<img class="kz-ev-detail-img" src="'+escAttr(img)+'" alt="'+escAttr(ev.title)+'">':'')+
      '<h2 class="kz-ev-detail-title">'+escHtml(ev.title)+'</h2>'+
      '<div class="kz-ev-detail-meta">'+escHtml(sastDate(ev.starts_at))+(ev.venue?' \u00B7 '+escHtml(ev.venue):'')+'</div>'+
      (ev.description?'<p class="kz-ev-detail-desc">'+escHtml(ev.description)+'</p>':'')+
      '<div class="kz-ev-tiers">'+(rows||'<div class="kz-ev-empty">Tickets are not on sale yet.</div>')+'</div>';

    _root.appendChild(wrap);

    var btns=wrap.querySelectorAll('.kz-ev-get');
    for(var b=0;b<btns.length;b++){(function(btn){
      var tid=btn.getAttribute('data-tier-id');
      var tier=null;for(var k=0;k<tiers.length;k++){if(tiers[k].id===tid){tier=tiers[k];break;}}
      btn.addEventListener('click',function(){
        if(!tier||tierRemaining(tier)<=0)return;
        var qtyEl=wrap.querySelector('.kz-ev-qty[data-tier-id="'+tid+'"]');
        var qty=qtyEl?parseInt(qtyEl.value,10):1;
        if(!qty||qty<1)qty=1;
        var item={tierId:tier.id,eventId:ev.id,name:ev.title+' \u2014 '+tier.name,unitPriceCents:tier.price_cents,qty:qty};
        if(window.__kizuriEventsCheckout&&window.__kizuriEventsCheckout.add)window.__kizuriEventsCheckout.add(item);
      });
    })(btns[b]);}
  }

  function hideMount(el){try{el.innerHTML='';el.style.display='none';}catch(e){}}

  function renderAll(){
    var blocks=document.querySelectorAll('[data-kizuri-shop="event-list"],[data-kizuri-shop="event"]');
    if(!blocks.length)return;
    for(var i=0;i<blocks.length;i++){
      if(i===0){setRoot(blocks[0]);renderEventList();}
      else hideMount(blocks[i]);
    }
  }

  // React hydration on the published (client-rendered) site re-renders the page AFTER our
  // deferred script runs, resetting the mount to its empty SSR markup (and swapping the
  // node). ensureRendered() repaints whenever the current mount is missing/empty — but ONLY
  // while the visitor is on the LIST view, so a late repaint never clobbers an open detail.
  function widgetIsIdle(){ return _view===0; }
  function mountEmpty(el){ return !el || !el.querySelector('.kz-ev-grid') && !el.querySelector('.kz-ev-empty'); }
  function currentMount(){ return document.querySelector('[data-kizuri-shop="event-list"],[data-kizuri-shop="event"]'); }
  function ensureRendered(){
    var block=currentMount();
    if(!block)return;
    if(!widgetIsIdle())return;
    if(block!==_root || mountEmpty(block)) renderAll();
  }
  function watchForHydration(){
    try{
      var fast=0;
      var fastIv=setInterval(function(){ ensureRendered(); if(++fast>=12)clearInterval(fastIv); },100);
      var slow=0;
      var slowIv=setInterval(function(){ ensureRendered(); if(++slow>=6)clearInterval(slowIv); },500);
      if(typeof MutationObserver!=='undefined'){
        var mo=new MutationObserver(function(){ ensureRendered(); });
        mo.observe(document.body,{childList:true,subtree:true});
        setTimeout(function(){ try{mo.disconnect();}catch(e){} },8000);
      }
    }catch(e){}
  }

  function boot(events, catalogIsLive){
    injectStyles();
    _events=events||[];
    renderAll();
    // With a LIVE catalog, drop cart lines whose tier isn't sellable (draft
    // events' tiers included — only ACTIVE events' tiers survive, matching the
    // server's pricing view). Never prune on fetch failure: an outage must not
    // wipe the cart.
    if(catalogIsLive&&window.__kizuriEventsCheckout&&window.__kizuriEventsCheckout.prune){
      var validIds=[];var act=activeEvents();
      for(var ai=0;ai<act.length;ai++){var ts=act[ai].tiers||[];for(var ti=0;ti<ts.length;ti++)validIds.push(ts[ti].id);}
      window.__kizuriEventsCheckout.prune(validIds);
    }
    // Surface a persisted non-empty ticket cart on reload (creation is lazy in
    // the core, so this stays invisible when the cart is empty).
    if(window.__kizuriEventsCheckout&&window.__kizuriEventsCheckout.renderCart)window.__kizuriEventsCheckout.renderCart();
    if(window.__kizuriEventsCheckout&&window.__kizuriEventsCheckout.handleReturn)window.__kizuriEventsCheckout.handleReturn();
  }

  if (typeof window!=='undefined' && window.__KIZURI_EVENTS_TEST__){
    boot(window.__KIZURI_EVENTS_TEST__.events||[], true);
    return;
  }

  // Draw an immediate placeholder so the events section is NEVER visibly empty while the
  // catalog fetch is in flight (and so hydration has a node to preserve). The self-heal
  // keeps this present; boot() replaces it with the real list when data lands.
  function renderPlaceholder(){
    var block=currentMount();
    if(!block)return;
    setRoot(block);
    _root.innerHTML='<div class="kz-ev-empty">Loading events\u2026</div>';
  }

  function run(){
    injectStyles();
    renderPlaceholder();   // visible instantly
    watchForHydration();   // re-assert immediately, not after the fetch
    fetch(EVENTS_URL,{headers:{'Accept':'application/json'}})
      .then(function(r){if(!r.ok)throw new Error('catalog');return r.json();})
      .then(function(d){boot((d&&d.events)||[], true);})
      .catch(function(){boot([], false);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();