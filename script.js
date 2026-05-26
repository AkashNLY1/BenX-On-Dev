
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
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const scriptURL = "https://script.google.com/macros/s/AKfycbxb5PYnciM_Y2OJyFIw9ZZKp5K8Bj3nd1nUc6LCTgaPsLuxm5fW3N7zztl8zqLY4kE/exec";

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            // Honeypot spam protection
            const botcheck = document.getElementById("botcheck").value;

            if (botcheck !== "") {
                return;
            }

            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";

            // Collect form data
            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            };

            try {

                await fetch(scriptURL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                alert("✅ Thank you! Your message has been sent successfully.");

                contactForm.reset();

            } catch (error) {

                console.error(error);

                alert("⚠️ Something went wrong. Please try again later.");
            }

            finally {

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }

        });
    }

});