// Function to handle adding a review to a game.
const reviewFormHandler = async (event) => {
  event.preventDefault();

  const gameId = document.querySelector('#game-title').value;
  const platform = document.querySelector('#platform').value;
  const review_text = document.querySelector('#review').value.trim();

  // Accessing radio rating value without jQuery
  const ratingRadios = document.querySelectorAll('input[type="radio"]:checked').values();
  const values = Array.from(ratingRadios, (radio) => radio.value);
  rating = values[0];

  if (gameId && platform && rating && review_text) {
    const response = await fetch(`/api/review/${gameId}`, {
      method: 'POST',
      body: JSON.stringify({ gameId, rating, platform, review_text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/games/${gameId}`);
    } else {
      alert(response.statusText);
    }
  }
};

// Event Listeners for buttons.
document.querySelector('#review-form').addEventListener('submit', reviewFormHandler);