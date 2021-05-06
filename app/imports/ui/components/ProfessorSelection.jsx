import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Professor table. See pages/ListProfessor.jsx. */
class ProfessorSelection extends React.Component {
  render() {
    return (
      <option value={this.props.Professor.name}>{this.props.Professor.name}</option>
    );
  }
}

// Require a document to be passed to this component.
ProfessorSelection.propTypes = {
  Professor: PropTypes.shape({
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
export default withRouter(ProfessorSelection);
