const DeckBuilder = require('./models/deckbuilder.js');
const ResultView = require('./views/result_view.js');
const FormView = require('./views/form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.querySelector('#input-criteria');
  const formView = new FormView(formElement);
  formView.bindEvents();

  const deckBuilder = new DeckBuilder();
  deckBuilder.bindEvents();

  const resultDiv = document.querySelector("#result-div");
  const resultView = new ResultView(resultDiv);
  resultView.bindEvents();
});
