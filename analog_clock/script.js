let hour = document.getElementById('hr');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

// Typewriter Effect for "Sushank"
const dynamicName = document.getElementById('dynamic-name');
const nameText = "Sushank";
let index = 0;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting) {
        dynamicName.textContent = nameText.slice(0, index + 1);
        index++;
        if (index === nameText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause before deleting
            return;
        }
    } else {
        dynamicName.textContent = nameText.slice(0, index - 1);
        index--;
        if (index === 0) {
            isDeleting = false;
        }
    }
    setTimeout(typeWriter, 200);
}
typeWriter();

// Clock Functionality
function displayTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30 * hh + mm / 2; // Each hour is 30 degrees, each minute adds 0.5 degrees.
    let mRotation = 6 * mm;          // Each minute is 6 degrees.
    let sRotation = 6 * ss;          // Each second is 6 degrees.

    hour.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;
}

setInterval(displayTime, 1000);
displayTime();

// Motivational Lines
const motivationalLines = [
    "Time is precious, use it wisely.",
    "Every second counts, make it matter.",
    "Your time is now.",
    "Don't waste a moment.",
    "Tick-tock, it's your time to shine.",
    "Time is what we make of it.",
    "The clock is always moving, so should you.",
    "Every hour is a chance for a new beginning.",
    "Time flies when you're chasing your dreams.",
    "Success loves punctuality.",
    "A minute of planning saves hours of effort.",
    "Time heals, but don't let it steal.",
    "Be mindful of time, for it is your life.",
    "Cherish the moment, live in the present.",
    "Each tick of the clock is a step closer to your goals.",
    "Don't count the hours, make the hours count.",
    "Time is a teacher, learn from it.",
    "The best time to start is now.",
    "What you do with your time defines your life.",
    "Time is the most valuable currency.",
    "Lost time is never found again.",
    "Time waits for no one.",
    "Yesterday is gone, tomorrow is uncertain, today is a gift.",
    "The future starts with what you do today.",
    "Time is an opportunity, don't waste it.",
    "Minutes make hours, hours make days, days make life.",
    "Invest your time wisely.",
    "Make time for what truly matters.",
    "The clock is ticking, take action.",
    "Time never stops, neither should you.",
    "Value every moment as if it were your last.",
    "The present is the key to the future.",
    "Time is the most valuable gift you can give.",
    "Action today leads to rewards tomorrow.",
    "Don't let time slip through your fingers.",
    "Every tick is a chance to make a change.",
    "Time is the canvas, and you are the artist.",
    "Seize the day, every day.",
    "A second of courage can change your life.",
    "The journey of a thousand miles begins with one tick."
];

// Display a random motivational line
const motivationElement = document.getElementById('motivation-line');
const randomLine = motivationalLines[Math.floor(Math.random() * motivationalLines.length)];
motivationElement.textContent = randomLine;
