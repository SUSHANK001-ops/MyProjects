// Function to get the user's name from localStorage or prompt them to input their name
function getUserName() {
    let username = localStorage.getItem('username');
  
    // If no username is saved in localStorage, prompt the user to enter their name
    if (!username) {
      username = prompt("Please enter your name: Guest");
      // If the user enters a name, store it in localStorage
      if (username && username.trim() !== "") {
        localStorage.setItem('username', username);
      } else {
        username = "User"; // Default name if the user does not enter anything
      }
    }
  
    return username;
  }
  
  // Function to get the current time of day and display a greeting
  function getGreeting() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    
    // Get user's name
    const username = getUserName();
  
    // Determine time of day
    let greeting = "";
    if (hours < 12) {
      greeting = "Good Morning";
    } else if (hours < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
  
    // Display greeting with user's name
    const h3 = document.querySelector("h3");
    h3.innerHTML = `${greeting} ${username},`;
    
    // Get a random motivational quote
    const motivationalQuotes = [
      "Believe in yourself and all that you are.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Don’t watch the clock; do what it does. Keep going.",
      "You are capable of amazing things.",
      "Start where you are. Use what you have. Do what you can.",
      "Dream big and dare to fail.",
      "The only way to do great work is to love what you do.",
      "Act as if what you do makes a difference. It does.",
      "Success doesn’t just find you. You have to go out and get it.",
      "The harder you work for something, the greater you’ll feel when you achieve it.",
      "It’s going to be hard, but hard does not mean impossible.",
      "Don’t stop when you’re tired. Stop when you’re done.",
      "Wake up with determination. Go to bed with satisfaction.",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "You don’t have to be great to start, but you have to start to be great.",
      "I can and I will.",
      "Success is not how high you have climbed, but how you make a positive difference to the world.",
      "Everything you can imagine is real.",
      "The key to success is to focus on goals, not obstacles.",
      "Success usually comes to those who are too busy to be looking for it.",
      "Opportunities don’t happen, you create them.",
      "Do something today that your future self will thank you for.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Hardships often prepare ordinary people for an extraordinary destiny.",
      "Your limitation—it’s only your imagination.",
      "Push yourself, because no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Dream it. Wish it. Do it.",
      "Success doesn’t just come and find you, you have to go out and get it.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Make yourself a priority. At the end of the day, you’re your longest commitment."
    ];
  
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    // Add a second line with the motivational quote
    const quoteDiv = document.createElement("div");
    quoteDiv.innerHTML = `<p>${randomQuote}</p>`;
    h3.appendChild(quoteDiv);
  }
  
  // Run the greeting function when the page loads
  document.addEventListener('DOMContentLoaded', getGreeting);
  
  // Add event listener to the "Add" button
  document.querySelector('.add-note-btn').addEventListener('click', () => createNote());
  
  // Save all notes and their state to localStorage
  function saveAllNotesToLocalStorage() {
    const notes = document.querySelectorAll('.note');
    const notesData = Array.from(notes).map(note => {
      const textarea = note.querySelector('.note-content');
      const isSaved = note.querySelector('.save-icon').classList.contains('saved');
      const isFavorite = note.querySelector('.fill').classList.contains('favorite');
      const isAtTop = note.style.order === '-1'; // Check if the note is at the top
      return { content: textarea.value, saved: isSaved, favorite: isFavorite, atTop: isAtTop };
    });
  
    localStorage.setItem('stickyNotes', JSON.stringify(notesData));
  }
  
  // Load notes from localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
  
    notes
      .sort((a, b) => {
        // Priority: "atTop" > "favorite" > "saved"
        if (a.favorite && !b.favorite) return -1; // Favorite goes to second position
        if (!a.favorite && b.favorite) return 1;
        return 0; // If both are either favorite or not, they stay in the same order
      })
      .forEach(noteData => {
        const note = createNote(noteData.content);
        const favoriteIcon = note.querySelector('.right_e .fill');
        const saveIcon = note.querySelector('.left_e .save-icon');
  
        if (noteData.saved) {
          saveIcon.classList.add('saved');
          saveIcon.style.backgroundColor = 'green'; // Set save icon to green
        }
  
        if (noteData.favorite) {
          favoriteIcon.classList.add('favorite');
        }
  
        if (noteData.atTop) {
          note.style.order = '-1'; // Ensure the note is at the top
        }
      });
  }
  
  // Create a new note with the time it was created
  function createNote(content = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    
    // Get the current time when the note is created
    const creationTime = new Date();
    const timeString = creationTime.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS AM/PM
  
    note.innerHTML = `
      <div class="note-time">${timeString}</div> <!-- Time added here -->
      <div class="essentials">
        <div class="left_e">
          <i class="save-icon ti ti-device-floppy" title="Save"></i>
        </div>
        <div class="right_e">
          <i class="fill ti ti-heart" title="Favorite"></i>
          <i class="ti ti-trash" title="Delete"></i>
        </div>
      </div>
      <textarea class="note-content">${content}</textarea>
      <div class="inside"></div>
    `;
  
    // Add the new note to the top by default
    note.style.order = '-1'; // New notes go to the top
  
    // Favorite icon functionality
    const favoriteIcon = note.querySelector('.right_e .fill');
    favoriteIcon.addEventListener('click', () => {
      favoriteIcon.classList.toggle('favorite');
      // Move the note to second place if favorited
      if (favoriteIcon.classList.contains('favorite')) {
        note.style.order = '1'; // Move it to second
      } else {
        note.style.order = ''; // Return to its original order
      }
      saveAllNotesToLocalStorage();
    });
  
    // Save icon functionality
    const saveIcon = note.querySelector('.left_e .save-icon');
    saveIcon.addEventListener('click', () => {
      saveAllNotesToLocalStorage();
      saveIcon.classList.add('saved');
      saveIcon.style.backgroundColor = 'green'; // Set save icon to green when clicked
      note.style.order = '-1'; // Move saved notes to top
    });
  
    // Delete icon functionality
    const deleteIcon = note.querySelector('.right_e .ti-trash');
    deleteIcon.addEventListener('click', () => {
      note.remove();
      saveAllNotesToLocalStorage();
    });
  
    // Text area auto-save
    const textarea = note.querySelector('textarea');
    textarea.addEventListener('input', () => {
      const saveIcon = note.querySelector('.left_e .save-icon');
      saveIcon.classList.remove('saved');
      saveIcon.style.backgroundColor = ''; // Reset to default color
    });
  
    // Add note to the container, prioritizing the order of notes
    document.querySelector('.notes').prepend(note);
    saveAllNotesToLocalStorage(); // Save the new note to localStorage
    return note;
  }
  
  // Load notes when the page loads
  document.addEventListener('DOMContentLoaded', loadNotes);
  