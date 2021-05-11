import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table, Rating, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import ProfessorItem from '../components/ProfessorItem';
import { ProfessorList } from '../../api/professorList/ProfessorList';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import ProfessorSelection from '../components/ProfessorSelection';

// eslint-disable-next-line no-undef
const searchTermProf = localStorage.getItem('searchTermProf');
// eslint-disable-next-line no-undef
const descriptionProf = localStorage.getItem('descriptionProf');
// eslint-disable-next-line no-undef
const ratingProf = localStorage.getItem('ratingProf');
// eslint-disable-next-line no-undef
const imageLink = localStorage.getItem('imageLink');

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfessorReview extends React.Component {
  onSelectChange(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    // eslint-disable-next-line no-undef
    localStorage.setItem('searchTermProf', e.target.value);
    const record = ProfessorList.collection.findOne({ name: e.target.value });
    // eslint-disable-next-line no-undef
    localStorage.setItem('descriptionProf', record.department);
    // eslint-disable-next-line no-undef
    localStorage.setItem('ratingProf', record.avgRating);
    // eslint-disable-next-line no-undef
    localStorage.setItem('imageLink', record.imageLink);
    // eslint-disable-next-line no-undef
    window.location.reload();
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    const professors = _.sortBy(this.props.professorList, 'lastName');
    return (
      <Container>
        <Header as="h2" textAlign="center">Professor Reviews</Header>
        <strong>Please select a professor:</strong>&nbsp;&nbsp;
        <select className={'professorReviewSelect'} onChange={this.onSelectChange.bind(this)}>
          <option value=''>Select a professor: </option>
          {professors.map((aProfessor) => <ProfessorSelection key={aProfessor._id} professor={aProfessor}/>)}
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
        <div id={'profReviewpage'} >
          <Image centered src={imageLink} size='tiny' circular/>
          <Header as="h3" textAlign="center">{searchTermProf}</Header>
          <Header as="h3" textAlign="center">{descriptionProf}</Header>
          <Header as="h3" textAlign="center">
            <Rating icon={'star'} defaultRating={Math.floor(ratingProf)} maxRating={5} disabled/>
          </Header><br/>
          <Table basic={'very'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Professor</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Date of Review</Table.HeaderCell>
                <Table.HeaderCell>Review</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.reviews.map((review) => <ProfessorItem key={review._id} reviews={review}/>)}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}

// Require an array of Class Review documents in the props.
ProfessorReview.propTypes = {
  reviews: PropTypes.array.isRequired,
  professorList: PropTypes.array.isRequired,
  reviewsReady: PropTypes.bool.isRequired,
  professorListReady: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to ProfessorReview documents.
  const reviewsSubscription = Meteor.subscribe(ProfessorReviews.generalPublicationName);
  const professorListSubscription = Meteor.subscribe(ProfessorList.generalPublicationName);
  // Determine if the subscription is ready
  const reviewsReady = reviewsSubscription.ready();
  const professorListReady = professorListSubscription.ready();
  // Get the ClassReview documents
  const reviews = ProfessorReviews.collection.find({ professorName: searchTermProf, approved: true }).fetch();
  const professorList = ProfessorList.collection.find({}).fetch();
  return {
    reviews,
    professorList,
    reviewsReady,
    professorListReady,
  };
})(ProfessorReview);
