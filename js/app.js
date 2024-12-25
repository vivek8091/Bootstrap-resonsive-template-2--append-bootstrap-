/**
 * Animation on scroll function and init
 */
function aosInit() {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}
window.addEventListener("load", aosInit);

/**
 * Initiate glightbox
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GLightbox
  const glightbox = GLightbox({
    selector: ".glightbox",
  });
});

// Add a scroll event listener to the window...
const handleScroll = () => {
  // console.log("Scrolling... Y Offset:", window.scrollY);
  if (window.scrollY > 50) {
    // console.log("Adding scrolled class");
    body.classList.add("scrolled");
  } else {
    // console.log("Removing scrolled class");
    body.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);

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

  // Remove active class from all links...
  menuLinks.forEach((link) => link.parentElement.classList.remove("active"));

  // Add active class to the link corresponding to the current section
  if (currentSectionId) {
    const activeLink = document.querySelector(
      `.navmenu ul li a[href="#${currentSectionId}"]`
    );
    if (activeLink) activeLink.parentElement.classList.add("active");
  }
}

// Add scroll listener...
window.addEventListener("scroll", setActiveLink);

// Call setActiveLink on page load to ensure the correct link is active...
setActiveLink();

// Smooth scroll when clicking on menu links...
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

// Add click event listener to the toggle button...
mobileNavToggle.addEventListener("click", () => {
  navbar.classList.toggle("mobile-nav-active");
  if (mobileNavToggle.classList.contains("bi-list")) {
    mobileNavToggle.classList.replace("bi-list", "bi-x");
  } else {
    mobileNavToggle.classList.replace("bi-x", "bi-list");
  }

  // To remove active and dropdown-active class drop dropdown after closing navmenu...

  document.querySelectorAll(".navmenu .dropdown ul").forEach((ul) => {
    ul.classList.remove("dropdown-active");
  });

  document.querySelectorAll(".navmenu .dropdown .active").forEach((active) => {
    active.classList.remove("active");
  });
});

document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
  navmenu.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentNode.classList.toggle("active");
    this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
    e.stopImmediatePropagation();
  });
});

// Portfolio section...
/**
 * Init isotope layout and filters
 */
document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
  let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
  let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
  let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

  let initIsotope;
  imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
    initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
      itemSelector: ".isotope-item",
      layoutMode: layout,
      filter: filter,
      sortBy: sort,
    });
  });

  isotopeItem
    .querySelectorAll(".isotope-filters li")
    .forEach(function (filters) {
      filters.addEventListener(
        "click",
        function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          if (typeof aosInit === "function") {
            aosInit();
          }
        },
        false
      );
    });
});

/**
 * Init swiper sliders
 */
function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim()
    );

    if (swiperElement.classList.contains("swiper-tab")) {
      initSwiperWithCustomPagination(swiperElement, config);
    } else {
      new Swiper(swiperElement, config);
    }
  });
}

window.addEventListener("load", initSwiper);


// FAQ Section...
document.querySelectorAll('.faq-item h3, .faq-toggle').forEach((faqItem) => {
faqItem.addEventListener('click', () => {
  const currentitem = faqItem.closest('.faq-item');

  document.querySelectorAll('.faq-item').forEach((item) => {
    if(item !== currentitem){
      item.classList.remove('faq-active');
    }
  });

  currentitem.classList.toggle('faq-active');
});
});