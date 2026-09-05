(function () {
  var revealed = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !revealed.length) {
    revealed.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealed.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 60, 300) + "ms";
    observer.observe(el);
  });

  // Safety net: if something prevents the observer from firing
  // (very tall viewport, automated capture, timing quirks), never
  // leave content permanently invisible.
  setTimeout(function () {
    revealed.forEach(function (el) { el.classList.add("in-view"); });
  }, 2000);
})();
