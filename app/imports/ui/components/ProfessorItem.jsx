import React from 'react';
import { Table, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List class table. See pages/Listclass.jsx. */
class ProfessorItem extends React.Component {
  render() {
    console.log(this.props.reviews);
    return (
      <Table.Row>
        <Table.Cell>{this.props.reviews.professorName}</Table.Cell>
        <Table.Cell>
          <Rating
            icon='star'
            defaultRating={this.props.reviews.rating}
            maxRating={5}
            disabled />
        </Table.Cell>
        <Table.Cell>{this.props.reviews.createdAt}</Table.Cell>
        <Table.Cell>{this.props.reviews.review}</Table.Cell>
        <Table.Cell>{this.props.reviews.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ProfessorItem.propTypes = {
  // reviews: PropTypes.shape({
  //   professorName: PropTypes.string,
  //   owner: PropTypes.string,
  //   createdAt: PropTypes.string,
  //   review: PropTypes.string,
  //   rating: PropTypes.Number,
  //   approved: Boolean,
  //   _id: PropTypes.string,
  // }).isRequired,
  reviews: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfessorItem);
