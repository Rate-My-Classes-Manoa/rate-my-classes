import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Events from '../components/Events';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class EventsPage extends React.Component {

  events = [
    { eventName: 'SCEP Live Online: Kenny Endo and Taiko Center of the Pacific',
      image: 'https://www.hawaii.edu/site/calendar/uploads/38685.jpg',
      time: 'April 14',
      description: 'A master of contemporary percussion and rhythm at the vanguard of the taiko genre, Kenny Endo continues to explore new possibilities for this ancient Japanese instrument.  A performer, composer, and teacher of taiko, he has received numerous awards, accolades, and a natori (a stage name in classical drumming). Kenny is a consummate artist, blending taiko with original music through collaborations with international artists.',
    },
    { eventName: 'Meditation Session with Chinese Healing Art',
      image: 'https://miro.medium.com/max/1096/0*MXNjDsYuSaRxjWA1.',
      time: 'April 14',
      description: 'Come and join us in our online meditation sessions! Relax and unwind from your busy schedule with a 15-minute meditation session! To register, please fill out this Google form below: https://forms.gle/gHvYpE75yNDSL58b6',
    },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">University of Hawaii at Manoa Events</Header>
        <Card.Group centered>
          {this.events.map((event, index) => <Events key={index} events={event}/>)}
        </Card.Group>
      </Container>
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
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(EventsPage);
