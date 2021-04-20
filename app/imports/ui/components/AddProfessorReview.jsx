import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders the Page for adding a document. */
class Professor extends React.Component {
  render() {
    return (
        <Feed.Event >
          <Feed.Content>
            <Feed.Content>{this.props.professor.name}</Feed.Content>
            <Feed.Date content={this.props.professor.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.professor.review}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Professor.propTypes = {
  professor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Professor);