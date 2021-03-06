import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginWithGoogle, loginWithFacebook } from './../../firebase';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMsg: ''
    };
  }

  handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        this.setState({
          hasError: false,
          errorMsg: ''
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMsg: err.message
        });
      });
  };

  handleFacebookLogin = () => {
    loginWithFacebook()
      .then(res => {
        this.setState({
          hasError: false,
          errorMsg: ''
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMsg: err.message
        });
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLogged } = this.props;

    if (isLogged) {
      return <Redirect to={from} />;
    }

    const { hasError, errorMsg } = this.state;

    return (
      <section className="hero is-fullheight Login__gradient">
        <div className="container is-fluid">
          <div className="hero-header">
            <nav className="nav">
              <div className="nav-left">
                <a className="nav-item">
                  <span className="title has-text-white"><b>Meet'</b>In</span>
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-center is-one-third">
              <div className="box">
                <div className="content">
                  <h4>Login</h4>

                  {hasError &&
                    <div className="notification is-danger">
                      {errorMsg}
                    </div>}

                  <a
                    className="button is-info is-fullwidth Login__button"
                    onClick={this.handleGoogleLogin}
                  >
                    <span className="icon">
                      <i className="fa fa-google" />
                    </span>
                    <span>Login with <b>Google</b></span>
                  </a>

                  <a
                    className="button is-info is-fullwidth Login__button"
                    onClick={this.handleFacebookLogin}
                  >
                    <span className="icon">
                      <i className="fa fa-facebook" />
                    </span>
                    <span>Login with <b>Facebook</b></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user !== null
  };
};

export default connect(mapStateToProps)(Login);
