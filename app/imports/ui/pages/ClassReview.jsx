import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClassItem from '../components/ClassItem';
import { ClassReviews } from '../../api/classReview/ClassReview';

// eslint-disable-next-line no-undef
const searchTerm = (localStorage.getItem('searchTerm') != null) ? localStorage.getItem('searchTerm') : 'ICS 111';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {
  onSelectChange(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    // eslint-disable-next-line no-undef
    localStorage.setItem('searchTerm', e.target.value);
    // eslint-disable-next-line no-undef
    window.location.reload();
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Class Reviews</Header>
        <strong>Please select a class:</strong>&nbsp;&nbsp;
        <select className={'classReviewSelect'} onChange={this.onSelectChange.bind(this)}>
          <option value=''>Select a class: </option>
          <option value='ICS 111'>ICS 111</option>
          <option value='ICS 141'>ICS 141</option>
          <option value='ICS 211'>ICS 211</option>
          <option value='ICS 212'>ICS 212</option>
          <option value='ICS 222'>ICS 212</option>
          <option value='ICS 235'>ICS 235</option>
          <option value='ICS 241'>ICS 241</option>
          <option value='ICS 311'>ICS 311</option>
          <option value='ICS 312'>ICS 312</option>
          <option value='ICS 313'>ICS 313</option>
          <option value='ICS 314'>ICS 314</option>
          <option value='ICS 321'>ICS 321</option>
        </select>
        <br/>
        <br />
        <br />
        {(this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>}
      </Container>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Container>
        <div id={'review'} >
          <Header as="h3" textAlign="center">{searchTerm}</Header><br/>
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
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to ClassReview documents.
  const subscription = Meteor.subscribe(ClassReviews.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the ClassReview documents
  const reviews = ClassReviews.collection.find({ className: searchTerm, approved: true }).fetch();
  return {
    reviews,
    ready,
  };
})(ClassReview);
