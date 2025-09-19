document.addEventListener('DOMContentLoaded', () => {
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const slideNumberSpan = document.getElementById('slide-number');
            
            let currentSlideIndex = 0;

            function updateSlideDisplay() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentSlideIndex);
                });

                prevBtn.disabled = currentSlideIndex === 0;
                nextBtn.disabled = currentSlideIndex === slides.length - 1;
                slideNumberSpan.textContent = `${currentSlideIndex + 1} of ${slides.length}`;
            }

            prevBtn.addEventListener('click', () => {
                if (currentSlideIndex > 0) {
                    currentSlideIndex--;
                    updateSlideDisplay();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentSlideIndex < slides.length - 1) {
                    currentSlideIndex++;
                    updateSlideDisplay();
                }
            });

            updateSlideDisplay();
        });