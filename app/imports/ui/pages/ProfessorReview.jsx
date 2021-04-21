import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Professor from '../components/Professor';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfessorReview extends React.Component {

  professors = [
    {
      name: 'Philip Johnson', address: 'POST 307, University of Hawaii',
      image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    },
    {
      name: 'Henri Casanova', address: 'POST 307, University of Hawaii',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
    },
    {
      name: 'Kim Binsted', address: 'POST 307, University of Hawaii',
      image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
    },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div>
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
})(ProfessorReview);
