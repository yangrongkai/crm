'use strict'


import React from 'react';
import './index.less';


export class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          Welcome, 这里是欢迎界面, 欢迎访问我的<a target="_blank" href="http://jxy.me">blog</a>.
          <br />
          项目地址: <a target="_blank" href="https://github.com/yangrongkai/crm">https://github.com/yangrongkai/crm</a>
        </h1>
      </div>
    );
  }

}
