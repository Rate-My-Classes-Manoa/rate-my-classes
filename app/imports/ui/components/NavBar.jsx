import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
// import Signout from '../pages/Signout';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Rate My Classes - Manoa</Header>
        </Menu.Item>
        {this.props.currentUser ? ([
          <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key="profile" id="userProfile"> Your Profile </Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/event" key="event" id="event">Community Events</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key="list" id="classReview">Class Reviews</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/professor" key="professor" id="profReview">Professor Reviews</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/add-class-review" key='add' id="addClass">Add Class Review</Menu.Item>,
        ]
        ) : ''}

        {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
          <Menu.Item as={NavLink} activeClassName="add-event" exact to="addevent" key="">Add Event</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="add-class" exact to="add-class" key="">Add a Class</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="add-professor" exact to="add-professor" key="">Add a Prof</Menu.Item>,
        ]) : ''}
        <Menu.Item position="right" >
          {this.props.currentUser === '' ? (
            <Dropdown id="get-started" text="Get Started" as='h2'>
              <Dropdown.Menu>
                <Dropdown.Item id="get-started-signin"><Link to="/signin"><Icon name="sign in alternate" size="large" color="blue" /><Button inverted color="facebook" size='large'> Sign In</Button></Link></Dropdown.Item>
                <Dropdown.Item id="get-started-signup" ><Link to="/signup"><Icon name="add user" size="large" color="blue" /><Button inverted color="facebook"> Sign Up</Button></Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
