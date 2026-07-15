/* dathoang1412.github.io — hand-rolled, no frameworks */
(function () {
  "use strict";

  /* ---------- theme: day / night, remembered ---------- */
  var root = document.documentElement;
  var lamp = document.querySelector(".lamp");

  function setLampLabel() {
    if (lamp) {
      lamp.textContent = root.classList.contains("dark")
        ? "☀ day"
        : "☾ night";
    }
  }

  setLampLabel();

  if (lamp) {
    lamp.addEventListener("click", function () {
      root.classList.add("theme-anim");
      root.classList.toggle("dark");
      try {
        localStorage.setItem(
          "theme",
          root.classList.contains("dark") ? "dark" : "light"
        );
      } catch (e) {}
      setLampLabel();
    });
  }

  /* ---------- clock: time in ho chi minh city ---------- */
  var clock = document.getElementById("clock");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    var tick = function () {
      clock.textContent = fmt.format(new Date());
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- today's date, for the epigraph ---------- */
  var today = document.getElementById("today");
  if (today) {
    today.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "numeric",
      month: "long",
      year: "numeric"
    })
      .format(new Date())
      .toLowerCase();
  }

  /* ---------- reveal on scroll ---------- */
  var revealed = document.querySelectorAll(".reveal");
  if (revealed.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealed.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealed.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- a note for fellow devs ---------- */
  if (typeof console !== "undefined" && console.log) {
    console.log(
      "%c❦  h o à n g   t ấ n   đ ạ t",
      "font-family: Georgia, serif; font-size: 16px; font-style: italic;"
    );
    console.log(
      "hand-built with html, css & a little js — no frameworks were harmed.\n" +
        "source: https://github.com/dathoang1412/dathoang1412.github.io"
    );
  }
})();
