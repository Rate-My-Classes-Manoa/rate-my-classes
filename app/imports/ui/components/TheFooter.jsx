import React from 'react';

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
              &nbsp; <a href={'#'}>Careers</a> &nbsp; |
              &nbsp; <a href={'https://manoa.hawaii.edu'}>University of Hawaii at Manoa</a><br/>
              <div className={'logo'}>
                Rate My Classes Manoa!
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default TheFooter;
