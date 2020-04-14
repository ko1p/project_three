class Card {
  constructor(cardData, openImageCallback) {
    this.cardData = cardData;
    this.id = this.cardData._id
    this.cardElement = this.create(this.cardData);
    this.image = this.cardElement.querySelector('.place-card__image');
    this.link = this.image.style.backgroundImage.slice(5, -2);
    this.openImage = this.openImage.bind(this);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.cardInfo = this.cardInfo.bind(this);
    this.openImageCallback = openImageCallback;
    this.image.addEventListener('click', this.openImage);
    this.cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.cardInfo);
    this.cardElement
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.cardInfo);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked')
  };

  remove(cardElement) {
    cardElement.parentNode.removeChild(cardElement);
  };

  openImage(event) {
    this.openImageCallback(event, this.link);
  }

  cardInfo(event) {
    const cardInform = {};
    cardInform.data = this.cardData;
    cardInform.element = this.cardElement;
    cardInform.target = event.target;
    Script.eventDefinition(cardInform);
  }

  create(cardData) {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
              <div class="place-card">
                <div class="place-card__image">
                    <button class="place-card__delete-icon place-card__delete-icon_hide"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name"></h3>
                    <div>                    
                    <button class="place-card__like-icon"></button>
                    <p class="place-card__like-counter">${cardData.likes.length}</p>
                    </div>            
                </div>
              </div>`);

    const basket = template.querySelector('.place-card__delete-icon');
    const likeIcon = template.querySelector('.place-card__like-icon')
    if (cardData.owner._id === Config.ownerId) {
      basket.classList.remove('place-card__delete-icon_hide')
    }
    cardData.likes.forEach(function (item) {
      if (item._id.includes(Config.ownerId)) {
        likeIcon.classList.add('place-card__like-icon_liked')
      }
    })

    const placeCard = template.firstElementChild;
    placeCard.querySelector(".place-card__name").textContent = cardData.name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${cardData.link})`;
    return placeCard;
  };
}