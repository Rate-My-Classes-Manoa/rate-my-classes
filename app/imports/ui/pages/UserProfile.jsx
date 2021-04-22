// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Button, Message, Header, Divider, Loader, Rating, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
// import { Link } from 'react-router-dom';
import { Profiles } from '../../Profiles/Profiles';
import UserInfo from '../components/UserInfo';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
// import { ClassReviewsForUserpage } from '../../api/classReview/ClassReviewForUserpage';
/** A simple static component to render some text for the UserProfile page. */
class UserProfile extends React.Component {
  render() {
    const test = this.props.profiles;
    const classesEnrolled = this.props.classReview;
    const professorReview = this.props.professorReview;
    const exist = (test.length !== 0);
    // console.log(exist);
    return (
      exist ? test.map((stuff) => <UserDisplay key= { stuff._id } classesEnr= {classesEnrolled} profileData= {stuff} professorReviews={professorReview}/>) :
        <Loader active>Getting data</Loader>
    );
  }
}
// classReviewsByOthers={classReviewsByOthers}
class UserDisplay extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    // const leftGrid = { marginLeft: '20px' };
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor3 = Math.floor(Math.random() * 16777215).toString(16);

    // eslint-disable-next-line react/prop-types
    const { firstName } = this.props.profileData;
    const classesTaken = _.pluck(this.props.classesEnr, 'className');
    const classReviews = this.props.classesEnr;
    console.log(classReviews);
    return (
      <div className="userHP">
        <Grid id='UserProfile-page' verticalAlign='middle' textAlign='center'>
          <Grid.Column width={4}>
            <Rating maxRating={5} defaultRating={4} icon='star' size='massive' />
          </Grid.Column>

          <Grid.Column width={8} floated='left'>
            {/* eslint-disable-next-line no-undef */}
            <Header as='h1' inverted> Hello {firstName} </Header>
            <Header as='h2' inverted> Welcome to Rate My Classes</Header>
            {/* <h2><b>Created by students for you!</b></h2> */}
          </Grid.Column>
        </Grid>
        <div className="UserProfile-background"/>
        <Grid centered stackable columns={3} style={style}>
          <UserInfo data={this.props.profileData} />
          <Grid.Column textAlign='center' width={5} floated='left'>
            <Header as='h1' color="brown">
             Enrolled Classes <Icon name="student" size="huge"/>
            </Header>
            {/* eslint-disable-next-line react/prop-types,react/jsx-key */}
            {classesTaken.map((item) => <div key={item}><Button fluid key={item} size='big' content={item} style={{ color: `#${randomColor}` }} /> <br /></div>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Posted Reviews</Header>
            {/* eslint-disable-next-line max-len */}
            {_.map(classReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}><Label color='blue' size='large'>{item.className}</Label><Icon name='long arrow alternate right' style={{ color: `#${randomColor2}` }} />{item.review}</Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Reviews</Header>
            <Message error header="Add reviews here"
              list={["Reviews that are displayed here are awaiting the admin's approval"]} />
          </Grid.Column>

          <Grid.Column textAlign='center'>
            {/*<Header as='h1' inverted>Hello {firstName}, your reviews for professors are listed below!!</Header>*/}
            <Header as='h1' color='brown'>Posted Professor Reviews</Header>
            {/* eslint-disable-next-line max-len */}
            {_.map(this.props.professorReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}><b>You reviewed</b> <Label color='blue' size='large'>{item.professorName}</Label><br /><Icon name='long arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} /><br />{item.review}</Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Professor Reviews</Header>
            <Message error header="Add reviews here"
              list={["Reviews that are displayed here are awaiting the admin's approval"]} />
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
  classReview: PropTypes.array.isRequired,
  professorReview: PropTypes.array.isRequired,
  // classReviewForUserpage: PropTypes.array.isRequired,
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
  classesEnr: PropTypes.array.isRequired,
  professorReviews: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const classReviewsSub = Meteor.subscribe(ClassReviews.userPublicationName);
  const professorReviewsSub = Meteor.subscribe(ProfessorReviews.userPublicationName);
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  const classReview = ClassReviews.collection.find({}).fetch();
  const professorReview = ProfessorReviews.collection.find({}).fetch();
  return {
    profiles,
    classReview,
    professorReview,
    ready: subscription.ready() && classReviewsSub.ready() && professorReviewsSub.ready(),
  };
})(UserProfile);
