// Content lives in data objects so the visual sections stay easy to update.
const skills = [
  { name: "Java & Spring", level: 92 },
  { name: "Node.js / TypeScript", level: 90 },
  { name: "AWS & cloud architecture", level: 86 },
  { name: "Microservices & APIs", level: 91 },
  { name: "SQL & data integration", level: 84 },
  { name: "Python", level: 78 }
];

const projects = [
  {
    number: "01 / 04",
    title: "ID2Issuance",
    description: "A cloud-native credential issuance platform built from scalable backend microservices, APIs, AWS Lambdas, and Step Functions for motor vehicle agencies.",
    stack: ["Node.js", "Java", "AWS"],
    links: [["Case study", "https://www.linkedin.com/in/kevinrana"]]
  },
  {
    number: "02 / 04",
    title: "Issuance 360 Back Office",
    description: "Enterprise application features for securely managing millions of identity credentials used by motor vehicle agencies.",
    stack: ["Java", "JavaScript", "SQL"],
    links: [["Case study", "https://www.linkedin.com/in/kevinrana"]]
  },
  {
    number: "03 / 04",
    title: "Node.js Chat App",
    description: "A real-time multi-user chat application demonstrating event-driven communication with Socket.io and a lightweight web interface.",
    stack: ["Node.js", "Socket.io", "HTML/CSS"],
    links: [["GitHub", "https://github.com/"]]
  },
  {
    number: "04 / 04",
    title: "NJIT Exam Grading System",
    description: "A backend web application that semi-automated exam creation, submission, and grading workflows by 50%.",
    stack: ["PHP", "SQL", "JSON"],
    links: [["GitHub", "https://github.com/"]],
    wide: true
  }
];

const skillsList = document.querySelector("#skills-list");
const projectGrid = document.querySelector("#project-grid");

function renderSkills() {
  skillsList.innerHTML = skills.map(({ name, level }) => `
    <div class="skill-item">
      <div class="skill-top"><span>${name}</span><span class="skill-level">${level}%</span></div>
      <div class="skill-track" role="progressbar" aria-label="${name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${level}">
        <div class="skill-fill" style="--level: ${level}"></div>
      </div>
    </div>
  `).join("");
}

function renderProjects() {
  projectGrid.innerHTML = projects.map((project) => `
    <article class="project-card${project.wide ? " project-card-wide" : ""} reveal">
      <span class="project-number">${project.number}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-bottom">
        <div class="project-stack">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
        <div class="project-links">${project.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

renderSkills();
renderProjects();

// Keep the supplied headshot prominent on the landing view while placing the
// family illustration after the professional introduction.
const heroArt = document.querySelector(".hero-art");
const familyStory = document.querySelector("#family-story");
const familyScene = heroArt.querySelector(".family-scene");
const artLabels = heroArt.querySelectorAll(".art-label");
familyStory.append(familyScene, ...artLabels);
heroArt.classList.add("hero-headshot");
heroArt.setAttribute("aria-label", "Professional headshot of Kevin Rana");
heroArt.innerHTML = '<img src="assets/kevin-rana-profile.jpg" alt="Professional headshot of Kevin Rana" />';

// Reveal content as it enters the viewport, including dynamically rendered cards.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-fill").forEach((fill) => fill.classList.add("is-visible"));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
skillObserver.observe(skillsList);

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#current-year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formStatus = contactForm.querySelector(".form-status");
  const name = new FormData(contactForm).get("name");
  formStatus.textContent = `Thanks, ${name}! Your note is ready to head out.`;
  contactForm.reset();
});
