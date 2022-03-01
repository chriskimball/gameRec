// Function to handle adding game to User's game library.
const addToGameLibraryHandler = async (event) => {
  event.preventDefault();
  gameId = document.querySelector('#add-to-library').dataset.id;

  try {
    const response = await fetch(`/api/games/${gameId}`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If game is successfully added, delete it off the wishlist
      try {
        const response = await fetch(`/api/games/wishlist/${gameId}`, {
          method: 'DELETE',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace(`/games/${gameId}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Function to handle adding game to User's wishlist.
const addToGameWishlistHandler = async (event) => {
  event.preventDefault();
  gameId = document.querySelector('#add-to-library').dataset.id;

  try {
    const response = await fetch(`/api/games/wishlist/${gameId}`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/profile`);
    }
  } catch (err) {
    console.error(err);
  }
};

// Event Listeners for buttons.
document.querySelector('#add-to-library').addEventListener('click', addToGameLibraryHandler);
document.querySelector('#add-to-wishlist').addEventListener('click', addToGameWishlistHandler);
