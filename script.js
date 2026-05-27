const pageContainer = document.getElementById("pageContainer");
const sections = [...document.querySelectorAll(".panel")];
const navLinks = [...document.querySelectorAll("a[href^='#']")];
const reveals = [...document.querySelectorAll(".reveal")];
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalNext = document.getElementById("projectModalNext");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalSubtitle = document.getElementById("projectModalSubtitle");
const projectModalBody = document.getElementById("projectModalBody");
const projectModalRole = document.getElementById("projectModalRole");
const projectModalStack = document.getElementById("projectModalStack");

let current = 0;
let isAnimating = false;
let currentProject = null;
let currentScreenshotIndex = 0;

const projectsData = {
  eduvoice: {
    title: "EduVoice – Student Feedback Platform",
    subtitle: "End-to-end web app for collecting and visualizing university feedback.",
    body:
      "EduVoice lets students, faculty, and admins share and explore feedback through tailored dashboards. " +
      "Admin, faculty, and student views each surface analytics that matter most: course ratings, activity engagement, and actionable insights.",
    role: "Role: UI/UX Design, Frontend Development",
    stack: "Stack: React, Node.js, Express, MongoDB, Charting libraries",
    screenshots: [
      "assets/eduvoice/eduvoice-1.png",
      "assets/eduvoice/eduvoice-2.png",
      "assets/eduvoice/eduvoice-3.png",
      "assets/eduvoice/eduvoice-4.png",
    ],
  },
  toodledo: {
    title: "ToodleDo – Study Focus Todo App",
    subtitle: "A cute, pixel-art study companion to stay organized and focused.",
    body:
      "ToodleDo is a fun, pink-themed productivity app designed for students. " +
      "It features a dashboard with study stats, a to-do list with priority levels, a Pomodoro-style study timer with custom durations and reminder messages, " +
      "and a daily reminders system — all wrapped in an adorable pixel-art aesthetic.",
    role: "Role: UI/UX Design, Frontend Development",
    stack: "Stack: HTML, CSS, JavaScript",
    screenshots: [
      "assets/toodledo/toodledo-1.png",
      "assets/toodledo/toodledo-2.png",
      "assets/toodledo/toodledo-3.png",
      "assets/toodledo/toodledo-4.png",
    ],
  },
  bershek: {
    title: "Bershek – E-Commerce Website",
    subtitle: "A modern fashion e-commerce platform with a clean, minimal design.",
    body:
      "Bershek is a full-stack e-commerce website for fashion and lifestyle products. " +
      "It features a stylish landing page with brand highlights, a product catalog with search and filtering, " +
      "individual product pages with image galleries and add-to-cart functionality, and a seamless shopping experience throughout.",
    role: "Role: Full-Stack Development, UI Design",
    stack: "Stack: React, CSS, MongoDB",
    screenshots: [
      "assets/bershek/bershek-1.png",
      "assets/bershek/bershek-2.png",
      "assets/bershek/bershek-3.png",
    ],
  },
  studytogether: {
    title: "StudyTogether – Notes Sharing Platform",
    subtitle: "An open-source community platform for collaborative learning.",
    body:
      "StudyTogether lets students upload, download, and share study notes with each other. " +
      "It includes user authentication, a friends system with friend requests, real-time messaging for personal and group chats, " +
      "and a clean dashboard — making it easy to connect with study buddies and understand concepts together.",
    role: "Role: Full-Stack Development, UI Design",
    stack: "Stack: PHP, HTML, CSS, JavaScript",
    screenshots: [
      "assets/studytogether/studytogether-1.jpg",
      "assets/studytogether/studytogether-2.jpg",
      "assets/studytogether/studytogether-3.jpg",
      "assets/studytogether/studytogether-4.jpg",
      "assets/studytogether/studytogether-5.jpg",
      "assets/studytogether/studytogether-6.jpg",
      "assets/studytogether/studytogether-7.jpg",
    ],
  },
};

function getCurrentIndex() {
  const scrollTop = pageContainer.scrollTop;
  const viewport = pageContainer.clientHeight;
  return Math.round(scrollTop / viewport);
}

function slideTo(index) {
  const clamped = Math.max(0, Math.min(index, sections.length - 1));
  current = clamped;
  isAnimating = true;
  pageContainer.scrollTo({
    top: clamped * pageContainer.clientHeight,
    behavior: "smooth",
  });
  setTimeout(() => {
    isAnimating = false;
  }, 900);
}

function handleWheel(event) {
  if (window.innerWidth < 768) return;
  if (isAnimating) return;

  current = getCurrentIndex();

  if (event.deltaY > 20 && current < sections.length - 1) {
    event.preventDefault();
    slideTo(current + 1);
  } else if (event.deltaY < -20 && current > 0) {
    event.preventDefault();
    slideTo(current - 1);
  }
}

function handleKey(event) {
  if (isAnimating) return;
  current = getCurrentIndex();

  if (event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    slideTo(current + 1);
  }
  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    slideTo(current - 1);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { root: pageContainer, threshold: 0.4 }
);

reveals.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId) return;
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    event.preventDefault();
    const index = sections.indexOf(targetSection);
    slideTo(index);
    mobileNav.classList.remove("show");
    mobileNav.setAttribute("aria-hidden", "true");
    history.replaceState(null, "", targetId);
  });
});

document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y / rect.height) * 2 - 1) * -4;
    const ry = ((x / rect.width) * 2 - 1) * 4;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

menuBtn.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("show");
  mobileNav.setAttribute("aria-hidden", String(!isOpen));
});

pageContainer.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("keydown", handleKey);

pageContainer.addEventListener(
  "scroll",
  () => {
    if (!isAnimating) current = getCurrentIndex();
  },
  { passive: true }
);

const hash = window.location.hash.replace("#", "");
const hashIndex = sections.findIndex((s) => s.id === hash);
// Always start from the landing page on refresh/open.
// If the URL has a hash (e.g. "#about"), it will otherwise trigger this slide.
if (window.location.hash) {
  // Remove hash without reloading.
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

// Force scroll position to the first panel (hero).
pageContainer.scrollTo({ top: 0, behavior: "auto" });

// ---- Project modal interactions ----

function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data || !projectModal) return;

  currentProject = data;
  currentScreenshotIndex = 0;

  projectModalTitle.textContent = data.title;
  projectModalSubtitle.textContent = data.subtitle;
  projectModalBody.textContent = data.body;
  projectModalRole.textContent = data.role;
  projectModalStack.textContent = data.stack;
  projectModalImage.src = data.screenshots[0];
  projectModalImage.alt = data.title + " screenshot";

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
}

function nextScreenshot() {
  if (!currentProject) return;
  currentScreenshotIndex =
    (currentScreenshotIndex + 1) % currentProject.screenshots.length;
  projectModalImage.src = currentProject.screenshots[currentScreenshotIndex];
}

document.querySelectorAll(".project[data-project-id]").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-project-id");
    openProjectModal(id);
  });
});

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModalNext && projectModalImage) {
  projectModalNext.addEventListener("click", nextScreenshot);
  projectModalImage.addEventListener("click", nextScreenshot);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target.classList.contains("project-modal__backdrop")) {
      closeProjectModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});
