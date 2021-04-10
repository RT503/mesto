export default class UserInfo{
  constructor (selectors) {
    this.nameElement = document.querySelector(selectors.nameInputSelector);
    this.infoElement = document.querySelector(selectors.infoInputSelector);
    this.userAvatarElement = document.querySelector(selectors.userAvatarSelector);
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
    this.infoElement.textContent = formData.about;

    if(formData.avatar) {
      this.userAvatarElement.src = formData.avatar;
    }
  }

  setAvatar (link) {
    this.userAvatarElement.src = link;
  }
}
