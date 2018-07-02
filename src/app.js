const DeckBuilder = require('./models/deckbuilder.js');
const ResultView = require('./views/result_view.js');
const FormView = require('./views/form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const resultDiv = document.querySelector("#result-div");
  const formElement = document.querySelector('#input-criteria');
  const formView = new FormView(formElement, resultDiv);
  formView.bindEvents();

  const deckBuilder = new DeckBuilder();
  deckBuilder.bindEvents();


  const resultView = new ResultView(resultDiv);
  resultView.bindEvents();
});
