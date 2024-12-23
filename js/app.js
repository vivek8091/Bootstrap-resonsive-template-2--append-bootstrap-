AOS.init({
  debug: true,
});

// Add a scroll event listener to the window...
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    body.classList.add("scrolled"); // Add the scrolled class when the page is scrolled down
  } else {
    body.classList.remove("scrolled"); // Remove the scrolled class when at the top of the page
  }
});

// Select the header element...
const body = document.querySelector(".index-page");
// Scroll after click on nav links selections...
const sections = document.querySelectorAll("section"); // Replace with the appropriate selector for your sections
const menuLinks = document.querySelectorAll(".navmenu ul li a"); // Adjust the selector if necessary
const headerHeight = document.querySelector(".header")?.offsetHeight || 0; // Adjust if your header height is dynamic
// Mobile nav opens selections...
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navbar = document.querySelector("body");


// Scroll after click logic...
function setActiveLink() {
  // Function to set the active link
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSectionId = section.id; // Assign the current visible section ID
    }
  });

  // Remove active class from all links
  menuLinks.forEach((link) => link.parentElement.classList.remove("active"));

  // Add active class to the link corresponding to the current section
  if (currentSectionId) {
    const activeLink = document.querySelector(
      `.navmenu ul li a[href="#${currentSectionId}"]`
    );
    if (activeLink) activeLink.parentElement.classList.add("active");
  }
}

// Add scroll listener
window.addEventListener("scroll", setActiveLink);

// Call setActiveLink on page load to ensure the correct link is active
setActiveLink();

// Smooth scroll when clicking on menu links
// const links = document.querySelector(".navmenu")
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navbar.classList.remove("mobile-nav-active");
    mobileNavToggle.classList.replace("bi-x", "bi-list");
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const position = targetSection.offsetTop - headerHeight; // Adjust for header height
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  });
});


// Add click event listener to the toggle button
mobileNavToggle.addEventListener("click", () => {
  navbar.classList.toggle("mobile-nav-active");
  if (mobileNavToggle.classList.contains("bi-list")) {
    mobileNavToggle.classList.replace("bi-list", "bi-x");
  } else {
    mobileNavToggle.classList.replace("bi-x", "bi-list");
  }
});

document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
  navmenu.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentNode.classList.toggle("active");
    this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
    e.stopImmediatePropagation();
  });
});
