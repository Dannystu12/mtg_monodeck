const PubSub = require('../helpers/pub_sub.js');
const CardView = require('./card_view.js');

const ResultView = function(container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe("DeckBuilder:data-loaded", data => {
    const cards = data.detail;
    cards.forEach(card => {
      const cardView = new CardView(card, this.container);
      cardView.render();
    });
  });
};

module.exports = ResultView;
