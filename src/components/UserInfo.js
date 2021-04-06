export default class UserInfo{
  constructor (selectors) {
    this.nameElement = document.querySelector(selectors.nameSelector);
    this.infoElement = document.querySelector(selectors.infoSelector);
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
    this.infoElement.textContent = formData.status;

    if(formData.avatar) {
      this.userAvatarElement.src = formData.avatar;
    }
  }

  setAvatar (link) {
    this.userAvatarElement.src = link;
  }
}
