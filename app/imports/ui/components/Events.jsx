import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Events extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.events.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.events.eventName}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.events.time}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.events.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Events.propTypes = {
  events: PropTypes.shape({
    eventName: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.date,
    description: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Events);
