import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
import { signinPage } from './signin.page';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, firstName, lastName, username, password, bio, city, state, image) {
    const haveAcc = await Selector('#alreadyHaveAcc').exists;
    await this.isDisplayed(testController);
    await testController.typeText('#signup-first-name', firstName);
    await testController.typeText('#signup-last-name', lastName);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.typeText('#signup-form-cpassword', password);
    await testController.typeText('#signup-bio', bio);
    await testController.typeText('#signup-city', city);
    await testController.typeText('#signup-state', state);
    await testController.typeText('#signup-image', image);
    await testController.click('#signup-form-submit');
    if (haveAcc) {
      await navBar.gotoSigninPage(testController);
      await signinPage.signin(testController, username, password);
    } else {
      await navBar.isLoggedIn(testController, username);
    }
  }
}

export const signupPage = new SignupPage();
