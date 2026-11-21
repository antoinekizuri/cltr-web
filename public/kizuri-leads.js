// Kizuri lead capture — auto-injected by the publish scaffold.
// Binds <form data-kizuri-form> AND auto-detects untagged contact forms
// (email + message/textarea, excluding the shop checkout). Honest feedback:
// success only on 2xx; on failure shows an error and keeps the visitor's data.
(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var INGEST = "https://kizuri.co.za/api/leads/ingest";

  function hasEmail(form){return !!form.querySelector('[type=email],[name=email]');}
  function hasMessage(form){return !!form.querySelector('textarea,[name=message],[name=enquiry],[name=comments]');}
  function inShop(form){return !!(form.closest && (form.closest('.kz-shop-checkout')||form.closest('.kz-shop-cart')));}
  function isLikelyContactForm(form){return hasEmail(form)&&hasMessage(form)&&!inShop(form);}

  function ensureMsg(form, attr, text, color){
    var el = form.querySelector('['+attr+']');
    if(!el){
      el = document.createElement('p');
      el.setAttribute(attr, '');
      el.textContent = text;
      el.style.marginTop = '8px';
      el.style.color = color;
      form.appendChild(el);
    }
    return el;
  }
  function show(el){if(el)el.style.display='block';}
  function hide(el){if(el)el.style.display='none';}
  function clearFields(form){
    var els = form.querySelectorAll('input, textarea');
    for (var i=0;i<els.length;i++){
      var t=(els[i].type||'').toLowerCase();
      if(t==='hidden'||t==='submit'||t==='button'||t==='checkbox'||t==='radio')continue;
      els[i].value='';
    }
  }

  function handle(form) {
    if(form.__kizuriBound)return; form.__kizuriBound = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      try {
        var data = new FormData(form);
        var payload = {
          site_id: SITE_ID,
          source_url: window.location.href,
          name: data.get('name') || data.get('fullName') || null,
          email: data.get('email') || null,
          phone: data.get('phone') || data.get('tel') || null,
          message:
            data.get('message') || data.get('enquiry') ||
            data.get('comments') || '',
        };
        fetch(INGEST, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            if (r && r.ok) {
              form.reset();
              clearFields(form);
              var ok = form.querySelector('[data-kizuri-success]');
              if (!ok) ok = ensureMsg(form, 'data-kizuri-success', "Thanks \u2014 we'll be in touch.", '#15803d');
              hide(form.querySelector('[data-kizuri-error]'));
              show(ok);
            } else {
              var err = ensureMsg(form, 'data-kizuri-error', "Couldn't send \u2014 please try again.", '#b91c1c');
              hide(form.querySelector('[data-kizuri-success]'));
              show(err);
            }
          })
          .catch(function () {
            var err = ensureMsg(form, 'data-kizuri-error', "Couldn't send \u2014 please try again.", '#b91c1c');
            hide(form.querySelector('[data-kizuri-success]'));
            show(err);
          });
      } catch (ex) { /* never let one form break others */ }
    });
  }

  function init() {
    try {
      var forms = document.querySelectorAll('form');
      for (var i = 0; i < forms.length; i++) {
        var f = forms[i];
        if (f.hasAttribute('data-kizuri-form') || isLikelyContactForm(f)) handle(f);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
