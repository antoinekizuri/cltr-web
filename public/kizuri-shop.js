(function () {
  var SITE_ID = "354c4e09-4913-413b-b740-947174913a8e";
  var STOREFRONT_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/storefront/354c4e09-4913-413b-b740-947174913a8e";
  var EDITS_URL = "https://kizuriapi-production-ee3c.up.railway.app/api/site-edit/354c4e09-4913-413b-b740-947174913a8e";
  var KZ_DESIGN_TOKENS_MANIFEST = {"radius":"soft","shadow":"flat","weight":"bold","density":"comfortable"};

  var SHOP_STYLES = "\n.kz-shop-root,.kz-shop-root *{box-sizing:border-box;}\n.kz-shop-root{font-family:var(--kz-font,inherit);}\n.kz-shop-sortbar{display:flex;justify-content:flex-end;margin:0 0 14px 0;}\n.kz-shop-root .kz-shop-sort{appearance:none;-webkit-appearance:none;font-family:var(--kz-font,inherit);font-size:14px;font-weight:500;line-height:1.2;color:#111;background-color:#fff;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5L6 8l3.5-3.5' fill='none' stroke='%23111' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 10px center;background-size:12px 12px;border:1px solid #e5e7eb;border-radius:10px;border-radius:var(--kz-radius-sm,10px);padding:8px 32px 8px 12px;margin:0;height:auto;width:auto;min-width:0;max-width:100%;cursor:pointer;text-transform:none;letter-spacing:normal;box-shadow:none;outline:none;}\n.kz-shop-root .kz-shop-sort:focus-visible{border-color:var(--kz-accent,#111);box-shadow:0 0 0 3px rgba(0,0,0,.08);}\n.kz-shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;}\n.kz-shop-card{cursor:pointer;display:flex;flex-direction:column;gap:8px;gap:var(--kz-gap,8px);padding:12px;padding:var(--kz-pad,12px);background:var(--kz-card-surface,#fff);border:1px solid #e5e7eb;border-radius:var(--kz-card-radius,12px);border-radius:var(--kz-card-radius,var(--kz-radius,12px));box-shadow:var(--kz-card-shadow,0 1px 2px rgba(0,0,0,.05));box-shadow:var(--kz-card-shadow,var(--kz-shadow,0 1px 2px rgba(0,0,0,.05)));transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;text-align:left;}\n.kz-shop-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.12);border-color:var(--kz-accent,#111);}\n.kz-shop-card-link{display:block;text-decoration:none;color:inherit;border-radius:var(--kz-card-radius,12px);border-radius:var(--kz-card-radius,var(--kz-radius,12px));}\n.kz-shop-card-link:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(0,0,0,.08);}\n.kz-shop-card-img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border-radius:var(--kz-radius-sm,8px);display:block;background:#f3f4f6;}\n.kz-shop-card-name{font-weight:600;font-weight:var(--kz-weight,600);font-size:15px;line-height:1.3;color:#111;letter-spacing:normal;text-transform:none;}\n.kz-shop-card-price{font-weight:600;color:#111;font-size:14px;}\n.kz-shop-card-cta{margin-top:auto;font-size:13px;font-weight:600;color:var(--kz-card-accent,var(--kz-accent,#111));}\n.kz-shop-root[data-kizuri-shop=\"product\"]{max-width:1200px;margin:0 auto;padding:var(--kz-shop-clear-top,32px) 24px var(--kz-shop-clear-bottom,48px);}\n.kz-shop-detail{display:flex;flex-direction:column;gap:12px;max-width:560px;margin:0 auto;color:#111;}\n.kz-shop-detail-img{width:100%;max-width:440px;aspect-ratio:1/1;object-fit:cover;border-radius:12px;border-radius:var(--kz-radius,12px);background:#f3f4f6;}\n.kz-shop-detail-name{font-size:22px;font-weight:700;font-weight:var(--kz-weight,700);line-height:1.2;color:#111;margin:0;text-transform:none;letter-spacing:normal;}\n.kz-shop-detail-desc{color:#444;line-height:1.5;margin:0;}\n.kz-shop-opt{display:flex;flex-direction:column;gap:6px;max-width:260px;font-size:14px;color:#111;}\n.kz-shop-root select.kz-shop-variant{appearance:none;-webkit-appearance:none;-moz-appearance:none;padding:10px 36px 10px 12px;border:1px solid #cbd5e1;border-radius:8px;border-radius:var(--kz-radius-sm,8px);background:#fff;background-color:#fff;color:#111;font:inherit;font-size:14px;line-height:1.2;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%23111' stroke-width='1.5' fill='none'/></svg>\");background-repeat:no-repeat;background-position:right 12px center;}\n.kz-shop-price{font-size:20px;font-weight:700;font-weight:var(--kz-weight,700);color:#111;}\n.kz-shop-stock{opacity:.7;font-size:13px;color:#111;}\n.kz-shop-addcart{display:inline-block;padding:13px 22px;border-radius:10px;border-radius:var(--kz-radius-sm,10px);border:0;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);font:inherit;font-weight:600;font-weight:var(--kz-weight,600);font-size:15px;cursor:pointer;transition:filter .15s ease;}\n.kz-shop-addcart:hover{filter:brightness(.9);}\n.kz-shop-addcart[disabled]{opacity:.5;cursor:not-allowed;filter:none;}\n.kz-shop-empty{opacity:.7;padding:24px;text-align:center;color:#111;}\n";
  var SECTION_TEMPLATES = {"hero-centered":"<section data-kizuri-section=\"hero-centered~__KZ_INS_ID__\" data-kizuri-edit=\"hero-centered~__KZ_INS_ID__\" style=\"padding:96px 24px;text-align:center;background:#f9fafb;\">\n  <div style=\"max-width:760px;margin:0 auto;\">\n    <p data-kizuri-edit=\"hero-centered~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n    <h1 data-kizuri-edit=\"hero-centered~headline~__KZ_INS_ID__\" style=\"font-size:48px;line-height:1.1;font-weight:800;color:#1f2937;margin:0 0 20px;\">A headline that sells your business</h1>\n    <p data-kizuri-edit=\"hero-centered~sub~__KZ_INS_ID__\" style=\"font-size:19px;line-height:1.6;color:#6b7280;margin:0 0 32px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n    <a data-kizuri-edit=\"hero-centered~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:16px 32px;border-radius:10px;text-decoration:none;\">Get started</a>\n  </div>\n</section>","hero-image-left":"<section data-kizuri-section=\"hero-image-left~__KZ_INS_ID__\" data-kizuri-edit=\"hero-image-left~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:48px;align-items:center;\">\n    <img data-kizuri-edit=\"hero-image-left~image~__KZ_INS_ID__\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400'%3E%3Crect width='640' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-family='sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle'%3EYour image%3C/text%3E%3C/svg%3E\" alt=\"\" style=\"flex:1 1 320px;max-width:100%;height:auto;border-radius:16px;object-fit:cover;\" />\n    <div style=\"flex:1 1 320px;\">\n      <p data-kizuri-edit=\"hero-image-left~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n      <h1 data-kizuri-edit=\"hero-image-left~headline~__KZ_INS_ID__\" style=\"font-size:42px;line-height:1.12;font-weight:800;color:#1f2937;margin:0 0 18px;\">A headline that sells your business</h1>\n      <p data-kizuri-edit=\"hero-image-left~sub~__KZ_INS_ID__\" style=\"font-size:18px;line-height:1.6;color:#6b7280;margin:0 0 28px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n      <a data-kizuri-edit=\"hero-image-left~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:15px 30px;border-radius:10px;text-decoration:none;\">Get started</a>\n    </div>\n  </div>\n</section>","hero-split":"<section data-kizuri-section=\"hero-split~__KZ_INS_ID__\" data-kizuri-edit=\"hero-split~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#0b1220;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:40px;align-items:center;\">\n    <div style=\"flex:1 1 320px;\">\n      <h1 data-kizuri-edit=\"hero-split~headline~__KZ_INS_ID__\" style=\"font-size:44px;line-height:1.1;font-weight:800;color:#ffffff;margin:0 0 18px;\">A headline that sells your business</h1>\n      <p data-kizuri-edit=\"hero-split~sub~__KZ_INS_ID__\" style=\"font-size:18px;line-height:1.6;color:#c7ccd6;margin:0 0 28px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n      <a data-kizuri-edit=\"hero-split~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#FBCB11;color:#0b1220;font-weight:700;padding:15px 30px;border-radius:10px;text-decoration:none;\">Get started</a>\n    </div>\n    <div style=\"flex:1 1 320px;background:#151f33;border-radius:16px;padding:32px;\">\n      <p data-kizuri-edit=\"hero-split~panelTitle~__KZ_INS_ID__\" style=\"font-size:20px;font-weight:700;color:#ffffff;margin:0 0 10px;\">Why choose us</p>\n      <p data-kizuri-edit=\"hero-split~panelBody~__KZ_INS_ID__\" style=\"font-size:16px;line-height:1.7;color:#c7ccd6;margin:0;\">A short supporting point that builds trust — replace this with your own copy.</p>\n    </div>\n  </div>\n</section>","testimonials-cards":"<section data-kizuri-section=\"testimonials-cards~__KZ_INS_ID__\" data-kizuri-edit=\"testimonials-cards~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#ffffff;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"testimonials-cards~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">What our customers say</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;\">\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote1~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"This changed how we run the business. Simple and fast.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name1~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Thandi M.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role1~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Owner, Cafe Uhuru</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote2~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"We were live in an afternoon. Our customers noticed.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name2~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Sipho D.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role2~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Founder, Bolt Logistics</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote3~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"Finally a site that looks like we paid a designer.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name3~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Lerato K.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role3~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Director, Kaya Interiors</p>\n      </div>\n    </div>\n  </div>\n</section>","pricing-columns":"<section data-kizuri-section=\"pricing-columns~__KZ_INS_ID__\" data-kizuri-edit=\"pricing-columns~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"pricing-columns~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">Simple pricing</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;align-items:stretch;\">\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier1name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Starter</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R0</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">1 site<br>Basic support<br>Kizuri subdomain</p>\n        <a data-kizuri-edit=\"pricing-columns~tier1cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Starter</a>\n      </div>\n      <div style=\"background:#fff;border:2px solid #19468B;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier2name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Premium</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R199</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Starter<br>Custom domain<br>Priority support</p>\n        <a data-kizuri-edit=\"pricing-columns~tier2cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#19468B;color:#fff;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Premium</a>\n      </div>\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier3name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Platinum</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R499</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Premium<br>Unlimited sites<br>Dedicated manager</p>\n        <a data-kizuri-edit=\"pricing-columns~tier3cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Platinum</a>\n      </div>\n    </div>\n  </div>\n</section>","columns-2":"<section data-kizuri-section=\"columns-2~__KZ_INS_ID__\" data-kizuri-edit=\"columns-2~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-2~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-2~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","columns-3":"<section data-kizuri-section=\"columns-3~__KZ_INS_ID__\" data-kizuri-edit=\"columns-3~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-3~col2~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","columns-4":"<section data-kizuri-section=\"columns-4~__KZ_INS_ID__\" data-kizuri-edit=\"columns-4~__KZ_INS_ID__\" style=\"padding:64px 24px;\">\n  <div style=\"max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:24px;align-items:stretch;\">\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col0~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col1~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col2~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n    <div class=\"kz-col-cell\" data-kizuri-edit=\"columns-4~col3~__KZ_INS_ID__\" style=\"flex:1 1 240px;min-height:140px;padding:20px;border-radius:12px;\"></div>\n  </div>\n</section>","hero":"<section data-kizuri-section=\"hero-centered~__KZ_INS_ID__\" data-kizuri-edit=\"hero-centered~__KZ_INS_ID__\" style=\"padding:96px 24px;text-align:center;background:#f9fafb;\">\n  <div style=\"max-width:760px;margin:0 auto;\">\n    <p data-kizuri-edit=\"hero-centered~eyebrow~__KZ_INS_ID__\" style=\"text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:700;color:#19468B;margin:0 0 16px;\">Your eyebrow</p>\n    <h1 data-kizuri-edit=\"hero-centered~headline~__KZ_INS_ID__\" style=\"font-size:48px;line-height:1.1;font-weight:800;color:#1f2937;margin:0 0 20px;\">A headline that sells your business</h1>\n    <p data-kizuri-edit=\"hero-centered~sub~__KZ_INS_ID__\" style=\"font-size:19px;line-height:1.6;color:#6b7280;margin:0 0 32px;\">Say what you do and who it's for, in one clear sentence your customer understands.</p>\n    <a data-kizuri-edit=\"hero-centered~cta~__KZ_INS_ID__\" href=\"#\" style=\"display:inline-block;background:#19468B;color:#fff;font-weight:700;padding:16px 32px;border-radius:10px;text-decoration:none;\">Get started</a>\n  </div>\n</section>","testimonials":"<section data-kizuri-section=\"testimonials-cards~__KZ_INS_ID__\" data-kizuri-edit=\"testimonials-cards~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#ffffff;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"testimonials-cards~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">What our customers say</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;\">\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote1~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"This changed how we run the business. Simple and fast.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name1~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Thandi M.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role1~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Owner, Cafe Uhuru</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote2~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"We were live in an afternoon. Our customers noticed.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name2~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Sipho D.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role2~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Founder, Bolt Logistics</p>\n      </div>\n      <div style=\"background:#f9fafb;border-radius:14px;padding:28px;\">\n        <p data-kizuri-edit=\"testimonials-cards~quote3~__KZ_INS_ID__\" style=\"font-size:17px;line-height:1.6;color:#1f2937;margin:0 0 20px;\">\"Finally a site that looks like we paid a designer.\"</p>\n        <p data-kizuri-edit=\"testimonials-cards~name3~__KZ_INS_ID__\" style=\"font-weight:700;color:#19468B;margin:0;\">Lerato K.</p>\n        <p data-kizuri-edit=\"testimonials-cards~role3~__KZ_INS_ID__\" style=\"font-size:14px;color:#6b7280;margin:2px 0 0;\">Director, Kaya Interiors</p>\n      </div>\n    </div>\n  </div>\n</section>","pricing":"<section data-kizuri-section=\"pricing-columns~__KZ_INS_ID__\" data-kizuri-edit=\"pricing-columns~__KZ_INS_ID__\" style=\"padding:80px 24px;background:#f9fafb;\">\n  <div style=\"max-width:1080px;margin:0 auto;\">\n    <h2 data-kizuri-edit=\"pricing-columns~title~__KZ_INS_ID__\" style=\"text-align:center;font-size:34px;font-weight:800;color:#1f2937;margin:0 0 48px;\">Simple pricing</h2>\n    <div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;align-items:stretch;\">\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier1name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Starter</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R0</p>\n        <p data-kizuri-edit=\"pricing-columns~tier1feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">1 site<br>Basic support<br>Kizuri subdomain</p>\n        <a data-kizuri-edit=\"pricing-columns~tier1cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Starter</a>\n      </div>\n      <div style=\"background:#fff;border:2px solid #19468B;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier2name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Premium</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R199</p>\n        <p data-kizuri-edit=\"pricing-columns~tier2feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Starter<br>Custom domain<br>Priority support</p>\n        <a data-kizuri-edit=\"pricing-columns~tier2cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#19468B;color:#fff;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Premium</a>\n      </div>\n      <div style=\"background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;\">\n        <p data-kizuri-edit=\"pricing-columns~tier3name~__KZ_INS_ID__\" style=\"font-weight:700;font-size:18px;color:#1f2937;margin:0 0 8px;\">Platinum</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3price~__KZ_INS_ID__\" style=\"font-size:36px;font-weight:800;color:#19468B;margin:0 0 20px;\">R499</p>\n        <p data-kizuri-edit=\"pricing-columns~tier3feats~__KZ_INS_ID__\" style=\"font-size:15px;line-height:1.9;color:#6b7280;margin:0 0 24px;\">Everything in Premium<br>Unlimited sites<br>Dedicated manager</p>\n        <a data-kizuri-edit=\"pricing-columns~tier3cta~__KZ_INS_ID__\" href=\"#\" style=\"display:block;text-align:center;background:#f3f4f6;color:#1f2937;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;\">Choose Platinum</a>\n      </div>\n    </div>\n  </div>\n</section>"};
  var CARD_TEMPLATE_HTML = "<div class=\"kz-shop-card\"><img class=\"kz-shop-card-img\" data-kz-slot=\"image\"><div class=\"kz-shop-card-name\" data-kz-slot=\"name\"></div><div class=\"kz-shop-card-price\" data-kz-slot=\"price\"></div><div class=\"kz-shop-card-cta\" data-kz-slot=\"cta\">View product →</div></div>";
  function renderSectionBlockJs(type, id){
    var tpl = SECTION_TEMPLATES[type];
    if(!tpl) return '';
    return tpl.split('__KZ_INS_ID__').join(id);
  }
  function renderImageInsertJs(id){
    var ph = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-family='sans-serif' font-size='18' text-anchor='middle' dominant-baseline='middle'%3EYour image%3C/text%3E%3C/svg%3E";
    return '<img data-kizuri-edit="' + id + '~img" src="' + ph + '" alt="" style="max-width:100%;width:100%;height:auto;display:block;" />';
  }
  function injectShopStyles(){
    try{
      if(document.querySelector('style[data-kizuri-shop-styles]'))return;
      var s=document.createElement('style');
      s.setAttribute('data-kizuri-shop-styles','');
      s.textContent=SHOP_STYLES;
      (document.head||document.documentElement).appendChild(s);
    }catch(e){}
  }

  function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function escAttr(s){return escHtml(s).replace(/"/g,'&quot;');}
  function fmt(cents){var sign=cents<0?'-':'';var a=Math.abs(Math.round(cents));var r=Math.floor(a/100);var c=(''+(a%100));while(c.length<2)c='0'+c;var g=(''+r).replace(/\B(?=(\d{3})+(?!\d))/g,',');return sign+'R'+g+'.'+c;}
  function range(vs){if(!vs.length)return '\u2014';var ps=vs.map(function(v){return v.price_cents;});var mn=Math.min.apply(null,ps),mx=Math.max.apply(null,ps);return mn===mx?fmt(mn):fmt(mn)+' \u2013 '+fmt(mx);}
  function findVariant(p,sel){if(!p.options.length)return p.variants[0];for(var i=0;i<p.variants.length;i++){var v=p.variants[i],ok=true;for(var j=0;j<p.options.length;j++){var n=p.options[j].name;if(v.option_values[n]!==sel[n]){ok=false;break;}}if(ok)return v;}return undefined;}
  // querySelector only searches descendants — it never matches the element
  // it's called on. A single-root template whose root itself carries
  // data-kz-slot (legal today; CardTemplateValidator never requires a
  // slot-free root) needs that checked too, or the slot silently never fills.
  function findSlot(root,sel){return (root.matches&&root.matches(sel))?root:root.querySelector(sel);}
  function findAllSlots(root,sel){var results=(root.matches&&root.matches(sel))?[root]:[];var found=root.querySelectorAll(sel);for(var i=0;i<found.length;i++)results.push(found[i]);return results;}

  // ES5 copy of lib/ui-generator/card-template-fill.ts's fillCardTemplate. Keep
  // the two behaviourally aligned (shop-runtime.test.ts eval-checks this copy
  // against the same expectations) — published sites carry no bundler/TS, so
  // this cannot just import the TS version. Mirrors the multi-root-template
  // and empty-template safety handling: a template can legally have more than
  // one top-level element (nothing gets silently dropped), and a degenerate
  // empty template must never throw, only render harmlessly.
  function fillCardTemplateJs(templateHtml,p,doc){
    var wrapper=doc.createElement('div');
    wrapper.innerHTML=templateHtml.trim();
    // Empty-template case (wrapper.children.length===0) falls through here too,
    // matching card-template-fill.ts's ternary — root=wrapper either way, and
    // data-product-id below still gets set even though every slot lookup below
    // will then no-op against an empty root.
    var root=wrapper.children.length===1?wrapper.firstElementChild:wrapper;
    root.setAttribute('data-product-id',p.id);
    var imgEl=findSlot(root,'[data-kz-slot="image"]');
    if(imgEl){
      var src=p.images[0]||'';
      if(!src){for(var v=0;v<p.variants.length;v++){if(p.variants[v].image_url){src=p.variants[v].image_url;break;}}}
      if(src){
        imgEl.setAttribute('src',src);
        imgEl.setAttribute('alt',p.name);
      } else if(imgEl!==root&&imgEl.parentNode){
        imgEl.parentNode.removeChild(imgEl);
      }
    }
    // Known limitation: if the root is BOTH a text slot (name/price/description/
    // badge) and wraps nested slot elements, textContent replaces all children —
    // the nested slots are destroyed. Unhandled: correct behavior would need the
    // text written into a child text node rather than via textContent. Not seen
    // in practice (AI templates wrap text slots in leaf elements) and the
    // validator does not forbid it.
    var nameEl=findSlot(root,'[data-kz-slot="name"]');
    if(nameEl)nameEl.textContent=p.name;
    var priceEl=findSlot(root,'[data-kz-slot="price"]');
    if(priceEl)priceEl.textContent=range(p.variants);
    var descEl=findSlot(root,'[data-kz-slot="description"]');
    if(descEl)descEl.textContent=p.description||'';
    var badgeEl=findSlot(root,'[data-kz-slot="badge"]');
    if(badgeEl)badgeEl.textContent='';  // no badge data source in the runtime yet — hardcoded blank, unlike fillCardTemplate's real badge param
    // Never remove root itself even if it matches — that would return a
    // detached, useless node from this function.
    var varRows=findAllSlots(root,'[data-kz-slot="variant-option"]');
    for(var vr=0;vr<varRows.length;vr++){if(varRows[vr]!==root&&varRows[vr].parentNode)varRows[vr].parentNode.removeChild(varRows[vr]);}
    return root;
  }

  // ── shared client checkout core (cart store + drawer + checkout + return) ──
  // Single-sourced from checkout-core.ts; configured for the shop (variantId lines,
  // shop address fields, /checkout, kz_cart_ prefix). Exposes the shop-owned
  // window.__kizuriShopCheckout (per-vertical name — the events runtime also
  // loads on this page and must not clobber the shop's checkout).
(function(){
  var CHECKOUT_STYLES = "\n.kz-checkout-cart-toggle{position:fixed;bottom:20px;right:20px;z-index:2147483000;border:0;border-radius:999px;padding:14px 20px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);font:inherit;font-weight:600;font-size:14px;}\n.kz-checkout-cart{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:92vw;z-index:2147483001;background:#fff;color:#111;box-shadow:-8px 0 40px rgba(0,0,0,.25);display:flex;flex-direction:column;padding:20px;overflow:auto;font:inherit;}\n.kz-checkout-cart-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}\n.kz-checkout-cart-head strong{font-size:18px;color:#111;}\n.kz-checkout-cart-close{cursor:pointer;border:0;background:transparent;color:#111;font:inherit;font-size:14px;opacity:.6;}\n.kz-checkout-cart-close:hover{opacity:1;}\n.kz-checkout-cart-item{display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #eee;}\n.kz-checkout-cart-item-name{flex:1;font-size:14px;color:#111;}\n.kz-checkout-cart-item-price{font-weight:600;font-size:14px;color:#111;}\n.kz-checkout-cart-qty{width:60px;padding:6px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;color:#111;}\n.kz-checkout-cart-remove{cursor:pointer;border:0;background:transparent;color:#111;opacity:.55;font:inherit;font-size:13px;}\n.kz-checkout-cart-remove:hover{opacity:1;}\n.kz-checkout-cart-subtotal{font-weight:700;font-size:16px;margin:14px 0;color:#111;}\n.kz-checkout-checkout-btn{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;width:100%;}\n.kz-checkout-checkout{display:flex;flex-direction:column;gap:10px;margin-top:12px;}\n.kz-checkout-checkout input{padding:11px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;font-size:14px;color:#111;background:#fff;width:100%;}\n.kz-checkout-pay{padding:13px;border:0;border-radius:10px;background:#111;background:var(--kz-accent,#111);color:#fff;color:var(--kz-accent-contrast,#fff);cursor:pointer;font:inherit;font-weight:600;font-size:15px;}\n.kz-checkout-empty{opacity:.7;padding:24px;text-align:center;color:#111;}\n.kz-checkout-cart-msg{padding:11px;border-radius:8px;background:#f1f5f9;color:#111;margin:10px 0;font-size:13px;}\n\n.kz-checkout-terms{display:flex;align-items:flex-start;gap:10px;margin:2px 0 12px;font-size:14px;line-height:1.45;cursor:pointer;text-align:left;}\n.kz-checkout-terms input{flex:none;width:18px !important;height:18px;margin:1px 0 0;padding:0;accent-color:currentColor;cursor:pointer;}\n.kz-checkout-terms a{color:inherit;text-decoration:underline;text-underline-offset:3px;}\n";
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

  // ── Terms & Conditions (terms-core) ──
  var _kzTermsUrl=null, _kzTermsLoaded=false, _kzTermsForms=[];
  function kzTermsSettingsUrl(){
    // {api}/api/<vertical>/<siteId> → {api}/api/site-settings/<siteId>
    return String(STOREFRONT_URL).replace(/\/api\/[a-z-]+\/[^\/?#]+\/?$/,'')+'/api/site-settings/'+encodeURIComponent(SITE_ID);
  }
  function kzTermsInject(form){
    if(!form)return;
    // Forget forms that were redrawn away (carts re-render on every change).
    var live=[];for(var f=0;f<_kzTermsForms.length;f++){if(_kzTermsForms[f].isConnected!==false)live.push(_kzTermsForms[f]);}
    _kzTermsForms=live;
    if(_kzTermsForms.indexOf(form)<0)_kzTermsForms.push(form);
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

  // ── cart storage (localStorage, keyed by site) ──
  var ID_FIELD="variantId";
  var CART_KEY="kz_cart_"+SITE_ID;
  function loadCart(){try{var raw=window.localStorage.getItem(CART_KEY);if(!raw)return [];var c=JSON.parse(raw);return (c&&c.length!==undefined)?c:[];}catch(e){return [];}}
  function saveCart(c){try{window.localStorage.setItem(CART_KEY,JSON.stringify(c||[]));}catch(e){}}
  function cartAdd(c,item){for(var i=0;i<c.length;i++){if(c[i][ID_FIELD]===item[ID_FIELD]){c[i].qty=c[i].qty+item.qty;return c;}}c.push(item);return c;}
  function cartSubtotal(c){var t=0;for(var i=0;i<c.length;i++){t=t+c[i].unitPriceCents*c[i].qty;}return t;}
  var toLineItem=function(item){return {variant_id:item.variantId,quantity:item.qty};};
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
        "<input class=\"kz-checkout-f\" name=\"name\" placeholder=\"Full name\"><input class=\"kz-checkout-f\" name=\"email\" type=\"email\" placeholder=\"Email\"><input class=\"kz-checkout-f\" name=\"phone\" placeholder=\"Phone\"><input class=\"kz-checkout-f\" name=\"line1\" placeholder=\"Address line 1\"><input class=\"kz-checkout-f\" name=\"line2\" placeholder=\"Address line 2\"><input class=\"kz-checkout-f\" name=\"city\" placeholder=\"City\"><input class=\"kz-checkout-f\" name=\"province\" placeholder=\"Province\"><input class=\"kz-checkout-f\" name=\"postal\" placeholder=\"Postal code\"><input class=\"kz-checkout-f\" name=\"country\" placeholder=\"Country\" value=\"South Africa\">"+
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
  var REQUIRED=["name","email","line1","city","postal"];
  var ADDRESS_FIELDS=["line1","line2","city","province","postal","country"];
  var HAS_ADDRESS=true;
  function submitCheckout(form){
    if(_checkingOut)return;
    var cart=loadCart();
    if(!cart.length){setMsg('Your cart is empty.','error');return;}
    var missing=false;
    for(var ri=0;ri<REQUIRED.length;ri++){if(!val(form,REQUIRED[ri])){missing=true;break;}}
    if(missing){setMsg("Please fill in your name, email, and delivery address.",'error');return;}
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
  window.__kizuriShopCheckout={add:add,renderCart:renderCart,openCart:openCart,closeCart:closeCart,toggleCart:toggleCart,handleReturn:handleReturn,loadCart:loadCart,saveCart:saveCart,prune:prune};
})();

  function applyInserts(doc, inserts){
    if(!inserts||!inserts.length)return;
    for(var i=0;i<inserts.length;i++){var ins=inserts[i];
      if(!ins||!ins.id||!ins.anchorId)continue;
      if(doc.querySelector('[data-kizuri-insert="'+ins.id+'"]'))continue;
      var anchor=doc.querySelector('[data-kizuri-edit="'+ins.anchorId+'"]');
      if(!anchor)continue;
      var b=doc.createElement('div');
      b.setAttribute('data-kizuri-shop',ins.type);
      b.setAttribute('data-kizuri-insert',ins.id);
      if(ins.type==='image'){
        b.innerHTML=renderImageInsertJs(ins.id);
      } else if(SECTION_TEMPLATES[ins.type]){
        b.setAttribute('data-kizuri-section-block',ins.type);
        b.innerHTML=renderSectionBlockJs(ins.type,ins.id);
      } else if(ins.type==='product'&&ins.productId){
        b.setAttribute('data-product',ins.productId);
      }
      if(ins.position==='append-child')anchor.appendChild(b);
      else if(ins.position==='before'){if(anchor.parentNode)anchor.parentNode.insertBefore(b,anchor);}
      else {if(anchor.parentNode)anchor.parentNode.insertBefore(b,anchor.nextSibling);}
    }
  }

  function renderDetail(container,p){
    var doc=container.ownerDocument;container.innerHTML='';
    var wrap=doc.createElement('div');wrap.className='kz-shop-detail';
    var sel={};var def=null;for(var i=0;i<p.variants.length;i++){if(p.variants[i].stock>0){def=p.variants[i];break;}}if(!def)def=p.variants[0];
    if(def){for(var k in def.option_values){if(def.option_values.hasOwnProperty(k))sel[k]=def.option_values[k];}}
    var img=p.images[0]||(def&&def.image_url)||'';
    var opts='';for(var o=0;o<p.options.length;o++){var ax=p.options[o];opts+='<label class="kz-shop-opt"><span>'+escHtml(ax.name)+'</span><select class="kz-shop-variant" data-axis="'+escAttr(ax.name)+'">';for(var vi=0;vi<ax.values.length;vi++){var vv=ax.values[vi];opts+='<option value="'+escAttr(vv)+'"'+(sel[ax.name]===vv?' selected':'')+'>'+escHtml(vv)+'</option>';}opts+='</select></label>';}
    wrap.innerHTML=(img?'<img class="kz-shop-detail-img" src="'+escAttr(img)+'" alt="'+escAttr(p.name)+'">':'')+'<h3 class="kz-shop-detail-name">'+escHtml(p.name)+'</h3>'+(p.description?'<p class="kz-shop-detail-desc">'+escHtml(p.description)+'</p>':'')+'<div class="kz-shop-price"></div><div class="kz-shop-stock"></div>'+opts+'<button type="button" class="kz-shop-addcart" data-kizuri-cart="'+escAttr(p.id)+'">Add to cart</button>';
    container.appendChild(wrap);
    var priceEl=wrap.querySelector('.kz-shop-price'),stockEl=wrap.querySelector('.kz-shop-stock'),addBtn=wrap.querySelector('.kz-shop-addcart');
    function refresh(){var v=findVariant(p,sel);priceEl.textContent=v?fmt(v.price_cents):range(p.variants);var oos=!v||v.stock<=0;stockEl.textContent=oos?'Out of stock':(v.stock+' in stock');addBtn.disabled=oos;}
    var selects=wrap.querySelectorAll('select.kz-shop-variant');
    for(var s=0;s<selects.length;s++){selects[s].addEventListener('change',function(e){sel[e.target.getAttribute('data-axis')]=e.target.value;refresh();});}
    addBtn.addEventListener('click',function(e){e.preventDefault();var v=findVariant(p,sel);if(!v||v.stock<=0)return;var item={variantId:v.id,productId:p.id,name:p.name,optionValues:sel,unitPriceCents:v.price_cents,qty:1};window.__kizuriShopCheckout.add(item);});
    refresh();
  }

  var FALLBACK_FONT='system-ui, -apple-system, Segoe UI, Roboto, sans-serif';

  // Walk up from the shop mount looking for the nearest ancestor carrying an
  // EXPLICIT font — i.e. the first one that differs from <html>'s own
  // computed font. Needed because the real theme font often lives on
  // SitePageShell's own wrapper div (a sibling of the shop mount under
  // <body>), not on <body> itself — reading only document.body silently
  // missed it and fell back to the generic default.
  function findThemedFont(root){
    try{
      var baseline=window.getComputedStyle(document.documentElement).fontFamily;
      var el=root.parentElement;
      while(el){
        var f=window.getComputedStyle(el).fontFamily;
        if(f&&f!==baseline)return f;
        el=el.parentElement;
      }
      var bodyFont=window.getComputedStyle(document.body).fontFamily;
      return bodyFont||'';
    }catch(e){return '';}
  }

  // Find the site's real call-to-action button, not just "the first a/button
  // in the document" — on the product-detail page SiteHeader renders BEFORE
  // the shop mount, so the old heuristic usually grabbed a plain nav link
  // with no explicit background, computing to a washed-out default instead
  // of the site's brand color. A genuine CTA almost always has a solid
  // (non-transparent) fill, which a nav/text link typically does not.
  function findThemeCta(){
    try{
      var candidates=document.querySelectorAll('a,button');
      for(var i=0;i<candidates.length;i++){
        var cs=window.getComputedStyle(candidates[i]);
        var bg=cs.backgroundColor;
        if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'){
          return {background:bg,color:cs.color};
        }
      }
    }catch(e){}
    return null;
  }

  // A standalone product-detail page has no layout of its own — the AI never
  // designed it, so nothing reserves space for a fixed or sticky positioned
  // header (common: sites float their header over a home-page hero, which
  // doesn't exist here). Found live: the header rendered on TOP of the
  // product image/title. Measures any fixed/sticky element docked to the
  // viewport top and returns its rendered height, so the mount can pad
  // itself clear of it — tag-name agnostic (works whether the AI used
  // header or a plain div).
  function findFixedHeaderHeight(){
    try{
      var all=document.body.getElementsByTagName('*');
      var maxBottom=0;
      for(var i=0;i<all.length;i++){
        var cs=window.getComputedStyle(all[i]);
        if(cs.position==='fixed'||cs.position==='sticky'){
          var rect=all[i].getBoundingClientRect();
          if(rect.top<=1&&rect.bottom>maxBottom)maxBottom=rect.bottom;
        }
      }
      return maxBottom;
    }catch(e){return 0;}
  }

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
  

  function applyTheme(root,type){
    try{
      var font=findThemedFont(root);
      root.style.setProperty('--kz-font',font||FALLBACK_FONT);
      var accent='#111',contrast='#fff';
      var cta=findThemeCta();
      if(cta){
        accent=cta.background;
        if(cta.color)contrast=cta.color;
      }
      root.style.setProperty('--kz-accent',accent);
      root.style.setProperty('--kz-accent-contrast',contrast);
    }catch(e){
      root.style.setProperty('--kz-font',FALLBACK_FONT);
      root.style.setProperty('--kz-accent','#111');
      root.style.setProperty('--kz-accent-contrast','#fff');
    }
    // Only the standalone product page needs this — a product-grid embedded
    // mid-page already sits inside the AI's own layout, which accounts for
    // the header; adding clearance there would double up existing spacing.
    if(type==='product'){
      var headerHeight=findFixedHeaderHeight();
      if(headerHeight>0)root.style.setProperty('--kz-shop-clear-top',(headerHeight+32)+'px');
    }
  }

  // ES5 copy of lib/ui-generator/shop-sort.ts. Keep the two behaviourally
  // aligned — shop-sort.test.ts eval-runs THIS copy against the same
  // expectations as the TS core, so a change here without a change there fails.
  var SORT_OPTIONS=[['featured','Featured'],['price-asc','Price: low to high'],['price-desc','Price: high to low'],['name-asc','Name: A to Z']];
  var _sortKey='featured';
  function sortPriceCents(p){
    var vs=p.variants||[],min=null,i,c;
    for(i=0;i<vs.length;i++){c=vs[i]&&vs[i].price_cents;if(typeof c!=='number'||!isFinite(c))continue;if(min===null||c<min)min=c;}
    return min;
  }
  function sortProducts(products,key){
    var list=(products||[]).slice();
    if(key==='featured')return list;                       // merchant's own order
    var wi=[],i;for(i=0;i<list.length;i++)wi.push({p:list[i],i:i});
    wi.sort(function(a,b){
      if(key==='name-asc'){
        var cmp=String(a.p.name||'').localeCompare(String(b.p.name||''),undefined,{sensitivity:'base',numeric:true});
        return cmp!==0?cmp:a.i-b.i;
      }
      var pa=sortPriceCents(a.p),pb=sortPriceCents(b.p);
      if(pa===null&&pb===null)return a.i-b.i;
      if(pa===null)return 1;                               // unpriced sinks, both ways
      if(pb===null)return -1;
      var d=key==='price-asc'?pa-pb:pb-pa;
      return d!==0?d:a.i-b.i;
    });
    var out=[];for(i=0;i<wi.length;i++)out.push(wi[i].p);return out;
  }

  function renderBlock(el,catalog){
    var type=el.getAttribute('data-kizuri-shop');el.innerHTML='';if((' '+el.className+' ').indexOf(' kz-shop-root ')<0)el.className=(el.className+' kz-shop-root').trim();
    applyTheme(el,type);
    applyDesignTokens(el, KZ_DESIGN_TOKENS_MANIFEST);
    if(type==='product-grid'){
      // Sort control. Only worth showing when there is more than one product —
      // a lone item with a "sort by" menu above it reads as clutter.
      if(catalog.products.length>1){
        var bar=el.ownerDocument.createElement('div');bar.className='kz-shop-sortbar';
        var sel=el.ownerDocument.createElement('select');
        sel.className='kz-shop-sort';sel.setAttribute('data-kizuri-sort','');
        sel.setAttribute('aria-label','Sort products');
        var oi,opt;
        for(oi=0;oi<SORT_OPTIONS.length;oi++){
          opt=el.ownerDocument.createElement('option');
          opt.value=SORT_OPTIONS[oi][0];opt.textContent=SORT_OPTIONS[oi][1];
          if(SORT_OPTIONS[oi][0]===_sortKey)opt.selected=true;
          sel.appendChild(opt);
        }
        sel.addEventListener('change',function(){
          _sortKey=sel.value;
          renderBlock(el,catalog);        // re-render from the UNSORTED catalog
        });
        bar.appendChild(sel);el.appendChild(bar);
      }
      var grid=el.ownerDocument.createElement('div');grid.className='kz-shop-grid';
      var ordered=sortProducts(catalog.products,_sortKey);
      for(var i=0;i<ordered.length;i++){(function(p){
        var card=fillCardTemplateJs(CARD_TEMPLATE_HTML,p,el.ownerDocument);
        var link=el.ownerDocument.createElement('a');
        link.href='/product/'+encodeURIComponent(p.id);
        link.className='kz-shop-card-link';
        link.style.display='block';link.style.textDecoration='none';link.style.color='inherit';
        link.appendChild(card);
        grid.appendChild(link);
      })(ordered[i]);}
      if(!catalog.products.length)grid.innerHTML='<div class="kz-shop-empty">No products yet.</div>';
      el.appendChild(grid);return;
    }
    if(type==='product'){var id=el.getAttribute('data-product');var p=null;for(var k=0;k<catalog.products.length;k++){if(catalog.products[k].id===id){p=catalog.products[k];break;}}if(!p){el.innerHTML='<div class="kz-shop-empty">This product is unavailable.</div>';return;}renderDetail(el,p);return;}
  }

  // cart drawer + checkout + return are now owned by the shared checkout core
  // (window.__kizuriShopCheckout) injected above.
  function renderCart(){window.__kizuriShopCheckout.renderCart();}
  function openCart(){window.__kizuriShopCheckout.openCart();}
  function handleReturn(){window.__kizuriShopCheckout.handleReturn();}

  var _catalog=null;
  function hideMount(el){try{el.innerHTML='';el.style.display='none';}catch(e){}}
  // Products whose category_id matches the mount's data-kizuri-category, or —
  // for a mount with NO data-kizuri-category attribute — products with no
  // category_id at all. A catalog where every product is uncategorized and
  // there is exactly one grid mount (also uncategorized) is the pre-existing
  // shape: every product matches, byte-for-byte the same as before categories
  // existed.
  function productsForMount(el,catalog){
    var wantCat=el.getAttribute('data-kizuri-category');
    var all=(catalog&&catalog.products)||[];
    var out=[];
    for(var i=0;i<all.length;i++){
      var p=all[i];
      var pCat=p.category_id||null;
      if(wantCat){if(pCat===wantCat)out.push(p);}
      else{if(!pCat)out.push(p);}
    }
    return out;
  }
  function renderAll(catalog){
    _catalog=catalog;
    // ONLY manage product mounts. A site can carry a booking mount
    // (data-kizuri-shop="booking") owned by kizuri-booking.js — the shop runtime must
    // NOT touch it (it used to hideMount() it, blanking the booking widget).
    var all=document.querySelectorAll('[data-kizuri-shop]');
    var grids=[],products=[];
    for(var bi=0;bi<all.length;bi++){
      var t=all[bi].getAttribute('data-kizuri-shop');
      if(t==='product-grid')grids.push(all[bi]);
      else if(t==='product')products.push(all[bi]);
    }
    if(grids.length){
      // Every grid mount renders — each with ONLY the subset of the catalog
      // matching its own category (or the uncategorized subset, for a mount
      // with no data-kizuri-category). This REPLACES the old "first grid wins,
      // hide the rest" rule: with categories, more than one grid is now a
      // valid, intentional page structure, not AI-generated duplication.
      for(var gi=0;gi<grids.length;gi++){
        renderBlock(grids[gi],{products:productsForMount(grids[gi],catalog)});
      }
      // A stray product (single-item) mount is still always hidden whenever
      // any grid exists — categories don't change this: the grid still owns
      // click-through to product detail, so a product mount alongside a
      // grid is exactly the "AI emitted an extra mount" case the platform has
      // always guarded against.
      for(var pi=0;pi<products.length;pi++)hideMount(products[pi]);
      return;
    }
    // No grid at all: fall back to the pre-existing single-product-mount rule,
    // completely unaffected by categories.
    var firstProduct=products.length?products[0]:null;
    for(var m=0;m<products.length;m++){
      if(products[m]===firstProduct)renderBlock(products[m],catalog);
      else hideMount(products[m]);
    }
  }

  // expose for the editor chrome to render a freshly-inserted block
  window.__kizuriShop={renderInto:function(el){if(_catalog)renderBlock(el,_catalog);}};

  function boot(edits, catalog, catalogIsLive){
    injectShopStyles();
    applyInserts(document, (edits && edits._inserts) || []);
    // Section blocks we just mounted from _inserts carry data-kizuri-section, so
    // any structural op (_sections) targeting them could not apply when
    // kizuri-editor.js ran first (the nodes didn't exist yet). Re-run those ops now
    // that the sections are in the DOM. Idempotent, so already-applied ops are safe.
    if (window.__kizuriApplySections) { try { window.__kizuriApplySections(); } catch(e){} }
    if (window.__kizuriApplyEdits) { try { window.__kizuriApplyEdits(); } catch(e){} }
    renderAll(catalog || {products:[]});
    // _cardVars (the merchant's saved Card style overrides) targets
    // .kz-shop-root elements, which renderAll/renderBlock only just stamped
    // onto each grid/product mount above — the pre-renderAll call to
    // __kizuriApplyEdits two lines up (needed so edits on newly-mounted
    // _inserts apply) runs too early to see them, so those variables were
    // silently never restored on a fresh page load. applyEdits is idempotent
    // (each branch just re-sets the same DOM property/attribute), so calling
    // it again here is safe — this second call exists purely to give the
    // _cardVars branch a .kz-shop-root to actually find.
    if (window.__kizuriApplyEdits) { try { window.__kizuriApplyEdits(); } catch(e){} }
    // With a LIVE catalog, drop cart lines it doesn't contain (deleted/draft/
    // re-seeded variants would only fail server-side at pricing). catalogIsLive
    // is false on fetch failure so an outage never wipes the cart.
    if(catalogIsLive){
      var validIds=[];var ps=(catalog&&catalog.products)||[];
      for(var pi=0;pi<ps.length;pi++){var vs=ps[pi].variants||[];for(var vi=0;vi<vs.length;vi++)validIds.push(vs[vi].id);}
      window.__kizuriShopCheckout.prune(validIds);
    }
    renderCart();
    handleReturn();
  }

  // Test hook: synchronous, no network. Hook catalog counts as live.
  if (typeof window!=='undefined' && window.__KIZURI_SHOP_TEST__){
    boot(window.__KIZURI_SHOP_TEST__.edits, window.__KIZURI_SHOP_TEST__.catalog, true);
    return;
  }

  // Share the site_edits doc with kizuri-editor.js (one GET per load).
  function getEdits(){
    if(window.__kizuriEdits)return window.__kizuriEdits; // promise or value stashed by editor
    window.__kizuriEdits = fetch(EDITS_URL,{headers:{'Accept':'application/json'}}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};});
    return window.__kizuriEdits;
  }
  function run(){
    Promise.resolve(getEdits()).then(function(edits){
      fetch(STOREFRONT_URL,{headers:{'Accept':'application/json'}}).then(function(r){if(!r.ok)throw new Error('catalog');return r.json();}).then(function(cat){boot(edits||{},cat||{products:[]},true);}).catch(function(){boot(edits||{},{products:[]},false);});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();