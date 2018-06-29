const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const DeckBuilder = function () {
  this.colors = ['Black', 'White', 'Blue', 'Green', 'Red'];
};

DeckBuilder.prototype.bindEvents = function () {
  PubSub.publish("DeckBuilder:deck-colors", this.colors);
};


module.exports = DeckBuilder;
