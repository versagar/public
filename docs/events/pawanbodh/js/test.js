// --- Typewriter Effect ---
        const dynamicTextElement = document.getElementById('dynamic-text');
        const phrases = [
            "Ready for Take-Off?",
            "Unleash your child's inner engineer!",
            "Learn from experts, build your dreams.",
            "From paper planes to drones!"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                dynamicTextElement.textContent = currentPhrase.substring(0, charIndex--);
            } else {
                dynamicTextElement.textContent = currentPhrase.substring(0, charIndex++);
            }

            if (!isDeleting && charIndex > currentPhrase.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            const typingSpeed = isDeleting ? 60 : 120;
            setTimeout(typeWriter, typingSpeed);
        }

        window.onload = function() {
            typeWriter();
        };

        // --- Form Submission Handling ---
        const enrollmentForm = document.querySelector('#enrollment-form form');
        enrollmentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            const formContainer = document.querySelector('#enrollment-form .container-max-x');
            const successMessage = document.createElement('div');
            successMessage.className = 'text-center center pad1 animate-fade-in';
            successMessage.style = 'max-width: 800px; background-color: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 3vmin;';

            successMessage.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 2vmin;">🎉</div>
                <h3 class="text3 bold mar-bottom2" style="color: #166534;">Enrollment Successful!</h3>
                <p class="text1 line1-6" style="color: #1f2937;">Thank you for registering for the Aeronautics Camp. We've received your application and will be in touch within 48 hours with more details.</p>
                <p class="mar-top2" style="color: #4b5563;">Get ready for an adventure into the skies! 🚀</p>
            `;
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
        });