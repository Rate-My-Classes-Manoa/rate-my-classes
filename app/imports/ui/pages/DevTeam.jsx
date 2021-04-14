import React from 'react';
import { Header } from 'semantic-ui-react';

export default class DevTeam extends React.Component {
  render() {
    function showDescription(teamMember) {
      const message = document.getElementById(teamMember);
      if (message.style.display === 'none') {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
      }
    }
    return (
      <div>
        <div className={'devTeamBackground'}></div>

        <div className={'devTeamBody'}>
          <div className={'datitle'}>
            <Header as={'h1'} inverted>Meet Our Development Team</Header>
          </div>

          <br />

          <div className="four ui buttons">
            <button className="ui yellow button" onClick="showDescription('ujjwal')">Ujjwal Gautam</button>
            <button className="ui blue button">Tony Long</button>
            <button className="ui orange button">Seth Tanoue</button>
            <button className="ui grey button">Mark Young</button>
          </div>

          <div id={'ujjwal'} className={'hide'}>
            <br/>
            <div className="ui black message justified">
              hopes & dreams: I’m looking forward to building a reactive web page from scratch. I want to level up my understanding of the client and server-side interactivity.
              <br/><br/>
              background: Intermediate level HTML/CSS/Javascript/React/Meteor background. I can bring a little bit of everything to the project.
            </div>
          </div>

        </div>
      </div>
    );
  }
}
