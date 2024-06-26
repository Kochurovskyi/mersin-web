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
    // console.log(ent);
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

// -------------------------------- Form Validation -------------------
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".cta-form");
  var inputs = Array.from(form.querySelectorAll("input"));
  var button = form.querySelector(".btn--form");

  function checkInputs() {
    var allFilled = inputs.every(function (input) {
      return input.value.trim() !== "" && input.checkValidity();
    });

    if (allFilled) {
      button.classList.remove("disabled");
    } else {
      button.classList.add("disabled");
    }
  }
  inputs.forEach(function (input) {
    input.addEventListener("input", checkInputs);
  });
  checkInputs();

  // -------------------------------- Form Submission (button)-------------------
  button.addEventListener("click", function (event) {
    if (button.classList.contains("disabled")) {
      event.preventDefault();
      // alert("Please fill all the fields correctly before proceeding.");
    } else {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSdlcvCIgZAHsnPhpUAj81aRBySXeS3259LKjri6XQjE3bjOOw/viewform"
      );
    }
  });
});

// -------------------------------- Language Translation -------------------

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to set the language preference
async function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = langData[key];
  });
}

// Function to update flag based on selected language
async function updateFlag(lang) {
  const flagObject = document.querySelector(".lang-flag");
  flagObject.setAttribute("data", `img/${lang}.svg`);
}

// Event listener for language selector dropdown
const languageSelector = document.getElementById("language-selector");
languageSelector.addEventListener("change", async function () {
  const lang = this.value;
  console.log(lang);
  await setLanguagePreference(lang);
  await updateFlag(lang);
});

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  // Set the selected option in the dropdown to match the current language
  languageSelector.value = userPreferredLanguage;
  updateFlag(languageSelector.value);
});
