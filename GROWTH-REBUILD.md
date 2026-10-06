# RIKOMOKO / Store-first rebuild

## 1. Current-site audit
Previous static site used a two-column hero, large character images and four capability stories. It had an email-draft flow but no complete goal-first entry system, inline knowledge articles or explicit free diagnostic scope. Existing HTML/CSS/JS and contact configuration retained; no framework or hosting migration.

## 2. References
- https://ai.funtech.inc/en — inspected live content and hero. Oversized typography, manifesto, motion and editorial section rhythm informed the visual direction. No stickers, brand, imagery, copy or full composition copied.
- https://tatap.jp/ — inspected live content and hero. Strategy-led service organization, knowledge and work content informed business clarity. No client logos, customer results or company information reused.
- Prior conversion requirements retained: process, scope, pricing and consultation CTA. MINAMOTO was not freshly inspected in this revision.

## 3–5. Gap, architecture and system
Hero → Manifesto → five goals → Approach → five capabilities → four customer stages → Channels → Demo → Creator → seven-step process → three plans → four inline Insights → Stance/About → FAQ → CTA → Contact.

Paper #F5F3EE, ink #111111, green #2F5D50, limited lime #D2FB68. System sans fonts avoid external blocking loads. Large text, asymmetric columns and ruled lists replace repeated rounded cards. Main stylesheet is growth.css; legacy styles are not loaded.

## 6. Implementation
Semantic sections, single h1, native details, labelled form, skip link, keyboard focus styles and privacy dialog. Existing mail-draft generation/invalidation preserved. Paid plans preselect their service. Free diagnosis covers one store's public information and three improvement points; detailed research is quoted separately. User-supplied Chinese-language/team strengths included without invented partners or numbers.

## 7. Mobile QA
Browser checked at 1440, 1280, 768 and 390px: no document horizontal overflow or overflowing headings. Inspected desktop hero and mobile hero, goals and services. Corrected mobile service heading wrapping. Menu closes after navigation and updates aria-expanded. Consultation routing, FAQ and knowledge expansion tested.

## 8. Animation QA
Text-mask entrance, IntersectionObserver reveals, horizontal text marquee and desktop scroll image scale. Manual pause verified to set animation-name:none. CSS and JS respect prefers-reduced-motion; the OS preference itself was not changed in testing. Ticker pauses off-screen; mobile removes scroll image movement. No WebGL, animation dependency or scroll hijacking.

## 9. Performance QA
One 800px WebP illustration (~132KB), lazy loaded with dimensions. No external fonts/scripts. Syntax and structural scripts pass. Browser console checked with no warnings/errors observed. Lighthouse not available through current supported browser controls: no score reported. Performance >85 / accessibility >90 / SEO >95 / best practices >90 remain measurement targets, not verified scores.

## 10. Functional review
Email draft verified with selected service and configured recipient; input edits invalidate it. No email sent. Privacy modal open/close tested. Demo explicitly fictional, no fabricated results. Free diagnosis does not automatically create a contract or charge. Deployment uses existing GitHub Pages URL.
