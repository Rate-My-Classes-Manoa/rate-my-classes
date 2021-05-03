import React from 'react';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Events } from '../../api/events/Events';

const bridge = new SimpleSchema2Bridge(Events.schema);

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { eventName, image, time, description } = data;
    // const createdAt = new Date().toDateString();
    // const owner = Meteor.user().username;
    // const approved = false;
    Events.collection.insert({ eventName, image, time, description },
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
      <Container>
        <Grid centered id="addEvent-page">
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Events</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='eventName'/>
                <TextField name='image' />
                {/* <span>(Format: MM/DD/YYYY)<TextField name='time'/></span> */}
                <DateField name="time" />
                {/* <TextField name='owner'/> */}
                <LongTextField name='description'/>
                <SubmitField id="edit-Submit" value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default AddEvent;
