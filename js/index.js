const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
const mobileNavLinks = document.querySelector(".mobile-nav-links");
const mobileNavToggleLine2 = document.querySelector(
  ".mobile-nav-toggle-line-2"
);
const mobileNavToggleLine3 = document.querySelector(
  ".mobile-nav-toggle-line-3"
);
const mobileNavToggleLine1 = document.querySelector(
  ".mobile-nav-toggle-line-1"
);

function toggleMobileNav() {
  // animation for mobile nav links
  mobileNavLinks.classList.toggle("active-mobile-nav-links");

  // animation for burger button
  mobileNavToggleLine2.classList.toggle("active-mobile-nav-toggle-line-2");
  mobileNavToggleLine3.classList.toggle("active-mobile-nav-toggle-line-3");
  mobileNavToggleLine1.classList.toggle("active-mobile-nav-toggle-line-1");
}

mobileNavToggleBtn.addEventListener("click", () => {
  toggleMobileNav();
});

mobileNavLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    toggleMobileNav();
  }
});
