export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.authorization;
    this.contentType = options.contentType;
  }

  getUserProfileInfo() {

    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err)
      })

  }

  getInitialCards() {

    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

  editUserProfile(userData) {

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

  postNewCard(cardData, event) {

    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })


  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
      .catch((err) => {
        console.log(err);
      })

  }

  setLike(id) {

    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

  removeLike(id) {

    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

  changeAvatar(link, event) {

    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

  getAvatar() {

    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization,
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })

  }

}

