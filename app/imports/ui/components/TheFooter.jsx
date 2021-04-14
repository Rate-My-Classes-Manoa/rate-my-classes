import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class TheFooter extends React.Component {
  render() {
    const divStyle = { paddingTop: '20px', paddingBottom: '15px' };
    return (
      <footer>
        <div style={divStyle}>
          <div className={'footer'}>
            <div style={divStyle} className="ui center aligned container">
              <a href={'https://rate-my-classes-manoa.github.io/'}>Documentation</a> &nbsp; |
              &nbsp; <Link to={'/dev-team'}>Dev Team</Link> &nbsp; |
              &nbsp; <a href={'https://manoa.hawaii.edu'}>University of Hawaii at Manoa</a><br/>
              <div >
                <Image className={'centered footerLogo'} size='medium' src={'/images/logo.png'} alt={'the logo'}/>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default TheFooter;
