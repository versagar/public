document.querySelectorAll('.callbackbtn-id').forEach(btn => {
    btn.addEventListener('click', async function () {
        const callbackForm = document.createElement('form');
        callbackForm.id = 'callbackPopForm';
        callbackForm.className = 'flex-column gap1'

        // ✅ Put it in DOM first
        openPop(callbackForm);

        // ✅ Now it exists → can be populated
        await loadTWCForm('callbackPopForm', 'callbackform');

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn bg-gradient grad-sl text-primary pad3 bold round3 block shadow3';
        submitBtn.textContent = 'Submit';

        callbackForm.appendChild(submitBtn);

        // ✅ Handle submit properly
        callbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const result = await submitForm('#callbackPopForm', 'POST', 'callback');

            callbackForm.innerHTML = `
                <h2>${result.callResult}</h2>
                <p>${result.reason}</p>
            `;
        });
    });
});