'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// SKILLS PAGINATION
const skillsList = document.querySelector(".skills-list");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const skillsItems = document.querySelectorAll(".skills-item");
const skillsPerPage = 5;
let currentPage = 0;

function updateSkills() {
    const startIndex = currentPage * skillsPerPage;
    const endIndex = startIndex + skillsPerPage;

    skillsItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    // Aggiorna la visualizzazione del pulsante "Precedente"
    if (currentPage === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "inline-block";
    }

    // Aggiorna la visualizzazione del pulsante "Successivo"
    if (currentPage === Math.ceil(skillsItems.length / skillsPerPage) - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "inline-block";
    }
}

// Event listener per il bottone "Precedente"
prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updateSkills();
    }
});

// Event listener per il bottone "Successivo"
nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(skillsItems.length / skillsPerPage) - 1) {
        currentPage++;
        updateSkills();
    }
});

prevButton.style.display = "none";

// Aggiorna la visualizzazione iniziale
updateSkills();