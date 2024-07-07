document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Set initial mode
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        const isDarkModeNow = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkModeNow);

        // Change icon
        if (isDarkModeNow) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Scroll down button functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const whyExaminoSection = document.querySelector('.why-examino');

    if (scrollIndicator && whyExaminoSection) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(whyExaminoSection);
        });
        scrollIndicator.style.cursor = 'pointer';
    }

    // Smooth scroll function
    function smoothScroll(target, duration = 1500) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // How does it work button smooth scroll
    const howItWorksBtn = document.querySelector('a[href="#how-it-works"]');
    const howItWorksSection = document.getElementById('how-it-works');

    if (howItWorksBtn && howItWorksSection) {
        howItWorksBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(howItWorksSection);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .testimonial-card').forEach(item => {
        observer.observe(item);
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = question.querySelector('.faq-icon');
            
            // Close all other open FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-icon').textContent = '+';
                    item.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });

            // Toggle the clicked FAQ item
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                faqIcon.textContent = '−';
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            } else {
                faqIcon.textContent = '+';
                faqAnswer.style.maxHeight = '0px';
            }
        });
    });
});