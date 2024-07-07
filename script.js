document.addEventListener('DOMContentLoaded', function() {
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

    // Add hover effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .price-box {
            min-height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            padding-top: 40px;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .price-box:hover, .price-box.featured:hover {
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(-5px);
        }
        .price-box.featured {
            transform: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .popular-label {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-colour);
            color: var(--background-color);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            white-space: nowrap;
        }
        .popular-label i {
            margin-right: 5px;
        }
        .box {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .box:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
        .timeline-item, .testimonial-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .timeline-item.appear, .testimonial-card.appear {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.0
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