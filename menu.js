(function () {
  "use strict";
  var nav = document.querySelector(".navbar");
  var list = document.getElementById("main-menu");
  var toggle = document.querySelector(".menu-toggle");
  var mq = window.matchMedia("(max-width: 960px)");

  function setOpen(open) {
    if (!list || !toggle) return;
    list.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open) {
      document.querySelectorAll(".has-dd.open").forEach(function (li) {
        li.classList.remove("open");
        var b = li.querySelector(".dd-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!list.classList.contains("open"));
    });
  }

  document.querySelectorAll(".dd-toggle").forEach(function (btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      var li = btn.parentElement;
      var open = !li.classList.contains("open");
      li.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // Close the mobile menu with Escape or a click outside the header
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  document.addEventListener("click", function (e) {
    if (nav && !nav.contains(e.target)) setOpen(false);
  });
  mq.addEventListener && mq.addEventListener("change", function () { setOpen(false); });

  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
