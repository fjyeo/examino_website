document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for sidebar links
    const sidebarLinks = document.querySelectorAll('.docs-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.docs-search input');
    const allSections = document.querySelectorAll('.docs-content section');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        allSections.forEach(section => {
            const sectionContent = section.textContent.toLowerCase();
            const sectionTitle = section.querySelector('h1, h2').textContent.toLowerCase();
            
            if (sectionContent.includes(searchTerm) || sectionTitle.includes(searchTerm)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // Highlight current section in sidebar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.docs-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    allSections.forEach(section => {
        observer.observe(section);
    });
});