(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var EDITS_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/site-edit/354c4e09-4913-413b-b740-947174913a8e";

  function applySectionOps(doc, ops) {
    if (!ops || !ops.length) return;
    function sec(id) { return doc.querySelector('[data-kizuri-section="' + id.replace(/["\\]/g, '\\$&') + '"]'); }
    for (var i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.type === 'delete') { var d = sec(op.target); if (d) d.style.display = 'none'; }
      else if (op.type === 'move') {
        var el = sec(op.target); if (!el || !el.parentNode) continue;
        if (op.before === null) { el.parentNode.appendChild(el); }
        else { var ref = sec(op.before); if (ref && ref.parentNode === el.parentNode) el.parentNode.insertBefore(el, ref); }
      } else if (op.type === 'duplicate') {
        var s = sec(op.target); if (!s) continue;
        // Prefer the op's stable stamped id; fall back to the op-index derivation for
        // pre-dupId ops. Deterministic either way, so re-running after inserts mount
        // never creates a second clone — idempotent.
        var dupId = op.dupId || (op.target + '~dup' + i);
        if (sec(dupId)) continue;
        var clone = s.cloneNode(true);
        clone.setAttribute('data-kizuri-section', dupId);
        if (clone.getAttribute('data-kizuri-edit') === op.target) clone.setAttribute('data-kizuri-edit', dupId);
        var kids = clone.querySelectorAll('[data-kizuri-edit]');
        for (var k = 0; k < kids.length; k++) { kids[k].setAttribute('data-kizuri-edit', kids[k].getAttribute('data-kizuri-edit') + '~' + dupId + '~' + k); }
        s.insertAdjacentElement('afterend', clone);
      }
    }
  }

  function applySectionStyleJs(el, e) {
    if (e.backgroundColor != null) el.style.backgroundColor = e.backgroundColor;
    if (e.backgroundImage != null) {
      if (e.backgroundImage) { el.style.backgroundImage = "url('" + e.backgroundImage + "')"; el.style.backgroundSize = 'cover'; el.style.backgroundPosition = 'center'; }
      else { el.style.backgroundImage = ''; el.style.backgroundSize = ''; el.style.backgroundPosition = ''; }
    }
    if (e.paddingY != null) { el.style.paddingTop = e.paddingY; el.style.paddingBottom = e.paddingY; }
    if (e.borderWidth != null || e.borderColor != null) {
      el.style.borderStyle = 'solid';
      if (e.borderWidth != null) el.style.borderWidth = e.borderWidth;
      if (e.borderColor != null) el.style.borderColor = e.borderColor;
    }
    if (e.borderRadius != null) el.style.borderRadius = e.borderRadius;
    if (e.textColor != null) el.style.color = e.textColor;
    if (e.overlay != null) {
      var ov = el.querySelector(':scope > [data-kizuri-overlay]');
      var rgba = e.overlay.color === 'light' ? 'rgba(255, 255, 255, ' + e.overlay.alpha + ')' : 'rgba(0, 0, 0, ' + e.overlay.alpha + ')';
      if (e.overlay.alpha > 0) {
        if (!el.style.position) el.style.position = 'relative';
        if (!ov) { ov = document.createElement('div'); ov.setAttribute('data-kizuri-overlay', ''); ov.style.position = 'absolute'; ov.style.top = '0'; ov.style.left = '0'; ov.style.right = '0'; ov.style.bottom = '0'; ov.style.pointerEvents = 'none'; ov.style.zIndex = '0'; el.insertBefore(ov, el.firstChild); }
        ov.style.backgroundColor = rgba;
        for (var c = 0; c < el.children.length; c++) { var ch = el.children[c]; if (ch.getAttribute('data-kizuri-overlay') == null) { if (!ch.style.position) ch.style.position = 'relative'; ch.style.zIndex = '1'; } }
      } else if (ov && ov.parentNode) { ov.parentNode.removeChild(ov); }
    }
  }

  // Remove Tailwind h-*/w-* size classes so a directly-set width/height
  // attribute (iconSize) actually takes visible effect instead of being
  // silently overridden by the class's CSS (mirrors editor-apply.ts).
  function stripTailwindSizeClassesJs(el) {
    var cls = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
    var kept = cls.filter(function (c) { return !/^(h|w)-(\S+)$/.test(c); });
    if (kept.length !== cls.length) el.setAttribute('class', kept.join(' '));
  }

  function applyEdits(doc, edits) {
    var fonts = [];
    var g = edits._global;
    if (g && g.fontFamily) { doc.body.style.fontFamily = "'" + g.fontFamily + "', sans-serif"; fonts.push(g.fontFamily); }
    var cardVars = edits._cardVars;
    if (cardVars) {
      var shopRoots = doc.querySelectorAll('.kz-shop-root');
      for (var sr = 0; sr < shopRoots.length; sr++) {
        for (var varName in cardVars) {
          if (cardVars.hasOwnProperty(varName)) shopRoots[sr].style.setProperty(varName, cardVars[varName]);
        }
      }
    }
    // Navigation edits — dedicated block, mirroring editor-apply.ts exactly.
    // A nav item's key is a data-kizuri-nav-item id, not data-kizuri-edit,
    // and maps to MULTIPLE elements (desktop nav + mobile drawer both render
    // every item), so it can't go through the generic per-element loop below
    // (which looks elements up via data-kizuri-edit and only ever finds one).
    var navEdits = edits._nav;
    if (navEdits) {
      for (var navId in navEdits) {
        if (!navEdits.hasOwnProperty(navId) || !navEdits[navId]) continue;
        var navEdit = navEdits[navId];
        var navMatches = doc.querySelectorAll('[data-kizuri-nav-item="' + navId + '"]');
        if (navEdit.deleted) {
          for (var nd = 0; nd < navMatches.length; nd++) { if (navMatches[nd].parentNode) navMatches[nd].parentNode.removeChild(navMatches[nd]); }
          continue;
        }
        for (var nm = 0; nm < navMatches.length; nm++) {
          if (navEdit.label != null) navMatches[nm].textContent = navEdit.label;
          if (navEdit.href != null) navMatches[nm].setAttribute('href', navEdit.href);
        }
      }
    }
    for (var id in edits) {
      if (!edits.hasOwnProperty(id) || id === '_global' || id === '_inserts' || id === '_sections' || id === '_cardVars' || id === '_nav' || !edits[id]) continue;
      var e = edits[id];
      // querySelectorAll, not querySelector — parity with editor-apply.ts:
      // an id is SUPPOSED to be unique, but a source-level collision (a
      // shared component wrapping a <section>/<img> called more than once)
      // can still put the same id on more than one element. Applying the
      // edit to every match beats the old single-match behavior, which
      // silently dropped the edit on every element after the first.
      var matches = doc.querySelectorAll('[data-kizuri-edit="' + id + '"]');
      if (!matches.length) continue;
      for (var mi = 0; mi < matches.length; mi++) {
        var el = matches[mi];
        var tag = el.tagName.toLowerCase();
        if (tag === 'img') {
          if (e.src != null) el.setAttribute('src', e.src);
          if (e.alt != null) el.setAttribute('alt', e.alt);
          if (e.objectPosition != null) el.style.objectPosition = e.objectPosition;
        }
        if (tag === 'a' && e.href != null) el.setAttribute('href', e.href);
        if (e.text != null) el.textContent = e.text;
        if (e.fontFamily != null) { el.style.fontFamily = e.fontFamily ? "'" + e.fontFamily + "', sans-serif" : ''; }
        if (e.fontSize != null) el.style.fontSize = e.fontSize;
        if (e.fontWeight != null) el.style.fontWeight = e.fontWeight;
        if (e.color != null) el.style.color = e.color;
        if (e.imgWidth != null) { el.style.width = e.imgWidth; el.style.maxWidth = '100%'; }
        if (e.imgAlign != null) {
          el.style.display = 'block';
          if (e.imgAlign === 'center') { el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; }
          else if (e.imgAlign === 'right') { el.style.marginLeft = 'auto'; el.style.marginRight = '0'; }
          else { el.style.marginLeft = '0'; el.style.marginRight = 'auto'; }
        }
        if (e.iconSize != null) { el.setAttribute('width', e.iconSize); el.setAttribute('height', e.iconSize); stripTailwindSizeClassesJs(el); }
        applySectionStyleJs(el, e);
      }
      if (e.fontFamily) fonts.push(e.fontFamily);
    }
    var seen = {}, out = [];
    for (var i = 0; i < fonts.length; i++) { if (!seen[fonts[i]]) { seen[fonts[i]] = 1; out.push(fonts[i]); } }
    return out;
  }

  function loadFonts(fonts) {
    if (!fonts.length) return;
    var fam = fonts.map(function (f) { return f.replace(/ /g, '+') + ':wght@300;400;500;600;700'; }).join('&family=');
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + fam + '&display=swap';
    document.head.appendChild(link);
  }

  // The page is cloaked (body { visibility: hidden }) by inline CSS/JS baked
  // into layout.tsx, present in the initial HTML before first paint — this
  // runtime doesn't own that cloak, only the ONE job of revealing the page
  // once edits are settled, success or failure. window.__kizuriRevealPage
  // may not exist (an older cached page, or a layout.tsx predating this
  // fix) — guarded so this never throws.
  function revealPage() {
    try { if (window.__kizuriRevealPage) window.__kizuriRevealPage(); } catch (eRP) {}
  }

  // applyEdits() only STARTS the browser's fetch/decode of a newly-set image
  // src — it doesn't complete synchronously. Revealing right after applying
  // edits would still show the OLD image (the last thing actually painted)
  // until the new one finishes loading, producing exactly the flash the
  // cloak exists to prevent — a real bug found live even after the cloak
  // itself shipped. Snapshots every <img> src before applying edits, diffs
  // after, and waits for 'load' (or 'error', so a broken/unreachable URL
  // never hangs the reveal forever — the existing 3s hard fallback in the
  // cloak script is the ultimate backstop regardless) on whichever images
  // actually changed. Self-contained here — applyEdits' own contract
  // (shared with other callers) is untouched.
  function revealAfterImagesLoad() {
    try {
      var pending = 0, done = false;
      function maybeReveal() { if (done && pending <= 0) revealPage(); }
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        (function (img) {
          if (img.complete) return; // already loaded (or has no src at all) — nothing to wait for
          pending++;
          function settle() { pending--; maybeReveal(); }
          img.addEventListener('load', settle, { once: true });
          img.addEventListener('error', settle, { once: true });
        })(imgs[i]);
      }
      done = true;
      maybeReveal();
    } catch (eRI) { revealPage(); }
  }

  function run(edits) {
    var before = {};
    var allImgsBefore = document.querySelectorAll('img');
    for (var bi = 0; bi < allImgsBefore.length; bi++) before[bi] = allImgsBefore[bi].getAttribute('src');

    applySectionOps(document, edits._sections);
    var fonts = applyEdits(document, edits);
    loadFonts(fonts);
    // Expose a re-apply hook so kizuri-shop.js can re-run the structural ops AFTER
    // it mounts _inserts. On this first pass, a move/delete/duplicate targeting a
    // section that lives inside a not-yet-mounted insert is a no-op; the shop
    // runtime calls this again once those sections exist. applySectionOps is
    // idempotent (dup ids are stable stamped ids, or op-index-derived for legacy
    // ops), so the double-run never produces a second clone.
    window.__kizuriApplySections = function () { applySectionOps(document, edits._sections); };
    window.__kizuriApplyEdits = function () { applyEdits(document, edits); };

    // Found live: a hover-driven mega-menu / mobile accordion only mounts its
    // submenu data-kizuri-nav-item elements into the DOM while the user is
    // actively hovering/expanding that item — they are ABSENT from the page's
    // initial HTML entirely. applyEdits' _nav block above ran once, at this
    // exact moment, and found zero matches for any such submenu id — a
    // merchant's saved nav edit registered live, saved successfully, but
    // never appeared on the actual published page because the element it
    // needed to update didn't exist yet the one time this function checked.
    // Re-run applyEdits (idempotent — same querySelectorAll-and-set pattern
    // every time) whenever a NEW data-kizuri-nav-item element appears, so a
    // saved edit reaches a submenu the instant the user opens it.
    if (edits._nav && typeof MutationObserver !== 'undefined') {
      var navObserver = new MutationObserver(function (mutations) {
        for (var mi = 0; mi < mutations.length; mi++) {
          var added = mutations[mi].addedNodes;
          for (var ni = 0; ni < added.length; ni++) {
            var node = added[ni];
            if (node.nodeType !== 1) continue;
            if (node.hasAttribute && node.hasAttribute('data-kizuri-nav-item')) { applyEdits(document, edits); return; }
            if (node.querySelector && node.querySelector('[data-kizuri-nav-item]')) { applyEdits(document, edits); return; }
          }
        }
      });
      navObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Only wait on images whose src ACTUALLY changed — the common case
    // (no image edited at all) must reveal immediately, not add a delay
    // for nothing. Comparing against the SAME node list index-by-index is
    // safe here: applyEdits mutates existing <img> attributes in place, it
    // never adds/removes/reorders <img> elements itself.
    var allImgsAfter = document.querySelectorAll('img');
    var anyImageChanged = false;
    for (var ai = 0; ai < allImgsAfter.length; ai++) {
      if (allImgsAfter[ai].getAttribute('src') !== before[ai]) { anyImageChanged = true; break; }
    }
    if (anyImageChanged) revealAfterImagesLoad();
    else revealPage();
  }

  if (typeof window !== 'undefined' && window.__KIZURI_TEST_EDITS__) {
    run(window.__KIZURI_TEST_EDITS__);
    return;
  }

  var params = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search) : null;
  var editToken = params ? params.get('kizuri_edit') : null;

  function fetchAndApply() {
    // Share this GET with kizuri-shop.js — stash the promise so the shop
    // runtime reuses it instead of issuing a second site_edits request.
    if (!window.__kizuriEdits) {
      window.__kizuriEdits = fetch(EDITS_URL, { headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .catch(function () { return {}; });
    }
    Promise.resolve(window.__kizuriEdits)
      .then(function (edits) { run(edits || {}); })
      .catch(function () { revealPage(); /* fail-safe: original content, but never stay hidden */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchAndApply);
  } else {
    fetchAndApply();
  }

  if (editToken && typeof window !== 'undefined') {
    window.__KIZURI_EDIT__ = { siteId: SITE_ID, token: editToken, editsUrl: EDITS_URL };
    var chrome = document.createElement('script');
    chrome.src = '/kizuri-editor-chrome.js';
    chrome.defer = true;
    document.head.appendChild(chrome);
  }
})();