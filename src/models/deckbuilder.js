const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const DeckBuilder = function () {
  this.colors = ['Black', 'White', 'Blue', 'Green', 'Red'];
  this.cards = [];
};

DeckBuilder.prototype.bindEvents = function () {
  PubSub.publish("DeckBuilder:deck-colors", this.colors);
  PubSub.subscribe('FormView:criteria-loaded', event => {
    this.buildDeck(event.detail);
  });
};

DeckBuilder.prototype.buildDeck = function (criteria) {
  this.cards = [];
  const color = this.colors[criteria.color];
  const colorIdentity = color === 'Blue' ? 'U' : color[0];
  const request = new Request(`https://api.magicthegathering.io/v1/cards?types=land&colorIdentity=${colorIdentity}&pageSize=1`);
  request.get(data => {
    const landCard = data.cards[0];
    landCard.qty = criteria.lands;
    if(landCard.qty > 0){
      this.cards.push(landCard)
    }
    PubSub.publish("DeckBuilder:data-loaded", this.cards);
  });
};


module.exports = DeckBuilder;
