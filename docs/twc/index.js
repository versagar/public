document.addEventListener('DOMContentLoaded', async function() {
    await waitForFunction('loadProfiles');
    await loadProfiles('tutors','/san9g3rah345alay/objects/teachers.json');
    

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to course categories
    document.querySelectorAll('.course-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to neuro features
    document.querySelectorAll('.neuro-feature').forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to specialization items
    document.querySelectorAll('.specialization-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#27ae60';
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .course-category, .neuro-feature, .specialization-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });



});