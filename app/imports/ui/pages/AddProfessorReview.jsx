import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { ProfessorReviews } from '../../api/professorReview/ProfessorReview';
import { ProfessorList } from '../../api/professorList/ProfessorList';

/** Renders the Page for adding a document. */
class AddProfessorReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { professorName, review, rating } = data;
    const createdAt = new Date().toDateString();
    const owner = Meteor.user().username;
    const approved = false;
    ProfessorReviews.collection.insert({ createdAt, professorName, rating, review, owner, approved },
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
    const professors = _.sortBy(_.pluck(this.props.professorList, 'name'), function (name) { return name; });
    // Create a schema to specify the structure of the data to appear in the form.
    const formSchema = new SimpleSchema({
      professorName: {
        type: String,
        allowedValues: professors,
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
      <Grid container centered>
        <Grid.Column id={'addProfessorReview-page'}>
          <Header as="h2" textAlign="center">Add Professor Review</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <SelectField name='professorName'/>
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

AddProfessorReview.propTypes = {
  professorList: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to collections.
  const subscription = Meteor.subscribe(ProfessorList.generalPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the data from collections
  const professorList = ProfessorList.collection.find({}).fetch();
  return {
    professorList,
    ready,
  };
})(AddProfessorReview);
