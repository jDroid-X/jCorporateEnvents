document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-scroll');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    // 4. Mobile Dropdown Toggle (Accordion)
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Only apply on mobile/tablet (check if nav-links is position fixed/absolute or window width)
            if (window.innerWidth <= 992) {
                e.preventDefault(); // Prevent navigation to section page

                const parent = trigger.parentElement;
                const menu = parent.querySelector('.dropdown-menu');

                // Toggle current
                trigger.classList.toggle('active');
                if (menu) {
                    menu.classList.toggle('active');
                }

                // Optional: Close other open dropdowns (Accordion style)
                dropdownTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.classList.remove('active');
                        const otherMenu = otherTrigger.parentElement.querySelector('.dropdown-menu');
                        if (otherMenu) otherMenu.classList.remove('active');
                    }
                });
            }
        });
    });
});
