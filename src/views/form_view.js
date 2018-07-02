const SelectView = require('./select_view.js');
const PubSub = require('../helpers/pub_sub.js');

const FormView = function(formElement, resultContainer) {
  this.formElement = formElement;
  this.resultContainer = resultContainer;
};

FormView.prototype.bindEvents = function () {
  // Load colors into selct view
  const selectElement = this.formElement.querySelector('#color-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  this.formElement.addEventListener('submit', event => {
    event.preventDefault();
    const criteria = {
      color: parseInt(event.target['color-select'].value),
      lands: parseInt(event.target['lands'].value),
      creatures: parseInt(event.target['creatures'].value),
      sorceries: parseInt(event.target['sorceries'].value),
      enchantments: parseInt(event.target['enchantments'].value),
      artifacts: parseInt(event.target['artifacts'].value),
      instants: parseInt(event.target['instants'].value)
    };

    let totalCards = 0;
    for(const property in criteria){
      if(property === "color") continue;
      totalCards += criteria[property];
    }

    if(totalCards < 60 || totalCards > 80){
      alert(`You chose ${totalCards} cards but decks need to be between 60 and 80 cards`);
      return;
    }

    while(this.resultContainer.firstChild){
      this.resultContainer.removeChild(this.resultContainer.firstChild);
    }

    PubSub.publish('FormView:criteria-loaded', criteria);

    this.formElement.reset();
  })
};

module.exports = FormView;
