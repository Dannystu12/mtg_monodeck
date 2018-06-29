const SelectView = require('./views/select_view.js');
const DeckBuilder = require('./models/deckbuilder.js');
const ResultView = require('./views/result_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('#color-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const deckBuilder = new DeckBuilder();
  deckBuilder.bindEvents();

  const resultDiv = document.querySelector("#result-div");
  const resultView = new ResultView(resultDiv);
  resultView.bindEvents();
});
