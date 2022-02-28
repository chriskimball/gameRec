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
      document.location.replace(`/games/${gameId}`);
    }
  } catch (err) {
    console.error(err);
  }
};
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
      document.location.replace(`/games/${gameId}`);
    }
  } catch (err) {
    console.error(err);
  }
};

document.querySelector('#add-to-library').addEventListener('click', addToGameLibraryHandler);
document.querySelector('#add-to-wishlist').addEventListener('click', addToGameWishlistHandler);
