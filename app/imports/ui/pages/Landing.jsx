import React from 'react';
import { Grid, Image, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    return (
      <div>
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='medium' src="/images/uh-manoa.jpg"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to Rate My Classes</h1>
            <p><b>Created by students for students!</b></p>
          </Grid.Column>
        </Grid>
        <div className="landing-background"/>
        <Grid container centered stackable columns={3} style={style}>
          <Grid.Column textAlign='center'>
            <Icon name="users" size="huge"/>
            <Header as='h1'>Community Events</Header>
            <Header as='h3'>
              Advertise local events to fellow users in the UH community!
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon name="student" size="huge"/>
            <Header as='h1'>Peer Reviews</Header>
            <Header as='h3'>
              Students can leave UH manoa dedicated reviews about classes or professors they have taken!
            </Header>
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

export default Landing;
