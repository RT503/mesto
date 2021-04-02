export default class Section{
  constructor({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  prepend(element) {
    this._container.prepend(element);
  }

  renderElements() {
    this._initialArray.forEach(item =>
      this._renderer(item));

  }
}
