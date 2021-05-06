import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table, Rating } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import ClassItem from '../components/ClassItem';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ClassList } from '../../api/classList/ClassList';
import ClassSelection from '../components/ClassSelection';

// eslint-disable-next-line no-undef
const searchTerm = localStorage.getItem('searchTerm');
// eslint-disable-next-line no-undef
const description = localStorage.getItem('description');
// eslint-disable-next-line no-undef
const rating = localStorage.getItem('rating');

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {
  onSelectChange(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    // eslint-disable-next-line no-undef
    localStorage.setItem('searchTerm', e.target.value);
    const record = ClassList.collection.findOne({ class: e.target.value });
    // eslint-disable-next-line no-undef
    localStorage.setItem('description', record.className);
    // eslint-disable-next-line no-undef
    localStorage.setItem('rating', record.avgRating);
    // eslint-disable-next-line no-undef
    window.location.reload();
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    const classes = _.sortBy(this.props.classList, 'class');
    return (
      <Container>
        <Header as="h2" textAlign="center">Class Reviews</Header>
        <strong>Please select a class:</strong>&nbsp;&nbsp;
        <select className={'classReviewSelect'} onChange={this.onSelectChange.bind(this)}>
          <option value=''>Select a class: </option>
          {classes.map((aClass) => <ClassSelection key={aClass._id} class={aClass}/>)}
        </select>
        <br/>
        <br />
        <br />
        {(this.props.reviewsReady) ? this.renderPage() : <Loader active>Getting data</Loader>}
      </Container>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Container>
        <div id={'review'} >
          <Header as="h3" textAlign="center">{searchTerm}</Header>
          <Header as="h3" textAlign="center">{description}</Header>
          <Header as="h3" textAlign="center">
            <Rating icon={'star'} defaultRating={Math.floor(rating)} maxRating={5} disabled/>
          </Header><br/>
          <Table basic={'very'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Class</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Date of Review</Table.HeaderCell>
                <Table.HeaderCell>Review</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
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
  classList: PropTypes.array.isRequired,
  reviewsReady: PropTypes.bool.isRequired,
  classListReady: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to ClassReview documents.
  const reviewsSubscription = Meteor.subscribe(ClassReviews.generalPublicationName);
  const classListSubscription = Meteor.subscribe(ClassList.generalPublicationName);
  // Determine if the subscription is ready
  const reviewsReady = reviewsSubscription.ready();
  const classListReady = classListSubscription.ready();
  // Get the ClassReview documents
  const reviews = ClassReviews.collection.find({ className: searchTerm, approved: true }).fetch();
  const classList = ClassList.collection.find({}).fetch();
  return {
    reviews,
    classList,
    reviewsReady,
    classListReady,
  };
})(ClassReview);
