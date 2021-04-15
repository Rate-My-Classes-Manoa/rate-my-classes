import React from 'react';
import { Grid, Image, Icon, Header, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the UserProfile page. */
class UserProfile extends React.Component {
  render() {
    const style = { marginTop: '20px' };
    return (
      <div>
        <Grid id='UserProfile-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='medium' src="/images/logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>John, Welcome to Rate My Classes</h1>
            <p><b>Created by students for you!</b></p>
          </Grid.Column>
        </Grid>
        <div className="UserProfile-background"/>
        <Grid container centered stackable columns={3} style={style}>
          <Grid.Column textAlign='center'>
            {/* eslint-disable-next-line max-len */}
            <Image src="https://www.businessinsider.in/photo/77825377/Lionel-Messi-leaving-Barcelona-would-be-the-biggest-and-most-shocking-transfer-in-football-history-but-it-would-make-perfect-sense-for-everyone.jpg?imgsize=330710" size="medium" circular centered />
            <Header as='h2'>Name: John Foo</Header>
            <Header as='h3' color="red">
              email: john@foo.com
            </Header>
            <Header as='h3' color="blue">
              Bio: John is a good soccer player, he likes Messi
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon name="student" size="huge"/>
            <Header as='h1'>Past Reviews</Header>
            <Header as='h3' color="blue">
              Students can leave UH manoa dedicated reviews about classes or professors they have taken!
            </Header>

            <Divider horizontal></Divider>

            <Header as='h1'>Pending Reviews</Header>
            <Header as='h3' color="blue">
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

export default UserProfile;
