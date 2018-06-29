const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("DeckBuilder:deck-colors", event => {
      this.populate(event.detail);
  });
  this.selectElement.addEventListener("change", (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish("SelectView:selection-made", selectedIndex);
  });
};

SelectView.prototype.populate = function (colors) {
  colors.forEach((color, index) => {
    const option = document.createElement('option');
    option.textContent = color;
    option.value = index;
    this.selectElement.appendChild(option);
  });
};

module.exports = SelectView;
