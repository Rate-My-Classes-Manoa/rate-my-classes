// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Button, Message, Header, Divider, Loader, Rating, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Profiles } from '../../Profiles/Profiles';
import AdminInfo from '../components/AdminInfo';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import { ClassList } from '../../api/classList/ClassList';

/** A simple static component to render some text for the AdminProfile page. */
class AdminProfile extends React.Component {
  render() {
    const test = this.props.profiles;
    const classesEnrolled = this.props.classReview;
    const professorReview = this.props.professorReview;
    const exist = (test.length !== 0);
    return (
      exist ? test.map((stuff) => <AdminDisplay key= { stuff._id } classesEnr= {classesEnrolled} profileData= {stuff} professorReviews={professorReview}/>) :
        <Loader active>Getting data</Loader>
    );
  }
}
class AdminDisplay extends React.Component {

  // updates the total review count for the Class List Publication
  updateTotalClassReviewsCount(className) {
    const record = ClassList.collection.findOne({ class: className });
    const totalRating = record.totalRatings + 1;
    ClassList.collection.update(record._id, { $set: { totalRatings: totalRating } });
  }

  // update the average rating for the Class List Publication
  updateAvgRating(className, stars) {
    const record = ClassList.collection.findOne({ class: className });
    const totalRatings = record.totalRatings;
    const avgRating = (record.avgRating + stars) / totalRatings;
    ClassList.collection.update(record._id, { $set: { avgRating: avgRating } });
  }

  // update the number of stars for the Class List Publication
  updateRatingsCount(className, stars) {
    const record = ClassList.collection.findOne({ class: className });
    const ratings = {
      1: record['1star'],
      2: record['2star'],
      3: record['3star'],
      4: record['4star'],
      5: record['5star'],
    };

    switch (stars) {
    case 1:
      ClassList.collection.update(record._id, { $set: { '1star': ratings[1] + 1 } });
      this.updateAvgRating(className, stars);
      break;
    case 2:
      ClassList.collection.update(record._id, { $set: { '2star': ratings[2] + 1 } });
      this.updateAvgRating(className, stars);
      break;
    case 3:
      ClassList.collection.update(record._id, { $set: { '3star': ratings[3] + 1 } });
      this.updateAvgRating(className, stars);
      break;
    case 4:
      ClassList.collection.update(record._id, { $set: { '4star': ratings[4] + 1 } });
      this.updateAvgRating(className, stars);
      break;
    case 5:
      ClassList.collection.update(record._id, { $set: { '5star': ratings[5] + 1 } });
      this.updateAvgRating(className, stars);
      break;
    default:
    }
  }

  // approve the class review
  approvedClassReview(data) {
    const { createdAt, className, rating, review, owner, _id } = data;
    ClassReviews.collection.update(_id, { $set: { createdAt, className, rating, review, approved: true, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal({
        title: 'Congratulations',
        text: "You've successfully approved the review!!",
        icon: 'success',
        button: 'Go',
      })));
    this.updateTotalClassReviewsCount(className);
    this.updateRatingsCount(className, rating);
  }

  // delete the class review when the admin clicks on the red button
  deleteClassReview(data) {
    const { _id } = data;
    ClassReviews.collection.remove(_id, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal({
        title: 'Congratulations',
        text: "You've successfully deleted the review!!",
        icon: 'success',
        button: 'Go',
      })));
  }

  // approve professor review
  approveProfessorReview(data) {
    const { createdAt, professorName, rating, review, owner, _id } = data;
    ProfessorReviews.collection.update(_id, { $set: { createdAt, professorName, rating, review, approved: true, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal({
        title: 'Congratulations',
        text: "You've successfully approved the review!!",
        icon: 'success',
        button: 'Go',
      })));
  }

  // delete professor review
  deleteProfessorReview(data) {
    const { _id } = data;
    ProfessorReviews.collection.remove(_id, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal({
        title: 'Congratulations',
        text: "You've successfully deleted the review!!",
        icon: 'success',
        button: 'Go',
      })));
  }

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
        <Grid id='AdminProfile-page' verticalAlign='middle' textAlign='center'>
          <Grid.Column width={4}>
            <Rating maxRating={5} defaultRating={4} icon='star' size='massive' />
          </Grid.Column>

