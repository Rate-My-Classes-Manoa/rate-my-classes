import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClassItem from '../components/ClassItem';
import { ClassReviews } from '../../api/classReview/ClassReview';
import ClassSelection from '../components/ClassSelection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {
  constructor() {
    super();
    this.searchTerm = 'ICS 212';
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (
      (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    function showReviews() {
      // eslint-disable-next-line no-undef
      const reviews = document.getElementById('review');
      if (reviews.style.display === 'none') {
        reviews.style.display = 'block';
      } else {
        reviews.style.display = 'none';
      }
    }

    return (
      <Container>
        <Header as="h2" textAlign="center">Class Reviews</Header>
        <Header as="h4" textAlign="left">Please select a class:</Header>
        <ClassSelection/><br />
        <button className="ui yellow button" onClick={showReviews}>Show Reviews</button>
        <br />
        <br />
        <div id={'review'} /* className={'classReviews'} */>
          <Table>
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
              {this.props.reviews.map((review) => <ClassItem key={review._id} review={review}/>)}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}

// Require an array of Class Review documents in the props.
ClassReview.propTypes = {
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to ClassReview documents.
  const subscription = Meteor.subscribe(ClassReviews.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the ClassReview documents
  const reviewInstance = new ClassReview();
  const reviews = ClassReviews.collection.find({ className: reviewInstance.searchTerm }).fetch();
  return {
    reviews,
    ready,
  };
})(ClassReview);
