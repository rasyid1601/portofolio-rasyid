// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// File Opening Handler - Open files from dokumen folder
function openFile(fileName, action = 'view') {
    const filePath = `dokumen/${fileName}`;
    
    if (action === 'download') {
        // Create a temporary anchor element and trigger download
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (action === 'view') {
        // Open file in new tab
        window.open(filePath, '_blank');
    }
}

// Attach file handlers to all buttons and links with data-file attribute
document.addEventListener('click', function(e) {
    const fileButton = e.target.closest('[data-file]');
    if (fileButton) {
        e.preventDefault();
        const fileName = fileButton.getAttribute('data-file');
        const action = fileButton.getAttribute('data-action') || 'view';
        openFile(fileName, action);
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message
        alert('Terima kasih! Pesan Anda telah dikirim. Saya akan merespons segera.');
        
        // Reset form
        this.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill items and portfolio items
document.querySelectorAll('.skill-item, .portfolio-item, .timeline-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
});

// Counter Animation for Statistics
const countUpElements = document.querySelectorAll('.stat h3');
const animateCountUp = (element) => {
    const target = parseInt(element.textContent);
    const isNumber = !isNaN(target);
    
    if (!isNumber) return;

    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// Trigger counter animation when visible
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            animateCountUp(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

countUpElements.forEach(el => {
    counterObserver.observe(el);
});

// Scroll to top button
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
};

createScrollToTopBtn();

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #2563eb;
        border-bottom: 3px solid #2563eb;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Portfolio item click handler with modal (optional)
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Add smooth transitions to skill bars
window.addEventListener('load', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 100);
    });
});

// Form validation
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.style.borderColor = '#ef4444';
            input.style.backgroundColor = '#fee2e2';
        });

        input.addEventListener('input', () => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        });
    });
}

// Print-friendly styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar,
        .hero-buttons,
        .footer,
        .social-links {
            display: none;
        }
        
        body {
            line-height: 1.4;
        }
        
        section {
            padding: 40px 0;
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyle);

console.log('Portfolio website loaded successfully!');
