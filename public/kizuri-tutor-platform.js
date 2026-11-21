(function () {
  var SITE_ID = '354c4e09-4913-413b-b740-947174913a8e';
  var API_BASE = 'https://kizuriapi-production-ee3c.up.railway.app/api/tutor-platform';
  var CATALOGUE_SELECTOR = '[data-kizuri-portal-catalogue]';
  var SESSION_KEY = 'kz_tp_session_' + SITE_ID;
  var BRAND_KEY = 'kz_tp_brand_' + SITE_ID;
  var KZ_DESIGN_TOKENS_MANIFEST = {"radius":"soft","shadow":"flat","weight":"bold","density":"comfortable"};
  var LEGACY_SELECTOR = '[data-kizuri-shop="tutor-portal"]:not([data-mode="app"])';

  var TP_STYLES = "\n.kz-tp-root,.kz-tp-root *{box-sizing:border-box;}\n.kz-tp-root{font-family:var(--kz-font,inherit);color:#111;color:var(--kz-text,#111);max-width:420px;margin:0 auto;}\n\n.kz-tp-auth{display:flex;flex-direction:column;gap:18px;padding:24px;border-radius:16px;border-radius:var(--kz-radius,16px);background:#fff;background:var(--kz-surface,#fff);border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);box-shadow:0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.28);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 18px 48px rgba(0,0,0,.28));}\n\n.kz-tp-title{font-size:20px;font-weight:700;font-weight:var(--kz-weight,700);line-height:1.2;margin:0;color:#111;color:var(--kz-text,#111);text-transform:none;letter-spacing:normal;}\n.kz-tp-hint{font-size:14px;line-height:1.5;margin:6px 0 0;color:#667;color:var(--kz-muted,#667);}\n\n.kz-tp-form{display:flex;flex-direction:column;gap:14px;gap:var(--kz-gap,14px);}\n/* label weight (600) is deliberately a middle tier — distinct from both the\n   700 heading/button boldness and the 400 body-text baseline, for label\n   emphasis without competing with headings — not tokenized. */\n.kz-tp-form label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:600;color:#667;color:var(--kz-muted,#667);}\n.kz-tp-form input,.kz-tp-form select,.kz-tp-form textarea{\n  width:100%;padding:12px 14px;font:inherit;font-size:15px;line-height:1.2;font-weight:400;\n  color:#111;color:var(--kz-text,#111);\n  background:#fff;background:var(--kz-surface-2,#fff);\n  border:1px solid #cbd5e1;border:1px solid var(--kz-border,#cbd5e1);border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  -webkit-appearance:none;appearance:none;transition:border-color .15s ease,box-shadow .15s ease;\n}\n.kz-tp-form select{\n  padding-right:38px;\n  background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none'/></svg>\");\n  background-repeat:no-repeat;background-position:right 14px center;\n}\n.kz-tp-form input:focus,.kz-tp-form select:focus,.kz-tp-form textarea:focus{\n  outline:none;border-color:var(--kz-accent,#111);box-shadow:0 0 0 3px rgba(0,0,0,.12);\n}\n.kz-tp-form button[type=\"submit\"]{\n  display:block;width:100%;padding:13px 20px;border:0;border-radius:12px;border-radius:var(--kz-radius-sm,12px);cursor:pointer;\n  font:inherit;font-weight:700;font-weight:var(--kz-weight,700);font-size:15px;\n  background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);\n  transition:filter .15s ease,transform .05s ease;\n}\n.kz-tp-form button[type=\"submit\"]:hover{filter:brightness(.92);}\n.kz-tp-form button[type=\"submit\"]:active{transform:translateY(1px);}\n.kz-tp-form button[type=\"submit\"][disabled]{opacity:.55;cursor:not-allowed;filter:none;}\n\n.kz-tp-error{padding:12px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font-size:13px;background:#fef2f2;color:#b91c1c;}\n.kz-tp-error[hidden]{display:none;}\n\n/* link weight (600) is deliberately a middle tier for tappable-but-secondary\n   text — distinct from the 700 heading/button boldness — not tokenized. */\n.kz-tp-link{align-self:center;padding:4px 0;border:0;background:none;cursor:pointer;\n  font:inherit;font-size:13px;font-weight:600;color:#111;color:var(--kz-accent,#111);text-decoration:underline;}\n.kz-tp-link:hover{opacity:.8;}\n\n/* ── dashboard / assessments (Task 3: student dashboard) ── */\n.kz-tp-dash{max-width:560px;display:flex;flex-direction:column;gap:18px;gap:var(--kz-gap,18px);}\n.kz-tp-loading,.kz-tp-empty{padding:16px 0;font-size:14px;color:#667;color:var(--kz-muted,#667);text-align:center;}\n\n.kz-tp-card{display:flex;flex-direction:column;gap:14px;gap:var(--kz-gap,14px);padding:22px;padding:var(--kz-pad,22px);border-radius:16px;border-radius:var(--kz-radius,16px);\n  background:#fff;background:var(--kz-surface,#fff);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);\n  box-shadow:0 1px 2px rgba(0,0,0,.06),0 10px 28px rgba(0,0,0,.14);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 10px 28px rgba(0,0,0,.14));}\n\n.kz-tp-class-list,.kz-tp-assessment-list,.kz-tp-grade-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}\n/* class-item weight (600) is deliberately a middle tier, not tokenized (see .kz-tp-form label above). */\n.kz-tp-class-item{padding:10px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font-size:14px;font-weight:600;\n  color:#111;color:var(--kz-text,#111);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n\n.kz-tp-assessment-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n.kz-tp-assessment-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}\n.kz-tp-assessment-title{font-size:14px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;color:var(--kz-text,#111);}\n.kz-tp-assessment-due{font-size:12px;color:#667;color:var(--kz-muted,#667);}\n\n/* Pill badges are a DELIBERATE, size-independent status shape — a status\n   badge should always read as a pill regardless of the site's own corner\n   style — so 999px stays a literal, never tokenized. */\n.kz-tp-badge{flex:0 0 auto;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;font-weight:var(--kz-weight,700);\n  text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;}\n.kz-tp-badge-pending{background:#fef3c7;color:#92400e;}\n.kz-tp-badge-done{background:#dcfce7;color:#166534;}\n\n.kz-tp-question{display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid #e5e7eb;border-top:1px solid var(--kz-border,#e5e7eb);}\n.kz-tp-question:first-child{border-top:0;padding-top:0;}\n.kz-tp-question-prompt{font-size:14px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;color:var(--kz-text,#111);}\n.kz-tp-question-attachment a{font-size:13px;color:#111;color:var(--kz-accent,#111);}\n\n.kz-tp-options{display:flex;flex-direction:column;gap:8px;}\n.kz-tp-option{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:400;\n  color:#111;color:var(--kz-text,#111);cursor:pointer;}\n.kz-tp-option input[type=\"radio\"]{width:auto;flex:0 0 auto;}\n\n.kz-tp-grade-item{padding:10px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n.kz-tp-grade-line{font-size:13px;color:#667;color:var(--kz-muted,#667);margin-top:4px;}\n\n/* submitted-notice weight (600) is deliberately a middle tier, not tokenized (see .kz-tp-form label above). */\n.kz-tp-submitted-notice{padding:12px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font-size:14px;font-weight:600;\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);color:#667;color:var(--kz-muted,#667);}\n\n@media (max-width:480px){\n  .kz-tp-auth{padding:18px;}\n  .kz-tp-card{padding:16px;}\n}\n\n/* ── tutor dashboard (Task 4: classes, questions, assessments, marking, resources) ── */\n.kz-tp-tutor{max-width:720px;}\n\n.kz-tp-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px;}\n/* Tab pills are a deliberate, size-independent shape (same reasoning as\n   .kz-tp-badge above) — 999px stays a literal, never tokenized. Tab label\n   weight (600) is also a deliberate middle tier, not tokenized. */\n.kz-tp-tab{padding:8px 14px;border-radius:999px;border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  color:#667;color:var(--kz-muted,#667);font:inherit;font-size:13px;font-weight:600;cursor:pointer;}\n.kz-tp-tab-active{background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);border-color:transparent;}\n\n.kz-tp-tab-panel{display:flex;flex-direction:column;gap:18px;gap:var(--kz-gap,18px);}\n\n.kz-tp-muted-small{font-size:12px;color:#667;color:var(--kz-muted,#667);}\n.kz-tp-success{padding:12px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);font-size:13px;background:#dcfce7;color:#166534;}\n.kz-tp-success[hidden]{display:none;}\n\n.kz-tp-class-item-tutor{display:flex;flex-direction:column;gap:4px;align-items:flex-start;}\n.kz-tp-class-name{font-size:14px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;color:var(--kz-text,#111);}\n.kz-tp-join-code{font-size:13px;color:#111;color:var(--kz-text,#111);}\n.kz-tp-join-code strong{letter-spacing:.04em;}\n\n.kz-tp-question-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}\n.kz-tp-question-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n.kz-tp-question-prompt-inline{font-size:13px;color:#111;color:var(--kz-text,#111);}\n.kz-tp-badge-type{background:#e0e7ff;color:#3730a3;text-transform:uppercase;}\n\n.kz-tp-mcq-fields{display:flex;flex-direction:column;gap:10px;}\n.kz-tp-options-editor{display:flex;flex-direction:column;gap:8px;}\n.kz-tp-option-row{display:flex;align-items:center;gap:8px;}\n.kz-tp-option-row input[type=\"radio\"]{width:auto;flex:0 0 auto;}\n.kz-tp-option-row .kz-tp-option-text{flex:1;}\n.kz-tp-option-row .kz-tp-remove-option{flex:0 0 auto;font-size:12px;}\n\n.kz-tp-upload-status{font-size:12px;color:#667;color:var(--kz-muted,#667);}\n.kz-tp-upload-status[hidden]{display:none;}\n\n.kz-tp-checkbox-list{display:flex;flex-direction:column;gap:6px;max-height:220px;overflow-y:auto;\n  padding:10px 12px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);}\n.kz-tp-checkbox-item{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:400;\n  color:#111;color:var(--kz-text,#111);cursor:pointer;}\n.kz-tp-checkbox-item input[type=\"checkbox\"]{width:auto;flex:0 0 auto;}\n\n.kz-tp-submission{display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid #e5e7eb;border-top:1px solid var(--kz-border,#e5e7eb);}\n.kz-tp-submission:first-child{border-top:0;padding-top:0;}\n.kz-tp-submission-meta{font-size:14px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;color:var(--kz-text,#111);}\n.kz-tp-grade-input-row{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;}\n/* grade-input-row label weight (600) is deliberately a middle tier, not tokenized (see .kz-tp-form label above). */\n.kz-tp-grade-input-row label{display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600;\n  color:#667;color:var(--kz-muted,#667);flex:1;min-width:120px;}\n.kz-tp-score-input{width:100%;}\n\n.kz-tp-resource-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;}\n.kz-tp-resource-item{padding:10px 14px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);\n  background:#f8fafc;background:var(--kz-surface-2,#f8fafc);\n  border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);}\n/* resource-link weight (600) is deliberately a middle tier, not tokenized (see .kz-tp-form label above). */\n.kz-tp-resource-item a{font-size:13px;font-weight:600;color:#111;color:var(--kz-accent,#111);}\n\n@media (max-width:480px){\n  .kz-tp-tabs{gap:4px;}\n  .kz-tp-tab{padding:6px 10px;font-size:12px;}\n}\n\n.kz-tp-root.kz-cat-host{max-width:none;margin:0;}\n.kz-tp-link-card{display:flex;flex-direction:column;gap:10px;align-items:flex-start;padding:24px;border-radius:16px;border-radius:var(--kz-radius,16px);background:#fff;background:var(--kz-surface,#fff);border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);box-shadow:0 1px 2px rgba(0,0,0,.06),0 10px 28px rgba(0,0,0,.10);box-shadow:var(--kz-shadow,0 1px 2px rgba(0,0,0,.06),0 10px 28px rgba(0,0,0,.10));}\n.kz-tp-link-btn{display:inline-block;margin-top:6px;padding:12px 18px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);}\n\n.kz-cat{display:block;}\n.kz-cat-filters{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 20px;}\n.kz-cat-chip{border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);background:#fff;background:var(--kz-surface,#fff);color:#111;color:var(--kz-text,#111);border-radius:999px;padding:7px 14px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;}\n.kz-cat-chip.kz-cat-on{background:#111;background:var(--kz-accent,#111);border-color:transparent;color:#fff;color:var(--kz-accent-contrast,#fff);}\n.kz-cat-sep{width:1px;height:22px;background:#e5e7eb;background:var(--kz-border,#e5e7eb);margin:0 4px;}\n.kz-cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}\n.kz-cat-card{display:flex;flex-direction:column;gap:10px;padding:20px;text-decoration:none !important;color:#111 !important;color:var(--kz-text,#111) !important;background:#fff;background:var(--kz-surface,#fff);border:1px solid #e5e7eb;border:1px solid var(--kz-border,#e5e7eb);border-radius:14px;border-radius:var(--kz-radius,14px);transition:box-shadow .15s ease,transform .15s ease;}\n.kz-cat-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.08);}\n.kz-cat-full{opacity:.6;}\n.kz-cat-tags{display:flex;flex-wrap:wrap;gap:6px;}\n.kz-cat-tag{font-size:11px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;border-radius:6px;padding:3px 8px;background:#eef2f7;background:var(--kz-accent-soft,#eef2f7);color:#111;color:var(--kz-accent-ink,#111);}\n.kz-cat-tag-grey{background:#f1f5f9;color:#475569;}\n.kz-cat-name{font-size:17px;font-weight:700;line-height:1.3;}\n.kz-cat-desc{font-size:13px;line-height:1.5;margin:0;color:#475569;color:var(--kz-muted,#475569);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}\n.kz-cat-meta{font-size:13px;color:#667;color:var(--kz-muted,#667);}\n.kz-cat-tutor{display:flex;align-items:center;gap:8px;font-size:13px;}\n.kz-cat-av{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;background:#eef2f7;background:var(--kz-accent-soft,#eef2f7);color:#111;color:var(--kz-accent-ink,#111);}\n.kz-cat-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;padding-top:14px;border-top:1px solid #e5e7eb;border-top:1px solid var(--kz-border,#e5e7eb);}\n.kz-cat-price{font-size:18px;font-weight:800;}\n.kz-cat-note{font-size:12px;font-weight:600;color:#667;color:var(--kz-muted,#667);}\n.kz-cat-note-warn{color:#b45309;}\n.kz-cat-empty{font-size:14px;color:#667;color:var(--kz-muted,#667);padding:12px 0;}\n";
  function injectStyles(){
    try{
      if(document.querySelector('style[data-kizuri-tutor-portal-link-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-tutor-portal-link-styles','');
      s.textContent=TP_STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  // ── theme detection (copied verbatim from booking-runtime.ts / shop-runtime.ts
  // so the portal's forms visually match the rest of the site) ──
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


  function escHtml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}

  // ── class catalogue ──
  function fmtRand(cents){
    var n = Math.round(Number(cents || 0)) / 100;
    var s = (Math.floor(n) === n) ? String(n) : n.toFixed(2);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return 'R' + parts.join('.');
  }
  function fmtDay(iso){
    if (!iso) return '';
    try{
      var d = new Date(String(iso).slice(0, 10) + 'T00:00:00');
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    }catch(e){ return ''; }
  }
  function fmtDates(c){
    var a = fmtDay(c.startsOn), b = fmtDay(c.endsOn);
    if (a && b) return a + ' – ' + b;
    if (a) return 'From ' + a;
    if (b) return 'Until ' + b;
    return '';
  }
  // Initials for a tutor's name, skipping a title: "Ms N. Dlamini" → ND.
  function catInitials(s){
    var w = String(s || '').replace(/[^A-Za-z0-9 ]/g, ' ').split(' ').filter(function(x){ return x && !/^(mr|mrs|ms|miss|dr|prof|sir|mx)$/i.test(x); });
    if (!w.length) return '?';
    return (w[0].charAt(0) + (w.length > 1 ? w[w.length - 1].charAt(0) : '')).toUpperCase();
  }
  function priceLabel(c){ return c.priceCents > 0 ? fmtRand(c.priceCents) : 'Free'; }
  function seatNote(c){
    if (c.full) return '<span class="kz-cat-note">Full</span>';
    if (c.seatsLeft != null && c.seatsLeft <= 5) return '<span class="kz-cat-note kz-cat-note-warn">' + c.seatsLeft + (c.seatsLeft === 1 ? ' seat left' : ' seats left') + '</span>';
    if (c.joinMode === 'approval') return '<span class="kz-cat-note">Tutor approves</span>';
    return '';
  }
  function catTags(c){
    return (c.subject ? '<span class="kz-cat-tag">' + escHtml(c.subject) + '</span>' : '') +
      (c.grade ? '<span class="kz-cat-tag kz-cat-tag-grey">' + escHtml(c.grade) + '</span>' : '');
  }
  function catalogueCardHtml(c, routed){
    var meta = [c.schedule || '', fmtDates(c)].filter(function(x){ return x; }).join(' · ');
    return '<a class="kz-cat-card' + (c.full ? ' kz-cat-full' : '') + '" href="/portal/find/' + encodeURIComponent(c.id) + '"' + (routed ? ' data-route' : '') + '>' +
      '<div class="kz-cat-tags">' + catTags(c) + '</div>' +
      '<div class="kz-cat-name">' + escHtml(c.name) + '</div>' +
      (c.description ? '<p class="kz-cat-desc">' + escHtml(c.description) + '</p>' : '') +
      (meta ? '<div class="kz-cat-meta">' + escHtml(meta) + '</div>' : '') +
      (c.tutorName ? '<div class="kz-cat-tutor"><span class="kz-cat-av">' + escHtml(catInitials(c.tutorName)) + '</span>' + escHtml(c.tutorName) + '</div>' : '') +
      '<div class="kz-cat-foot"><span class="kz-cat-price">' + escHtml(priceLabel(c)) + '</span>' + seatNote(c) + '</div>' +
    '</a>';
  }
  function uniqueValues(classes, key){
    var seen = {}, out = [];
    for (var i=0;i<classes.length;i++){ var v = classes[i][key]; if (v && !seen[v]) { seen[v] = 1; out.push(v); } }
    return out.sort();
  }
  // Renders filter chips (only when there is more than one subject/grade to
  // choose from) and the card grid into el; chips re-render in place.
  function renderCatalogue(el, classes, routed, emptyText){
    var state = { subject: '', grade: '' };
    function chips(key, label, values){
      if (values.length < 2) return '';
      return '<button type="button" class="kz-cat-chip' + (!state[key] ? ' kz-cat-on' : '') + '" data-f="' + key + '" data-v="">All ' + label + '</button>' +
        values.map(function(v){
          return '<button type="button" class="kz-cat-chip' + (state[key] === v ? ' kz-cat-on' : '') + '" data-f="' + key + '" data-v="' + escAttr(v) + '">' + escHtml(v) + '</button>';
        }).join('');
    }
    function draw(){
      var subj = chips('subject', 'subjects', uniqueValues(classes, 'subject'));
      var grade = chips('grade', 'grades', uniqueValues(classes, 'grade'));
      var shown = classes.filter(function(c){
        return (!state.subject || c.subject === state.subject) && (!state.grade || c.grade === state.grade);
      });
      el.innerHTML = '<div class="kz-cat">' +
        (subj || grade ? '<div class="kz-cat-filters">' + subj + (subj && grade ? '<span class="kz-cat-sep"></span>' : '') + grade + '</div>' : '') +
        (shown.length ? '<div class="kz-cat-grid">' + shown.map(function(c){ return catalogueCardHtml(c, routed); }).join('') + '</div>'
          : '<div class="kz-cat-empty">' + escHtml(emptyText || 'No classes are open for joining right now.') + '</div>') +
      '</div>';
      var btns = el.querySelectorAll('[data-f]');
      for (var i=0;i<btns.length;i++) btns[i].addEventListener('click', function(e){
        var b = e.currentTarget;
        state[b.getAttribute('data-f')] = b.getAttribute('data-v');
        draw();
      });
    }
    draw();
  }

  // The catalogue is fetched once per page load and re-drawn into any mount
  // hydration wipes; null until it arrives.
  var _catalogue = null, _catalogueLoading = false;
  function loadCatalogue(){
    if (_catalogue || _catalogueLoading || !API_BASE) return;
    _catalogueLoading = true;
    fetch(API_BASE + '/' + SITE_ID + '/catalogue', { headers: { 'Accept': 'application/json' } })
      .then(function(r){ return r.ok ? r.json() : { classes: [] }; })
      .then(function(d){ _catalogue = (d && d.classes) || []; ensureRendered(); })
      .catch(function(){ _catalogue = []; ensureRendered(); });
  }
  function renderCatalogueMount(mount){
    applyTheme(mount);
    applyDesignTokens(mount, KZ_DESIGN_TOKENS_MANIFEST);
    // Tinted tag/avatar colours from the sampled accent, as the /portal app does.
    var acc = parseRgb(mount.style.getPropertyValue('--kz-accent'));
    if (acc && sat(acc) >= 0.2) {
      var dark = luma(effectiveBg(mount)) < 0.5;
      mount.style.setProperty('--kz-accent-soft', rgbStr(dark ? mix(effectiveBg(mount), acc, 0.28) : mix(acc, [255,255,255], 0.88)));
      mount.style.setProperty('--kz-accent-ink', rgbStr(dark ? mix(acc, [255,255,255], 0.35) : (luma(acc) > 0.6 ? mix(acc, [0,0,0], 0.45) : acc)));
    }
    if (_catalogue === null) {
      mount.innerHTML = '<div class="kz-tp-root kz-cat-host" data-kz-cat="loading"><div class="kz-cat-empty">Loading classes…</div></div>';
      return;
    }
    mount.innerHTML = '<div class="kz-tp-root kz-cat-host" data-kz-cat="ready"></div>';
    renderCatalogue(mount.firstChild, _catalogue, false, 'New classes are coming soon.');
  }
  function hasSession(){
    try{ var raw=window.localStorage.getItem(SESSION_KEY); var s=raw?JSON.parse(raw):null; return !!(s&&s.token); }catch(e){ return false; }
  }

  function renderCard(mount){
    applyTheme(mount);
    applyDesignTokens(mount, KZ_DESIGN_TOKENS_MANIFEST);
    var loggedIn = hasSession();
    mount.innerHTML =
      '<div class="kz-tp-root kz-tp-link-card">' +
        '<h2 class="kz-tp-title">Student &amp; tutor portal</h2>' +
        '<p class="kz-tp-hint">Log in to see what’s due, take your assessments and check your grades.</p>' +
        '<a class="kz-tp-link-btn" href="/portal">' + (loggedIn ? 'Go to your dashboard' : 'Log in to the portal') + ' &rarr;</a>' +
      '</div>';
  }

  // Same scan applyTheme uses: the brand accent is usually a saturated
  // button/link BACKGROUND; fall back to a coloured link text.
  function sampleAccent(){
    var cands=document.querySelectorAll('a,button,[role=button]');
    var best=null,bestSat=0.35;
    for(var i=0;i<cands.length&&i<40;i++){
      if(cands[i].closest&&cands[i].closest('.kz-tp-root'))continue;
      var c=parseRgb(window.getComputedStyle(cands[i]).backgroundColor);
      if(c){var s=sat(c); if(s>bestSat){bestSat=s;best=c;}}
    }
    if(!best){
      for(var j=0;j<cands.length&&j<30;j++){
        var lc=parseRgb(window.getComputedStyle(cands[j]).color);
        if(lc&&sat(lc)>0.35){best=lc;break;}
      }
    }
    return best;
  }
  function cacheBrand(){
    try{
      if(!document.querySelector(LEGACY_SELECTOR+',[data-kizuri-portal-link],'+CATALOGUE_SELECTOR))return;
      var accent=sampleAccent();
      var fontEl=document.querySelector('h1')||document.body;
      var font=window.getComputedStyle(fontEl).fontFamily||'';
      var brand={};
      if(accent)brand.accent=[Math.round(accent[0]),Math.round(accent[1]),Math.round(accent[2])];
      if(font&&font.length<200)brand.font=font;
      if(brand.accent||brand.font)window.localStorage.setItem(BRAND_KEY, JSON.stringify(brand));
    }catch(e){}
  }

  function ensureRendered(){
    var mounts=document.querySelectorAll(LEGACY_SELECTOR);
    for(var i=0;i<mounts.length;i++){
      if(!mounts[i].querySelector('.kz-tp-link-card'))renderCard(mounts[i]);
    }
    var cats=document.querySelectorAll(CATALOGUE_SELECTOR);
    for(var j=0;j<cats.length;j++){
      var host=cats[j].querySelector('.kz-cat-host');
      var want=_catalogue===null?'loading':'ready';
      if(!host||host.getAttribute('data-kz-cat')!==want)renderCatalogueMount(cats[j]);
    }
  }
  // Same hydration self-heal as the app (see buildTutorPlatformRuntime).
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

  function boot(){
    if(document.querySelector(LEGACY_SELECTOR+','+CATALOGUE_SELECTOR)){
      injectStyles();
      loadCatalogue();
      ensureRendered();
      watchForHydration();
    }
    // Sample after hydration has settled so the page's real styles are applied.
    setTimeout(cacheBrand, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();