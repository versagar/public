const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const slideDurations = [4000, 7000, 8000];

        function triggerAnimations(slide) {
            const animatedElements = slide.querySelectorAll('.animatable');
            animatedElements.forEach(el => {
                const newEl = el.cloneNode(true);
                el.parentNode.replaceChild(newEl, el);
            });
        }

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    triggerAnimations(slide);
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            setTimeout(nextSlide, slideDurations[currentSlide]);
        }

        window.onload = function() {
            showSlide(currentSlide);
            setTimeout(nextSlide, slideDurations[currentSlide]);
        };