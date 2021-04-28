import React from 'react';
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react';

export default class Careers extends React.Component {
  render() {
    return (
      <div id="careers-page">
        <Container>

          <div className={'jobsHeaderFooter'}>
            <Header as={'h1'} inverted>Careers</Header>
          </div>

          <div>
            <Grid columns={2} className={'jobsBody'}>

              <Grid.Column width={10}>
                <Segment>
                  <Image src={'https://snappygoat.com/b/f268c5f2d9c18ccb16005de802c8a7f6678dc721'} alt={'woman smiling'}
                    size={'medium'} rounded centered /><br/>
                  <p>We love what we do and we’re looking for passionate people excited about doing the same. If you
                    love to learn new things, you may be a great fit for our team. Take a look at our current openings
                    and reach out to us if you have any questions.<br/><br/>
                    We look forward to hearing from you.</p>

                  <Header as={'h3'}>Benefits</Header>
                  <p>
                    Here are a few of the benefits of joining us:
                    <ul>
                      <li><strong>Flexible Work Hours.</strong></li>
                      <li><strong>Work from Anywhere.</strong></li>
                      <li><strong>Take Vacation When You Need it.</strong></li>
                      <li><strong>Your Happiness Matters.</strong></li>
                      <li><strong>Lots of Learning Opportunities.</strong></li>
                    </ul>
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column width={5} className={'jobsRight'}>
                <Header as={'h3'}>Available Positions</Header>
                <Segment>
                  <p>
                    There are no positions available at this time.
                  </p>
                </Segment>
                <br/>
                <br/>
                <Image src={'https://cdn.pixabay.com/photo/2018/11/02/10/51/job-3790033_1280.jpg'} alt={'handshake'} size={'medium'} circular centered/><br/><br/>
                <Image src={'/images/logo.png'}/>
              </Grid.Column>

            </Grid>

          </div>
          <div className={'jobsHeaderFooter'}>
          </div>
        </Container>
      </div>
    );
  }
}
