const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const successScreen = document.getElementById('successScreen');
const registrationForm = document.getElementById('registrationForm');

// Your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzrNrJ0AO6v3Harz7dfVErT6HoNfq94PRB3x6eiLFWGiyHMSrNsySbpHWWSVW9DZx3j/exec";

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
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });

        const result = await response.json();

        if (result.status === "success") {
            // Show success screen
            registrationForm.classList.add('hidden');
            successScreen.classList.remove('hidden');
            form.reset();
        } else {
            alert('❌ Failed to register: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Could not connect to server.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'EXECUTE REGISTRATION.EXE';
    }
});
