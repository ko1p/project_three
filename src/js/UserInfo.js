export default class UserInfo {
    constructor(nameElement, jobElement) {
      this.nameElement = nameElement;
      this.jobElement = jobElement;
    }
  
    setUserInfo(userData) {
      this.userData = userData;
    }
  
    updateUserInfo() {
      this.nameElement.textContent = this.userData.name;
      this.jobElement.textContent = this.userData.job;
    }
  }