import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Professor from '../components/Professor';
import { _ } from 'meteor/underscore';
import { ProfessorList } from '../../api/professorList/ProfessorList';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import ProfessorSelection from '../components/ProfessorSelection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfessorReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    const professors = _.sortBy(this.props.professorList, 'name');
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
        {(this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>}
      </Container>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div id="profReviewPage">
        <div/>
        <Container>
          <Header as="h2" textAlign="center" inverted>University of Hawaii Professors</Header>
          <Card.Group centered>
            {this.professors.map((professor, index) => <Professor
              key={index}
              professor={professor}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfessorReview.propTypes = {
  reviews: PropTypes.array.isRequired,
  professorList: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(ProfessorReviews.generalPublicationName);
  const subscription2 = Meteor.subscribe(ProfessorList.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const reviews = ProfessorReviews.collection.find({}).fetch();
  const professorList = ProfessorList.collection.find({}).fetch();
  return {
    reviews,
    professorList,
    ready,
  };
})(ProfessorReview);
