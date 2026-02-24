document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const el = document.querySelector(targetId);
            if (el) {
                e.preventDefault();
                if (navLinks) navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

    // 4. Mobile Dropdown as Accordion
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = trigger.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                const isOpen = trigger.classList.contains('active');

                // Close all
                document.querySelectorAll('.dropdown-trigger').forEach(t => {
                    t.classList.remove('active');
                    const m = t.parentElement.querySelector('.dropdown-menu');
                    if (m) m.classList.remove('active');
                });

                // Toggle clicked
                if (!isOpen) {
                    trigger.classList.add('active');
                    if (menu) menu.classList.add('active');
                }
            }
        });
    });

    // 5. Sticky Nav scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 5px 30px rgba(0,0,0,0.5)'
                : 'none';
        });
    }

    // 6. Video Modal logic
    const videoModal = document.querySelector('.video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const watchBtn = document.querySelector('.watch-video-btn');
    const iframe = videoModal ? videoModal.querySelector('iframe') : null;

    if (watchBtn && videoModal) {
        watchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = watchBtn.getAttribute('data-url');
            if (iframe && url) {
                // Convert youtu.be or youtube.com to embed
                let embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
                embedUrl = embedUrl.replace('watch?v=', 'embed/');
                // Handle shorts
                embedUrl = embedUrl.replace('youtube.com/shorts/', 'youtube.com/embed/');

                iframe.src = embedUrl + '?autoplay=1';
                videoModal.classList.add('active');
            }
        });
    }

    if (closeBtn && videoModal) {
        closeBtn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            if (iframe) iframe.src = '';
        });
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (iframe) iframe.src = '';
            }
        });
    }

});

