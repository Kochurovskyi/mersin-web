///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Fixing background-attachment: fixed if its safari
window.onload = function () {
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    var element = document.querySelector(".section-hero");
    if (element) {
      element.style.backgroundAttachment = "scroll";
    }
  }
};

// check if all form inputs are filled
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".cta-form");
  var inputs = Array.from(form.querySelectorAll("input"));
  var button = form.querySelector(".btn");

  function checkInputs() {
    var allFilled = inputs.every(function (input) {
      return input.value.trim() !== "";
    });

    button.disabled = !allFilled;
  }

  inputs.forEach(function (input) {
    input.addEventListener("input", checkInputs);
  });

  checkInputs();

  // Add event listener to button
  button.addEventListener("click", function (event) {
    if (button.disabled) {
      event.preventDefault();
      alert("Please fill all the fields correctly before proceeding.");
    }
  });
});

// Open google form in new tab
const formButton = document.querySelector(".btn--form");
formButton.addEventListener("click", function () {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSdlcvCIgZAHsnPhpUAj81aRBySXeS3259LKjri6XQjE3bjOOw/viewform"
  );
});
