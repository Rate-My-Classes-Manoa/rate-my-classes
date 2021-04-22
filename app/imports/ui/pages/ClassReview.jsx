import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import ClassItem from '../components/Class';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {

  classes = [
    {
      name: 'John Doe', date: '4/18/2021', className: 'ICS 311', review: 'This class was very hard and not fun.',
    },
    {
      name: 'Tommy Ho', date: '4/19/2021', className: 'ICS 312', review: 'This class was very hard and not fun.',
    },
    {
      name: 'Linda Ava', date: '4/20/2021', className: 'ICS 212', review: 'This class was very hard and not fun.',
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
        <Header as="h2" textAlign="center">Class Reviews</Header>
        {this.classes.map((classItem, index) => <ClassItem key={index} classItem={classItem} />)}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ClassReview.propTypes = {
  stuffs: PropTypes.array.isRequired,
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
})(ClassReview);