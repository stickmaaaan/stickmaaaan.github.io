/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*==================== scroll reveal ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*==================== typed js ====================*/
// Typed.js job titles for both languages
const jobTitles = {
    en: ["IT Systems Electronics Technician."],
    de: ["IT-Systemelektroniker."],
};

let typedInstance;
function startTyped(lang) {
    if (typedInstance) typedInstance.destroy();
    typedInstance = new Typed('.multiple-text', {
        strings: jobTitles[lang],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: false
    });
}

// Initial animation
startTyped('en');

// Language switcher
const langSwitch = document.getElementById('lang-switch');
let currentLang = 'en';
langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    document.querySelectorAll('[data-en]').forEach((el) => {
        // Always use innerHTML for the name line (contains .pronunciation-tooltip)
        if (el.querySelector && el.querySelector('.pronunciation-tooltip')) {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        } else if (el.classList && el.classList.contains('heading')) {
            el.innerHTML = el.getAttribute(`data-${currentLang}`) + (el.innerHTML.match(/<span>.*<\/span>/) ? '' : '');
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute(`data-${currentLang}`);
        } else if (el.tagName === 'BUTTON') {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        } else if (el.hasAttribute('style') && el.getAttribute('style').includes('color: #000;')) {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        } else {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        }
    });
    // Special case for animated job title line
    const jobLine = document.querySelector('.home-content h3:nth-of-type(3)');
    if (jobLine) {
        jobLine.innerHTML = jobLine.getAttribute(`data-${currentLang}`) + ' <span class="multiple-text"></span>';
    }
    startTyped(currentLang);
    // Update button text
    langSwitch.textContent = langSwitch.getAttribute(`data-${currentLang}`);
});

// Toggle CV download links
const cvBtn = document.getElementById('cv-download-btn');
const cvLinks = document.getElementById('cv-links');
if (cvBtn && cvLinks) {
    cvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent bubbling to document
        if (cvLinks.style.display === 'none' || cvLinks.style.display === '') {
            cvLinks.style.display = 'flex';
            cvBtn.setAttribute('aria-expanded', 'true');
        } else {
            cvLinks.style.display = 'none';
            cvBtn.setAttribute('aria-expanded', 'false');
        }
    });
    // Hide links if user clicks outside
    document.addEventListener('click', function(event) {
        if (cvLinks.style.display === 'flex' && !cvBtn.contains(event.target) && !cvLinks.contains(event.target)) {
            cvLinks.style.display = 'none';
            cvBtn.setAttribute('aria-expanded', 'false');
        }
    });

}
