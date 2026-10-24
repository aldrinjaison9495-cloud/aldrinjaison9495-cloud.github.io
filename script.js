const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("scrollProgress");
const typingText = document.getElementById("typingText");

// Update these with your real profile details before publishing.
const PROFILE = {
  email: "aldrinjaisonwork@gmail.com",
  githubUsername: "https://github.com/aldrinjaison9495-cloud",
  linkedinUsername: "https://www.linkedin.com/in/aldrin-jaison"
};
// 1. Initialize EmailJS HERE
emailjs.init({
  publicKey: "tpG_nvs9owu2ymRwg" // Replace with your EmailJS public key
});

// Load a real profile photo if assets/profile.jpg exists; otherwise keep initials.
const profilePhoto = document.getElementById("profilePhoto");
const profileFallback = document.getElementById("profileFallback");
if (profilePhoto) {
  profilePhoto.addEventListener("load", () => {
    profilePhoto.classList.add("loaded");
    if (profileFallback) profileFallback.style.display = "none";
  });
  profilePhoto.addEventListener("error", () => {
    profilePhoto.classList.remove("loaded");
    if (profileFallback) profileFallback.style.display = "grid";
  });
  if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
    profilePhoto.classList.add("loaded");
    if (profileFallback) profileFallback.style.display = "none";
  }
}

// Theme toggle, stored in this browser only.
const savedTheme = localStorage.getItem("aldrin-portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
function updateThemeButton() {
  const light = root.dataset.theme === "light";
  themeToggle.textContent = light ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("aldrin-portfolio-theme", root.dataset.theme);
  updateThemeButton();
});

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Animated typing title.
const phrases = ["Data Science", "Artificial Intelligence", "Web Development", "Problem Solving"];
let phraseIndex = 0, characterIndex = 0, deleting = false;
function typePhrase() {
  if (!typingText) return;
  const phrase = phrases[phraseIndex];
  typingText.textContent = phrase.slice(0, characterIndex);
  let delay = deleting ? 42 : 82;
  if (!deleting && characterIndex < phrase.length) characterIndex++;
  else if (!deleting && characterIndex === phrase.length) { deleting = true; delay = 1200; }
  else if (deleting && characterIndex > 0) characterIndex--;
  else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 280; }
  window.setTimeout(typePhrase, delay);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) typePhrase();
else if (typingText) typingText.textContent = "Data Science";

// Reveal effects and animated skill bars.
const revealElements = document.querySelectorAll(".reveal");
const skillCards = document.querySelectorAll(".skill-card");
const supportsObserver = "IntersectionObserver" in window;
if (supportsObserver && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible", "in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));
  skillCards.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
  skillCards.forEach(el => el.classList.add("in-view"));
}

// Scroll progress bar.
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Project filters.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const show = selected === "all" || categories.includes(selected);
      card.classList.toggle("is-hidden", !show);
      if (show) {
        card.classList.remove("visible");
        requestAnimationFrame(() => card.classList.add("visible"));
      }
    });
  });
});

// Replace placeholders with actual profile links and contact details.
function setProfileLink(id, url, label) {
  const link = document.getElementById(id);
  if (link && url) { link.href = url; if (label) link.textContent = label; }
}
if (PROFILE.email !== "aldrinjaisonwork@gmail.com") { setProfileLink( "emailLink", "https://mail.google.com/mail/?view=cm&fs=1&to=aldrinjaisonwork@gmail.com", PROFILE.email ); }
if (PROFILE.githubUsername !== "aldrinjaison9495-cloud") { const githubUrl = "https://github.com/aldrinjaison9495-cloud"; setProfileLink( "githubLink", githubUrl, "github.com/aldrinjaison9495-cloud" ); } 
if (PROFILE.linkedinUsername !== "aldrin-jaison") { const linkedinUrl = "https://www.linkedin.com/in/aldrin-jaison/"; setProfileLink( "linkedinLink", linkedinUrl, "linkedin.com/in/aldrin-jaison" ); } 

// Contact form: send email directly using EmailJS
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      formNote.textContent = "Please complete all fields.";
      return;
    }

    const button = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    try {
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      if (formNote) {
        formNote.textContent = "Sending your message...";
      }

      await emailjs.send(
        "service_vmkuebf",
        "template_1qx5qmk",
        {
          from_name: name,
          from_email: email,
          subject: String(data.get("subject") || "").trim()
           || `Portfolio message from ${name}`,
          message: message
        }
      );

      contactForm.reset();

      if (formNote) {
        formNote.textContent = "Your message has been sent successfully!";
      }

      alert("Your message has been sent successfully!");

    } catch (error) {
      console.error("EmailJS error:", error);

      if (formNote) {
        formNote.textContent =
          "Failed to send your message. Please try again.";
      }

      alert("Sorry, your message could not be sent. Please try again.");

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Send Message";
      }
    }
  });
}

// Current section indicator in the navigation.
const sections = document.querySelectorAll("main section[id]");
if (supportsObserver) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}

// Placeholder certificate links should not jump to the top of the page.
document.querySelectorAll(".placeholder-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    alert("Replace this placeholder with your real certificate URL before publishing.");
  });
});
