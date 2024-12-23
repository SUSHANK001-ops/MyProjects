const scriptURL = 'https://script.google.com/macros/s/AKfycbx2s4gvL6fgA7Sz409DW2i4DZ8xwVJi15AhlkvXHDXdLRGlJ9iQjMv4QnedIO8bYkRk/exec'; // Your Google Apps Script URL
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    showAlert('Submitting, please wait...', true);

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            if (response.ok) {
                showAlert('Form submitted successfully!');
                form.reset();
            } else {
                throw new Error('Error submitting the form');
            }
        })
        .catch(error => {
            showAlert('There was an error submitting the form. Please try again later.', true);
        });
});

function showAlert(message, isError = false) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${isError ? 'alert-error' : 'alert-success'}`;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
