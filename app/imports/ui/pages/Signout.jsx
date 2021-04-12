import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Container fluid>
        <Header id="signout-page" as="h1" textAlign="center" color="red">
          <p>You are signed out.</p>
        </Header>
        <Image centered src="https://wordstodeeds.files.wordpress.com/2017/02/fotolia_81913457_xs.jpg" size="big" />
      </Container>
    );
  }
}
