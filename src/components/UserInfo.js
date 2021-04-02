export default class UserInfo{
  constructor (selectors) {
    this.nameElement = document.querySelector(selectors.nameSelector);
    this.infoElement = document.querySelector(selectors.infoSelector);
  }

  getUserInfo() {
    const currentUser = {
      name: this.nameElement.textContent,
      info: this.infoElement.textContent
    }
    return currentUser;
  }

  setUserInfo(formData) {
    this.nameElement.textContent = formData.name;
    this.infoElement.textContent = formData.status;
  }
}
