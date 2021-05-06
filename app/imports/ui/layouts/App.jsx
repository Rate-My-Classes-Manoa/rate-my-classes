import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TheFooter from '../components/TheFooter';
import Landing from '../pages/Landing';
import EditProfile from '../pages/EditProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import DevTeam from '../pages/DevTeam';
import EventsPage from '../pages/EventsPage';
import ProfessorReview from '../pages/ProfessorReview';
import UserProfile from '../pages/UserProfile';
import Careers from '../pages/Careers';
import ClassReview from '../pages/ClassReview';
import AddClassReview from '../pages/AddClassReview';
import AddEvent from '../pages/AddEvent';
import AddNewClass from '../pages/AddNewClass';
// import AdminProfile from '../pages/AdminProfile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/dev-team" component={DevTeam}/>
            <Route path="/careers" component={Careers}/>
            <ProtectedRoute path="/event" component={EventsPage}/>
            <ProtectedRoute path="/list" component={ClassReview}/>
            <ProtectedRoute path="/professor" component={ProfessorReview}/>
            <ProtectedRoute path="/add-class-review" component={AddClassReview}/>
            <ProtectedRoute path="/add-class" component={AddNewClass}/>
            <ProtectedRoute path="/profile" component={UserProfile}/>
            <ProtectedRoute path="/edit-profile/:_id" component={EditProfile}/>
            <AdminProtectedRoute path="/addevent" component={AddEvent}/>
            <Route component={NotFound}/>
          </Switch>
          <TheFooter/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      // console.log(isLogged);
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      // console.log(isAdmin);
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/profile', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
