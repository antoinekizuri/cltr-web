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
  var CHECKOUT_STYLES = "\n.kz-checkout-cart-toggle{position:fixed;bottom:20px;right:20px;z-index:2147483000;border:0;border-radius:999px;padding:14px 20px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);font:inherit;font-weight:600;font-size:14px;}\n.kz-checkout-cart{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:92vw;z-index:2147483001;background:#fff;color:#111;box-shadow:-8px 0 40px rgba(0,0,0,.25);display:flex;flex-direction:column;padding:20px;overflow:auto;font:inherit;}\n.kz-checkout-cart-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}\n.kz-checkout-cart-head strong{font-size:18px;color:#111;}\n.kz-checkout-cart-close{cursor:pointer;border:0;background:transparent;color:#111;font:inherit;font-size:14px;opacity:.6;}\n.kz-checkout-cart-close:hover{opacity:1;}\n.kz-checkout-cart-item{display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #eee;}\n.kz-checkout-cart-item-name{flex:1;font-size:14px;color:#111;}\n.kz-checkout-cart-item-price{font-weight:600;font-size:14px;color:#111;}\n.kz-checkout-cart-qty{width:60px;padding:6px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;color:#111;}\n.kz-checkout-cart-remove{cursor:pointer;border:0;background:transparent;color:#111;opacity:.55;font:inherit;font-size:13px;}\n.kz-checkout-cart-remove:hover{opacity:1;}\n.kz-checkout-cart-subtotal{font-weight:700;font-size:16px;margin:14px 0;color:#111;}\n.kz-checkout-checkout-btn{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;width:100%;}\n.kz-checkout-checkout{display:flex;flex-direction:column;gap:10px;margin-top:12px;}\n.kz-checkout-checkout input{padding:11px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;font-size:14px;color:#111;background:#fff;width:100%;}\n.kz-checkout-pay{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;}\n.kz-checkout-empty{opacity:.7;padding:24px;text-align:center;color:#111;}\n.kz-checkout-cart-msg{padding:11px;border-radius:8px;background:#f1f5f9;color:#111;margin:10px 0;font-size:13px;}\n";
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
    if(form)form.addEventListener('submit',function(e){e.preventDefault();submitCheckout(form);});
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
    _checkingOut=true;
    var submitBtn=form.querySelector('button[type="submit"]');
    if(submitBtn){submitBtn.disabled=true;submitBtn.textContent='Processing…';}
    var customer={name:val(form,'name'),email:val(form,'email'),phone:val(form,'phone')};
    var payload={items:toCheckoutItems(cart),customer:customer};
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