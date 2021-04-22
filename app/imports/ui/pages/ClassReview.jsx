import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClassItem from '../components/ClassItem';
import { ClassReviews } from '../../api/classReview/ClassReview';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {

  classes = [
    'ICS 101', 'ICS 102', 'ICS 103', 'ICS 110', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 212',
    'ICS 215', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 290', 'ICS 312', 'ICS 313', 'ICS 314',
    'ICS 321', 'ICS 331', 'ICS 332', 'ICS 351', 'ICS 355', 'ICS 361', 'ICS 390', 'ICS 414',
    'ICS 414', 'ICS 415', 'ICS 419', 'ICS 421', 'ICS 422', 'ICS 423', 'ICS 424', 'ICS 425',
    'ICS 426', 'ICS 427', 'ICS 428', 'ICS 431', 'ICS 432', 'ICS 434', 'ICS 435', 'ICS 438',
    'ICS 441', 'ICS 442', 'ICS 443', 'ICS 451', 'ICS 452', 'ICS 455', 'ICS 461', 'ICS 462',
    'ICS 464', 'ICS 465', 'ICS 466', 'ICS 469', 'ICS 471', 'ICS 475', 'ICS 476', 'ICS 481',
    'ICS 483', 'ICS 484', 'ICS 485', 'ICS 486', 'ICS 491', 'ICS 495', 'ICS 496', 'ICS 499',
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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Class</Table.HeaderCell>
              <Table.HeaderCell>Review</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reviews.map((review) => <ClassItem key={review._id} review={review} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ClassReview.propTypes = {
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(ClassReviews.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const reviews = ClassReviews.collection.find({}).fetch();
  return {
    reviews,
    ready,
  };
})(ClassReview);
