// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Button, Message, Header, Divider, Loader, Rating, Advertisement } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
// import { Link } from 'react-router-dom';
import { Profiles } from '../../Profiles/Profiles';
import UserInfo from '../components/UserInfo';
/** A simple static component to render some text for the UserProfile page. */
class UserProfile extends React.Component {
  render() {
    const test = this.props.profiles;
    const exist = (test.length !== 0);
    console.log(exist);
    return (
      exist ? test.map((stuff) => <UserDisplay key= { stuff._id } profileData= {stuff} />) :
        <Loader active>Getting data</Loader>
    );
  }
}

class UserDisplay extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    // const leftGrid = { marginLeft: '20px' };
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // eslint-disable-next-line react/prop-types
    const { firstName, lastName, classes } = this.props.profileData;
    return (
      <div className="userHP">
        <Grid id='UserProfile-page' verticalAlign='middle' textAlign='center'>
          <Grid.Column width={4}>
            <Rating maxRating={5} defaultRating={4} icon='star' size='massive' />
          </Grid.Column>

          <Grid.Column width={8} floated='left'>
            {/* eslint-disable-next-line no-undef */}
            <Header as='h1' color='yellow'> {firstName} {lastName}, Welcome to Rate My Classes</Header>
            <h2><b>Created by students for you!</b></h2>
          </Grid.Column>
        </Grid>
        <div className="UserProfile-background"/>
        <Grid centered stackable columns={3} style={style}>
          <UserInfo data={this.props.profileData} />
          <Grid.Column textAlign='center' width={5} floated='left'>
            <Header as='h1' color="brown">
             Classes Taken <Icon name="student" size="huge"/>
            </Header>
            {/* eslint-disable-next-line react/prop-types,react/jsx-key */}
            {classes.map((item) => <div key={item}><Button fluid key={item} size='big' content={item} style={{ color: `#${randomColor}` }} /> <br /></div>)}

            <Divider horizontal fitted>-----------------------------</Divider>
            <Header as='h1' color='brown'>Posted Reviews</Header>
            <Message error header="Add reviews here"
              list={['Reviews are displayed here after insertion']}
              centered />

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Reviews</Header>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            {/* <div> */}
            {/*  {_.map(_.keys(reviews), (key) => <Message key={key}><span><Label pointing='below' size='big' style={{ color: `#${randomColor}` }}>{key}</Label> */}
            {/*    <Message size='large' color='yellow'>{reviews[key]}</Message></span> */}
            {/*  <br /></Message>)} */}
            {/* </div> */}

            <Message error header="Add reviews here"
              list={["Reviews that are displayed here are awaiting the admin's approval"]}
              centered />
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon name="user secret" size="huge"/>
            <Header as='h1'>Not Anonymous</Header>
            <Header as='h3'>
                Stand by your reviews! We believe non anonymous reviews help prevent users from leaving untrue
                information!
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  // profiles: PropTypes.shape({
  //   firstName: PropTypes.string,
  //   lastName: PropTypes.string,
  //   owner: PropTypes.string,
  //   _id: PropTypes.string,
  //   bio: PropTypes.string,
  //   classes: PropTypes.array,
  //   reviews: PropTypes.object,
  // }).isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

UserDisplay.propTypes = {
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageLink: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    bio: PropTypes.string,
    classes: PropTypes.array,
    // reviews: PropTypes.object,
  }).isRequired,
  exist: PropTypes.bool.isRequired,
  // stuff: PropTypes.Object,
  // key: PropTypes.String,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(UserProfile);
