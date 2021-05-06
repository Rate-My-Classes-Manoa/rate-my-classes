import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, AutoField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { ProfessorList } from '../../api/professorList/ProfessorList';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  department: String,
  imageLink: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddNewProfessor extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, department, imageLink } = data;
    const name = `${firstName} ${lastName}`;
    ProfessorList.collection.insert({
      firstName: firstName, lastName: lastName, name: name, department: department, imageLink: imageLink,
      '1star': 0, '2star': 0, '3star': 0, '4star': 0, '5star': 0, totalRatings: 0, avgRating: 0,
    },
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
      <Grid container centered className="addItem">
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add a Professor</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <AutoField name='firstName'/>
              <AutoField name='lastName' />
              <AutoField name='department'/>
              <AutoField name='imageLink'/>
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
AddNewProfessor.propTypes = {
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
})(AddNewProfessor);
