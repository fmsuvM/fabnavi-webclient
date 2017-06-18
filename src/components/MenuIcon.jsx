import React from 'react';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux'

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

const debug = Debug('fabnavi:jsx:MenuIcon');

class MenuIcon extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = () => {
      if(this.props.hasOwnProperty('to')) {
        this.props.push(this.props.to);
      }
      if(this.props.hasOwnProperty('act')) {
        if(this.props.act === 'sign_in') {
          this.signIn();
        } else {
          this.signOut();
        }
      }
    };

    this.signIn = () => {
      const host = 'http://fabnavi.org';
      const url = `${host}/auth/github?auth_origin_url=${host}`;
      window.open(url);
      const onMessage = (e) => {
        window.removeEventListener('message', onMessage, false);

        if(e.origin === window.location.origin) {
          try{
            debug('>> ', e.data);
            this.props.signedIn(JSON.parse(e.data));
          } catch(error) {
            this.props.signInFailed(error, e);
          }
        }
      };
      window.addEventListener('message', onMessage);
    };

    this.signOut = () => {
      this.props.signingOut();
      api.signOut()
      .then(res => {
        debug(res);
        this.props.signedOut();
      });
    };
  }

  render() {
    return (
      <a className="menu-action nav-action"
        onClick={this.onClick} >
        <img src={this.props.src} />
      </a>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    push: jumpTo => {
      dispatch(push(jumpTo));
    },
    signedIn: (credential) => {
      api.saveCredential(credential);
      dispatch(signedIn(credential));
    },
    signingIn: () => {
      // TODO: (implement) signingIn
    },
    signingOut: () => {
      dispatch(signingOut());
    },
    signedOut: () => {
      api.clearCredential();
      api.clearUserId();
      dispatch(signedOut());
    },
    signInFailed: (error, info) => {
      const now = new Date();
      dispatch(signInFailed({
        message: 'sign in failed. see console',
        error,
        info,
        time: now.toTimeString()
      }));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuIcon);
