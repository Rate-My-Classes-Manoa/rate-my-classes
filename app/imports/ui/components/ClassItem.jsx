import React from 'react';
import { Table, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List class table. See pages/Listclass.jsx. */
class ClassItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.review.className}</Table.Cell>
        <Table.Cell>
          <Rating
            icon='star'
            defaultRating={this.props.review.rating}
            maxRating={5}
            disabled />
        </Table.Cell>
        <Table.Cell>{this.props.review.createdAt}</Table.Cell>
        <Table.Cell>{this.props.review.review}</Table.Cell>
        <Table.Cell>{this.props.review.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ClassItem.propTypes = {
  review: PropTypes.shape({
    className: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.string,
    review: PropTypes.string,
    rating: PropTypes.Number,
    approved: Boolean,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ClassItem);
