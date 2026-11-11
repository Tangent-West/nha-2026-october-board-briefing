const nav = document.querySelector(".top-nav");
const toggle = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector("#mobilePanel");
const navLinks = [...document.querySelectorAll(".nav-links a")];

function setMenu(open) {
  mobilePanel.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

function updateNav() {
  nav.classList.toggle("scrolled", window.scrollY > 28);
}

updateNav();
window.addEventListener("scroll", updateNav, { passive: true });
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") === "false"));
mobilePanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
nav.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    toggle.focus();
  }
});
window.matchMedia("(min-width: 1181px)").addEventListener("change", () => setMenu(false));

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const link of navLinks) {
      const current = link.hash === "#" + entry.target.id;
      link.classList.toggle("active", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
}, { rootMargin: "-20% 0px -70% 0px" });
for (const link of navLinks) sectionObserver.observe(document.querySelector(link.hash));

const video = document.querySelector(".hero video");
const videoToggle = document.querySelector(".video-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function syncVideoButton() {
  const label = video.paused ? "Play background video" : "Pause background video";
  videoToggle.setAttribute("aria-label", label);
  videoToggle.title = label;
  videoToggle.firstElementChild.textContent = video.paused ? "\u25b6" : "\u275a\u275a";
}
videoToggle.hidden = false;
video.addEventListener("play", syncVideoButton);
video.addEventListener("pause", syncVideoButton);
videoToggle.addEventListener("click", () => {
  if (video.paused) video.play().catch(syncVideoButton);
  else video.pause();
});
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) video.pause();
});
if (!reducedMotion.matches) video.play().catch(syncVideoButton);
