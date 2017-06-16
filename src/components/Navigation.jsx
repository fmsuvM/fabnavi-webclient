// Navigation ??
// ログインしている場合のホーム画面とそうではないホーム画面の違い
import React from 'react';
import { Link } from 'react-router-dom';
import Debug from 'debug';
import { connect } from 'react-redux';

import MenuIcon from './MenuIcon';

const debug = Debug('fabnavi:jsx:Navigation');

class Navigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const menu = this.props.user.isLoggedIn ? (
        <div className="menu" >
          <li><MenuIcon to="/" src="/images/kaffcop_icon/home.png" width="200px" height="60px"/></li>
          <li><MenuIcon to="myprojects" src="/images/kaffcop_icon/myproject.png"/></li>
          <li><MenuIcon act="sign_out" src="/images/kaffcop_icon/signout.png" /></li>
        </div>
    ) : (
        <div className="menu" >
          <li><MenuIcon to="/" src="/images/kaffcop_icon/home.png" /></li>
          <li><MenuIcon act="sign_in" src="/images/kaffcop_icon/signin.png" /></li>
        </div>
    );
    return (
      <div className="header">
        <ul className="glonav">
          <Link className="logo" to="/" >
            <img src="/images/kaffcop_icon/logo.png" />
          </Link>
        <li>
          {menu}
        </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Navigation);
