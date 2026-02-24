/** 
 * jDroid-X Mart Navigation Engine 
 * Handles smooth transitions, navigation flow, and design protocols.
 */

const MartEngine = {
    init() {
        console.log("🌊 Mart Flow Engine Active");
        this.addScrollProgress();
        this.handleTransitions();
        this.setupNavigation();
        this.revealOnScroll();
        this.handleMobileMenu();
        this.createCursor();
    },

    addScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = scrolled + "%";
        });
    },

    handleTransitions() {
        // Intercept link clicks for smooth fade transitions
        document.querySelectorAll('a').forEach(link => {
            if (link.hostname === window.location.hostname && !link.hash) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.body.classList.add('loading');
                    const target = link.href;
                    setTimeout(() => {
                        window.location.href = target;
                    }, 400);
                });
            }
        });
    },

    setupNavigation() {
        // Sticky Header Effect
        const header = document.querySelector('.main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(15, 23, 42, 0.9)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'transparent';
            }
        });
    },

    handleMobileMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-links');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.classList.toggle('active');

                // Animate toggle lines
                const spans = toggle.querySelectorAll('span');
                if (toggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close menu on link click
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                    toggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
                    toggle.querySelectorAll('span')[1].style.opacity = '1';
                });
            });
        }
    },

    revealOnScroll() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.vertical-card, .style-card, .product-item').forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.6s ease-out";
            observer.observe(el);
        });

        // Add class to handle the animation in CSS
        const style = document.createElement('style');
        style.innerHTML = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    },

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });

        const style = document.createElement('style');
        style.innerHTML = `
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                mix-blend-mode: difference;
                transition: transform 0.2s ease;
                transform: translate(-50%, -50%);
            }
            .custom-cursor.active {
                transform: translate(-50%, -50%) scale(2.5);
                background: var(--secondary);
            }
            @media (max-width: 768px) { .custom-cursor { display: none; } }
        `;
        document.head.appendChild(style);
    }
};

document.addEventListener('DOMContentLoaded', () => MartEngine.init());
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('loading');
    }
});
