const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const DeckBuilder = function () {
  this.colors = ['Black', 'White', 'Blue', 'Green', 'Red'];
};

DeckBuilder.prototype.bindEvents = function () {
  PubSub.publish("DeckBuilder:deck-colors", this.colors);
  PubSub.subscribe("SelectView:selection-made", event => {
    this.getCards(this.colors[event.detail]);
  });
};

DeckBuilder.prototype.getCards = function (color) {
  const request = new Request(`https://api.magicthegathering.io/v1/cards?colors=${color}&pageSize=10`);
  request.get(data => {
    this.cards = data.cards;
    PubSub.publish("DeckBuilder:data-loaded", this.cards);
  });
};


module.exports = DeckBuilder;
