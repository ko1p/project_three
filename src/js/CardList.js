export default class CardList {
    constructor(placelist, createCard) {
      this.placelist = placelist;
      this.createCard = createCard;
    }
  
    render(initial) {
      initial.forEach(function(item) {
        this.addCard(item);
      }.bind(this));
    };
  
    addCard(cardData) {
      const { cardElement } = this.createCard(cardData);
      this.placelist.appendChild(cardElement);
    }
  
  }