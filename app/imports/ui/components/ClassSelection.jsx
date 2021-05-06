import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List class table. See pages/Listclass.jsx. */
class ClassSelection extends React.Component {
  render() {
    return (
      <option value={this.props.class.class}>{this.props.class.class}</option>
    );
  }
}

// Require a document to be passed to this component.
ClassSelection.propTypes = {
  class: PropTypes.shape({
    classAlpha: PropTypes.string,
    classNumber: PropTypes.Number,
    class: PropTypes.string,
    className: PropTypes.string,
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
export default withRouter(ClassSelection);
