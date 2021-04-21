import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header, Item, Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

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
          <Menu.Item as={NavLink} activeClassName="active" exact to="/event" key="event">Community Events</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key="list">Class Reviews</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/professor" key="professor">Professor Reviews</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="" exact to="" key="">Add Event</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Review</Menu.Item>,
        ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Item>
              <Link to="/signin"><Button basic size="big" inverted>Log In</Button></Link>
              <Link to="/signup"><Button basic size="big" inverted>Get Started</Button></Link>
            </Item>
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
