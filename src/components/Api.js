export default class Api {
  constructor (config) {
    this._url = config.url;
    this._token = config.authorization;
  }


  _checkResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }


  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponseData(res));
  }

  getCards () {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponseData(res));
  }

  //get all data
  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
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

  postCard (cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => this._checkResponseData(res));
  }

  deleteCard (cardData) {
    return fetch(`${this._url}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  .then(res => this._checkResponseData(res));

  }

  setLike (cardData) {
    return fetch(`${this._url}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
  .then(res => this._checkResponseData(res));
  }


  removeLike (cardData) {
    return fetch(`${this._url}/cards/likes/${cardData._id}`, {
    method: 'DELETE',
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

