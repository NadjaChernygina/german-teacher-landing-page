// Header scroll
const header = document.getElementById("header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

// Hamburger / mobile nav
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
  hamburger.classList.add("open");
  mobileNav.classList.add("open");
  navOverlay.style.display = "block";
  setTimeout(() => navOverlay.classList.add("visible"), 10);
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("open");
  mobileNav.classList.remove("open");
  navOverlay.classList.remove("visible");
  setTimeout(() => {
    navOverlay.style.display = "none";
  }, 350);
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  mobileNav.classList.contains("open") ? closeMenu() : openMenu();
});
navOverlay.addEventListener("click", closeMenu);

mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

revealEls.forEach((el) => io.observe(el));

// Hero immediately visible
document.querySelectorAll("#hero .reveal").forEach((el) => {
  setTimeout(() => el.classList.add("visible"), 100);
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = "Nachricht gesendet!";
  btn.style.background = "#2e4a3e";
  btn.disabled = true;
  e.target.reset();
  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    btn.style.background = "";
  }, 3500);
}

const track = document.getElementById("testimonialsTrack");

document.querySelector(".testimonials__btn--next").onclick = () => {
  track.scrollBy({ left: 320, behavior: "smooth" });
};

document.querySelector(".testimonials__btn--prev").onclick = () => {
  track.scrollBy({ left: -320, behavior: "smooth" });
};

(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────────────────────
  // FIX: paths now match your actual flat-file page structure.
  // To add a language: push one entry here + one <li>/<a> in HTML.
  const LANGUAGES = [
    { code: "DE", path: "index.html" },
    { code: "UA", path: "index-ua.html" },
    { code: "RU", path: "index-ru.html" },
  ];

  // ── Detect Active Language ──────────────────────────────────────────
  // FIX: check the filename at the end of the pathname, not a directory prefix.
  function getActiveLang() {
    // e.g. "/index-ua.html" → "index-ua.html"
    const filename =
      window.location.pathname.split("/").filter(Boolean).pop() || "index.html"; // root "/" → treat as index.html

    const match = LANGUAGES.find((l) => l.path === filename);
    return match ? match.code : "DE"; // safe fallback
  }

  // ── Desktop Dropdown ────────────────────────────────────────────────
  function initDesktopLangSwitch() {
    const wrapper = document.querySelector(".lang-switch");
    const trigger = document.getElementById("lang-trigger");
    const dropdown = document.getElementById("lang-dropdown");
    const current = document.getElementById("lang-current");

    if (!wrapper || !trigger || !dropdown || !current) return;

    const activeLang = getActiveLang();

    // Update the visible label
    current.textContent = activeLang;

    // Mark active option — also blocks re-selecting the current page
    dropdown.querySelectorAll(".lang-switch__option").forEach((link) => {
      const isActive = link.dataset.lang === activeLang;
      link.classList.toggle("is-active", isActive);
      link.closest("li").setAttribute("aria-selected", String(isActive));
    });

    // ── Open / Close helpers
    function openDropdown() {
      wrapper.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }

    function closeDropdown() {
      wrapper.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }

    // Toggle on trigger click
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      wrapper.classList.contains("is-open") ? closeDropdown() : openDropdown();
    });

    // Close when clicking anywhere outside the widget
    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDropdown();
    });

    // NOTE: Redirect is handled by the native <a href> on each option.
    // No JS redirect needed — cleaner, faster, works without JS.
  }

  // ── Mobile Lang ─────────────────────────────────────────────────────
  function initMobileLang() {
    const container = document.querySelector(".mobile-lang");
    if (!container) return;

    const activeLang = getActiveLang();

    container.querySelectorAll(".mobile-lang__option").forEach((link) => {
      const isActive = link.dataset.lang === activeLang;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
    });

    // NOTE: Same as desktop — redirect is the native <a href>. No JS needed.
  }

  // ── Init ────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    initDesktopLangSwitch();
    initMobileLang();
  });
})();
