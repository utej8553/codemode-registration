const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const successScreen = document.getElementById('successScreen');
const registrationForm = document.getElementById('registrationForm');

// Google Apps Script Web App URL
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

    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSING...';

    try {
        await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData),
            mode: 'no-cors' // avoids CORS issues
        });

        // Show alert for successful submission
        alert('✅ Registration complete!');
        
        // Show success screen
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
