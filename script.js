const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const registrationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        rollNumber: formData.get('rollno'),   // match Apps Script field
        experience: formData.get('experience'),
        languages: formData.get('programmingLanguages') // match Apps Script field
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSING...';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzrNrJ0AO6v3Harz7dfVErT6HoNfq94PRB3x6eiLFWGiyHMSrNsySbpHWWSVW9DZx3j/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
            alert('✅ ' + result.message);
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
