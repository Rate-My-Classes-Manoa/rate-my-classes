import React from 'react';
import { Container, Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List class table. See pages/Listclass.jsx. */
class ClassItem extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h3" textAlign="center">{this.props.classItem.className}</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Review</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.props.classItem.name}</Table.Cell>
              <Table.Cell>{this.props.classItem.date}</Table.Cell>
              <Table.Cell>{this.props.classItem.review}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <br/>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ClassItem.propTypes = {
  classItem: PropTypes.shape({
    className: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    review: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ClassItem);
