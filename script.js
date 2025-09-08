const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const registrationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        rollno: formData.get('rollno'),
        experience: formData.get('experience'),
        programmingLanguages: formData.get('programmingLanguages')
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSING...';

    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });

        if (response.ok) {
            alert('✅ Registered successfully!');
            form.reset();
        } else {
            const errorText = await response.text();
            alert('❌ Failed to register: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Could not connect to server.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'EXECUTE REGISTRATION.EXE';
    }
});
