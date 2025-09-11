const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const successScreen = document.getElementById('successScreen');
const registrationForm = document.getElementById('registrationForm');

// Your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbxzn0pO3K0xRdKFMjaEDotHBv9ATo6z5n-QJrdDduNc1aklVJycE6G7-_2zbSH9Z_d-/exec";

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const registrationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        rollNumber: formData.get('rollno'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        languages: formData.get('programmingLanguages')
    };

    // Disable button while processing
    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSING...';

    try {
        // Send data to Google Apps Script
        await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData),
            mode: 'no-cors' // prevents CORS issues
        });

        // Show success screen (cannot read response in no-cors mode)
        registrationForm.classList.add('hidden');
        successScreen.classList.remove('hidden');
        form.reset();

    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Could not connect to server.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'EXECUTE REGISTRATION.EXE';
    }
});
