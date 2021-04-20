// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Icon, Button, Header, Divider, Card, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
// import { Stuffs } from '../../Stuff/Stuff';
// import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../Profiles/Profiles';
/** A simple static component to render some text for the UserProfile page. */
class UserProfile extends React.Component {
  render() {
    const test = this.props.profiles;
    return (
      test.map((stuff) => <UserDisplay key= { stuff._id } stuff= {stuff} />)
    );
  }
}

class UserDisplay extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    const leftGrid = { marginLeft: '20px' };
    // eslint-disable-next-line react/prop-types
    const { firstName, lastName, owner, bio, classes, reviews } = this.props.stuff;
    return (
      <div>
        <Grid id='UserProfile-page' verticalAlign='middle' textAlign='center'>

          <Grid.Column width={4}>
            <Image size='medium' src="/images/logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            {/* eslint-disable-next-line no-undef */}
            <Header as='h1' color='yellow'> {firstName} {lastName}, Welcome to Rate My Classes</Header>
            <p><b>Created by students for you!</b></p>
          </Grid.Column>
        </Grid>
        <div className="UserProfile-background"/>
        <Grid centered stackable columns={6} style={style}>
          <Grid.Column textAlign='center' floated="left" width={5} style={leftGrid}>
            <Card>
              {/* eslint-disable-next-line max-len */}
              <Image
                src='https://www.businessinsider.in/photo/77825377/Lionel-Messi-leaving-Barcelona-would-be-the-biggest-and-most-shocking-transfer-in-football-history-but-it-would-make-perfect-sense-for-everyone.jpg?imgsize=330710'
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
                    Honolulu
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign='center' width={5} floated='left'>
            <Header as='h1' color="blue">
             Classes Taken <Icon name="student" size="huge"/>
            </Header>
            {/* eslint-disable-next-line react/prop-types,react/jsx-key */}
            {classes.map((item) => <div key={item}><Button fluid key={item} primary content={item} /> <br /></div>)}
            <Divider horizontal fitted inverted>---</Divider>

            <Header as='h1'>Pending Reviews</Header>
            {/* eslint-disable-next-line array-callback-return,react/prop-types */}
            {/* {_.each(reviews, (item) => <div><Button>{item}haha</Button>hmm </div>)} */}
            {/* eslint-disable-next-line react/prop-types,react/jsx-key,react/no-unescaped-entities */}
            {/* <div>{_.mapObject(reviews, (val, key) => <div><Button>{key}</Button></div>)})}</div> */}
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <div>
              {/* {_.mapObject(reviews, function (val, key) { return (<Button>{key}</Button>); })} */}
              {/* {_.map(_.values(reviews), val => <Message>{val}</Message>) } */}
              {_.map(_.keys(reviews), (key) => <div key="key" ><span><Button color='blue'>{key}</Button>
                <Message size='large' color='yellow'>{reviews[key]}</Message></span>
              </div>)}
              {/* eslint-disable-next-line no-unused-vars */}
              {/* {_.map(_.keys(reviews), (item) => <div><Button key={item} inverted>{item}</Button> */}
              {/*  /!* eslint-disable-next-line react/prop-types *!/ */}
              {/*  /!*<Message key={key}>{reviews.key}</Message>*!/ */}
              {/* </div>)} */}
            </div>
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

// class Usersub extends React.Component {
//   render() {
//     // eslint-disable-next-line react/prop-types
//     const obj = this.props.reviews;
//     console.log(obj);
//     return (
//         // eslint-disable-next-line no-unused-vars
//       <div>{_.mapObject(obj, (key, value) => <Button>{key}</Button>)}</div>
//     );
//   }
// }

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  // profiles: PropTypes.shape({
  //   name: PropTypes.string,
  //   quantity: PropTypes.number,
  //   condition: PropTypes.string,
  //   _id: PropTypes.string,
  //   owner: PropTypes.string,
  // }).isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// UserDisplay.propTypes = {
//   // profiles: PropTypes.shape({
//   //   name: PropTypes.string,
//   //   quantity: PropTypes.number,
//   //   condition: PropTypes.string,
//   //   _id: PropTypes.string,
//   //   owner: PropTypes.string,
//   // }).isRequired,
//   stuff: PropTypes.Object,
//   // key: PropTypes.String,
// };

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
