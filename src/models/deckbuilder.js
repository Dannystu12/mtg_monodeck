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
  this.getLands(colorIdentity, criteria.lands);
  this.getCreatures(color, criteria.creatures);
};

DeckBuilder.prototype.getLands = function (colorIdentity, qty) {
  if(qty <= 0) return;
  const landRequest = new Request(`https://api.magicthegathering.io/v1/cards?types=land&colorIdentity=${colorIdentity}&pageSize=1`);
  landRequest.get(data => {
    const result = [];
    const landCard = data.cards[0];
    landCard.qty = qty;
    this.cards.push(landCard);
    result.push(landCard);
    PubSub.publish("DeckBuilder:data-loaded", result);
  });
};

DeckBuilder.prototype.getCreatures = function (color, qty) {
  if(qty <= 0) return;
  const creatureRequest = new Request(`https://api.magicthegathering.io/v1/cards?types=creature&colors=${color}`);
  creatureRequest.get(data => {
    resultCards = [];
    for(const result of data.cards){
      if(resultCards.length >= qty) break;
      if(result.colors.length > 1) continue;
      const resultCardsNames = resultCards.map(resultCard => resultCard.name);
      console.log(result.name);
      console.log(resultCardsNames.indexOf(result.name));
      if(resultCardsNames.indexOf(result.name) !== -1) continue;
      result.qty = 1;
      resultCards.push(result);
    }
    this.cards.concat(resultCards);
    PubSub.publish("DeckBuilder:data-loaded", resultCards);
  })
};


module.exports = DeckBuilder;
