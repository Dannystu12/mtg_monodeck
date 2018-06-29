const SelectView = require('./views/select_view.js');
const DeckBuilder = require('./models/deckbuilder.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('#color-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const deckBuilder = new DeckBuilder();
  deckBuilder.bindEvents();
});
