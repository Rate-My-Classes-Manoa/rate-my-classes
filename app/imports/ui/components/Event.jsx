import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.event.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.event.eventName}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.event.time}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.event.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.date,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Event);
