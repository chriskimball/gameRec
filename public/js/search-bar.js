$(function () {
  var availableTags = [
    {
      value: 'https://gamrec/project.herokuapp.com/games/1',
      label: 'Grand Theft Auto V',
    },
    { value: '/games/2', label: 'The Witcher 3: Wildl Hunt' },
    { value: '/games/3', label: 'Portal 2' },
    { value: '/games/4', label: 'The Elder Scrolls V: Skyrim' },
    { value: '/games/5', label: 'Counter-Strike: Global Offensive' },
    { value: '/games/6', label: 'Left 4 Dead 2' },
    { value: '/games/7', label: 'Bioshock Infinite' },
    { value: '/games/8', label: 'Borderlands 2' },
  ];
  $('#tags').autocomplete({
    source: availableTags,
    select: function (event, ui) {
      window.location.href = ui.item.value;
    },
  });
});
