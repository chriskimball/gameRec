const reviewFormHandler = async (event) => {
  event.preventDefault();

  const gameId = document.querySelector('#game-title').value;
  const platform = document.querySelector('#platform').value;
  const review = document.querySelector('#review').value.trim();

  // Accessing radio rating value without jQuery
  const ratingRadios = document.querySelectorAll('input[type="radio"]:checked').values();
  const values = Array.from(ratingRadios, (radio) => radio.value);
  rating = values[0];

  if (gameId && platform && rating && review) {
    const response = await fetch(`/api/review/${gameId}`, {
      method: 'POST',
      body: JSON.stringify({ gameId, rating, platform, review }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#review-form').addEventListener('submit', reviewFormHandler);