import { Selector } from 'testcafe';

class EditUserPage {
  constructor() {
    this.pageId = '#userEdit-Page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Check that the specified user is currently logged in. */
  async isEditUserPage(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
    await testController.click('#editUserButton');
  }

  async editUser(testController) {
    await testController.typeText('#edit-lastName', 'Smith', { replace: true });
    await testController.doubleClick('#edit-Submit');
  }
}

export const editUserPage = new EditUserPage();
