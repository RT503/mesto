export default class Popup {
  constructor(popupSelector){
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup__opened');
  }

  close() {
    this._popup.classList.remove('popup__opened');
  }

  setEventListeners() => {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this._popup.close;
    })
  }

  _handleEscClose(evt){
    if (evt.key === ESC) {
      this.close();
  }

  }
}
