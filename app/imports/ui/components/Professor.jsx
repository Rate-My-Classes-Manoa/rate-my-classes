import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class Professor extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <Image src={this.props.professor.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.professor.name}</Card.Header>
            <Card.Meta>
              <span>{this.props.professor.address}</span>
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

// Require a document to be passed to this component.
Professor.propTypes = {
  professor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Professor);
