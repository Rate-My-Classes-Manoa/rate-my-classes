import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { ClassReviews } from '../../api/classReview/ClassReview';
import { ClassList } from '../../api/classList/ClassList';

/** Renders the Page for adding a document. */
class AddClassReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { className, review, rating } = data;
    const createdAt = new Date().toDateString();
    const owner = Meteor.user().username;
    const approved = false;
    ClassReviews.collection.insert({ createdAt, className, rating, review, owner, approved },
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
    const classes = _.sortBy(_.pluck(this.props.classList, 'class'), function (name) { return name; });
    // Create a schema to specify the structure of the data to appear in the form.
    const formSchema = new SimpleSchema({
      className: {
        type: String,
        allowedValues: classes,
        defaultValue: 'ICS 111',
      },
      review: String,
      rating: {
        type: Number,
        allowedValues: [1, 2, 3, 4, 5],
        defaultValue: 1,
      },
    });

    const bridge = new SimpleSchema2Bridge(formSchema);
    let fRef = null;
    return (
      <Grid container centered className="addItem" id='addClassReview-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Class Review</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <SelectField name='className'/>
              <SelectField name='rating' />
              <LongTextField name='review'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require an array of Class Review documents in the props.
AddClassReview.propTypes = {
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
})(AddClassReview);
