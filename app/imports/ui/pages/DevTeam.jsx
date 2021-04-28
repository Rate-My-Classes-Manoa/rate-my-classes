import React from 'react';
import { Header } from 'semantic-ui-react';

export default class DevTeam extends React.Component {
  render() {
    function showMessage(theMessage) {
      const message = theMessage;
      if (message.style.display === 'none') {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
      }
    }

    function showUjjwal() {
      // eslint-disable-next-line no-undef
      const message = document.getElementById('ujjwal');
      showMessage(message);
    }

    function showTony() {
      // eslint-disable-next-line no-undef
      const message = document.getElementById('tony');
      showMessage(message);
    }

    function showSeth() {
      // eslint-disable-next-line no-undef
      const message = document.getElementById('seth');
      showMessage(message);
    }

    function showMark() {
      // eslint-disable-next-line no-undef
      const message = document.getElementById('mark');
      showMessage(message);
    }

    return (
      <div id="devTeam-page">
        <div className={'devTeamBackground'}></div>

        <div className={'devTeamBody'}>
          <div className={'devTeamTitle'}>
            <Header as={'h1'} inverted>Meet Our Development Team</Header>
          </div>

          <br />

          <div className="four ui buttons">
            <button className="ui yellow button" onClick={showUjjwal}>Ujjwal Gautam</button>
            <button className="ui blue button" onClick={showTony}>Tony Long</button>
            <button className="ui orange button" onClick={showSeth}>Seth Tanoue</button>
            <button className="ui grey button" onClick={showMark}>Mark Young</button>
          </div>

          <div id={'ujjwal'} className={'devTeamHide'}>
            <br/>
            <div className="ui icon black message">
              <i className="user circle outline icon"></i>
              Ujjwal Gautam: <br/>
              I’m looking forward to building a reactive web page from scratch. I want to level up my understanding of the client and server-side interactivity.
              I have an intermediate level background in HTML/CSS/Javascript/React/Meteor. I can bring a little bit of everything to the project.
            </div>
          </div>

          <div id={'tony'} className={'devTeamHide'}>
            <br/>
            <div className="ui icon black message">
              <i className="user circle outline icon"></i>
              Tony Long: <br/>
              I want to practice building web pages and web applications, such as learning more about api’s.
              I come from a pretty extensive Html/Css/Javascript background, so I can bring my understanding and
              contribute anyway I can. Also, I’ve worked on a few coding projects with others before so if there is one
              thing I know, its teamwork.
            </div>
          </div>

          <div id={'seth'} className={'devTeamHide'}>
            <br/>
            <div className="ui icon black message">
              <i className="user circle outline icon"></i>
              Seth Tanoue: <br/>
              This will be my first time doing a coding project with multiple people. So figuring out the logistics of
              this project will be enlightening. Also, this project will be the first practical application of what we
              learned so far, and I am curious on how much I have retained.
              I have worked with databases like SQL and MongoDB as well as a few servers. I excel at menial tasks.
              If you give me a task list I will try to finish it as fast as possible.
            </div>
          </div>

          <div id={'mark'} className={'devTeamHide'}>
            <br/>
            <div className="ui icon black message">
              <i className="user circle outline icon"></i>
              Mark Young: <br/>
              I’d like to learn about creating software as a team, and how to make a structure for completing a project.
              I will work until the work is done. So I bring my dedication to the project.
            </div>
          </div>

        </div>
      </div>
    );
  }
}
