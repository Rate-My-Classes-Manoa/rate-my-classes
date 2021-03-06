// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Grid, Icon, Button, Message, Header, Divider, Loader, Rating, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../Profiles/Profiles';
import UserInfo from '../components/UserInfo';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import AdminProfile from './AdminProfile';

/** A simple static component to render some text for the UserProfile page. */
class UserProfile extends React.Component {
  pageDirect(test, classesEnrolled, professorReview, exist) {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        exist ? test.map((stuff) => <UserDisplay key={stuff._id} classesEnr={classesEnrolled} profileData={stuff}
          professorReviews={professorReview}/>) :
          <Loader active>Getting data</Loader>
      );

    }
    return <AdminProfile />;
  }

  render() {
    const test = this.props.profiles;
    const classesEnrolled = this.props.classReview;
    const professorReview = this.props.professorReview;
    const exist = (test.length !== 0);
    return this.pageDirect(test, classesEnrolled, professorReview, exist);
  }
}

class UserDisplay extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor3 = Math.floor(Math.random() * 16777215).toString(16);

    const { firstName } = this.props.profileData;
    const classesTaken = _.uniq(_.pluck(this.props.classesEnr, 'className'));
    const approvedClassReviews = _.filter(this.props.classesEnr, (item) => item.approved === true);
    const pendingClassReviews = _.filter(this.props.classesEnr, (item) => item.approved === false);
    const approvedProfessorReviews = _.filter(this.props.professorReviews, (item) => item.approved === true);
    const pendingProfessorReviews = _.filter(this.props.professorReviews, (item) => item.approved === false);
    return (
      <div className="homepage">
        <Grid id='UserProfile-page' verticalAlign='middle' textAlign='center'>
          <Grid.Column width={4}>
            <Rating maxRating={5} defaultRating={4} icon='star' size='massive' />
          </Grid.Column>

          <Grid.Column width={8} floated='left'>
            <Header as='h1' inverted> Hello {firstName} </Header>
            <Header as='h2' inverted> Welcome to Rate My Classes</Header>
          </Grid.Column>
        </Grid>
        <div className="UserProfile-background"/>
        <Grid centered stackable columns={3} style={style}>
          <UserInfo data={this.props.profileData} />
          <Grid.Column textAlign='center' width={5} floated='left'>
            <Header as='h1' color="brown">
             Enrolled Classes <Icon name="student" size="huge"/>
            </Header>
            {classesTaken.map((item) => <div key={item}>
              <Button key={item._id} fluid size='big' content={item} style={{ color: `#${randomColor}` }} /> <br />
            </div>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Posted Reviews</Header>
            {_.map(approvedClassReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <Label color='blue' size='large'>{item.className}</Label>
              <Icon name='long arrow alternate right' style={{ color: `#${randomColor2}` }} />{item.review}
            </Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Reviews</Header>
            <Message error header="Add reviews here"
              list={["Reviews that are displayed here are awaiting the admin's approval"]} />
            {_.map(pendingClassReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <Label color='blue' size='large'>{item.className}</Label>
              <Icon name='long arrow alternate right' style={{ color: `#${randomColor2}` }} />{item.review}
            </Message>)}
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Header as='h1' color='brown'>Posted Professor Reviews</Header>
            {_.map(approvedProfessorReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b>You reviewed</b>
              <Label color='blue' size='large'>{item.professorName}</Label><br />
              <Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} /><br />
              {item.review}
            </Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Professor Reviews</Header>
            <Message error header="Add reviews here"
              list={["Reviews that are displayed here are awaiting the admin's approval"]} />
            {_.map(pendingProfessorReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b>You reviewed</b>
              <Label color='blue' size='large'>{item.professorName}</Label><br />
              <Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} /><br />
              {item.review}
            </Message>)}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Specify types of documents in the props.
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  classReview: PropTypes.array.isRequired,
  professorReview: PropTypes.array.isRequired,
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
  }).isRequired,
  classesEnr: PropTypes.array.isRequired,
  professorReviews: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const classReviewsSub = Meteor.subscribe(ClassReviews.userPublicationName);
  const professorReviewsSub = Meteor.subscribe(ProfessorReviews.userPublicationName);
  // Get documents from different collections
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
