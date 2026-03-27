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
