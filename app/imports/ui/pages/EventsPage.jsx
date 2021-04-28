import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Event from '../components/Event';
import { Events } from '../../api/events/Events';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class EventsPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div id="eventsPageBackground">
        <Container className={'eventsPageBody'}>
          <Header as="h2" textAlign="center" inverted>University of Hawaii at Manoa Events</Header>
          <Card.Group centered>
            {/*{this.props.events.map((event) => <Event key={event._id} event={event}/>)}*/}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
EventsPage.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const events = Events.collection.find().fetch();
  return {
    events,
    ready,
  };
})(EventsPage);