          <Grid.Column width={8} floated='left'>
            <Header as='h1' inverted> Hello {firstName} </Header>
            <Header as='h2' inverted> Welcome to Rate My Classes</Header>
          </Grid.Column>
        </Grid>
        <div className="AdminProfile-background"/>
        <Grid centered stackable columns={3} style={style}>
          <AdminInfo data={this.props.profileData} />
          <Grid.Column textAlign='center' width={5} floated='left'>
            <Header as='h1' color="brown">
              Total enrolled classes <Icon name="student" size="huge"/>
            </Header>
            {classesTaken.map((item) => <div key={item}>
              <Button fluid key={item._id} size='big' content={item} style={{ color: `#${randomColor}` }} /> <br />
            </div>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Posted Reviews</Header>
            {_.map(approvedClassReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b>{item.owner} reviewed</b>
              <Label color='blue' size='large'>{item.className}</Label> <br />
              <Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} />
              <br />{item.review}
            </Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Reviews</Header>
            <Message error header="Reviews that are displayed here are awaiting the admin's approval"/>

            {_.map(pendingClassReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b> {item.owner} reviewed </b>
              <Label color='blue' size='large'>{item.className}</Label><br />
              <Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} />
              <br />{item.review} <br />
              <Button circular color="green" onClick={() => this.approvedClassReview(item)}><Icon name="checkmark" inverted /></Button>
              <Button circular color="red" onClick={() => this.deleteClassReview(item)}><Icon name="close" inverted /></Button>
            </Message>)}

          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Header as='h1' color='brown'>Posted Professor Reviews</Header>
            {_.map(approvedProfessorReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b>{item.owner} reviewed</b>
              <Label color='blue' size='large'>{item.professorName}</Label>
              <br/><Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }}/>
              <br/>{item.review}
            </Message>)}

            <Divider horizontal fitted>-----------------------------</Divider>

            <Header as='h1' color='brown'>Pending Professor Reviews</Header>
            <Message error header="Reviews that are displayed here are awaiting the admin's approval" />
            {_.map(pendingProfessorReviews, (item) => <Message size='large' key={item._id} style={{ color: `#${randomColor3}` }}>
              <b>{item.owner} reviewed</b>
              <Label color='blue' size='large'>{item.professorName}</Label><br />
              <Icon name='arrow alternate circle down outline' style={{ color: `#${randomColor2}` }} />
              <br/>{item.review}<br />
              <Button onClick={ () => this.approveProfessorReview(item)} circular color="green">
                <Icon name="checkmark" inverted /></Button>
              <Button onClick={ () => this.deleteProfessorReview(item)} circular color="red">
                <Icon name="close" inverted /></Button>
            </Message>)}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Specify types of documents in the props.
AdminProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  classList: PropTypes.array.isRequired,
  classReview: PropTypes.array.isRequired,
  professorReview: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

AdminDisplay.propTypes = {
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
  // Get access to collections.
  const subscription = Meteor.subscribe(Profiles.adminPublicationName);
  const classListSub = Meteor.subscribe(ClassList.generalPublicationName);
  const classReviewsSub = Meteor.subscribe(ClassReviews.adminPublicationName);
  const professorReviewsSub = Meteor.subscribe(ProfessorReviews.adminPublicationName);
  // Get the data from collections
  const profiles = Profiles.collection.find({}).fetch();
  const classList = ClassList.collection.find({}).fetch();
  const classReview = ClassReviews.collection.find({}).fetch();
  const professorReview = ProfessorReviews.collection.find({}).fetch();
  return {
    profiles,
    classList,
    classReview,
    professorReview,
    ready: subscription.ready() && classListSub && classReviewsSub.ready() && professorReviewsSub.ready(),
  };
})(AdminProfile);
