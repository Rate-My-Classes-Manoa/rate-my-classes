import React from 'react';
import { Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserInfo extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { firstName, lastName, imageLink, owner, bio, city, state, _id } = this.props.data;
    const leftGrid = { marginLeft: '20px' };
    return (
      <Grid.Column textAlign='center' floated="left" width={5} style={leftGrid}>
        <Card fluid>
          {/* eslint-disable-next-line max-len */}
          <Image
            src={imageLink}
            wrapped circular ui={false}/>
          <Card.Content>
            <Card.Header color='red'>{firstName} {lastName}</Card.Header>
            <Card.Meta>
              <span>{owner}</span>
            </Card.Meta>
            <Card.Description>
              {bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='location arrow'/>
              {`${city}, ${state}`}
            </a>
          </Card.Content>
          <Label active color='violet' size='huge'><Link to={`/edit-profile/${_id}`}>Edit Profile</Link></Label>
        </Card>
      </Grid.Column>
    );
  }
}

// Require a document to be passed to this component.
UserInfo.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageLink: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  // stuff: PropTypes.Object,
  // key: PropTypes.String,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserInfo);
