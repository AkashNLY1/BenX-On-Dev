
const themeToggle = document.getElementById('themeToggle');
const body = document.body;


const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', savedTheme);


updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const currentTheme = body.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .stat-item, .about-image, .about-content, .testimonial-card, .contact-info, .contact-form');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('load', animateOnScroll);

window.addEventListener('scroll', animateOnScroll);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// script.js

// ---- CONFIG: put your Web App URL here after Step 6 ----
const WEB_APP_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

const form = document.getElementById("contactForm");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Basic spam trap
  if (document.getElementById("botcheck").value) {
    return; // silently drop bots
  }

  // Disable while sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const fd = new FormData(form);
    // You can add extra fields server-side if needed
    // fd.append("source", "benx-website");

    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      body: fd,            // No custom headers -> prevents CORS preflight
      // Do NOT set Content-Type manually when using FormData
    });

    // Apps Script web apps often return 200 without JSON; treat 200 as success
    if (res.ok) {
      alert("✅ Thanks! Your message has been sent.");
      form.reset();
    } else {
      alert("❌ Submission failed. Please try again later.");
      console.error("Bad response:", res.status, await res.text());
    }
  } catch (err) {
    console.error(err);
    alert("❌ Network error. Please check your connection and try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit';
  }
});
