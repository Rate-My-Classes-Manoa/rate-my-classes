import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, AutoField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { ClassList } from '../../api/classList/ClassList';
import ClassAlpha from '../components/ClassAlpha';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  classAlpha: {
    type: String,
    allowedValues: ClassAlpha,
    defaultValue: 'ICS',
  },
  classNumber: Number,
  className: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddNewClass extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { classAlpha, classNumber, className } = data;
    const theClass = `${classAlpha} ${classNumber}`;
    ClassList.collection.insert({
      classAlpha: classAlpha, classNumber: classNumber, class: theClass, className: className,
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
        <Grid.Column id={'addClass-page'}>
          <Header as="h2" textAlign="center" inverted>Add a Class</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <SelectField name='classAlpha'/>
              <AutoField name='classNumber' />
              <AutoField name='className'/>
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
AddNewClass.propTypes = {
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
})(AddNewClass);
