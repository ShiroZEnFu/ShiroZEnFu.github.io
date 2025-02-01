document.addEventListener('DOMContentLoaded', () => {
    // Remove loading state
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }

    // Typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        setTimeout(() => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }, index * 1000);
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation
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
});

// Performance optimization for animations
window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});