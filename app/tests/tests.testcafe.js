import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userProfilePage } from './userProfile.page';
import { adminProfilePage } from './adminProfile.page';
import { eventPage } from './event.page';
import { classReviewPage } from './classReview.page';
import { professorPage } from './professor.page';
import { addClassPage } from './addClass.page';
import { addClassReviewPage } from './addClassReview.page';
import { addProfessorReviewPage } from './addProfessorReview.page';
import { addProfessorPage } from './addProfessor.page';
import { editUserPage } from './editUser.page';
import { devTeamPage } from './devTeam.page';
import { careersPage } from './careers.page';
import { signupPage } from './signup.page';
import { addEventsPage } from './addEvents.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentialsAdmin = { username: 'admin@foo.com', password: 'changeme' };

/** Info to make a new user */
const newUser = { firstName: 'First', lastName: 'Last', username: 'test@foo.com', password: 'changeme', bio: 'This is a test.', city: 'Honolulu', state: 'Hawaii', image: 'http://clipart-library.com/data_images/6103.png' };

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

test('Test sign up works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newUser.firstName, newUser.lastName, newUser.username, newUser.password, newUser.bio, newUser.city, newUser.state, newUser.image);
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

test('Test Profile edit', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await editUserPage.isEditUserPage(testController, credentials.username);
  await editUserPage.isDisplayed(testController);
  await editUserPage.editUser(testController);
  await userProfilePage.isUserProfile(testController, credentials.username);
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
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.isLoggedIn(testController, credentialsAdmin.username);
  await addClassPage.isAddClassPage(testController, credentialsAdmin.username);
  await addClassPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add Professor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.isLoggedIn(testController, credentialsAdmin.username);
  await addProfessorPage.isAddProfessorPage(testController, credentialsAdmin.username);
  await addProfessorPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add class Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await addClassReviewPage.isAddClassReviewPage(testController, credentials.username);
  await addClassReviewPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add Professor Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await addProfessorReviewPage.isAddProfessorReviewPage(testController, credentials.username);
  await addProfessorReviewPage.isDisplayed(testController);
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

test('Test Admin profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.isLoggedIn(testController, credentialsAdmin.username);
  await adminProfilePage.isDisplayed(testController);
  await adminProfilePage.isAdminProfile(testController, credentialsAdmin.username);
  await adminProfilePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add Events Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.isLoggedIn(testController, credentialsAdmin.username);
  await addEventsPage.isAddEventsPage(testController, credentialsAdmin.username);
  await addEventsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
