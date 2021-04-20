import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Professor } from '../../api/professor/ProfessorReview';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfessorReview extends React.Component {

  professors = [
    {
      name: 'Philip Johnson', address: 'POST 307, University of Hawaii',
      image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
      description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
          'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
    },
    {
      name: 'Henri Casanova', address: 'POST 307, University of Hawaii',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
      description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
          'that I ran the Hana relay with an actual Team.',
    },
    {
      name: 'Kim Binsted', address: 'POST 307, University of Hawaii',
      image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
      description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
          'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
          'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
          '"What do you call a Martian who drinks beer? An ale-ien!".',
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
              {this.professors.map((professor ,index)=> <Professor
                  key={index}
                  professor={professor}
                  //review={this.props.review}
                  />)}
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
  const subscription2 = Meteor.subscribe(Professor.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  const review = Professor.collection.find({}).fetch();
  return {
    stuffs,
    ready,
    review,
  };
})(ProfessorReview);
