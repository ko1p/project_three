export default class Popup {
    constructor(element) {
      this.element = element;
      const closeButton = this.element.querySelector('.popup__close');
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      closeButton.addEventListener('click', this.close);
    }
  
    open() {
      this.element.classList.add('popup_is-opened');
    }
      
    close() {
      this.element.classList.remove('popup_is-opened');
    }
  }