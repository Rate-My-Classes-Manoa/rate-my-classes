import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userProfilePage } from './userProfile.page';
import { eventPage } from './event.page';
import { classReviewPage } from './classReview.page';
import { professorPage } from './professor.page';
import { addClassPage } from './addClass.page';
import { editUserPage } from './editUser.page';
import { devTeamPage } from './devTeam.page';
import { careersPage } from './careers.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

/** Info to make a new user */
const newUser = { firstName: 'first', lastName: 'last', username: 'test@foo.com', password: 'changeme', bio: 'this is a test.', city: 'Honolulu', state: 'Hawaii', image: 'http://clipart-library.com/data_images/6103.png' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.skip('Test sign up works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newUser.firstName, newUser.lastName, newUser.username, newUser.password, newUser.bio, newUser.city, newUser.state, newUser.image);
  await navBar.isLoggedIn(testController, newUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test User profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.isUserProfile(testController, credentials.username);
  await userProfilePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test User profile edit page ', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await editUserPage.isEditUserPage(testController, credentials.username);
  await editUserPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.skip('Test Profile edit', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await editUserPage.isEditUserPage(testController, credentials.username);
  await editUserPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Events page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await eventPage.isEventPage(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Class Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await classReviewPage.isReviewPage(testController, credentials.username);
  await classReviewPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Professor Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await professorPage.isReviewPage(testController, credentials.username);
  await professorPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add class page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await addClassPage.isAddClassPage(testController, credentials.username);
  await addClassPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Dev Team page', async (testController) => {
  await devTeamPage.isDevTeamPage(testController);
  await devTeamPage.isDisplayed(testController);
});

test('Test Careers page', async (testController) => {
  await careersPage.isCareersPage(testController);
  await careersPage.isDisplayed(testController);
});
