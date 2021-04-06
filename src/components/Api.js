export default class Api {
  constructor (config) {
    this._url = config.url;
    this._token = config.authorization;

//    this.deleteCard = this.deleteCard.bind(this);
//    this.toggleLike = this.toggleLike.bind(this);
  }


  _checkResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  fetchUserInfo () {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponseData(res));
  }

  fetchInitialCards () {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponseData(res));
  }

  patchUserInfo (values) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        about: values.status
      })
    })
    .then(res => this._checkResponseData(res));
  }

  postCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResponseData(res));
  }

  deleteCard (cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
.then(res => this._checkResponseData(res));

  }

  toggleLike (cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponseData(res));
  }

  updateAvatar (link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkResponseData(res));
  }
}

