import React from 'react';
import { Card, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  render() {
    const { eventName, image, time, description } = this.props.event;
    return (
      <Segment>
        <Card>
          <Image src={image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{eventName}</Card.Header>
            <Card.Meta>
              { time.toDateString() }
            </Card.Meta>
            <Card.Description>
              {description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.date,
    owner: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Event;
