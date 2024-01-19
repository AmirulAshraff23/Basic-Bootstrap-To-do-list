// Update clock every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').innerText = formattedTime;
  }

  // Update greeting message based on time
  function updateGreetingMessage() {
    const now = new Date();
    const hours = now.getHours();

    let greeting;

    if (hours < 12) {
      greeting = 'Good morning';
    } else if (hours < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    document.getElementById('greeting-message').innerText = `${greeting}, userName! It is now displayTime. What will you do today?`;
  }

  // Update clock and greeting message every second
  setInterval(() => {
    updateClock();
    updateGreetingMessage();
  }, 1000);

  // Initial update
  updateClock();
  updateGreetingMessage();