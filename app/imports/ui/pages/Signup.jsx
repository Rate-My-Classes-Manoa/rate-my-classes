import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Label, Message, Segment, TextArea } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { Profiles } from '../../Profiles/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', imageLink: ' ', bio: '', firstName: '', lastName: '', city: '', state: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, city, state, imageLink, bio } = this.state;
    const owner = email;
    Profiles.collection.insert({ firstName, lastName, imageLink, bio, city, state, owner },
      (error) => {
        if (error) {
          swal('Error', 'Something is missing, please re-check your input', 'error');
        }
      });
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
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
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
                    name="firstName"
                    type="text"
                    required
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Last Name"
                    id="signup-last-name"
                    name="lastName"
                    type="text"
                    required
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
                  required
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
                  required
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Confirm Password"
                  id="signup-form-cpassword"
                  icon="lock"
                  iconPosition="left"
                  name="cpassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
                <Form.Field
                  label="Bio"
                  id="signup-bio"
                  control={TextArea}
                  name="bio"
                  type="text"
                  placeholder="Add a bio"
                  required
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="City"
                  id="signup-city"
                  name="city"
                  type="text"
                  placeholder="Enter a city"
                  required
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="State"
                  id="signup-state"
                  name="state"
                  type="text"
                  required
                  placeholder="Enter your state"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Image Link"
                  id="signup-image"
                  name="imageLink"
                  type="text"
                  required
                  placeholder="Enter a link to your image"
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
