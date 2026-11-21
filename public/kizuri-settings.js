(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var SETTINGS_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/site-settings/354c4e09-4913-413b-b740-947174913a8e";

  function escHtml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}

  // Trimmed string or '' — the single gate every "is this filled in?" check uses.
  function val(v){ return (v==null?'':String(v)).replace(/^\s+|\s+$/g,''); }

  // Only http(s) links ever become an href. The API validates on write, but a
  // row written before that rule must still never become a javascript: link.
  function safeUrl(u){
    var s=val(u);
    return /^https?:\/\//i.test(s) ? s : '';
  }

  var STYLES = [
    '[data-kizuri-announcement]{position:relative;z-index:2147483000;display:flex;align-items:center;',
    'justify-content:center;gap:12px;padding:10px 44px 10px 16px;background:#0f172a;color:#fff;',
    'font:500 14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-align:center;}',
    '[data-kizuri-announcement-close]{position:absolute;right:10px;top:50%;transform:translateY(-50%);',
    'background:none;border:0;color:inherit;font-size:20px;line-height:1;cursor:pointer;opacity:.75;padding:2px 6px;}',
    '[data-kizuri-announcement-close]:hover{opacity:1;}',
    '.kz-bi{font:400 15px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}',
    '.kz-bi-row{display:flex;gap:8px;padding:2px 0;}',
    '.kz-bi-label{font-weight:600;min-width:92px;}',
    '.kz-bi-hours{margin-top:10px;}',
    '.kz-bi-socials{margin-top:10px;display:flex;flex-wrap:wrap;gap:12px;}',
    '.kz-bi-socials a{text-decoration:underline;}'
  ].join('');

  function injectStyles(){
    try{
      if(document.querySelector('style[data-kizuri-settings-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-settings-styles','');
      s.textContent=STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  // ---- announcement -------------------------------------------------------

  // Dismissal is keyed to the MESSAGE, not the site: an owner posting fresh news
  // must still reach a visitor who dismissed the previous one. Cheap string hash.
  function msgKey(text){
    var h=0,i=0;
    for(i=0;i<text.length;i++){ h=((h<<5)-h)+text.charCodeAt(i); h=h|0; }
    return 'kz_ann_'+SITE_ID+'_'+h;
  }
  function isDismissed(text){
    try{ return sessionStorage.getItem(msgKey(text))==='1'; }catch(e){ return false; }
  }
  function dismiss(text){
    try{ sessionStorage.setItem(msgKey(text),'1'); }catch(e){}
  }

  function renderAnnouncement(s){
    var text = val(s && s.announcement_text);
    // Three separate reasons to draw nothing: switched off, nothing to say,
    // or this visitor already dismissed this exact message.
    if(!s || s.announcement_active!==true) return;
    if(!text) return;
    if(isDismissed(text)) return;

    var existing=document.querySelector('[data-kizuri-announcement]');
    if(existing&&existing.parentNode) existing.parentNode.removeChild(existing);

    var bar=document.createElement('div');
    bar.setAttribute('data-kizuri-announcement','');
    bar.setAttribute('role','status');
    bar.innerHTML='<span>'+escHtml(text)+'</span>'+
      '<button type="button" data-kizuri-announcement-close aria-label="Dismiss announcement">&times;</button>';

    var btn=bar.querySelector('[data-kizuri-announcement-close]');
    if(btn){
      btn.onclick=function(){
        dismiss(text);
        if(bar.parentNode)bar.parentNode.removeChild(bar);
      };
    }
    if(document.body) document.body.insertBefore(bar, document.body.firstChild);
  }

  // ---- business info ------------------------------------------------------

  var DAYS=[['mon','Monday'],['tue','Tuesday'],['wed','Wednesday'],['thu','Thursday'],
            ['fri','Friday'],['sat','Saturday'],['sun','Sunday']];

  function row(label,value){
    var v=val(value);
    if(!v) return '';   // never a label with nothing after it
    return '<div class="kz-bi-row"><span class="kz-bi-label">'+escHtml(label)+'</span>'+
           '<span>'+escHtml(v)+'</span></div>';
  }

  function hoursHtml(hours){
    if(!hours||typeof hours!=='object') return '';
    var out='',i,key,label,d,open,close,any=false;
    for(i=0;i<DAYS.length;i++){
      key=DAYS[i][0]; label=DAYS[i][1];
      if(!(key in hours)) continue;   // a day never set is not a claim of "closed"
      any=true;
      d=hours[key];
      open=d?val(d.open):''; close=d?val(d.close):'';
      out+='<div class="kz-bi-row"><span class="kz-bi-label">'+escHtml(label)+'</span><span>'+
           (open&&close ? escHtml(open)+' - '+escHtml(close) : 'Closed')+'</span></div>';
    }
    return any ? '<div class="kz-bi-hours">'+out+'</div>' : '';
  }

  function socialsHtml(links){
    if(!links||typeof links!=='object') return '';
    var out='',k,u;
    for(k in links){
      if(!Object.prototype.hasOwnProperty.call(links,k)) continue;
      u=safeUrl(links[k]);
      if(!u) continue;   // drops javascript: and anything else non-http(s)
      out+='<a href="'+escAttr(u)+'" target="_blank" rel="noopener noreferrer">'+escHtml(k)+'</a>';
    }
    return out ? '<div class="kz-bi-socials">'+out+'</div>' : '';
  }

  function renderBusinessInfo(s){
    var mounts=document.querySelectorAll('[data-kizuri-settings="business-info"]');
    if(!mounts||!mounts.length) return;   // no mount → never inject anywhere
    if(!s) return;

    var html = row('Phone', s.business_phone) +
               row('WhatsApp', s.business_whatsapp) +
               row('Email', s.business_email) +
               row('Address', s.business_address) +
               hoursHtml(s.opening_hours) +
               socialsHtml(s.social_links);

    // Everything empty → leave the mount untouched rather than drawing an
    // empty shell that reads as "this business has no contact details".
    if(!html) return;

    var i;
    for(i=0;i<mounts.length;i++){
      mounts[i].innerHTML='<div class="kz-bi">'+html+'</div>';
    }
  }

  // ---- boot ---------------------------------------------------------------

  function apply(s){
    injectStyles();
    renderAnnouncement(s);
    renderBusinessInfo(s);
  }

  // The ONE global this runtime owns. Never a shared name.
  window.__kizuriSettings = { apply: apply, settings: null };

  function boot(s){
    window.__kizuriSettings.settings = s || null;
    apply(s);
  }

  if (typeof window!=='undefined' && window.__KIZURI_SETTINGS_TEST__){
    boot(window.__KIZURI_SETTINGS_TEST__.settings);
    return;
  }

  function run(){
    fetch(SETTINGS_URL,{headers:{'Accept':'application/json'}})
      .then(function(r){ if(!r.ok) throw new Error('settings'); return r.json(); })
      .then(function(d){ boot(d); })
      // A failed fetch renders NOTHING. Never an empty bar, never a blank
      // contact block — we do not know the owner's settings, so we say nothing.
      .catch(function(){ boot(null); });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();