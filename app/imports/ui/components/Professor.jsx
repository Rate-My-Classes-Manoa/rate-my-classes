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
          <Image src={this.props.professor.imageLink} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.professor.name}</Card.Header>
            <Card.Meta>
              <span>{this.props.professor.department}</span>
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
    firstName: PropTypes.string,
    lastName: PropTypes.Number,
    name: PropTypes.string,
    department: PropTypes.string,
    imageLink: PropTypes.string,
    '1star': PropTypes.Number,
    '2star': PropTypes.Number,
    '3star': PropTypes.Number,
    '4star': PropTypes.Number,
    '5star': PropTypes.Number,
    totalRatings: PropTypes.Number,
    avgRating: PropTypes.Number,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Professor);
