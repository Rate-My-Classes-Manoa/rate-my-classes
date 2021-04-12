import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Label, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page" fluid>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column textAlign="center">
            <Header as="h2" textAlign="center" color="orange">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked size="big" color="yellow">
                <Form.Group inline>
                  <Form.Input
                    label="First Name"
                    id="signup-first-name"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Last Name"
                    id="signup-last-name"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Confirm Password"
                  id="signup-form-cpassword"
                  icon="lock"
                  iconPosition="left"
                  name="cpassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" color="red" size="large" fluid content="Submit"/>
                <Message color="teal">
                  <Message.Header> Already have an account?</Message.Header> <br />
                  <Link to="/signin"><Label color="teal" size="big" circular>Login</Label></Link>
                </Message>
              </Segment>
            </Form>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
