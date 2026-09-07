/* ============================================================
   iLink — nav scroll-spy
   Highlights the nav link whose section is currently in view.
   Nav links opt in with data-section="<section id>".
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-link[data-section]')
    );
    if (!links.length) return;

    var sections = [];
    var linkFor = {};

    links.forEach(function (link) {
      var section = document.getElementById(link.getAttribute('data-section'));
      if (section) {
        sections.push(section);
        linkFor[section.id] = link;
      }
    });
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle('active', link === linkFor[id]);
      });
    }

    // Without IntersectionObserver the markup's default active link just stays put.
    if (!('IntersectionObserver' in window)) return;

    // Activation band: from just under the sticky navbar down to 30% of the
    // viewport. A section becomes active as its top crosses into that band.
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });

    // At the very bottom the last section's top may sit above the band, so
    // pin the final link once the page is scrolled all the way down.
    window.addEventListener('scroll', function () {
      var atBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(sections[sections.length - 1].id);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
