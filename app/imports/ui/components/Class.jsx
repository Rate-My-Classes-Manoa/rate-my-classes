import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Class extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.classes.name}</Table.Cell>
          <Table.Cell>{this.props.classes.date}</Table.Cell>
          <Table.Cell>{this.props.classes.review}</Table.Cell>
        </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Class.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Class);
