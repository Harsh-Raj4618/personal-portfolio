document.addEventListener("DOMContentLoaded", () => {
 
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const themeToggleDesktop = document.getElementById("theme-toggle-desktop");

  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
  if (themeToggleMobile) themeToggleMobile.textContent = "☀️";
  if (themeToggleDesktop) themeToggleDesktop.textContent = "☀️";

  const toggleBtn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navClose = document.getElementById("nav-close");

  if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      toggleBtn.classList.toggle('active');
    });
  }

  if (navClose && navList && toggleBtn) {
    navClose.addEventListener("click", () => {
      navList.classList.remove("active");
      toggleBtn.classList.remove("active");
    });
  }

  const typedElement = document.getElementById("typed");
  if (typedElement) {
    new Typed("#typed", {
      strings: ["Web Developer", "Creative Coder", "Tech Explorer"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  const aboutCard = document.getElementById("aboutCard");

  if (aboutCard) {
    aboutCard.addEventListener("mousemove", (e) => {
      const rect = aboutCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 6;  // tilt
      const rotateY = ((x - centerX) / centerX) * -6;
      const translateX = ((x - centerX) / centerX) * 10; // move
      const translateY = ((y - centerY) / centerY) * 10;

      aboutCard.style.transform = `
      perspective(1000px)
      translateX(${translateX}px)
      translateY(${translateY}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    });

    aboutCard.addEventListener("mouseleave", () => {
      aboutCard.style.transform = `
      perspective(1000px)
      translateX(0px)
      translateY(0px)
      rotateX(0deg)
      rotateY(0deg)
    `;
    });
  }

  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navList.classList.remove("active");
        toggleBtn.classList.remove("active");
      }
    });
  });

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const icon = isDark ? "☀️" : "🌙";
    if (themeToggleMobile) themeToggleMobile.textContent = icon;
    if (themeToggleDesktop) themeToggleDesktop.textContent = icon;
  };

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleDarkMode);
  }
  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener("click", toggleDarkMode);
  }

  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");

  if (chatToggle && chatbox) {
    chatToggle.addEventListener("click", () => {
      chatbox.style.display = "flex";
    });
  }

  if (chatClose && chatbox) {
    chatClose.addEventListener("click", () => {
      chatbox.style.display = "none";
    });
  }

  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatBody = document.getElementById("chat-body");

  const responses = {
    hello: "Hi there! How can I help you with my portfolio?",
    resume: "You can download my resume here",
    projects: "Here's a look at my projects below.",
    contact: "Scrolling to the contact form for you.",
    default: "I'm here to assist with anything about my portfolio!"
  };

  function appendMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function toggleModeFromChat() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const icon = isDark ? "☀️" : "🌙";
    if (themeToggleMobile) themeToggleMobile.textContent = icon;
    if (themeToggleDesktop) themeToggleDesktop.textContent = icon;

    appendMessage("Bot", isDark ? "Dark mode enabled." : "Light mode enabled.");
  }

  function handleUserMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage("You", userText);
    chatInput.value = "";

    const typingDiv = document.createElement("div");
    typingDiv.innerHTML = `<strong>Bot:</strong> <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();

      const lowerText = userText.toLowerCase();
      let reply = responses.default;

      if (lowerText.includes("hello")) {
        reply = responses.hello;
      } else if (lowerText.includes("resume")) {
        reply = `${responses.resume} <a href="resume.pdf" download>Click here to download</a>.`;
      } else if (lowerText.includes("projects")) {
        reply = responses.projects;
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("skills")) {
        reply = "Here's a look at my skillset.";
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("contact")) {
        reply = responses.contact;
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("about")) {
        reply = "Let me tell you a bit about myself.";
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("dark")) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        if (themeToggleMobile) themeToggleMobile.textContent = "☀️";
        if (themeToggleDesktop) themeToggleDesktop.textContent = "☀️";
        reply = "Dark mode has been enabled.";
      } else if (lowerText.includes("light")) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        if (themeToggleMobile) themeToggleMobile.textContent = "🌙";
        if (themeToggleDesktop) themeToggleDesktop.textContent = "🌙";
        reply = "Light mode has been enabled.";
      } else if (lowerText.includes("mode")) {
        reply = `Would you like to toggle the theme? <button onclick="toggleModeFromChat()">Toggle Mode</button>`;
      }

      appendMessage("Bot", reply);
    }, 1000);
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener("click", handleUserMessage);
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleUserMessage();
      }
    });
  }
});

const animateSkills = () => {
  const skillBars = document.querySelectorAll('.skill-bar');

  skillBars.forEach(bar => {
    const fill = bar.querySelector('.bar-fill');
    const percentText = bar.querySelector('.bar-percent');
    const targetPercent = parseInt(bar.getAttribute('data-percent')) || 0;

    fill.style.width = targetPercent + "%";

    let current = 0;
    const step = Math.ceil(targetPercent / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= targetPercent) {
        current = targetPercent;
        clearInterval(interval);
      }
      if (percentText) {
        percentText.textContent = current + "%";
      }
    }, 30);
  });
};

const observeSkills = () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.disconnect(); 
      }
    });
  }, { threshold: 0.4 });

  observer.observe(skillsSection);
};

observeSkills();

const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
