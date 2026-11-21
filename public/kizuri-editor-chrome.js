(function () {
  var ctx = window.__KIZURI_EDIT__; if (!ctx) return;

  // Kizuri "split-circle" node mark (the ownable brand shape from
  // components/marketing/kizuri-motif.tsx): an outlined circle whose lower half
  // is yellow. Rendered white-stroke + yellow so it reads on the navy panel
  // header. Inline SVG data-URI: self-contained, crisp at any size, zero fetch —
  // works on every published site without shipping asset weight.
  var KZ_MARK = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3E%3Ccircle%20cx='12'%20cy='12'%20r='8'%20fill='none'%20stroke='%23ffffff'%20stroke-width='1.6'/%3E%3Cpath%20d='M%204%2012%20A%208%208%200%200%200%2020%2012%20Z'%20fill='%23FBCB11'/%3E%3C/svg%3E";

  // Touch layout: phones get bottom edit-sheets + tap-driven section actions.
  // Evaluated ONCE at init (a mid-session rotation keeps the initial mode until
  // reload - accepted in the spec). Guarded so ancient browsers get desktop.
  var isTouchLayout = false;
  // Live media-query check for chrome opened after init (rotate/resize).
  // Falls back to the init-time flag if matchMedia throws.
  function isTouchNow() {
    try { return !!(window.matchMedia && window.matchMedia('(max-width: 767px)').matches); } catch (eMM) { return isTouchLayout; }
  }
  isTouchLayout = isTouchNow();

  // A site header (or any element) that is itself position:fixed/sticky and
  // docked to the true viewport top ignores body's padding-top, so it still
  // renders underneath .kz-edit-bar — and since the bar is opaque and at max
  // z-index, every click in that band goes to the bar instead of the site's
  // own header, making it fully unreachable while editing. Same detection
  // technique as shop-runtime.ts's findFixedHeaderHeight (kizuriweb commit
  // 4388d4d) — scans for fixed/sticky elements whose rendered top is inside
  // the bar's own band, tag-name agnostic, and pushes each one down by the
  // bar's OWN measured height (never a hardcoded number, so this stays in
  // sync if the bar's height ever changes).
  function clearFixedHeaders() {
    try {
      var barEl = document.querySelector('.kz-edit-bar');
      var barHeight = barEl ? barEl.offsetHeight : 48;
      var all = document.body.getElementsByTagName('*');
      for (var i = 0; i < all.length; i++) {
        var node = all[i];
        if (node === barEl || (barEl && barEl.contains(node))) continue;
        var cs = window.getComputedStyle(node);
        if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
        var rect = node.getBoundingClientRect();
        if (rect.top > barHeight) continue; // not docked at the top band — leave it (e.g. a fixed footer)
        node.style.top = barHeight + 'px';
      }
    } catch (eCFH) {}
  }

  var SECTION_TEMPLATES = {"hero-centered":"<section data-kizuri-section=\"hero-centered~__KZ_INS_ID__\" data-kizuri-edit=\"hero-centered~__KZ_INS_ID__\" style=\"padding:96px 24px;text-align:center;background:#f9fafb;\">\n  <div style=\"max-width:760px;margin:0 auto;\">\n    <p data-kizuri-edit=\"hero-centered~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n    <h1 data-kizuri-edit=\"hero-centered~headline~__KZ_INS_ID__\" style=\"font-size:48px;line-height:1.1;font-weight:800;color:#1f2937;margin:0 0 20px;\">A headline that sells your business</h1>\n    <p data-kizuri-edit=\"hero-centered~sub~__KZ_INS_ID__\" style=\"font-size:19px;line-height:1.6;color:#6b7280;margin:0 0 32px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n    <a data-kizuri-edit=\"hero-centered~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:16px 32px;border-radius:10px;text-decoration:none;\">Get started</a>\n  </div>\n</section>","hero-image-left":"<section data-kizuri-section=\"hero-image-left~__KZ_INS_ID__\" data-kizuri-edit=\"hero-image-left~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:48px;align-items:center;\">\n    <img data-kizuri-edit=\"hero-image-left~image~__KZ_INS_ID__\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400'%3E%3Crect width='640' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-family='sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle'%3EYour image%3C/text%3E%3C/svg%3E\" alt=\"\" style=\"flex:1 1 320px;max-width:100%;height:auto;border-radius:16px;object-fit:cover;\" />\n    <div style=\"flex:1 1 320px;\">\n      <p data-kizuri-edit=\"hero-image-left~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n      <h1 data-kizuri-edit=\"hero-image-left~headline~__KZ_INS_ID__\" style=\"font-size:42px;line-height:1.12;font-weight:800;color:#1f2937;margin:0 0 18px;\">A headline that sells your business</h1>\n      <p data-kizuri-edit=\"hero-image-left~sub~__KZ_INS_ID__\" style=\"font-size:18px;line-height:1.6;color:#6b7280;margin:0 0 28px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n      <a data-kizuri-edit=\"hero-image-left~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:15px 30px;border-radius:10px;text-decoration:none;\">Get started</a>\n    </div>\n  </div>\n</section>","hero-split":"<section data-kizuri-section=\"hero-split~__KZ_INS_ID__\" data-kizuri-edit=\"hero-split~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#0b1220;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:40px;align-items:center;\">\n    <div style=\"flex:1 1 320px;\">\n      <h1 data-kizuri-edit=\"hero-split~headline~__KZ_INS_ID__\" style=\"font-size:44px;line-height:1.1;font-weight:800;color:#ffffff;margin:0 0 18px;\">A headline that sells your business</h1>\n      <p data-kizuri-edit=\"hero-split~sub~__KZ_INS_ID__\" style=\"font-size:18px;line-height:1.6;color:#c7ccd6;margin:0 0 28px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n      <a data-kizuri-edit=\"hero-split~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#FBCB11;color:#0b1220;font-weight:700;padding:15px 30px;border-radius:10px;text-decoration:none;\">Get started</a>\n    </div>\n    <div style=\"flex:1 1 320px;background:#151f33;border-radius:16px;padding:32px;\">\n      <p data-kizuri-edit=\"hero-split~panelTitle~__KZ_INS_ID__\" style=\"font-size:20px;font-weight:700;color:#ffffff;margin:0 0 10px;\">Why choose us</p>\n      <p data-kizuri-edit=\"hero-split~panelBody~__KZ_INS_ID__\" style=\"font-size:16px;line-height:1.7;color:#c7ccd6;margin:0;\">A short supporting point that builds trust — replace this with your own copy.</p>\n    </div>\n  </div>\n</section>","testimonials-cards":"<section data-kizuri-section=\"testimonials-cards~__KZ_INS_ID__\" data-kizuri-edit=\"testimonials-cards~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#ffffff;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"testimonials-cards~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">What our customers say</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;\">\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote1~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"This changed how we run the business. Simple and fast.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name1~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Thandi M.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role1~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Owner, Cafe Uhuru</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote2~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"We were live in an afternoon. Our customers noticed.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name2~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Sipho D.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role2~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Founder, Bolt Logistics</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote3~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"Finally a site that looks like we paid a designer.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name3~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Lerato K.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role3~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Director, Kaya Interiors</p>\n      </div>\n    </div>\n  </div>\n</section>","pricing-columns":"<section data-kizuri-section=\"pricing-columns~__KZ_INS_ID__\" data-kizuri-edit=\"pricing-columns~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"pricing-columns~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">Simple pricing</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;align-items:stretch;\">\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier1name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Starter</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R0</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">1 site<br>Basic support<br>Kizuri subdomain</p>\n        <a data-kizuri-edit=\"pricing-columns~tier1cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Starter</a>\n      </div>\n      <div style=\"background:#fff;border:2px solid #19468B;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier2name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Premium</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R199</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Starter<br>Custom domain<br>Priority support</p>\n        <a data-kizuri-edit=\"pricing-columns~tier2cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#19468B;color:#fff;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Premium</a>\n      </div>\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier3name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Platinum</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R499</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Premium<br>Unlimited sites<br>Dedicated manager</p>\n        <a data-kizuri-edit=\"pricing-columns~tier3cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Platinum</a>\n      </div>\n    </div>\n  </div>\n</section>","columns-2":"<section data-kizuri-section=\"columns-2~__KZ_INS_ID__\" data-kizuri-edit=\"columns-2~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-2~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-2~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","columns-3":"<section data-kizuri-section=\"columns-3~__KZ_INS_ID__\" data-kizuri-edit=\"columns-3~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col2~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","columns-4":"<section data-kizuri-section=\"columns-4~__KZ_INS_ID__\" data-kizuri-edit=\"columns-4~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col2~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col3~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","hero":"<section data-kizuri-section=\"hero-centered~__KZ_INS_ID__\" data-kizuri-edit=\"hero-centered~__KZ_INS_ID__\" style=\"padding:96px 24px;text-align:center;background:#f9fafb;\">\n  <div style=\"max-width:760px;margin:0 auto;\">\n    <p data-kizuri-edit=\"hero-centered~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n    <h1 data-kizuri-edit=\"hero-centered~headline~__KZ_INS_ID__\" style=\"font-size:48px;line-height:1.1;font-weight:800;color:#1f2937;margin:0 0 20px;\">A headline that sells your business</h1>\n    <p data-kizuri-edit=\"hero-centered~sub~__KZ_INS_ID__\" style=\"font-size:19px;line-height:1.6;color:#6b7280;margin:0 0 32px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n    <a data-kizuri-edit=\"hero-centered~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:16px 32px;border-radius:10px;text-decoration:none;\">Get started</a>\n  </div>\n</section>","testimonials":"<section data-kizuri-section=\"testimonials-cards~__KZ_INS_ID__\" data-kizuri-edit=\"testimonials-cards~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#ffffff;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"testimonials-cards~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">What our customers say</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;\">\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote1~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"This changed how we run the business. Simple and fast.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name1~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Thandi M.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role1~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Owner, Cafe Uhuru</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote2~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"We were live in an afternoon. Our customers noticed.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name2~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Sipho D.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role2~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Founder, Bolt Logistics</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote3~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"Finally a site that looks like we paid a designer.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name3~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Lerato K.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role3~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Director, Kaya Interiors</p>\n      </div>\n    </div>\n  </div>\n</section>","pricing":"<section data-kizuri-section=\"pricing-columns~__KZ_INS_ID__\" data-kizuri-edit=\"pricing-columns~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"pricing-columns~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">Simple pricing</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;align-items:stretch;\">\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier1name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Starter</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R0</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">1 site<br>Basic support<br>Kizuri subdomain</p>\n        <a data-kizuri-edit=\"pricing-columns~tier1cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Starter</a>\n      </div>\n      <div style=\"background:#fff;border:2px solid #19468B;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier2name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Premium</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R199</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Starter<br>Custom domain<br>Priority support</p>\n        <a data-kizuri-edit=\"pricing-columns~tier2cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#19468B;color:#fff;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Premium</a>\n      </div>\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier3name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Platinum</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R499</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Premium<br>Unlimited sites<br>Dedicated manager</p>\n        <a data-kizuri-edit=\"pricing-columns~tier3cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Platinum</a>\n      </div>\n    </div>\n  </div>\n</section>"};
  function renderSectionBlockJs(type, id){ var t=SECTION_TEMPLATES[type]; return t? t.split('__KZ_INS_ID__').join(id) : ''; }
  function isSectionType(t){ for(var k in SECTION_TEMPLATES){ if(SECTION_TEMPLATES.hasOwnProperty(k) && k===t) return true; } return false; }
  function renderImageInsertJs(id){
    var ph = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-family='sans-serif' font-size='18' text-anchor='middle' dominant-baseline='middle'%3EYour image%3C/text%3E%3C/svg%3E";
    return '<img data-kizuri-edit="' + id + '~img" src="' + ph + '" alt="" style="max-width:100%;width:100%;height:auto;display:block;" />';
  }
  var SECTION_FAMILIES = [{"family":"hero","label":"Hero","variants":[{"key":"hero-centered","variant":"Centered"},{"key":"hero-image-left","variant":"Image left"},{"key":"hero-split","variant":"Split"}]},{"family":"testimonials","label":"Testimonials","variants":[{"key":"testimonials-cards","variant":"Cards"}]},{"family":"pricing","label":"Pricing","variants":[{"key":"pricing-columns","variant":"Columns"}]},{"family":"columns","label":"Columns","variants":[{"key":"columns-2","variant":"2 Columns"},{"key":"columns-3","variant":"3 Columns"},{"key":"columns-4","variant":"4 Columns"}]}];

  var FONTS = ['Inter', 'Poppins', 'Roboto', 'Montserrat', 'Lato', 'Playfair Display', 'Merriweather', 'Open Sans'];

  // ---- in-memory diff accumulator (same document shape as EditsDocument) ----
  var diff = {};
  var dirty = false;

  // Seed the diff from the CURRENT edits document so every save sends the full
  // cumulative document (the API replaces the edits JSONB wholesale — without
  // seeding, a later session would overwrite/lose earlier sessions' edits).
  // Plain GET to the PUBLIC edits endpoint — NO token / NO auth header at all.
  // Non-blocking: UI builds immediately; this resolves well before a Save click.
  // Fail-safe: a fetch failure just leaves diff empty rather than blocking editing.
  // cache:'no-store' so the owner always seeds the freshest edits — the public
  // GET is CDN-cached for visitors, but the owner must never seed a stale doc
  // right after saving (that would let the next save clobber fresh edits).
  fetch(ctx.editsUrl, { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (existing) {
      if (existing && typeof existing === 'object') {
        for (var k in existing) { if (existing.hasOwnProperty(k)) diff[k] = existing[k]; }
      }
    })
    .catch(function () {});

  function setEdit(elId, prop, value) {
    var cur = diff[elId] || {};
    cur[prop] = value;
    diff[elId] = cur;
    dirty = true;
    markDirty();
  }
  function setGlobal(prop, value) {
    var g = diff._global || {};
    g[prop] = value;
    diff._global = g;
    dirty = true;
    markDirty();
  }

  // ---- styles (all namespaced with kz-edit) ----
  var style = document.createElement('style');
  style.textContent = [
    'body { padding-top: 48px !important; }',
    '.kz-edit-bar { position: fixed; top: 0; left: 0; right: 0; height: 48px; z-index: 2147483646; display: flex; align-items: center; gap: 12px; padding: 0 14px; background: #19468B; color: #fff; font: 13px/1.3 Poppins, -apple-system, system-ui, sans-serif; box-shadow: 0 1px 6px rgba(0,0,0,.25); }',
    '.kz-edit-bar-mark { width: 18px; height: 18px; flex: 0 0 auto; display: block; }',
    '.kz-edit-title { font-weight: 600; }',
    '.kz-edit-status { opacity: .75; }',
    '.kz-edit-spacer { flex: 1; }',
    '.kz-edit-fontwrap { display: inline-flex; align-items: center; gap: 8px; }',
    '.kz-edit-bar select, .kz-edit-bar button { font: inherit; }',
    '.kz-edit-bar select { background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 6px; padding: 4px 6px; }',
    '.kz-edit-btn { cursor: pointer; border: 0; border-radius: 6px; padding: 6px 12px; font-weight: 600; }',
    '.kz-edit-btn-save { background: #6366f1; color: #fff; }',
    '.kz-edit-btn-exit { background: #334155; color: #fff; }',
    '.kz-edit-add { cursor: pointer; border: 0; border-radius: 6px; padding: 6px 12px; font-weight: 600; background: #10b981; color: #fff; }',
    '.kz-edit-addmenu { position: fixed; top: 44px; z-index: 2147483647; min-width: 160px; background: #fff; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 36px rgba(0,0,0,.22); padding: 6px; font: 13px/1.4 -apple-system, system-ui, sans-serif; }',
    '.kz-edit-addmenu-group { padding: 6px 10px 2px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #94a3b8; }',
    '.kz-edit-addmenu-note { padding: 10px; text-align: center; font-size: 11px; color: #94a3b8; }',
    '.kz-edit-addmenu button { display: block; width: 100%; text-align: left; cursor: pointer; border: 0; background: transparent; color: inherit; font: inherit; padding: 8px 10px; border-radius: 6px; }',
    '.kz-edit-addmenu button:hover { background: #f1f5f9; }',
    '.kz-edit-submenu { z-index: 2147483647; }',
    '.kz-edit-picker { position: fixed; top: 44px; z-index: 2147483647; min-width: 220px; max-height: 60vh; overflow: auto; background: #fff; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 36px rgba(0,0,0,.22); padding: 6px; font: 13px/1.4 -apple-system, system-ui, sans-serif; }',
    '.kz-edit-picker .kz-edit-picker-head { font-weight: 600; padding: 6px 10px; }',
    '.kz-edit-picker button { display: block; width: 100%; text-align: left; cursor: pointer; border: 0; background: transparent; color: inherit; font: inherit; padding: 8px 10px; border-radius: 6px; }',
    '.kz-edit-picker button:hover { background: #f1f5f9; }',
    '.kz-edit-picker .kz-edit-picker-price { opacity: .7; }',
    '.kz-edit-outline { outline: 2px dashed #6366f1 !important; outline-offset: 2px !important; cursor: pointer !important; }',
    '.kz-edit-pop { position: absolute; z-index: 2147483647; width: 300px; background: #fff; color: #1f2937; border-radius: 14px; box-shadow: 0 18px 50px rgba(15,23,42,.28); overflow: hidden; font: 13px/1.45 Poppins, -apple-system, system-ui, sans-serif; }',
    '.kz-pop-grip { cursor: move; padding: 0 6px; opacity: .6; user-select: none; }',
    '.kz-pop-grip:hover { opacity: 1; }',
    '.kz-pop-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #19468B; color: #fff; }',
    '.kz-pop-mark { width: 22px; height: 22px; flex: 0 0 auto; display: block; }',
    '.kz-pop-title { flex: 1; font-weight: 700; font-size: 13px; }',
    '.kz-pop-x { width: 26px; height: 26px; border: 0; border-radius: 8px; background: rgba(255,255,255,.14); color: #fff; font-size: 16px; line-height: 1; cursor: pointer; flex: 0 0 auto; padding: 0; }',
    '.kz-pop-x:hover { background: rgba(255,255,255,.28); }',
    '.kz-pop-body { padding: 14px; max-height: 60vh; overflow: auto; }',
    '.kz-edit-pop label { display: block; font-weight: 600; font-size: 12px; color: #475569; margin: 12px 0 5px; }',
    '.kz-pop-body > label:first-child { margin-top: 0; }',
    '.kz-edit-pop input, .kz-edit-pop textarea, .kz-edit-pop select { width: 100%; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 9px; padding: 9px 11px; font: inherit; color: #1f2937; background: #f8fafc; }',
    '.kz-edit-pop input:focus, .kz-edit-pop textarea:focus, .kz-edit-pop select:focus { outline: none; border-color: #19468B; box-shadow: 0 0 0 3px rgba(25,70,139,.12); background: #fff; }',
    '.kz-edit-pop textarea { min-height: 60px; resize: vertical; }',
    '.kz-edit-pop input[type=color] { height: 38px; padding: 2px; background: #fff; }',
    '.kz-pop-foot { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-top: 1px solid #f1f5f9; }',
    '.kz-pop-spacer { flex: 1; }',
    '.kz-pop-done { border: 0; background: #19468B; color: #fff; font-weight: 700; border-radius: 9px; padding: 9px 18px; font: inherit; cursor: pointer; }',
    '.kz-pop-done:hover { background: #123661; }',
    '[data-kizuri-insert] { position: relative; }',
    '.kz-edit-removeblock { position: absolute; top: 6px; right: 6px; z-index: 2147483645; cursor: pointer; border: 0; border-radius: 6px; padding: 4px 8px; font: 600 12px/1.2 -apple-system, system-ui, sans-serif; background: #ef4444; color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.2); }',
    '.kz-edit-removeblock:hover { background: #dc2626; }',
    '.kz-edit-droptarget { cursor: copy; }',
    '.kz-sec-outline { outline: 2px solid #fbcb11 !important; outline-offset: -2px !important; }',
    '.kz-sec-bar { display: flex; align-items: center; gap: 4px; background: #19468b; border-radius: 8px; padding: 4px; box-shadow: 0 6px 20px rgba(0,0,0,.28); }',
    '.kz-ins-plus { position: fixed; z-index: 2147483646; width: 28px; height: 28px; border-radius: 50%; border: 0; background: #19468b; color: #fff; font: 700 18px/1 -apple-system, system-ui, sans-serif; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.3); display: none; align-items: center; justify-content: center; padding: 0; }',
    '.kz-ins-plus:hover { background: #0f2f66; }',
    '.kz-sec-grip { cursor: grab; color: rgba(255,255,255,.6); font-size: 16px; line-height: 1; padding: 0 4px; user-select: none; }',
    '.kz-sec-grip:active { cursor: grabbing; }',
    '.kz-sec-btn { width: 32px; height: 32px; border: 0; border-radius: 6px; background: rgba(255,255,255,.12); color: #fff; font: 600 15px/1 -apple-system, system-ui, sans-serif; cursor: pointer; }',
    '.kz-sec-btn:hover { background: rgba(255,255,255,.28); }',
    '.kz-sec-panel { width: 300px; }',
    '.kz-sec-panel .kz-pop-body button { cursor: pointer; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; padding: 5px 10px; font: 12px/1.2 Poppins, -apple-system, system-ui, sans-serif; }',
    '.kz-sec-panel .kz-pop-body button:hover { background: #eef2ff; }',
    '.kz-card-panel { width: 300px; }',
    '.kz-card-panel .kz-pop-body button { cursor: pointer; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; padding: 5px 10px; font: 12px/1.2 Poppins, -apple-system, system-ui, sans-serif; }',
    '.kz-card-panel .kz-pop-body button:hover { background: #eef2ff; }',
    '.kz-cardtpl-panel { width: 300px; }',
    '.kz-imgplace-dim { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.35); z-index: 2147483644; pointer-events: none; }',
    '.kz-imgplace-spot { position: fixed; outline: 3px solid #FBCB11; border-radius: 4px; z-index: 2147483645; pointer-events: none; box-sizing: border-box; }',
    '.kz-imgplace-line { position: fixed; background: #19468b; z-index: 2147483646; pointer-events: none; box-shadow: 0 0 6px rgba(25,70,139,.6); }',
    '.kz-imgplace-hint { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #0f172a; color: #fff; padding: 8px 16px; border-radius: 999px; font: 13px/1.3 -apple-system, system-ui, sans-serif; z-index: 2147483647; box-shadow: 0 6px 20px rgba(0,0,0,.3); pointer-events: none; }',
    '.kz-col-cell:empty { outline: 1px dashed #cbd5e1; outline-offset: -1px; border-radius: 12px; position: relative; }',
    '.kz-col-cell:empty::before { content: "Drop content here"; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: #94a3b8; font: 13px/1.3 -apple-system, system-ui, sans-serif; pointer-events: none; }',
    '@media (max-width: 767px) {'
      + ' .kz-edit-pop { position: fixed !important; top: auto !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100% !important; border-radius: 16px 16px 0 0; max-height: 62vh; padding-bottom: env(safe-area-inset-bottom); }'
      + ' .kz-pop-body { max-height: 40vh; }'
      + ' .kz-sec-panel, .kz-card-panel, .kz-cardtpl-panel { width: 100% !important; }'
      + ' .kz-edit-addmenu { position: fixed !important; top: auto !important; left: 0 !important; right: 0 !important; bottom: 0 !important; min-width: 0 !important; border-radius: 16px 16px 0 0; max-height: 62vh; overflow: auto; padding-bottom: env(safe-area-inset-bottom); }'
      + ' .kz-edit-bar button, .kz-edit-pop button, .kz-edit-addmenu button, .kz-pop-x, .kz-pop-done, .kz-sheet-actions button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }'
      + ' .kz-edit-pop button, .kz-edit-addmenu button, .kz-sheet-actions button { min-height: 44px; }'
      + ' .kz-pop-x { width: 44px; height: 44px; }'
      + ' .kz-edit-bar button:active, .kz-edit-pop button:active, .kz-edit-addmenu button:active, .kz-sheet-actions button:active { transform: scale(0.96); }'
      + ' .kz-edit-fontwrap { display: none; }'
      + ' .kz-edit-status { font-size: 0; width: 10px; height: 10px; border-radius: 50%; background: #22c55e; flex: 0 0 auto; }'
      + ' .kz-edit-status.kz-dirty { background: #f59e0b; }'
      + ' .kz-sheet-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 12px; }'
      + ' .kz-sheet-actions button { border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 10px; font: 600 11px/1.2 Poppins, -apple-system, sans-serif; color: #1f2937; padding: 6px 2px; }'
      + ' }'
  ].join('\n');
  document.head.appendChild(style);

  // ---- top bar ----
  var bar = document.createElement('div');
  bar.className = 'kz-edit-bar';

  var barMark = document.createElement('img');
  barMark.className = 'kz-edit-bar-mark';
  barMark.src = KZ_MARK;
  barMark.alt = '';
  var title = document.createElement('span');
  title.className = 'kz-edit-title';
  title.textContent = 'Kizuri editor';

  var status = document.createElement('span');
  status.className = 'kz-edit-status';
  status.textContent = 'All changes saved';

  function markDirty() { status.textContent = 'Unsaved changes'; status.classList.add('kz-dirty'); }
  function markSaved() { dirty = false; status.textContent = 'All changes saved'; status.classList.remove('kz-dirty'); if (typeof resetSecBarPosition === 'function') resetSecBarPosition(); }

  var spacer = document.createElement('span');
  spacer.className = 'kz-edit-spacer';

  var fontLabel = document.createElement('span');
  fontLabel.textContent = 'Site font';

  var fontSel = buildFontSelect();
  fontSel.addEventListener('change', function () {
    var v = fontSel.value;
    document.body.style.fontFamily = v ? ("'" + v + "', sans-serif") : '';
    setGlobal('fontFamily', v);
  });

  var addBtn = document.createElement('button');
  addBtn.className = 'kz-edit-add';
  addBtn.textContent = '+ Add';

  var saveBtn = document.createElement('button');
  saveBtn.className = 'kz-edit-btn kz-edit-btn-save';
  saveBtn.textContent = 'Save & Publish';
  saveBtn.addEventListener('click', save);

  var exitBtn = document.createElement('button');
  exitBtn.className = 'kz-edit-btn kz-edit-btn-exit';
  exitBtn.textContent = 'Exit';
  exitBtn.addEventListener('click', exit);

  // "Card style" — tunes the active shop card template's OWN declared
  // --kz-card-* CSS custom properties (a site-wide setting, distinct from the
  // per-element kz-card-panel/openCardPanel generic content-card styling
  // above). Hidden unless the site actually has a shop mounted.
  //
  // className is 'kz-edit-btn kz-edit-cardtpl-btn':
  //  - kz-edit-btn supplies the visual styling and, crucially, carries NO
  //    display:none rule of its own -- a dedicated class WITH such a rule
  //    would break the inline style.display toggle below (setting
  //    style.display = '' only removes the INLINE declaration; the element
  //    then falls back to whatever the stylesheet says, i.e. hidden forever).
  //  - kz-edit-cardtpl-btn is a marker-only class (no CSS rule of its own),
  //    used purely so the outside-click-teardown guard further down can
  //    recognize a click on this button as "inside chrome" -- same pattern
  //    as kz-edit-add for the Add button.
  var cardTplBtn = document.createElement('button');
  cardTplBtn.className = 'kz-edit-btn kz-edit-cardtpl-btn';
  cardTplBtn.textContent = 'Card style';
  cardTplBtn.style.display = 'none'; // shown below once we know a shop root exists
  cardTplBtn.addEventListener('click', openCardTemplatePanel);
  // A single synchronous check here is not enough: kizuri-editor-chrome.js is
  // injected and runs as soon as an edit token is on the URL (editor-runtime.ts),
  // completely independent of kizuri-shop.js's OWN sequential fetches (site
  // edits, then the storefront catalog) that must both resolve before
  // renderAll() ever adds a .kz-shop-root class to a mount. On a real page
  // load this script's top-level code runs BEFORE any shop root exists, so a
  // one-shot querySelector here left the button permanently hidden on every
  // real shop site (Task 10 trace-through caught this — every existing test
  // pre-seeded .kz-shop-root before eval, masking the race). Poll for the
  // late-appearing root the same way initDecorate() already does for
  // shop-inserted blocks: a MutationObserver for the common async case, plus
  // a short-interval poll as a belt-and-braces fallback, both torn down once
  // the root is found (or the button already visible) so this never runs
  // forever on a site with genuinely no shop.
  function detectShopRoot() {
    if (document.querySelector('.kz-shop-root')) {
      cardTplBtn.style.display = '';
      return true;
    }
    return false;
  }
  if (!detectShopRoot()) {
    var shopRootPoll = setInterval(function () {
      if (detectShopRoot()) clearInterval(shopRootPoll);
    }, 250);
    if (typeof MutationObserver !== 'undefined') {
      var shopRootObserver = new MutationObserver(function () {
        if (detectShopRoot()) {
          shopRootObserver.disconnect();
          clearInterval(shopRootPoll);
        }
      });
      if (document.body) shopRootObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    // Belt-and-braces cap: stop polling after 20s so a shop-less site doesn't
    // poll forever, mirroring initDecorate()'s one-shot 800ms timeout pattern
    // but longer-lived since the catalog fetch can legitimately be slow.
    setTimeout(function () { clearInterval(shopRootPoll); }, 20000);
  }

  bar.appendChild(barMark);
  bar.appendChild(title);
  bar.appendChild(status);
  bar.appendChild(spacer);
  var fontWrap = document.createElement('span');
  fontWrap.className = 'kz-edit-fontwrap';
  fontWrap.appendChild(fontLabel);
  fontWrap.appendChild(fontSel);
  bar.appendChild(fontWrap);
  bar.appendChild(addBtn);
  bar.appendChild(cardTplBtn);
  bar.appendChild(saveBtn);
  bar.appendChild(exitBtn);

  function mountBar() {
    if (document.body) { document.body.appendChild(bar); clearFixedHeaders(); }
  }
  if (document.body) mountBar();
  else document.addEventListener('DOMContentLoaded', mountBar);

  function buildFontSelect() {
    var s = document.createElement('select');
    var def = document.createElement('option');
    def.value = '';
    def.textContent = '(default)';
    s.appendChild(def);
    for (var i = 0; i < FONTS.length; i++) {
      var o = document.createElement('option');
      o.value = FONTS[i];
      o.textContent = FONTS[i];
      s.appendChild(o);
    }
    return s;
  }

  // ---- hover outlining for tagged elements ----
  document.addEventListener('mouseenter', function (e) {
    var src = e.target;
    var el = src && src.closest ? src.closest('[data-kizuri-edit]') : null;
    if (el && !el.closest('.kz-edit-bar') && !el.closest('.kz-edit-pop')) {
      el.classList.add('kz-edit-outline');
    }
  }, true);
  document.addEventListener('mouseleave', function (e) {
    var src = e.target;
    var el = src && src.closest ? src.closest('[data-kizuri-edit]') : null;
    if (el && el.classList && el.classList.contains('kz-edit-outline')) {
      el.classList.remove('kz-edit-outline');
    }
  }, true);

  // ---- click to edit ----
  var pop = null;
  // Set by openPop whenever the current panel is an image panel with active
  // reposition state to tear down; cleared as soon as it runs. Centralized
  // here (rather than only wrapping one onClose callback) because closePop
  // itself is called from multiple places — the outside-click handler, the
  // top of openPop when switching to a different element, and the other
  // panel types' open functions (openSectionPanel/openCardPanel/
  // openCardTemplatePanel all call closePop() directly too) — every one of
  // those is a legitimate way the image panel closes and must reset any
  // stuck reposition state (grab cursor, stale listeners) the same way.
  var activeImgCleanup = null;
  function closePop() {
    if (activeImgCleanup) { activeImgCleanup(); activeImgCleanup = null; }
    if (pop) { pop.parentNode && pop.parentNode.removeChild(pop); pop = null; }
  }

  // A real browser fires a normal 'click' event whenever mousedown and
  // mouseup land on the same element — exactly what happens at the end of
  // every image-reposition drag (the user releases the mouse over the same
  // image they started dragging on). preventDefault()/stopPropagation() on
  // the drag's OWN mousedown handler does NOT suppress that trailing click
  // per the DOM spec, so it bubbles to the document-level click router
  // below, which sees the image's data-kizuri-edit and calls openPop()
  // AGAIN — rebuilding the panel and wiping buildImgFields' closures
  // (repositioning, repoStart, the dragged object-position value) the
  // instant the drag ends. Found live: every real drag attempt appeared to
  // do nothing, because the reposition state reset the moment the mouse
  // was released. Set by endImgRepoDrag right before its trailing click
  // fires; checked and cleared at the top of the click router so exactly
  // ONE click is suppressed per drag, never more.
  var suppressNextImgClick = false;

  // A decorative wrapper (e.g. a hero's text-overlay container sized
  // position:relative + h-full, with no data-kizuri-edit of its own) can
  // silently cover an editable SIBLING underneath it — closest() only
  // walks ANCESTORS, so a click there skips right past e.g. a real <img>
  // and resolves to whatever tagged ancestor (typically the section) is
  // found first, even in areas with no visible overlay content at all.
  // Found live: uploading through the misrouted section panel updated a
  // fully-hidden CSS background-image, never the actual visible photo.
  //
  // When the click's own target has no tag, scan the full paint-order
  // stack at that exact point for the first tagged element that ISN'T an
  // ancestor of the click target (an ancestor — like that same section —
  // will always appear somewhere in this stack, since the click is
  // physically inside it; excluding it explicitly, rather than trusting
  // paint order alone, is what actually routes AROUND the wrapper instead
  // of landing right back on it).
  function findFallthroughTarget(clickEl, x, y) {
    try {
      if (!document.elementsFromPoint) return null;
      var stack = document.elementsFromPoint(x, y);
      var firstTagged = null;
      var firstText = null;
      for (var i = 0; i < stack.length; i++) {
        var node = stack[i];
        if (!node.hasAttribute || !node.hasAttribute('data-kizuri-edit')) continue;
        if (clickEl.closest && clickEl !== node && node.contains(clickEl)) continue; // an ancestor of the click — not what we're looking for
        // A real photo is almost always what a merchant means to click, even
        // when a deliberately-editable decorative layer (e.g. a tint overlay
        // div, ALSO legitimately tagged) sits visually in front of it — found
        // live, a second time, on the same hero: the tint overlay's own
        // (card) panel was opening instead of the photo's. An <img> anywhere
        // in this stack wins outright, regardless of scan order — UNLESS real
        // text (a tagged, non-DIV, non-IMG element — h1-h6/p/span/li/button/a,
        // same elimination isCardTarget uses for "card") sits ABOVE that image
        // in paint order. Hero text stacked on a photo (headline over a hero
        // image, a caption over a thumbnail) is the single most common
        // editable layout on the whole platform, and the "image always wins"
        // rule made clicking that text nearly impossible — every click
        // resolved to the photo's own panel instead, even a direct click on
        // the headline itself. Scan order IS paint order here (elementsFromPoint
        // returns front-to-back), so text found before the image is text that
        // is actually in front of it, not text on some other, unrelated layer.
        if (node.tagName === 'IMG') { if (firstText) return firstText; return node; }
        if (!firstTagged) firstTagged = node;
        if (!firstText && node.tagName !== 'DIV') firstText = node;
      }
      return firstTagged;
    } catch (eFT) {}
    return null;
  }

  document.addEventListener('click', function (e) {
    if (suppressNextImgClick) { suppressNextImgClick = false; return; } // the browser's own trailing click after a reposition drag — not a real user click
    if (pendingType) return; // a block placement is pending — don't open an edit popup
    if (imgPlacementContainer) return; // image placement active — the placement handler owns clicks
    var el = e.target;
    // clicks inside our own chrome are ignored here
    if (el && el.closest && (el.closest('.kz-edit-bar') || el.closest('.kz-edit-pop') || el.closest('.kz-sec-bar') || el.closest('.kz-sec-panel') || el.closest('.kz-card-panel') || el.closest('.kz-ins-plus') || el.closest('.kz-edit-addmenu') || el.closest('.kz-edit-submenu'))) return;
    // Nav items are resolved BEFORE the data-kizuri-edit chain below: a nav
    // item click must never fall through to the generic "no target" bailout
    // just because the link itself carries no data-kizuri-edit attribute.
    var navItemEl = el && el.closest ? el.closest('[data-kizuri-nav-item]') : null;
    if (navItemEl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      openNavPanel(navItemEl);
      return;
    }
    var target = null;
    if (el && el.tagName === 'IMG' && el.hasAttribute && el.hasAttribute('data-kizuri-edit')) {
      target = el; // an <img> is already the most-preferred outcome the scan below could ever produce
    } else {
      // Even when e.target itself already carries data-kizuri-edit (e.g. a
      // tagged tint-overlay div sitting in front of the real photo), it may
      // not be the best candidate at this exact point — a stacked <img>
      // normally wins over a DIV overlay, though real TEXT (h1/p/span/etc)
      // above that image still wins over the image. Only a bare, untagged el
      // has NOTHING better to check for, but running the same scan either
      // way keeps this one path.
      target = findFallthroughTarget(el, e.clientX, e.clientY);
      if (!target && el && el.hasAttribute && el.hasAttribute('data-kizuri-edit')) target = el;
    }
    if (!target) target = el && el.closest ? el.closest('[data-kizuri-edit]') : null;
    if (!target) { closePop(); return; }
    e.preventDefault();
    // stopImmediatePropagation (not just stopPropagation): once we decide to open a
    // panel on this click, the later document-level panel-teardown listener must NOT
    // also run on the SAME click — otherwise it would tear down the panel we just
    // opened (section→card / card→section transitions in one click).
    e.stopImmediatePropagation();
    if (target.hasAttribute('data-kizuri-section')) { openSectionPanel(target); return; }
    if (isCardTarget(target)) { openCardPanel(target); return; }
    openPop(target);
  }, true);

  function isCardTarget(el) { return el && el.tagName === 'DIV' && el.hasAttribute('data-kizuri-edit') && !el.hasAttribute('data-kizuri-section'); }

  function getId(el) { return el.getAttribute('data-kizuri-edit'); }

  // Build the branded shell into pop. Returns the body element for the caller
  // to fill with its existing controls. onClose is the panel's existing
  // teardown (closePop / removeSectionPanel / removeCardPanel) — used by BOTH the
  // header ✕ and the footer Done. No Remove button: deleting lives in the ⚙ bar.
  function popShell(pop, titleText, onClose) {
    var head = document.createElement('div'); head.className = 'kz-pop-head';
    var mark = document.createElement('img'); mark.className = 'kz-pop-mark';
    mark.src = KZ_MARK; mark.alt = ''; head.appendChild(mark);
    var title = document.createElement('div'); title.className = 'kz-pop-title';
    title.textContent = titleText; head.appendChild(title);

    // Drag handle: each panel gets its OWN offset (closure-scoped, not shared
    // across panel types like secBarOffset is shared across section
    // toolbars) since a section panel and a card panel are never open
    // simultaneously but should never bleed position into one another.
    var grip = document.createElement('span');
    grip.className = 'kz-pop-grip'; grip.textContent = '⠿'; grip.title = 'Drag to move';
    var panelDragStart = null; // { mx, my, ot, ol } captured on mousedown
    function onPanelDragMove(ev) {
      if (!panelDragStart) return;
      pop.style.top = (panelDragStart.ot + (ev.clientY - panelDragStart.my)) + 'px';
      pop.style.left = (panelDragStart.ol + (ev.clientX - panelDragStart.mx)) + 'px';
      pop.style.right = '';
    }
    function endPanelDrag() {
      panelDragStart = null;
      document.removeEventListener('mousemove', onPanelDragMove, true);
      document.removeEventListener('mouseup', endPanelDrag, true);
    }
    grip.addEventListener('mousedown', function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      var r = pop.getBoundingClientRect();
      panelDragStart = { mx: ev.clientX, my: ev.clientY, ot: r.top, ol: r.left };
      document.addEventListener('mousemove', onPanelDragMove, true);
      document.addEventListener('mouseup', endPanelDrag, true);
    });
    head.appendChild(grip);

    var x = document.createElement('button'); x.className = 'kz-pop-x';
    x.type = 'button'; x.innerHTML = '&times;'; x.title = 'Close';
    x.addEventListener('click', function () { if (onClose) onClose(); });
    head.appendChild(x);
    pop.appendChild(head);

    var body = document.createElement('div'); body.className = 'kz-pop-body';
    pop.appendChild(body);

    var foot = document.createElement('div'); foot.className = 'kz-pop-foot';
    var sp = document.createElement('div'); sp.className = 'kz-pop-spacer';
    foot.appendChild(sp);
    var done = document.createElement('button'); done.className = 'kz-pop-done';
    done.type = 'button'; done.textContent = 'Done';
    done.addEventListener('click', function () { if (onClose) onClose(); });
    foot.appendChild(done);
    pop.appendChild(foot);

    return body;
  }

  // Every open*Panel function computes an initial top/left (or top/right) from
  // the trigger element's rect, but only ever clamps the MINIMUM edge (stays
  // on-screen to the top-left) — never the maximum edge. A panel triggered
  // near the right edge of a wide page, or far down a tall page, could render
  // partially or fully off-screen with no way to reach it. Called AFTER the
  // panel is appended to the DOM so offsetWidth/offsetHeight reflect its real
  // rendered size (varies by panel content).
  //
  // Three of the four panels (openSectionPanel/openCardPanel/
  // openCardTemplatePanel) force pop.style.position = 'fixed' and set
  // top/left in VIEWPORT-relative coordinates before ever appending. openPop's
  // panel, though, is the shared .kz-edit-pop base style (position: absolute)
  // and sets its top/left in DOCUMENT-relative coordinates (window.scrollY/
  // scrollX + the trigger rect). getBoundingClientRect() is ALWAYS
  // viewport-relative regardless of the element's own position CSS, so the
  // clamped left/top computed below is a viewport coordinate — for a fixed
  // panel that's exactly what style.left/top expects, but for an absolute
  // panel it must be converted back to document space (+ the current scroll
  // offset) before being written, or the panel would jump by the scroll
  // amount on any scrolled page.
  function clampPanelToViewport(pop) {
    try {
      var vw = window.innerWidth, vh = window.innerHeight;
      var w = pop.offsetWidth, h = pop.offsetHeight;
      var rect = pop.getBoundingClientRect();
      var left = rect.left, top = rect.top;
      if (left + w > vw - 8) left = vw - 8 - w;
      if (left < 8) left = 8;
      if (top + h > vh - 8) top = vh - 8 - h;
      if (top < 8) top = 8;
      // Computed style, not pop.style.position: the mobile bottom-sheet media
      // query forces .kz-edit-pop to position:fixed via !important on the
      // CSS class alone, without ever touching the inline style — checking
      // the inline value would misread openPop's panel as "absolute" on
      // mobile and take the wrong (scroll-adjusted) branch below. Same
      // "is this actually fixed" technique as clearFixedHeaders (Task 1).
      var isFixed = window.getComputedStyle(pop).position === 'fixed';
      pop.style.right = '';
      pop.style.left = (isFixed ? left : left + window.scrollX) + 'px';
      pop.style.top = (isFixed ? top : top + window.scrollY) + 'px';
    } catch (eCP) {}
  }
  // Test-only hook (mirrors window.__KIZURI_SHOP_TEST__ in shop-runtime.ts):
  // jsdom never computes real layout, so a test that wants to exercise this
  // clamp against a REALISTIC rendered size must call it explicitly after
  // stubbing offsetWidth/offsetHeight on the panel it already opened.
  if (window.__KIZURI_EDIT_TEST_HOOKS__) { window.__kizuriClampPanelForTest = clampPanelToViewport; }

  // On touch, sheets dock to the bottom - bring the edited element into the
  // visible band above the sheet so the user watches the change apply live.
  function revealForSheet(el) {
    // Live check (matches the section sheet's open-time gate) so a section
    // reordered/opened after a rotate/resize still scrolls into the band.
    if (!isTouchNow() || !el || typeof el.scrollIntoView !== 'function') return;
    try {
      var bandH = window.innerHeight * 0.38; // viewport above a max-height sheet
      var rRect = el.getBoundingClientRect();
      var targetTop = window.scrollY + rRect.top - Math.max(56, (bandH - rRect.height) / 2);
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
    catch (eSV) { el.scrollIntoView(); }
  }

  // Mobile: the top-bar status is a dot, so placement instructions need a
  // visible pill. Reuses the imgplace-hint styling.
  // Gates on the init-time flag (not a live check) to match the add-menu,
  // which is built once at init and drives every placement.
  var touchHintEl = null;
  function showTouchHint(txt) {
    if (!isTouchLayout) return;
    hideTouchHint();
    touchHintEl = document.createElement('div');
    touchHintEl.className = 'kz-imgplace-hint kz-touch-hint';
    touchHintEl.textContent = txt;
    document.body.appendChild(touchHintEl);
  }
  function hideTouchHint() {
    if (touchHintEl && touchHintEl.parentNode) touchHintEl.parentNode.removeChild(touchHintEl);
    touchHintEl = null;
  }

  function openPop(el) {
    closePop(); removeSectionPanel(); removeCardPanel(); removeCardTemplatePanel(); removeNavPanel(); // only one editor surface open
    pop = document.createElement('div');
    pop.className = 'kz-edit-pop';
    var isIcon = el.getAttribute('data-kizuri-kind') === 'icon';
    var tag = el.tagName.toLowerCase();
    var title = isIcon ? 'Edit icon' : (tag === 'img' ? 'Edit image' : (tag === 'a' ? 'Edit link' : 'Edit text'));
    var body = popShell(pop, title, closePop);
    if (isIcon) buildIconFields(body, el);
    // buildImgFields returns a cleanup that tears down any active reposition
    // state (stuck grab cursor, stale listeners). Registering it on the
    // shared activeImgCleanup means it runs no matter which path closes this
    // panel — closePop() itself now runs it unconditionally.
    else if (tag === 'img') activeImgCleanup = buildImgFields(body, el);
    else if (tag === 'a') buildLinkFields(body, el);
    else buildTextFields(body, el);

    document.body.appendChild(pop);
    revealForSheet(el);
    var r = el.getBoundingClientRect();
    var top = window.scrollY + r.bottom + 8;
    var left = window.scrollX + r.left;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    // clampPanelToViewport recomputes left/top below using the panel's REAL
    // offsetWidth/offsetHeight and an 8px margin, so it always has the final
    // say — no need for a second, hardcoded-300/310/4 guess here first.
    clampPanelToViewport(pop);
  }

  function field(parent, labelText, control) {
    var l = document.createElement('label');
    l.textContent = labelText;
    parent.appendChild(l);
    parent.appendChild(control);
    return control;
  }

  function buildImgFields(parent, el) {
    var id = getId(el);
    var url = document.createElement('input');
    url.type = 'text';
    url.value = el.getAttribute('src') || '';
    field(parent, 'Image URL', url);
    url.addEventListener('input', function () {
      el.setAttribute('src', url.value);
      setEdit(id, 'src', url.value);
    });

    var file = document.createElement('input');
    file.type = 'file';
    file.accept = 'image/*';
    field(parent, 'Upload image', file);
    file.addEventListener('change', function () {
      if (!file.files || !file.files[0]) return;
      var fd = new FormData();
      fd.append('file', file.files[0]);
      var headers = {};
      headers['X-Kizuri-Edit-Token'] = ctx.token;
      fetch(ctx.editsUrl + '/upload', { method: 'POST', headers: headers, body: fd })
        .then(function (r) { if (!r.ok) throw new Error('upload'); return r.json(); })
        .then(function (data) {
          el.setAttribute('src', data.url);
          url.value = data.url;
          setEdit(id, 'src', data.url);
        })
        .catch(function () { alert('Upload failed'); });
    });

    var alt = document.createElement('input');
    alt.type = 'text';
    alt.value = el.getAttribute('alt') || '';
    field(parent, 'Alt text', alt);
    alt.addEventListener('input', function () { setEdit(id, 'alt', alt.value); });

    var wRow = document.createElement('div');
    field(parent, 'Width', wRow);
    var wNum = document.createElement('input'); wNum.type = 'number'; wNum.min = '0'; wNum.style.width = '70px';
    var wUnit = document.createElement('select');
    var uPct = document.createElement('option'); uPct.value = '%'; uPct.textContent = '%';
    var uPx = document.createElement('option'); uPx.value = 'px'; uPx.textContent = 'px';
    wUnit.appendChild(uPct); wUnit.appendChild(uPx);
    var storedW = (diff[id] && diff[id].imgWidth) || '';
    if (storedW) { var mw = String(storedW).match(/^(\d+)(px|%)$/); if (mw) { wNum.value = mw[1]; wUnit.value = mw[2]; } }
    function pushWidth() { if (wNum.value === '') return; var w = wNum.value + wUnit.value; el.style.width = w; el.style.maxWidth = '100%'; setEdit(id, 'imgWidth', w); }
    wNum.addEventListener('input', pushWidth);
    wUnit.addEventListener('change', pushWidth);
    wRow.appendChild(wNum); wRow.appendChild(wUnit);

    var aRow = document.createElement('div');
    field(parent, 'Alignment', aRow);
    function alignBtn(labelText, val) {
      var b = document.createElement('button'); b.textContent = labelText; b.style.marginRight = '6px';
      b.addEventListener('click', function () {
        el.style.display = 'block';
        if (val === 'center') { el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; }
        else if (val === 'right') { el.style.marginLeft = 'auto'; el.style.marginRight = '0'; }
        else { el.style.marginLeft = '0'; el.style.marginRight = 'auto'; }
        setEdit(id, 'imgAlign', val);
      });
      return b;
    }
    aRow.appendChild(alignBtn('Left', 'left'));
    aRow.appendChild(alignBtn('Center', 'center'));
    aRow.appendChild(alignBtn('Right', 'right'));

    // ---- reposition (object-position) ----
    // Fine-tunes which part of the image shows within its fixed frame — e.g. a
    // portrait photo cropped into a square card where the subject is cut off.
    // Only meaningful once the element has real object-fit cropping in play,
    // but harmless to offer regardless (object-position no-ops without
    // object-fit: cover/contain forcing a crop).
    var repoRow = document.createElement('div'); repoRow.style.marginTop = '10px';
    var repoBtn = document.createElement('button'); repoBtn.type = 'button'; repoBtn.textContent = 'Reposition image';
    var repoHint = document.createElement('span'); repoHint.style.marginLeft = '8px'; repoHint.style.opacity = '.7'; repoHint.style.display = 'none';
    repoHint.textContent = 'Drag on the image, then click here again to finish';
    var repositioning = false;
    var storedPos = (diff[id] && diff[id].objectPosition) || '';
    if (storedPos) el.style.objectPosition = storedPos;
    var repoStart = null; // { mx, my, ox, oy } in percent, captured on mousedown
    function parsePct(v, fallback) {
      var m = String(v || '').match(/^(-?d+(?:.d+)?)%/);
      return m ? parseFloat(m[1]) : fallback;
    }
    function currentPosPct() {
      var cur = el.style.objectPosition || window.getComputedStyle(el).objectPosition || '50% 50%';
      var parts = cur.split(' ');
      return { x: parsePct(parts[0], 50), y: parsePct(parts[1], 50) };
    }
    function onImgRepoMove(ev) {
      if (!repoStart) return;
      ev.preventDefault();
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      // Dragging the cursor RIGHT should reveal more of the image's LEFT side
      // (panning), which is the OPPOSITE sign of a naive coordinate mapping —
      // subtract the delta, not add it.
      var dxPct = ((ev.clientX - repoStart.mx) / r.width) * 100;
      var dyPct = ((ev.clientY - repoStart.my) / r.height) * 100;
      var nx = Math.max(0, Math.min(100, repoStart.ox - dxPct));
      var ny = Math.max(0, Math.min(100, repoStart.oy - dyPct));
      el.style.objectPosition = nx.toFixed(1) + '% ' + ny.toFixed(1) + '%';
    }
    function endImgRepoDrag() {
      repoStart = null;
      document.removeEventListener('mousemove', onImgRepoMove, true);
      document.removeEventListener('mouseup', endImgRepoDrag, true);
      document.body.style.userSelect = prevBodyUserSelect;
      if (repositioning) setEdit(id, 'objectPosition', el.style.objectPosition);
      // The browser's own trailing 'click' (mousedown+mouseup on the same
      // element) fires right after this mouseup handler returns — set the
      // flag now so the click router skips exactly that one click.
      suppressNextImgClick = true;
    }
    // Reported live: a real physical mouse drag across the photo triggered
    // the browser's native text-SELECTION gesture (highlighting nearby
    // captions/headlines) instead of panning — preventDefault() on
    // mousedown alone does not suppress selection that begins as the
    // cursor sweeps across text nodes during mousemove. Explicitly
    // disabling user-select on body for the drag's duration (restored on
    // end) is the standard fix for this class of drag-vs-selection
    // conflict; the small existing drag grips elsewhere in this file
    // (.kz-pop-grip, .kz-sec-grip) never hit this because they're tiny
    // dedicated handles with no text nearby to sweep across — this drag
    // spans the whole photo, which real content is often laid out next to.
    var prevBodyUserSelect = '';
    // Reported live: a hero's tint-overlay div (a real, separately-editable
    // sibling, ALSO absolute inset-0) paints IN FRONT of the <img>. A
    // mousedown bound directly on el (as this used to be) never fires,
    // because a real physical mousedown at any point over the visible photo
    // actually lands on the overlay, not the image beneath it — the same
    // fallthrough problem already solved for the click router, but
    // mousedown had no equivalent scan at all. Bind on document instead and
    // resolve the real click point the same way: elementsFromPoint, only
    // starting the drag if THIS image is the one found there (or is/­
    // contains e.target directly, for jsdom/browsers without
    // elementsFromPoint or the simple no-overlay case).
    function pointIsOnThisImage(ev) {
      if (el === ev.target || (el.contains && ev.target && el.contains(ev.target))) return true;
      try {
        if (!document.elementsFromPoint) return false;
        var stack = document.elementsFromPoint(ev.clientX, ev.clientY);
        for (var k = 0; k < stack.length; k++) {
          if (stack[k] === el) return true;
          // Anything ELSE tagged and not this image (e.g. another photo, a
          // button) painted above el at this point means the click is
          // genuinely meant for that element, not a pass-through to us.
          if (stack[k].hasAttribute && stack[k].hasAttribute('data-kizuri-edit') && stack[k].tagName === 'IMG') return false;
        }
      } catch (ePI) {}
      return false;
    }
    function onImgMouseDownForReposition(ev) {
      if (!repositioning) return;
      if (!pointIsOnThisImage(ev)) return;
      ev.preventDefault(); ev.stopPropagation();
      var startPos = currentPosPct();
      repoStart = { mx: ev.clientX, my: ev.clientY, ox: startPos.x, oy: startPos.y };
      prevBodyUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onImgRepoMove, true);
      document.addEventListener('mouseup', endImgRepoDrag, true);
    }
    // el is the PERSISTENT live <img> — it is never recreated across panel
    // opens, only buildImgFields' local closures are. Without dedup, every
    // reopen of this same image's panel (a normal workflow while tuning
    // width/alignment/reposition) would stack another permanent document
    // listener for the life of the page. Store the current handler on the
    // element itself so the next open can find and remove the stale one
    // before attaching its own fresh closure. Bound on document (capture)
    // rather than el directly — see pointIsOnThisImage above.
    if (el.__kzRepoHandler) document.removeEventListener('mousedown', el.__kzRepoHandler, true);
    el.__kzRepoHandler = onImgMouseDownForReposition;
    document.addEventListener('mousedown', onImgMouseDownForReposition, true);
    repoBtn.addEventListener('click', function () {
      repositioning = !repositioning;
      el.style.cursor = repositioning ? 'grab' : '';
      repoHint.style.display = repositioning ? '' : 'none';
      repoBtn.textContent = repositioning ? 'Done repositioning' : 'Reposition image';
    });
    repoRow.appendChild(repoBtn); repoRow.appendChild(repoHint); parent.appendChild(repoRow);

    // Called when the panel closes (✕, Done, or opening a different
    // element's panel) via openPop's wrapped onClose below. If the user
    // toggled "Reposition image" on and then closed the panel WITHOUT
    // toggling it back off first, nothing else resets repositioning/cursor —
    // leaving the image with a permanently stuck grab cursor, and the next
    // plain click on it would wrongly hijack into onImgMouseDownForReposition
    // (preventDefault/stopPropagation + a phantom drag) instead of just
    // reopening the edit panel.
    function cleanupImgReposition() {
      repositioning = false;
      el.style.cursor = '';
      document.removeEventListener('mousemove', onImgRepoMove, true);
      document.removeEventListener('mouseup', endImgRepoDrag, true);
      repoStart = null;
    }
    return cleanupImgReposition;
  }

  function buildLinkFields(parent, el) {
    var id = getId(el);
    var href = document.createElement('input');
    href.type = 'text';
    href.value = el.getAttribute('href') || '';
    field(parent, 'Link URL', href);
    href.addEventListener('input', function () {
      el.setAttribute('href', href.value);
      setEdit(id, 'href', href.value);
    });

    var txt = document.createElement('input');
    txt.type = 'text';
    txt.value = el.textContent || '';
    field(parent, 'Link text', txt);
    txt.addEventListener('input', function () {
      el.textContent = txt.value;
      setEdit(id, 'text', txt.value);
    });
  }

  // rgb(r, g, b) -> #rrggbb ; returns null if it cannot parse
  function rgbToHex(rgb) {
    var m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(rgb || '');
    if (!m) return null;
    function h(n) { var s = Number(n).toString(16); return s.length === 1 ? '0' + s : s; }
    return '#' + h(m[1]) + h(m[2]) + h(m[3]);
  }

  function buildTextFields(parent, el) {
    var id = getId(el);
    var cs = window.getComputedStyle(el);
    var txt = document.createElement('textarea');
    txt.value = el.textContent || '';
    field(parent, 'Text', txt);
    txt.addEventListener('input', function () {
      el.textContent = txt.value;
      setEdit(id, 'text', txt.value);
    });

    var fontSel2 = buildFontSelect();
    field(parent, 'Font', fontSel2);
    fontSel2.addEventListener('change', function () {
      var v = fontSel2.value;
      el.style.fontFamily = v ? ("'" + v + "', sans-serif") : '';
      setEdit(id, 'fontFamily', v);
    });

    var size = document.createElement('input');
    size.type = 'number';
    var curSize = parseInt(cs.fontSize, 10);
    if (!isNaN(curSize)) size.value = String(curSize);
    field(parent, 'Size (px)', size);
    size.addEventListener('input', function () {
      if (size.value === '') return;
      el.style.fontSize = size.value + 'px';
      setEdit(id, 'fontSize', size.value + 'px');
    });

    var weight = document.createElement('select');
    var weights = ['300', '400', '500', '600', '700'];
    for (var i = 0; i < weights.length; i++) {
      var o = document.createElement('option');
      o.value = weights[i];
      o.textContent = weights[i];
      weight.appendChild(o);
    }
    weight.value = '400';
    var curWeight = String(cs.fontWeight);
    if (weights.indexOf(curWeight) !== -1) weight.value = curWeight;
    field(parent, 'Weight', weight);
    weight.addEventListener('change', function () {
      el.style.fontWeight = weight.value;
      setEdit(id, 'fontWeight', weight.value);
    });

    var color = document.createElement('input');
    color.type = 'color';
    var curColor = rgbToHex(cs.color);
    if (curColor) color.value = curColor;
    field(parent, 'Color', color);
    color.addEventListener('input', function () {
      el.style.color = color.value;
      setEdit(id, 'color', color.value);
    });
  }

  // Note: a tagged icon's JSX may also carry a Tailwind sizing className (e.g.
  // h-4 w-4) alongside its width/height attributes. Tailwind's CSS width/height
  // utilities can override these SVG presentation attributes at render time, so
  // the Size field below may appear to do nothing on some icons. Known/accepted
  // limitation for this round - not addressed here.
  function buildIconFields(parent, el) {
    var id = getId(el);
    var cs = window.getComputedStyle(el);

    var size = document.createElement('input');
    size.type = 'number';
    size.min = '8';
    var curW = parseInt(el.getAttribute('width'), 10);
    if (!isNaN(curW)) size.value = String(curW);
    field(parent, 'Size (px)', size);
    size.addEventListener('input', function () {
      if (size.value === '') return;
      el.setAttribute('width', size.value);
      el.setAttribute('height', size.value);
      setEdit(id, 'iconSize', size.value);
    });

    var color = document.createElement('input');
    color.type = 'color';
    var curColor = rgbToHex(cs.color);
    if (curColor) color.value = curColor;
    field(parent, 'Color', color);
    color.addEventListener('input', function () {
      el.style.color = color.value;
      setEdit(id, 'color', color.value);
    });
  }

  // ---- + Add shop-block flow (insert / remove) ----
  // Inserts are accumulated under the reserved diff._inserts key and saved with
  // the rest of the doc by save() (unchanged). _inserts already rides along on
  // the cumulative seed above (it's a top-level key copied by the for..in loop).
  function escAttrText(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // The public storefront catalog endpoint, derived from the (also public) edits
  // url. No auth header — it's the public endpoint (must NOT send a token).
  var storefrontUrl = ctx.editsUrl ? ctx.editsUrl.replace('/api/site-edit/', '/api/storefront/') : '';

  var pendingType = null;   // 'product-grid' | 'product' while placing
  var pendingProductId = null; // chosen product for a single-product insert
  var pendingGap = null; // { anchorId, position } while inserting via an inline +
  var gapForProduct = null; // gap captured for a single-product insert that must survive the product picker

  // --- the "+ Add" menu ---
  var addMenu = document.createElement('div');
  addMenu.className = 'kz-edit-addmenu';
  addMenu.style.display = 'none';
  addMenu.innerHTML = '<div class="kz-edit-addmenu-group">Shop</div>'
    + '<button data-add="product-grid">Product grid</button>'
    + '<button data-add="product">Single product</button>'
    + '<div class="kz-edit-addmenu-group">Sections</div>'
    + '<button data-family="hero">Hero</button><button data-family="testimonials">Testimonials</button><button data-family="pricing">Pricing</button><button data-family="columns">Columns</button>';
  if (document.body) document.body.appendChild(addMenu);
  else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(addMenu); });

  var familyBtns = addMenu.querySelectorAll('button[data-family]');
  for (var fi = 0; fi < familyBtns.length; fi++) {
    // Columns need per-cell hover targeting to be useful - desktop only.
    if (isTouchLayout && familyBtns[fi].getAttribute('data-family') === 'columns') { if (familyBtns[fi].parentNode) familyBtns[fi].parentNode.removeChild(familyBtns[fi]); continue; }
    (function (fb) {
      var fam = null;
      for (var fj = 0; fj < SECTION_FAMILIES.length; fj++) { if (SECTION_FAMILIES[fj].family === fb.getAttribute('data-family')) { fam = SECTION_FAMILIES[fj]; break; } }
      if (!fam) return;
      fb.addEventListener('click', function (ev) {
        ev.stopPropagation();
        // Touch: no variants submenu - a tap inserts the family's default
        // (first) variant via the same commit/placement path a variant pick runs.
        if (isTouchLayout || fam.variants.length === 1) {
          if (pendingGap) { commitInsert(fam.variants[0].key, pendingGap.anchorId, pendingGap.position); pendingGap = null; closeAddMenu(); }
          else { closeAddMenu(); enterPlacement(fam.variants[0].key); }
        } else { openSectionSubmenu(fam, fb); }
      });
    })(familyBtns[fi]);
  }
  if (isTouchLayout) {
    var noteEl = document.createElement('div');
    noteEl.className = 'kz-edit-addmenu-note';
    noteEl.textContent = 'More layouts on desktop';
    addMenu.appendChild(noteEl);
  }

  var sectionSubmenu = null;
  function closeSectionSubmenu() { if (sectionSubmenu && sectionSubmenu.parentNode) sectionSubmenu.parentNode.removeChild(sectionSubmenu); sectionSubmenu = null; }
  function openSectionSubmenu(fam, anchorBtn) {
    closeSectionSubmenu();
    var sm = document.createElement('div');
    sm.className = 'kz-edit-addmenu kz-edit-submenu';
    for (var i = 0; i < fam.variants.length; i++) {
      (function (v) {
        var b = document.createElement('button');
        b.setAttribute('data-add', v.key);
        b.textContent = v.variant;
        b.addEventListener('click', function (ev) {
          ev.stopPropagation(); closeSectionSubmenu();
          if (pendingGap) { commitInsert(v.key, pendingGap.anchorId, pendingGap.position); pendingGap = null; closeAddMenu(); }
          else { closeAddMenu(); enterPlacement(v.key); }
        });
        sm.appendChild(b);
      })(fam.variants[i]);
    }
    var r = anchorBtn.getBoundingClientRect();
    sm.style.position = 'fixed';
    sm.style.top = r.top + 'px';
    sm.style.left = (r.right + 4) + 'px';
    document.body.appendChild(sm);
    sectionSubmenu = sm;
  }

  function closeAddMenu() { addMenu.style.display = 'none'; closeSectionSubmenu(); pendingGap = null; }
  function positionUnder(el, ref) {
    var r = ref.getBoundingClientRect();
    el.style.left = Math.max(4, r.left) + 'px';
  }
  // Opens the same family->layout menu, but anchored to an inline-+ gap so the
  // eventual family/variant pick commits directly at that gap (see commitInsert)
  // instead of entering click-to-place.
  function openInsertMenuAtGap(gap, anchorEl) {
    pendingGap = gap;
    removePicker();
    closeSectionSubmenu();
    var r = anchorEl.getBoundingClientRect();
    addMenu.style.left = Math.max(4, r.left - 70) + 'px';
    addMenu.style.top = (r.bottom + 6) + 'px';
    addMenu.style.display = 'block';
  }

  addBtn.addEventListener('click', function () {
    removePicker();
    if (addMenu.style.display === 'none') {
      pendingGap = null;
      positionUnder(addMenu, addBtn);
      addMenu.style.display = 'block';
    } else {
      closeAddMenu();
    }
  });

  function paintDropTargets(on) {
    // Transient, edit-mode-only highlight. Clearing sets style.outline='' which
    // wipes any author inline outline on a tagged element — acceptable: save()
    // serialises the in-memory diff, never the DOM, so this never persists.
    var els = document.querySelectorAll('[data-kizuri-edit]');
    for (var i = 0; i < els.length; i++) {
      if (on) { els[i].classList.add('kz-edit-droptarget'); els[i].style.outline = '2px dashed #19468b'; els[i].style.outlineOffset = '-2px'; }
      else { els[i].classList.remove('kz-edit-droptarget'); els[i].style.outline = ''; els[i].style.outlineOffset = ''; }
    }
  }
  function enterPlacement(type) {
    pendingType = type;
    var placeMsg = 'Click a highlighted section to place the ' + type.replace('-', ' ');
    status.textContent = placeMsg;
    showTouchHint(placeMsg);
    paintDropTargets(true);
  }
  function endPlacement() {
    pendingType = null;
    pendingProductId = null;
    paintDropTargets(false);
    status.textContent = '';
    hideTouchHint();
  }

  var imgPlacementContainer = null;   // the container el we're placing an image into
  var pendingImgTarget = null;        // { id, position } computed by mousemove (next task)
  var imgDim = null, imgSpot = null, imgHint = null, imgLine = null;

  function enterImagePlacement(containerEl) {
    if (!containerEl) return;
    // Touch: no hover means no placement mode. Insert at the end of the
    // container - the placeholder invites a tap, which opens its edit sheet.
    if (isTouchLayout) {
      var cidTouch = containerEl.getAttribute('data-kizuri-edit');
      if (cidTouch) commitInsert('image', cidTouch, 'append-child');
      return;
    }
    var anchors = containerEl.querySelectorAll('[data-kizuri-edit]');
    if (!anchors || !anchors.length) {
      var cid = containerEl.getAttribute('data-kizuri-edit');
      if (cid) commitInsert('image', cid, 'append-child');
      return;
    }
    imgPlacementContainer = containerEl;
    pendingImgTarget = null;
    imgDim = document.createElement('div'); imgDim.className = 'kz-imgplace-dim';
    document.body.appendChild(imgDim);
    imgSpot = document.createElement('div'); imgSpot.className = 'kz-imgplace-spot';
    positionSpot(containerEl);
    document.body.appendChild(imgSpot);
    imgHint = document.createElement('div'); imgHint.className = 'kz-imgplace-hint';
    imgHint.textContent = 'Click where the image should go · Esc to cancel';
    document.body.appendChild(imgHint);
    imgLine = document.createElement('div'); imgLine.className = 'kz-imgplace-line';
    imgLine.style.display = 'none';
    document.body.appendChild(imgLine);
    // keep the spotlight aligned if the page scrolls/resizes mid-placement
    window.addEventListener('scroll', imgPlacementScroll, true);
    window.addEventListener('resize', imgPlacementScroll, true);
  }

  function imgPlacementScroll() { if (imgPlacementContainer) positionSpot(imgPlacementContainer); }

  function positionSpot(el) {
    if (!imgSpot) return;
    var r = el.getBoundingClientRect();
    imgSpot.style.top = r.top + 'px'; imgSpot.style.left = r.left + 'px';
    imgSpot.style.width = r.width + 'px'; imgSpot.style.height = r.height + 'px';
  }

  function endImagePlacement() {
    imgPlacementContainer = null; pendingImgTarget = null;
    window.removeEventListener('scroll', imgPlacementScroll, true);
    window.removeEventListener('resize', imgPlacementScroll, true);
    if (imgDim && imgDim.parentNode) imgDim.parentNode.removeChild(imgDim); imgDim = null;
    if (imgSpot && imgSpot.parentNode) imgSpot.parentNode.removeChild(imgSpot); imgSpot = null;
    if (imgHint && imgHint.parentNode) imgHint.parentNode.removeChild(imgHint); imgHint = null;
    if (imgLine && imgLine.parentNode) imgLine.parentNode.removeChild(imgLine); imgLine = null;
  }

  function imgPlacementMove(e) {
    if (!imgPlacementContainer || !imgLine) return;
    var t = document.elementFromPoint(e.clientX, e.clientY);
    var target = t && t.closest ? t.closest('[data-kizuri-edit]') : null;
    if (!target || target === imgPlacementContainer || !imgPlacementContainer.contains(target)) {
      imgLine.style.display = 'none'; pendingImgTarget = null; return;
    }
    var r = target.getBoundingClientRect();
    var prev = target.previousElementSibling;
    var row = true;
    if (prev) { var pr = prev.getBoundingClientRect(); row = Math.abs(r.left - pr.left) >= Math.abs(r.top - pr.top); }
    var before;
    if (row) { before = (e.clientX < r.left + r.width / 2); }
    else { before = (e.clientY < r.top + r.height / 2); }
    pendingImgTarget = { id: target.getAttribute('data-kizuri-edit'), position: before ? 'before' : 'after' };
    imgLine.style.display = 'block';
    if (row) {
      var x = before ? r.left : r.right;
      imgLine.style.left = (x - 1) + 'px'; imgLine.style.top = r.top + 'px';
      imgLine.style.width = '3px'; imgLine.style.height = r.height + 'px';
    } else {
      var y = before ? r.top : r.bottom;
      imgLine.style.top = (y - 1) + 'px'; imgLine.style.left = r.left + 'px';
      imgLine.style.height = '3px'; imgLine.style.width = r.width + 'px';
    }
  }
  document.addEventListener('mousemove', imgPlacementMove, true);

  document.addEventListener('click', function (e) {
    if (!imgPlacementContainer) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var t = e.target;
    if (!t || !imgPlacementContainer.contains(t)) { endImagePlacement(); return; }
    if (pendingImgTarget) {
      commitInsert('image', pendingImgTarget.id, pendingImgTarget.position);
      endImagePlacement();
    }
  }, true);

  var addBtns = addMenu.querySelectorAll('button[data-add]');
  for (var ai = 0; ai < addBtns.length; ai++) {
    addBtns[ai].addEventListener('click', function () {
      var type = this.getAttribute('data-add');
      // Capture the gap BEFORE closeAddMenu() nulls pendingGap — so a shop block
      // (product-grid / single-product) opened from an inline + also drops at the
      // gap, not via click-to-place. For 'product' the gap must survive the product
      // picker, so stash it in gapForProduct (consumed when a product is chosen).
      var gap = pendingGap;
      closeAddMenu();
      if (type === 'product') {
        pendingProductId = null;
        gapForProduct = gap; // may be null (top "+ Add" path) → normal click-to-place
        openProductPicker();
      } else if (gap) {
        // product-grid at the gap → commit immediately
        commitInsert(type, gap.anchorId, gap.position);
      } else {
        pendingProductId = null;
        enterPlacement(type); // 'product-grid' or a section-block key (click-to-place)
      }
    });
  }

  // --- single-product: pick a product first, THEN place it ---
  var picker = null;
  function removePicker() { if (picker) { picker.parentNode && picker.parentNode.removeChild(picker); picker = null; } }

  function openProductPicker() {
    removePicker();
    if (!storefrontUrl) { promptProductFallback(); return; }
    fetch(storefrontUrl, { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var products = data && data.products ? data.products : [];
        if (!products.length) { promptProductFallback(); return; }
        buildProductPicker(products);
      })
      .catch(function () { promptProductFallback(); });
  }

  function buildProductPicker(products) {
    removePicker();
    picker = document.createElement('div');
    picker.className = 'kz-edit-picker';
    var head = document.createElement('div');
    head.className = 'kz-edit-picker-head';
    head.textContent = 'Choose a product';
    picker.appendChild(head);
    for (var i = 0; i < products.length; i++) {
      (function (p) {
        var vs = p.variants || [];
        var price = '';
        if (vs.length) {
          var min = vs[0].price_cents;
          for (var k = 1; k < vs.length; k++) { if (vs[k].price_cents < min) min = vs[k].price_cents; }
          price = 'R' + (min / 100).toFixed(2);
        }
        var b = document.createElement('button');
        b.innerHTML = '<span>' + escAttrText(p.name) + '</span> <span class="kz-edit-picker-price">' + escAttrText(price) + '</span>';
        b.addEventListener('click', function () {
          removePicker();
          if (gapForProduct) { commitInsert('product', gapForProduct.anchorId, gapForProduct.position, p.id); gapForProduct = null; }
          else { pendingProductId = p.id; enterPlacement('product'); }
        });
        picker.appendChild(b);
      })(products[i]);
    }
    positionUnder(picker, addBtn);
    document.body.appendChild(picker);
  }

  function promptProductFallback() {
    var pid = window.prompt('Product ID to feature:');
    if (!pid) { gapForProduct = null; endPlacement(); return; }
    if (gapForProduct) { commitInsert('product', gapForProduct.anchorId, gapForProduct.position, pid); gapForProduct = null; }
    else { pendingProductId = pid; enterPlacement('product'); }
  }

  // Shared commit for an insert — used by BOTH the click-to-place flow and (later)
  // the inline hover-insert. Builds the InsertEntry, renders the mount, and places
  // it relative to the anchor honoring position (before/after/append-child),
  // mirroring applyInserts so the editor preview matches the published replay.
  function commitInsert(type, anchorId, position, productId) {
    var anchor = document.querySelector('[data-kizuri-edit="' + anchorId.replace(/["\\]/g, '\\$&') + '"]');
    if (!anchor) return null;
    var insId = 'ins_' + Date.now().toString(36) + '_' + (window.__kizuriInsertN = (window.__kizuriInsertN || 0) + 1);
    var entry = { id: insId, type: type, anchorId: anchorId, position: position || 'after' };
    if (type === 'product' && productId) entry.productId = productId;

    diff._inserts = diff._inserts || [];
    diff._inserts.push(entry);

    var block = document.createElement('div');
    block.setAttribute('data-kizuri-shop', entry.type);
    block.setAttribute('data-kizuri-insert', entry.id);
    var isImg = entry.type === 'image';
    var isSec = isSectionType(entry.type);
    if (isImg) {
      block.innerHTML = renderImageInsertJs(entry.id);
    } else if (isSec) {
      block.setAttribute('data-kizuri-section-block', entry.type);
      block.innerHTML = renderSectionBlockJs(entry.type, entry.id);
    } else if (entry.productId) {
      block.setAttribute('data-product', entry.productId);
    }
    if (entry.position === 'append-child') {
      anchor.appendChild(block);
    } else if (entry.position === 'before') {
      if (anchor.parentNode) anchor.parentNode.insertBefore(block, anchor);
    } else {
      if (anchor.parentNode) anchor.parentNode.insertBefore(block, anchor.nextSibling);
    }
    if (!isImg && !isSec && window.__kizuriShop) window.__kizuriShop.renderInto(block);
    decorateInsertedBlocks();
    dirty = true;
    markDirty();
    return entry;
  }

  // --- placement: next click on a tagged element commits the insert ---
  document.addEventListener('click', function (e) {
    if (!pendingType) return;
    var src = e.target;
    if (src && src.closest && (src.closest('.kz-edit-bar') || src.closest('.kz-edit-addmenu') || src.closest('.kz-edit-picker') || src.closest('.kz-edit-pop'))) return;
    var anchor = src && src.closest ? src.closest('[data-kizuri-edit]') : null;
    if (!anchor) {
      // missed: keep placing, tell the user where clicks are accepted
      var missMsg = 'Click directly on a highlighted section';
      status.textContent = missMsg;
      showTouchHint(missMsg);
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    // Capture pendingType/pendingProductId BEFORE endPlacement (which nulls them),
    // and run endPlacement BEFORE commitInsert — endPlacement clears the status,
    // so commitInsert's markDirty() then leaves "Unsaved changes" (old order).
    var placeType = pendingType, placeProductId = pendingProductId;
    endPlacement();
    commitInsert(placeType, anchor.getAttribute('data-kizuri-edit'), 'after', placeProductId);
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pendingType) { endPlacement(); }
  });

  // --- add an explicit "remove block" affordance to every inserted block ---
  // Runs on init (covers blocks replayed by the shop runtime from _inserts) and
  // again right after each insert. Idempotent: never adds a second control.
  function decorateInsertedBlocks() {
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    var blocks = document.querySelectorAll('[data-kizuri-insert]');
    for (var i = 0; i < blocks.length; i++) {
      var blk = blocks[i];
      if (blk.querySelector && blk.querySelector(':scope > .kz-edit-removeblock')) continue;
      // fallback for engines without :scope — check direct children only
      var has = false;
      for (var c = 0; c < blk.children.length; c++) {
        if (blk.children[c].className && String(blk.children[c].className).indexOf('kz-edit-removeblock') !== -1) { has = true; break; }
      }
      if (has) continue;
      var btn = document.createElement('button');
      btn.className = 'kz-edit-removeblock';
      btn.setAttribute('data-removes', blk.getAttribute('data-kizuri-insert'));
      btn.textContent = '\u00d7 Remove block';
      blk.appendChild(btn);
    }
  }

  // --- remove an inserted shop block (ONLY via the explicit control) ---
  document.addEventListener('click', function (e) {
    var src = e.target;
    var ctrl = src && src.closest ? src.closest('.kz-edit-removeblock') : null;
    if (!ctrl) return; // not the remove control — let the block's own children handle the click
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!window.confirm('Remove this block?')) return;
    var id = ctrl.getAttribute('data-removes');
    diff._inserts = (diff._inserts || []).filter(function (x) { return x.id !== id; });
    var blk = ctrl.closest ? ctrl.closest('[data-kizuri-insert]') : null;
    // A section block carries a data-kizuri-section inside the removed wrapper.
    // Drop any structural ops (move/delete/duplicate) targeting those section ids
    // (and their ~dup derivatives) so we don't leave dead ops in _sections pointing
    // at nodes that no longer exist.
    if (blk && diff._sections && diff._sections.length) {
      var goneIds = {};
      var secs = blk.querySelectorAll('[data-kizuri-section]');
      for (var si = 0; si < secs.length; si++) { goneIds[secs[si].getAttribute('data-kizuri-section')] = true; }
      diff._sections = diff._sections.filter(function (op) {
        function dead(v) { if (!v) return false; for (var g in goneIds) { if (goneIds.hasOwnProperty(g) && (v === g || v.indexOf(g + '~dup') === 0)) return true; } return false; }
        return !dead(op.target) && !dead(op.before);
      });
    }
    if (blk && blk.parentNode) blk.parentNode.removeChild(blk);
    dirty = true;
    markDirty();
  }, true);

  // Decorate any blocks the shop runtime replayed on this fresh edit-mode load.
  // A MutationObserver catches late renders; a one-shot timeout covers the
  // common case where the runtime renders synchronously on DOMContentLoaded.
  function initDecorate() {
    decorateInsertedBlocks();
    if (typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(function () { decorateInsertedBlocks(); });
      if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    }
    setTimeout(decorateInsertedBlocks, 800);
  }
  if (document.body) initDecorate();
  else document.addEventListener('DOMContentLoaded', initDecorate);

  // ---- structural section editing (reorder / duplicate / delete) ----
  // Mutates diff._sections (persisted via the same PATCH save flow) AND performs
  // the DOM op immediately for instant feedback, mirroring how setEdit applies
  // property changes inline. Ops are keyed by data-kizuri-section ids.
  function sectionOps() { if (!diff._sections) diff._sections = []; return diff._sections; }
  function pushSectionOp(op) { sectionOps().push(op); dirty = true; markDirty(); }
  function secEl(id) { return document.querySelector('[data-kizuri-section="' + id.replace(/["\\]/g, '\\$&') + '"]'); }
  function orderedSections() {
    var out = [], all = document.querySelectorAll('[data-kizuri-section]');
    for (var i = 0; i < all.length; i++) { if (all[i].style.display !== 'none') out.push(all[i]); }
    return out;
  }

  function doMoveUp(el) {
    var list = orderedSections(), idx = list.indexOf(el);
    if (idx <= 0) return;
    var prev = list[idx - 1];
    el.parentNode.insertBefore(el, prev);
    pushSectionOp({ type: 'move', target: el.getAttribute('data-kizuri-section'), before: prev.getAttribute('data-kizuri-section') });
  }
  function doMoveDown(el) {
    var list = orderedSections(), idx = list.indexOf(el);
    if (idx < 0 || idx >= list.length - 1) return;
    var next = list[idx + 1], after = list[idx + 2] || null;
    if (after) el.parentNode.insertBefore(el, after); else el.parentNode.appendChild(el);
    pushSectionOp({ type: 'move', target: el.getAttribute('data-kizuri-section'), before: after ? after.getAttribute('data-kizuri-section') : null });
  }
  function doDelete(el) {
    el.style.display = 'none';
    pushSectionOp({ type: 'delete', target: el.getAttribute('data-kizuri-section') });
    closeSectionBar();
  }
  function doDuplicate(el) {
    var target = el.getAttribute('data-kizuri-section');
    // Stamp a STABLE id on the op (same collision-resistant style as insert ids) and
    // key the clone off it. Deriving from array position would break if _sections is
    // later pruned/reordered (indices shift → the runtime would recreate the clone
    // under a different id and orphan any edits keyed to the old one).
    var dupId = target + '~dup' + Date.now().toString(36) + '_' + (window.__kizuriDupN = (window.__kizuriDupN || 0) + 1);
    var clone = el.cloneNode(true);
    clone.setAttribute('data-kizuri-section', dupId);
    if (clone.getAttribute('data-kizuri-edit') === target) clone.setAttribute('data-kizuri-edit', dupId);
    var kids = clone.querySelectorAll('[data-kizuri-edit]');
    for (var k = 0; k < kids.length; k++) { kids[k].setAttribute('data-kizuri-edit', kids[k].getAttribute('data-kizuri-edit') + '~' + dupId + '~' + k); }
    // A cloned product-grid mount must NOT keep the original's data-kizuri-category —
    // otherwise the runtime renders two grids scoped to the SAME category, and a real
    // customer sees that category's products twice on the page. There's no sensible
    // category to auto-assign a brand-new duplicate, so it falls back to the
    // uncategorized bucket, which renderAll already handles correctly.
    var dupGrids = clone.querySelectorAll('[data-kizuri-shop="product-grid"][data-kizuri-category]');
    for (var g = 0; g < dupGrids.length; g++) { dupGrids[g].removeAttribute('data-kizuri-category'); }
    el.insertAdjacentElement('afterend', clone);
    pushSectionOp({ type: 'duplicate', target: target, dupId: dupId });
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

  var navPanel = null;
  function removeNavPanel() { if (navPanel && navPanel.parentNode) navPanel.parentNode.removeChild(navPanel); navPanel = null; }

  // Reads the full nav tree from the DOM: every element sharing a given
  // data-kizuri-nav-item id (desktop AND mobile both render the id) is one
  // LOGICAL item — dedupe by id, keep all matching elements so an edit can
  // apply to every copy. Tree shape is inferred from the hierarchical id
  // scheme itself ("1" is top-level, "1.0" is a child of "1") rather than
  // DOM nesting, since desktop/mobile renderings don't share a DOM parent.
  function readNavTree() {
    var all = document.querySelectorAll('[data-kizuri-nav-item]');
    var byId = {}; // id -> { id, label, href, els: [...] }
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var id = el.getAttribute('data-kizuri-nav-item');
      if (!byId[id]) byId[id] = { id: id, label: el.textContent, href: el.getAttribute('href') || '', els: [] };
      byId[id].els.push(el);
    }
    var topLevel = [];
    var ids = Object.keys(byId).sort();
    for (var j = 0; j < ids.length; j++) {
      var item = byId[ids[j]];
      if (item.id.indexOf('.') === -1) { item.children = []; topLevel.push(item); }
    }
    for (var k = 0; k < ids.length; k++) {
      var childItem = byId[ids[k]];
      var dot = childItem.id.indexOf('.');
      if (dot === -1) continue;
      var parentId = childItem.id.substring(0, dot);
      var parent = byId[parentId];
      if (parent) { parent.children = parent.children || []; parent.children.push(childItem); }
    }
    return topLevel;
  }

  // _nav's persisted shape is { [itemId]: { label?, href?, deleted? } } — a
  // nested per-item map, NOT the flat per-element setEdit(elId, prop, value)
  // shape every other feature uses (that shape assumes elId maps 1:1 to a
  // single data-kizuri-edit element; a nav item maps to TWO DOM elements,
  // desktop + mobile, sharing one data-kizuri-nav-item id, so it needs its
  // own top-level key with its own interpretation — see applyEdits/_nav).
  function setNavEdit(id, prop, value) {
    var nav = diff._nav || {};
    var item = nav[id] || {};
    item[prop] = value;
    nav[id] = item;
    diff._nav = nav;
    dirty = true;
    markDirty();
  }

  function applyNavEdit(id, prop, value) {
    var all = document.querySelectorAll('[data-kizuri-nav-item="' + id + '"]');
    for (var i = 0; i < all.length; i++) {
      if (prop === 'label') all[i].textContent = value;
      else if (prop === 'href') all[i].setAttribute('href', value);
    }
    setNavEdit(id, prop, value);
  }

  // Cascades to every descendant (prefix match on "id.") so deleting a
  // parent doesn't leave orphaned child elements dangling in the live DOM —
  // readNavTree only reassembles children under a parent it can find, so an
  // orphan would otherwise become invisible to the editor while still fully
  // visible (and un-deletable) to site visitors.
  function deleteNavItem(id) {
    var all = document.querySelectorAll('[data-kizuri-nav-item="' + id + '"]');
    for (var i = 0; i < all.length; i++) { if (all[i].parentNode) all[i].parentNode.removeChild(all[i]); }
    setNavEdit(id, 'deleted', true);
    var allTagged = document.querySelectorAll('[data-kizuri-nav-item]');
    var prefix = id + '.';
    var descendantIds = {};
    for (var j = 0; j < allTagged.length; j++) {
      var descId = allTagged[j].getAttribute('data-kizuri-nav-item');
      if (descId.indexOf(prefix) === 0) descendantIds[descId] = true;
    }
    for (var descIdKey in descendantIds) {
      if (!descendantIds.hasOwnProperty(descIdKey)) continue;
      var descEls = document.querySelectorAll('[data-kizuri-nav-item="' + descIdKey + '"]');
      for (var k = 0; k < descEls.length; k++) { if (descEls[k].parentNode) descEls[k].parentNode.removeChild(descEls[k]); }
      setNavEdit(descIdKey, 'deleted', true);
    }
  }

  function openNavPanel(clickedEl) {
    removeSectionPanel(); removeCardPanel(); removeCardTemplatePanel(); closePop();
    var pop = document.createElement('div');
    pop.className = 'kz-edit-pop';
    var body = popShell(pop, 'Navigation', function () { removeNavPanel(); });

    function renderRow(item, container) {
      var row = document.createElement('div');
      row.setAttribute('data-nav-row', item.id);
      row.style.marginBottom = '8px';
      var labelInput = document.createElement('input');
      labelInput.type = 'text'; labelInput.value = item.label; labelInput.setAttribute('data-nav-field', 'label');
      labelInput.addEventListener('input', function () { applyNavEdit(item.id, 'label', labelInput.value); });
      var hrefInput = document.createElement('input');
      hrefInput.type = 'text'; hrefInput.value = item.href; hrefInput.setAttribute('data-nav-field', 'href');
      hrefInput.style.marginLeft = '6px';
      hrefInput.addEventListener('input', function () { applyNavEdit(item.id, 'href', hrefInput.value); });
      var delBtn = document.createElement('button');
      delBtn.textContent = '✕'; delBtn.setAttribute('data-nav-delete', '');
      delBtn.style.marginLeft = '6px';
      delBtn.addEventListener('click', function () { deleteNavItem(item.id); row.parentNode && row.parentNode.removeChild(row); });
      row.appendChild(labelInput); row.appendChild(hrefInput); row.appendChild(delBtn);
      container.appendChild(row);
      if (item.children && item.children.length) {
        var childWrap = document.createElement('div');
        childWrap.style.marginLeft = '18px';
        for (var c = 0; c < item.children.length; c++) renderRow(item.children[c], childWrap);
        container.appendChild(childWrap);
      }
    }

    var tree = readNavTree();
    for (var t = 0; t < tree.length; t++) renderRow(tree[t], body);

    document.body.appendChild(pop);
    clampPanelToViewport(pop);
    navPanel = pop;
  }

  var sectionPanel = null;
  function removeSectionPanel() { if (sectionPanel && sectionPanel.parentNode) sectionPanel.parentNode.removeChild(sectionPanel); sectionPanel = null; }
  function openSectionPanel(el) {
    var secId = el.getAttribute('data-kizuri-edit');
    if (!secId) return;
    // only one editor surface open at a time
    removeSectionPanel(); removeCardPanel(); removeCardTemplatePanel(); removeNavPanel(); closePop();
    var cur = (diff[secId] && typeof diff[secId] === 'object') ? diff[secId] : {};
    var pop = document.createElement('div');
    pop.className = 'kz-edit-pop kz-sec-panel';
    var r = el.getBoundingClientRect();
    pop.style.position = 'fixed';
    pop.style.top = Math.max(56, r.top + 8) + 'px';
    pop.style.left = Math.max(8, r.left + 8) + 'px';
    var body = popShell(pop, 'Section', removeSectionPanel);

    // Touch: hover toolbar doesn't exist - surface the section ops as big
    // buttons at the TOP of the sheet body, wired to the SAME handlers.
    // Checked live at open time (not the init flag) so a rotate/resize after
    // load still gets the right chrome. revealForSheet also live-checks, so
    // the whole section-panel flow shares one (live) contract.
    if (isTouchNow()) {
      var actRow = document.createElement('div');
      actRow.className = 'kz-sheet-actions';
      var mkAction = function (labelTxt, fn, closes) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = labelTxt;
        b.addEventListener('click', function () {
          fn(el);
          if (closes) removeSectionPanel();
          // Sheet stays open after a move - keep the section in the visible
          // band so the reorder is seen, not inferred.
          if (!closes) revealForSheet(el);
        });
        actRow.appendChild(b);
      };
      mkAction('\u2191 Move up', doMoveUp, false);
      mkAction('\u2193 Move down', doMoveDown, false);
      mkAction('\u29c9 Duplicate', doDuplicate, true);
      mkAction('\ud83d\uddd1 Delete', doDelete, true);
      body.insertBefore(actRow, body.firstChild);
    }

    var colorRow = document.createElement('div');
    colorRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Background color</label>';
    var color = document.createElement('input'); color.type = 'color';
    if (cur.backgroundColor) color.value = cur.backgroundColor;
    color.addEventListener('input', function () { applySectionStyleJs(el, { backgroundColor: color.value }); setEdit(secId, 'backgroundColor', color.value); });
    colorRow.appendChild(color); body.appendChild(colorRow);

    var imgRow = document.createElement('div'); imgRow.style.marginTop = '10px';
    imgRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Background image</label>';
    var file = document.createElement('input'); file.type = 'file'; file.accept = 'image/*';
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return;
      var fd = new FormData(); fd.append('file', f);
      var headers = {}; headers['X-Kizuri-Edit-Token'] = ctx.token;
      fetch(ctx.editsUrl + '/upload', { method: 'POST', headers: headers, body: fd })
        .then(function (r) { if (!r.ok) throw new Error('upload'); return r.json(); })
        .then(function (d) { if (d && d.url) { applySectionStyleJs(el, { backgroundImage: d.url }); setEdit(secId, 'backgroundImage', d.url); } })
        .catch(function () { alert('Upload failed'); });
    });
    var rm = document.createElement('button'); rm.textContent = 'Remove image'; rm.style.marginLeft = '8px';
    rm.addEventListener('click', function () { applySectionStyleJs(el, { backgroundImage: '' }); setEdit(secId, 'backgroundImage', ''); });
    imgRow.appendChild(file); imgRow.appendChild(rm); body.appendChild(imgRow);

    var padRow = document.createElement('div'); padRow.style.marginTop = '10px';
    padRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Padding</label>';
    function padBtn(labelText, px) {
      var b = document.createElement('button'); b.textContent = labelText; b.style.marginRight = '6px';
      b.addEventListener('click', function () { applySectionStyleJs(el, { paddingY: px }); setEdit(secId, 'paddingY', px); num.value = parseInt(px, 10); });
      return b;
    }
    padRow.appendChild(padBtn('Compact', '48px'));
    padRow.appendChild(padBtn('Normal', '96px'));
    padRow.appendChild(padBtn('Spacious', '140px'));
    var num = document.createElement('input'); num.type = 'number'; num.min = '0'; num.style.width = '64px'; num.style.marginLeft = '6px';
    if (cur.paddingY) num.value = parseInt(cur.paddingY, 10);
    num.addEventListener('input', function () { var px = (parseInt(num.value, 10) || 0) + 'px'; applySectionStyleJs(el, { paddingY: px }); setEdit(secId, 'paddingY', px); });
    padRow.appendChild(num); body.appendChild(padRow);

    var ovRow = document.createElement('div'); ovRow.style.marginTop = '10px';
    ovRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Overlay &amp; text</label>';
    var ovColor = 'dark';
    if (cur.overlay && cur.overlay.color) ovColor = cur.overlay.color;
    var range = document.createElement('input'); range.type = 'range'; range.min = '0'; range.max = '0.7'; range.step = '0.05';
    range.value = (cur.overlay && cur.overlay.alpha != null) ? cur.overlay.alpha : '0';
    function pushOverlay() { var ov = { color: ovColor, alpha: parseFloat(range.value) }; applySectionStyleJs(el, { overlay: ov }); setEdit(secId, 'overlay', ov); }
    function ovBtn(labelText, c) {
      var b = document.createElement('button'); b.textContent = labelText; b.style.marginRight = '6px';
      b.addEventListener('click', function () { ovColor = c; pushOverlay(); });
      return b;
    }
    ovRow.appendChild(ovBtn('Dark', 'dark'));
    ovRow.appendChild(ovBtn('Light', 'light'));
    ovRow.appendChild(range);
    range.addEventListener('input', pushOverlay);
    function textBtn(labelText, hex) {
      var b = document.createElement('button'); b.textContent = labelText; b.style.margin = '6px 6px 0 0';
      b.addEventListener('click', function () { applySectionStyleJs(el, { textColor: hex }); setEdit(secId, 'textColor', hex); });
      return b;
    }
    var txtWrap = document.createElement('div'); txtWrap.style.marginTop = '6px';
    txtWrap.appendChild(textBtn('Light text', '#fff'));
    txtWrap.appendChild(textBtn('Dark text', '#111'));
    ovRow.appendChild(txtWrap); body.appendChild(ovRow);

    var addImgRowS = document.createElement('div'); addImgRowS.style.marginTop = '10px';
    var addImgS = document.createElement('button'); addImgS.textContent = 'Add image';
    addImgS.addEventListener('click', function () { removeSectionPanel(); enterImagePlacement(el); });
    addImgRowS.appendChild(addImgS); body.appendChild(addImgRowS);

    document.body.appendChild(pop);
    clampPanelToViewport(pop);
    revealForSheet(el);
    sectionPanel = pop;
  }

  var cardPanel = null;
  function removeCardPanel() { if (cardPanel && cardPanel.parentNode) cardPanel.parentNode.removeChild(cardPanel); cardPanel = null; }
  function openCardPanel(el) {
    var id = el.getAttribute('data-kizuri-edit');
    if (!id) return;
    // only one editor surface open at a time
    removeCardPanel(); removeSectionPanel(); removeCardTemplatePanel(); removeNavPanel(); closePop();
    var cur = (diff[id] && typeof diff[id] === 'object') ? diff[id] : {};
    var pop = document.createElement('div');
    pop.className = 'kz-edit-pop kz-card-panel';
    var r = el.getBoundingClientRect();
    pop.style.position = 'fixed';
    pop.style.top = Math.max(56, r.top + 8) + 'px';
    pop.style.left = Math.max(8, r.left + 8) + 'px';
    var body = popShell(pop, 'Card', removeCardPanel);

    var colorRow = document.createElement('div');
    colorRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Background color</label>';
    var color = document.createElement('input'); color.type = 'color';
    if (cur.backgroundColor) color.value = cur.backgroundColor;
    color.addEventListener('input', function () { applySectionStyleJs(el, { backgroundColor: color.value }); setEdit(id, 'backgroundColor', color.value); });
    colorRow.appendChild(color); body.appendChild(colorRow);

    var imgRow = document.createElement('div'); imgRow.style.marginTop = '10px';
    imgRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Background image</label>';
    var file = document.createElement('input'); file.type = 'file'; file.accept = 'image/*';
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return;
      var fd = new FormData(); fd.append('file', f);
      var headers = {}; headers['X-Kizuri-Edit-Token'] = ctx.token;
      fetch(ctx.editsUrl + '/upload', { method: 'POST', headers: headers, body: fd })
        .then(function (r) { if (!r.ok) throw new Error('upload'); return r.json(); })
        .then(function (d) { if (d && d.url) { applySectionStyleJs(el, { backgroundImage: d.url }); setEdit(id, 'backgroundImage', d.url); } })
        .catch(function () { alert('Upload failed'); });
    });
    var rm = document.createElement('button'); rm.textContent = 'Remove image'; rm.style.marginLeft = '8px';
    rm.addEventListener('click', function () { applySectionStyleJs(el, { backgroundImage: '' }); setEdit(id, 'backgroundImage', ''); });
    imgRow.appendChild(file); imgRow.appendChild(rm); body.appendChild(imgRow);

    var borderRow = document.createElement('div'); borderRow.style.marginTop = '10px';
    borderRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Border</label>';
    var bColor = document.createElement('input'); bColor.type = 'color';
    if (cur.borderColor) bColor.value = cur.borderColor;
    var bWidth = document.createElement('input'); bWidth.type = 'number'; bWidth.min = '0'; bWidth.style.width = '64px'; bWidth.style.marginLeft = '6px';
    if (cur.borderWidth) bWidth.value = parseInt(cur.borderWidth, 10);
    function pushBorder() { var w = (parseInt(bWidth.value, 10) || 0) + 'px'; applySectionStyleJs(el, { borderColor: bColor.value, borderWidth: w }); setEdit(id, 'borderColor', bColor.value); setEdit(id, 'borderWidth', w); }
    bColor.addEventListener('input', pushBorder);
    bWidth.addEventListener('input', pushBorder);
    borderRow.appendChild(bColor); borderRow.appendChild(bWidth); body.appendChild(borderRow);

    var radRow = document.createElement('div'); radRow.style.marginTop = '10px';
    radRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Corner radius (px)</label>';
    var rad = document.createElement('input'); rad.type = 'number'; rad.min = '0'; rad.style.width = '64px';
    if (cur.borderRadius) rad.value = parseInt(cur.borderRadius, 10);
    rad.addEventListener('input', function () { var v = (parseInt(rad.value, 10) || 0) + 'px'; applySectionStyleJs(el, { borderRadius: v }); setEdit(id, 'borderRadius', v); });
    radRow.appendChild(rad); body.appendChild(radRow);

    var padRow = document.createElement('div'); padRow.style.marginTop = '10px';
    padRow.innerHTML = '<label style="display:block;font-weight:600;margin:0 0 4px;">Padding</label>';
    function padBtn(labelText, px) {
      var b = document.createElement('button'); b.textContent = labelText; b.style.marginRight = '6px';
      b.addEventListener('click', function () { applySectionStyleJs(el, { paddingY: px }); setEdit(id, 'paddingY', px); num.value = parseInt(px, 10); });
      return b;
    }
    padRow.appendChild(padBtn('Compact', '12px'));
    padRow.appendChild(padBtn('Normal', '24px'));
    padRow.appendChild(padBtn('Spacious', '40px'));
    var num = document.createElement('input'); num.type = 'number'; num.min = '0'; num.style.width = '64px'; num.style.marginLeft = '6px';
    if (cur.paddingY) num.value = parseInt(cur.paddingY, 10);
    num.addEventListener('input', function () { var px = (parseInt(num.value, 10) || 0) + 'px'; applySectionStyleJs(el, { paddingY: px }); setEdit(id, 'paddingY', px); });
    padRow.appendChild(num); body.appendChild(padRow);

    var addImgRow = document.createElement('div'); addImgRow.style.marginTop = '10px';
    var addImg = document.createElement('button'); addImg.textContent = 'Add image';
    addImg.addEventListener('click', function () { removeCardPanel(); enterImagePlacement(el); });
    addImgRow.appendChild(addImg); body.appendChild(addImgRow);

    document.body.appendChild(pop);
    clampPanelToViewport(pop);
    revealForSheet(el);
    cardPanel = pop;
  }

  // ---- card TEMPLATE panel (site-wide --kz-card-* var overrides) ----
  // Distinct from openCardPanel/kz-card-panel above: that panel styles ONE
  // tagged <div> element; this one tunes the shop's card TEMPLATE's own
  // declared CSS custom properties, applied to every .kz-shop-root at once.
  var CARDTPL_VARS = [
    { name: '--kz-card-radius', label: 'Corner radius', kind: 'text' },
    { name: '--kz-card-shadow', label: 'Shadow', kind: 'text' },
    { name: '--kz-card-surface', label: 'Card background', kind: 'color' },
    { name: '--kz-card-accent', label: 'Accent color', kind: 'color' }
  ];
  var cardTplPanel = null;
  function removeCardTemplatePanel() { if (cardTplPanel && cardTplPanel.parentNode) cardTplPanel.parentNode.removeChild(cardTplPanel); cardTplPanel = null; }
  function applyCardTplVarLive(name, value) {
    var roots = document.querySelectorAll('.kz-shop-root');
    for (var i = 0; i < roots.length; i++) roots[i].style.setProperty(name, value);
  }
  function setCardTplVar(name, value) {
    var cur = diff._cardVars || {};
    cur[name] = value;
    diff._cardVars = cur;
    dirty = true;
    markDirty();
    applyCardTplVarLive(name, value);
  }
  function openCardTemplatePanel() {
    // only one editor surface open at a time
    removeCardTemplatePanel(); removeCardPanel(); removeSectionPanel(); removeNavPanel(); closePop();
    var cur = (diff._cardVars && typeof diff._cardVars === 'object') ? diff._cardVars : {};
    var sampleRoot = document.querySelector('.kz-shop-root');
    var cs = sampleRoot ? window.getComputedStyle(sampleRoot) : null;
    var pop = document.createElement('div');
    pop.className = 'kz-edit-pop kz-cardtpl-panel';
    pop.style.position = 'fixed';
    pop.style.top = '56px';
    pop.style.right = '14px';
    var body = popShell(pop, 'Card style', removeCardTemplatePanel);

    for (var i = 0; i < CARDTPL_VARS.length; i++) {
      (function (spec) {
        var input = document.createElement('input');
        input.type = spec.kind === 'color' ? 'color' : 'text';
        var seeded = cur[spec.name];
        // Best-effort pre-fill from the template's own current computed value —
        // COLOR inputs only. No card template today actually declares these
        // --kz-card-* variables yet (a genuine, acknowledged gap — see Task 9
        // report), so a computed-style read here is reading either nothing or
        // unrelated inherited junk. For a color input that's harmless: rgbToHex
        // returns null on anything it can't parse as rgb()/rgba(), and null is
        // left unseeded rather than defaulting the swatch to black. For a plain
        // text input (Shadow) there's no such filter available, so we don't
        // attempt to pre-fill it at all — it stays blank until the merchant
        // sets a value or a future feature reads a template's real declared
        // default.
        if (seeded == null && cs && spec.kind === 'color') {
          var computed = cs.getPropertyValue(spec.name);
          if (computed) {
            var hex = rgbToHex(computed);
            if (hex) seeded = hex;
          }
        }
        if (seeded) input.value = seeded;
        field(body, spec.label, input);
        input.addEventListener('input', function () { setCardTplVar(spec.name, input.value); });
      })(CARDTPL_VARS[i]);
    }

    document.body.appendChild(pop);
    clampPanelToViewport(pop);
    cardTplPanel = pop;
  }

  document.addEventListener('click', function (e) {
    if (!sectionPanel && !cardPanel && !cardTplPanel && !navPanel) return;
    var el = e.target;
    if (el && el.closest && (el.closest('.kz-sec-panel') || el.closest('.kz-sec-bar') || el.closest('.kz-ins-plus') || el.closest('.kz-edit-addmenu') || el.closest('.kz-edit-submenu') || el.closest('.kz-card-panel') || el.closest('.kz-cardtpl-panel') || el.closest('.kz-edit-cardtpl-btn') || el.closest('.kz-edit-pop'))) return;
    removeSectionPanel();
    removeCardPanel();
    removeCardTemplatePanel();
    removeNavPanel();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sectionPanel) removeSectionPanel();
    if (e.key === 'Escape' && cardPanel) removeCardPanel();
    if (e.key === 'Escape' && cardTplPanel) removeCardTemplatePanel();
    if (e.key === 'Escape' && navPanel) removeNavPanel();
    if (e.key === 'Escape' && imgPlacementContainer) endImagePlacement();
  });

  // Inline + insert rails: two reusable circular buttons positioned on section
  // hover. plusAfter sits at every section's bottom edge (insert AFTER it);
  // plusBefore sits at the FIRST section's top edge only (insert BEFORE it).
  // Clicking them is wired in a follow-up task — this only creates + positions.
  var plusAfter = document.createElement('button');
  plusAfter.className = 'kz-ins-plus'; plusAfter.textContent = '+'; plusAfter.title = 'Insert section below';
  var plusBefore = document.createElement('button');
  plusBefore.className = 'kz-ins-plus'; plusBefore.textContent = '+'; plusBefore.title = 'Insert section above';
  var plusAfterGap = null;   // { anchorId: id, position: 'after' }
  var plusBeforeGap = null;  // { anchorId: id, position: 'before' }
  if (document.body) { document.body.appendChild(plusAfter); document.body.appendChild(plusBefore); }
  else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(plusAfter); document.body.appendChild(plusBefore); });

  function firstSection() { var all = document.querySelectorAll('[data-kizuri-section]'); return all.length ? all[0] : null; }
  function positionPlusFor(el) {
    var editId = el.getAttribute('data-kizuri-edit');
    if (!editId) { plusAfter.style.display = 'none'; plusBefore.style.display = 'none'; return; }
    var r = el.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var cx = r.left + r.width / 2 - 14;
    if (cx < 8) cx = 8; if (cx > vw - 36) cx = vw - 36;
    // Clamp y into the viewport too (a section can be taller than the fold), so the
    // + is never rendered off-screen/unreachable — mirrors positionSectionBar.
    function clampY(y) { if (y < 8) return 8; if (y > vh - 36) return vh - 36; return y; }
    plusAfterGap = { anchorId: editId, position: 'after' };
    plusAfter.style.left = cx + 'px';
    plusAfter.style.top = clampY(r.bottom - 14) + 'px';
    plusAfter.style.display = 'flex';
    if (el === firstSection()) {
      plusBeforeGap = { anchorId: editId, position: 'before' };
      // The first section's TOP + shares the top edge with the ⚙ toolbar
      // (top-center). Offset it toward the left so they don't overlap/obscure.
      var bx = r.left + 24;
      if (bx < 8) bx = 8; if (bx > vw - 36) bx = vw - 36;
      plusBefore.style.left = bx + 'px';
      plusBefore.style.top = clampY(r.top - 14) + 'px';
      plusBefore.style.display = 'flex';
    } else {
      plusBefore.style.display = 'none';
    }
  }
  // NB: the + rails persist across section hovers (like the ⚙ toolbar / secBar),
  // repositioned by positionPlusFor on each hover — so there's intentionally no
  // hide-on-leave; they stay reachable and are re-placed for the next section.
  plusAfter.addEventListener('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); if (plusAfterGap) openInsertMenuAtGap(plusAfterGap, plusAfter); });
  plusBefore.addEventListener('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); if (plusBeforeGap) openInsertMenuAtGap(plusBeforeGap, plusBefore); });

  // Floating section toolbar shown on section hover.
  var secBar = null, secBarEl = null;
  // Session-only drag offset shared by every section's bar. Reset to {0,0} (i.e.
  // back to the default top-center) on a clean Save & Publish and on reload.
  var secBarOffset = { x: 0, y: 0 };
  var secBarDragging = false; // true while a drag is in progress (suppresses hover rebuild)
  function closeSectionBar() { if (secBar) { secBar.parentNode && secBar.parentNode.removeChild(secBar); secBar = null; secBarEl = null; } }
  // Compute + apply the bar's position: top-center over the section, plus the drag
  // offset, clamped inside the viewport so it never clips off-screen.
  function positionSectionBar() {
    if (!secBar || !secBarEl) return;
    var r = secBarEl.getBoundingClientRect();
    var barW = secBar.offsetWidth || 190;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var left = r.left + (r.width - barW) / 2 + secBarOffset.x;
    var top = Math.max(8, r.top + 8) + secBarOffset.y;
    if (left + barW > vw - 8) left = vw - 8 - barW;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    if (top > vh - 44) top = vh - 44;
    secBar.style.left = left + 'px';
    secBar.style.top = top + 'px';
  }
  function showSectionBar(el) {
    if (secBarDragging) return; // don't rebuild while the user is dragging the bar
    if (secBarEl === el) return;
    closeSectionBar();
    secBarEl = el;
    secBar = document.createElement('div');
    secBar.className = 'kz-sec-bar';
    secBar.style.position = 'fixed';
    secBar.style.zIndex = '2147483646';
    // Drag grip — mousedown starts a drag that updates the shared secBarOffset.
    var grip = document.createElement('span');
    grip.className = 'kz-sec-grip'; grip.textContent = '⠿'; grip.title = 'Drag toolbar';
    grip.addEventListener('mousedown', startSecBarDrag);
    secBar.appendChild(grip);
    function btn(label, title, fn) {
      var b = document.createElement('button');
      b.className = 'kz-sec-btn'; b.textContent = label; b.title = title;
      b.addEventListener('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); fn(el); });
      secBar.appendChild(b);
    }
    btn('↑', 'Move up', doMoveUp);
    btn('↓', 'Move down', doMoveDown);
    btn('⧉', 'Duplicate', doDuplicate);
    btn('✕', 'Delete', doDelete);
    btn('⚙', 'Section settings', function (secEl) { openSectionPanel(secEl); });
    document.body.appendChild(secBar);
    // Position AFTER mount so we know the bar's real width (button count can vary).
    positionSectionBar();
  }

  // ---- drag the section toolbar (session-only shared offset) ----
  var dragStart = null; // { mx, my, ox, oy } captured on mousedown
  function startSecBarDrag(ev) {
    ev.preventDefault(); ev.stopPropagation();
    if (!secBar) return;
    secBarDragging = true;
    dragStart = { mx: ev.clientX, my: ev.clientY, ox: secBarOffset.x, oy: secBarOffset.y };
    document.addEventListener('mousemove', onSecBarDragMove, true);
    document.addEventListener('mouseup', endSecBarDrag, true);
  }
  function onSecBarDragMove(ev) {
    if (!dragStart) return;
    secBarOffset.x = dragStart.ox + (ev.clientX - dragStart.mx);
    secBarOffset.y = dragStart.oy + (ev.clientY - dragStart.my);
    positionSectionBar();
  }
  function endSecBarDrag() {
    secBarDragging = false; dragStart = null;
    document.removeEventListener('mousemove', onSecBarDragMove, true);
    document.removeEventListener('mouseup', endSecBarDrag, true);
  }
  // Reset the toolbar to its default top-center position (called on clean save).
  function resetSecBarPosition() { secBarOffset.x = 0; secBarOffset.y = 0; positionSectionBar(); }

  document.addEventListener('mouseover', function (e) {
    // Touch layout: no hover concept - section actions live in the edit sheets.
    if (isTouchLayout) return;
    // While a placement is active (image drop, or shop/section click-to-place), do
    // NOT show the section toolbar / + rails — their buttons sit above the placement
    // overlay and a click on one would land outside the target and cancel placement.
    if (imgPlacementContainer || pendingType) return;
    var src = e.target;
    var el = src && src.closest ? src.closest('[data-kizuri-section]') : null;
    if (el) { el.classList.add('kz-sec-outline'); showSectionBar(el); positionPlusFor(el); }
  }, true);
  document.addEventListener('mouseout', function (e) {
    var src = e.target;
    var el = src && src.closest ? src.closest('[data-kizuri-section]') : null;
    // Only clear the outline; keep the bar until another section is hovered so
    // the user can reach the buttons.
    if (el && el.classList) el.classList.remove('kz-sec-outline');
  }, true);

  // ---- save ----
  function save() {
    var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['X-Kizuri-Edit-Token'] = ctx.token;
    fetch(ctx.editsUrl, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ edits: diff })
    })
      .then(function (r) {
        if (r.status === 401) {
          alert('Your editing session expired. Please re-open this page from your Kizuri dashboard. Your changes are still on screen.');
          return;
        }
        if (!r.ok) { alert('Save failed. Please try again.'); return; }
        markSaved();
      })
      .catch(function () { alert('Save failed. Please try again.'); });
  }

  // ---- exit ----
  function exit() {
    if (dirty && !confirm('Discard unsaved changes?')) return;
    var u = new URL(window.location.href);
    u.searchParams.delete('kizuri_edit');
    window.location.href = u.toString();
  }
})();