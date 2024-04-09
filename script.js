document.addEventListener('DOMContentLoaded', (event) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.feature-item, .contact').forEach((section) => {
        observer.observe(section);
    });
});

document.getElementById('subscription-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Gathering the form data
    const formData = {
        email: this.querySelector('input[type="email"]').value
    };
    
    // Sending the data to our serverless function
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Or update the DOM with the response
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred, please try again.');
    });
});
