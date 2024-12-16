const hamburger = document.getElementById('hamburger-menu');
const menuItems = document.getElementById('menu-items');

hamburger.addEventListener('click', function(event) {
    menuItems.classList.toggle('show');
    hamburger.classList.toggle('active'); // Toggle the active class
    menuItems.classList.toggle('text-content');
    menuItems.classList.toggle('text');
    event.stopPropagation(); // Prevent event from bubbling up to the document
});

// Close the menu if clicking outside of it
document.addEventListener('click', function(event) {
    if (!hamburger.contains(event.target) && !menuItems.contains(event.target)) {
        menuItems.classList.remove('show');
        hamburger.classList.remove('active'); // Remove active class
    }
});


var typed = new Typed(".auto-type", {
    strings: ["Sushank", " a Programmer", "a Graphic Designer", "a Student", "Sushank"],
    typeSpeed: 150,
    backSpeed: 100,
    lopped: true
}

)

// Select all the skill cells
const skillCells = document.querySelectorAll('.cell');

// Function to show details on hover
skillCells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        const details = cell.querySelector('.details');
        details.style.opacity = '1'; // Make details visible
        details.style.transform = 'translate(-50%, -50%) scale(1)'; // Pop-out effect
    });

    cell.addEventListener('mouseleave', () => {
        const details = cell.querySelector('.details');
        details.style.opacity = '0'; // Hide details
        details.style.transform = 'translate(-50%, 0) scale(0)'; // Scale down effect
    });

});
document.querySelectorAll('.hire-us').forEach(button => {
    button.addEventListener('click', function() {
        const contactSection = document.getElementById('Contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const textContainer = document.querySelector('.footer-container .t-con h1');
    const text = "Thank you for visiting my website";
    let index = 0;
    let direction = 1;
    const speed = 100;  // typing speed

    function typeWriter() {
        if (direction === 1 && index < text.length) {
            textContainer.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, speed);
        } else if (direction === -1 && index > 0) {
            textContainer.textContent = text.slice(0, index - 1);
            index--;
            setTimeout(typeWriter, speed);
        } else {
            direction *= -1;
            setTimeout(typeWriter, 1000);  // Pause between typing and deleting
        }
    }

    typeWriter();
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbx1um5q4xD7L8jS46qSBUurVu98cB7KAIe8wCxOyEtKMyQJa-L82ZPcv8F9ycKDSs9mAg/exec';
const form = document.forms['submit-to-google-sheet'];
const messageElement = document.getElementById('message');
const loadingElement = document.getElementById('loading');
const submitButton = document.getElementById('submitButton');

function sendEmail(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;
  submitButton.innerText = 'Sending...';

  // Show the "Sending..." message and spinner
  messageElement.innerHTML = '';
  loadingElement.style.display = 'block';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => response.json())
    .then(result => {
      // Hide the spinner after submission
      loadingElement.style.display = 'none';

      if (result.result === 'success') {
        // Show success message
        messageElement.innerHTML = 'Thank you for submitting the form. We will reach out to you soon via your email!';
        form.reset(); // Reset form fields after submission

        // Hide message after 5 seconds
        setTimeout(() => {
          messageElement.innerHTML = '';
        }, 5000);
      } else {
        messageElement.innerHTML = 'Error submitting form: ' + result.error;
      }

      // Re-enable the submit button after the process is complete
      submitButton.disabled = false;
      submitButton.innerText = 'Submit';
    })
    .catch(error => {
      // Hide the spinner in case of error
      loadingElement.style.display = 'none';
      messageElement.innerHTML = 'Error submitting form: ' + error;

      // Re-enable the submit button after the process is complete
      submitButton.disabled = false;
      submitButton.innerText = 'Submit';
    });
}
