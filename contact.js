// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                package: document.getElementById('package').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value
            };

            // Create email body
            let emailBody = `Név: ${formData.name}%0D%0A`;
            emailBody += `E-mail: ${formData.email}%0D%0A`;

            if (formData.phone) {
                emailBody += `Telefonszám: ${formData.phone}%0D%0A`;
            }

            if (formData.package) {
                const packageSelect = document.getElementById('package');
                const packageText = packageSelect.options[packageSelect.selectedIndex].text;
                emailBody += `Csomag: ${packageText}%0D%0A`;
            }

            if (formData.date) {
                emailBody += `Tervezett időpont: ${formData.date}%0D%0A`;
            }

            emailBody += `%0D%0AÜzenet:%0D%0A${formData.message}`;

            // Create mailto link
            const subject = encodeURIComponent('Fotózás érdeklődés - ' + formData.name);
            const mailtoLink = `mailto:YOUR_EMAIL_ADDRESS?subject=${subject}&body=${emailBody}`;

            // Open email client
            window.location.href = mailtoLink;

            // Optional: Show success message
            showSuccessMessage();
        });
    }
});

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <p>✓ Az e-mail kliensed megnyílik. Csak küldd el az üzenetet!</p>
        <p class="success-note">Ha nem nyílik meg automatikusan, írj nekünk közvetlenül: <a href="mailto:YOUR_EMAIL_ADDRESS">YOUR_EMAIL_ADDRESS</a></p>
    `;

    form.parentNode.insertBefore(successMessage, form.nextSibling);

    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after 10 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 10000);
}
