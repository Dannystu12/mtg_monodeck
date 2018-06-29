const CardView = function(card, container){
  this.card = card;
  this.container = container;
};

CardView.prototype.render = function () {
  const imgElement = document.createElement('img');
  imgElement.src = this.card.imageUrl;
  this.container.appendChild(imgElement);
};


module.exports = CardView;
