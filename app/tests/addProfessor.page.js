import { Selector } from 'testcafe';

class AddProfessorPage {
  constructor() {
    this.pageId = '#addProfessor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Check that the specified user is currently logged in. */
  async isAddProfessorPage(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
    await testController.click('#addNewProfessor');
  }
}

export const addProfessorPage = new AddProfessorPage();
