const CardView = function(card, container){
  this.card = card;
  this.container = container;
};

CardView.prototype.render = function () {
  const div = document.createElement('div');
  div.classList.add('card');

  const imgElement = document.createElement('img');
  imgElement.src = this.card.imageUrl;
  imgElement.classList.add('card-img');
  div.appendChild(imgElement);

  const qtyElement = document.createElement('p');
  qtyElement.textContent = `x${this.card.qty}`;
  qtyElement.classList.add('card-qty');
  div.appendChild(qtyElement);
  this.container.appendChild(div);
};


module.exports = CardView;
