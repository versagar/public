// --- Typewriter Effect ---
        const dynamicTextElement = document.getElementById('dynamic-text');
        const phrases = [
            "Ready for Take-Off?",
            "Unleash your inner engineer!",
            "Learn from experts.",
            "From paper planes to drones!"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            if (!dynamicTextElement) return;
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
        
        // --- Form Submission Handling ---
        const enrollmentForm = document.querySelector('#enrollment-form form');
        const formSection = document.querySelector('#enrollment-form');
        const respBox = document.getElementById('respBox');
        const successMessage = document.getElementById('successMessage');
        const respText = document.getElementById('respText');
        const closeRespBoxBtn = document.getElementById('closeRespBox');


        if (enrollmentForm) {
            enrollmentForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                const timestampInput = document.querySelector('input[name="timestamp"]');
            if(timestampInput) {
                const date = getIndianDateTime(new Date());
                timestampInput.value = date;
            }
                respBox.classList.remove('hidden');
                
                const result = await handleSubmitFormTWC(enrollmentForm, 'bookEvent', null, 'respText');
                
                if (result && !result.toLowerCase().includes('error')) {
                    formSection.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                }
            });
        }
        
        if(closeRespBoxBtn) {
            closeRespBoxBtn.addEventListener('click', () => {
                respBox.classList.add('hidden');
            });
        }

        window.onload = function() {
            typeWriter();
            
        };