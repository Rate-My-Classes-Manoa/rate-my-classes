import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  NumField,
  TextField,
  HiddenField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import Num from 'uniforms-semantic/src/NumField';
// import { ClassReviews } from '../../api/classReview/ClassReview';
import { ClassList } from '../../api/classList/ClassList';

// import ClassSelection from '../components/ClassSelection';

// Create a schema to specify the structure of the data to appear in the form.
// const formSchema = new SimpleSchema({
//   className: {
//     type: String,
//     allowedValues: ClassSelection,
//     defaultValue: 'ICS 111',
//   },
//   review: String,
//   rating: {
//     type: Number,
//     allowedValues: [1, 2, 3, 4, 5],
//     defaultValue: 1,
//   },
// });

const bridge = new SimpleSchema2Bridge(ClassList.schema);

/** Renders the Page for adding a document. */
class AddClass extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { classAlpha, classNumber, className, oneStar, twoStar, threeStar, fourStar, fiveStar, avgRating, totalRatings } = data;
    // const createdAt = new Date().toDateString();
    // const owner = Meteor.user().username;
    // const approved = false;
    const classA = classAlpha + classNumber;
    ClassList.collection.insert({ classAlpha, classA, classNumber, className, oneStar, twoStar, threeStar, fourStar, fiveStar, avgRating, totalRatings },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id="addClass-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Class Review</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='classAlpha'/>
              <NumField name='classNumber' />
              <TextField name='className'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
            <HiddenField name="classA" value="default" />
            <HiddenField name="oneStar" value="0" />
            <HiddenField name="twoStar" value="0" />
            <HiddenField name="threeStar" value="0" />
            <HiddenField name="fourStar" value="0" />
            <HiddenField name="fiveStar" value="0" />
            <HiddenField name="totalRatings" value="0" />
            <HiddenField name="avgRating" value="0" />

          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require an array of Class Review documents in the props.
AddClass.propTypes = {
  classList: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to collections.
  const subscription = Meteor.subscribe(ClassList.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the data from collections
  const classList = ClassList.collection.find({}).fetch();
  return {
    classList,
    ready,
  };
})(AddClass);
