
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
