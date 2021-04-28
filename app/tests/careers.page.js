import { Selector } from 'testcafe';

class CareersPage {
  constructor() {
    this.pageId = '#careers-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Check that the specified user is currently logged in. */
  async isCareersPage(testController) {
    await testController.click('#careers-link');
  }
}

export const careersPage = new CareersPage();
