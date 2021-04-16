import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Menu, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Class from '../components/Class';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassReview extends React.Component {
  classReviews = [ {
    className: 'ICS 311',
    name: 'John Doe',
    date: '4/14/2021',
    review: 'This class was very hard. It is mostly self taught so do not expect to learn much from the lectures.' +
        'The class is taught by uploading videos, then you are expected to do a quiz EVERY time before class starts, ' +
        'then in class you would be put in a group and do an assignment together for the rest of the class. Overall, ' +
        'hard class.',
  },
    {
      className: 'ICS 311',
      name: 'John Doe',
      date: '4/14/2021',
      review: 'This class was very hard. It is mostly self taught so do not expect to learn much from the lectures.' +
          'The class is taught by uploading videos, then you are expected to do a quiz EVERY time before class starts, ' +
          'then in class you would be put in a group and do an assignment together for the rest of the class. Overall, ' +
          'hard class.',
    },
    {
      className: 'ICS 311',
      name: 'John Doe',
      date: '4/14/2021',
      review: 'This class was very hard. It is mostly self taught so do not expect to learn much from the lectures.' +
          'The class is taught by uploading videos, then you are expected to do a quiz EVERY time before class starts, ' +
          'then in class you would be put in a group and do an assignment together for the rest of the class. Overall, ' +
          'hard class.',
    },
    {
      className: 'ICS 314',
      name: 'Jane Doe',
      date: '4/12/2021',
      review: 'This class is very intensive. There are a lot of coding assignments to do and there are around 4-5 due' +
          'every week, so expect a lot of homework. In class we do practice WODs which are also pretty intensive as' +
          'are expected to finish before a certain time. Although it is a very intensive class, it is also the most ' +
          'comprehensive class as I learnt a lot.',
    },
    {
      className: 'ICS 314',
      name: 'Jane Doe',
      date: '4/12/2021',
      review: 'This class is very intensive. There are a lot of coding assignments to do and there are around 4-5 due' +
          'every week, so expect a lot of homework. In class we do practice WODs which are also pretty intensive as' +
          'are expected to finish before a certain time. Although it is a very intensive class, it is also the most ' +
          'comprehensive class as I learnt a lot.',
    },
    {
      className: 'ICS 314',
      name: 'Jane Doe',
      date: '4/12/2021',
      review: 'This class is very intensive. There are a lot of coding assignments to do and there are around 4-5 due' +
          'every week, so expect a lot of homework. In class we do practice WODs which are also pretty intensive as' +
          'are expected to finish before a certain time. Although it is a very intensive class, it is also the most ' +
          'comprehensive class as I learnt a lot.',
    },
    {
      className: 'ICS 212',
      name: 'John Doe',
      date: '4/14/2021',
      review: 'This class was very hard. It is mostly self taught so do not expect to learn much from the lectures.' +
          'The class is taught by uploading videos, then you are expected to do a quiz EVERY time before class starts, ' +
          'then in class you would be put in a group and do an assignment together for the rest of the class. Overall, ' +
          'hard class.',
    },
  ]
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    function showMessage(theMessage) {
      const message = theMessage;
      if (message.style.display === 'none') {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
      }
    }

    function showClass() {
      // eslint-disable-next-line no-undef
      const message = document.getElementById('showReviews');
      showMessage(message);
    }

    function search(name) {
      let classNames = _.filter(name, function(element) {
        return element.classNames == document.getElementById("searcher").value;
      });
      return classNames;
    }

    return (
        <div>
          <Container>
            <Header as="h2" textAlign="center">Class Reviews</Header>
            <Menu className="top menu">
              <Container>
                <Menu.Item fitted>
                  <button className="ui green button" onClick={showClass} id="showAll">Show All Reviews</button>
                </Menu.Item>
                <Menu.Item fitted position="right">
                  <div className="ui focus input"><input type="text" id="searcher" placeholder="Search..."/></div>
                  <button className="ui green button" onClick={search} id="showAll">Search</button>
                </Menu.Item>
              </Container>
            </Menu>
          </Container>
          <div id="showReviews" className={'theHiddenClasses'}>
            <Container>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Class Names</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Review</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.classReviews.map((classes,index)=><Class key={index} classes={classes}/>)}
                </Table.Body>
              </Table>
            </Container>
          </div>
        </div>
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
