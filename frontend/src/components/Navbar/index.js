import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, Redirect, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      redirect: false
    };
  }

  toggleMenu = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  logout = e => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      this.setState({
        redirect: true
      });
    });
  };

  menus = [
    {
      name: 'Dashboard',
      to: '/'
    },
    {
      name: 'Evenements',
      to: '/evenement'
    },
    {
      name: 'Découvrir',
      to: '/discover'
    }
  ];

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <Link className="nav-item" to="/">
              <span className="title"><b>Meet'</b>In</span>
            </Link>
            {this.menus.map((m, i) => {
              return (
                <Link
                  className={classNames(
                    'nav-item',
                    'is-tab',
                    'is-hidden-mobile',
                    'is-primary',
                    {
                      'is-active': this.props.match.path === m.to
                    }
                  )}
                  key={'menu-' + i}
                  to={m.to}
                >
                  {m.name}
                </Link>
              );
            })}
          </div>
          <span className="nav-toggle" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </span>
          <div
            className={classNames('nav-right', 'nav-menu', {
              'is-active': this.state.isActive
            })}
          >
            {this.menus.map((m, i) => {
              return (
                <Link
                  className={classNames(
                    'nav-item',
                    'is-tab',
                    'is-hidden-tablet',
                    'is-primary',
                    { 'is-active': this.props.match.path === m.to }
                  )}
                  key={'mobile-menu-' + i}
                  to={m.to}
                >
                  {m.name}
                </Link>
              );
            })}
            <Link
              className={classNames('nav-item', 'is-tab', 'is-primary ', {
                'is-active': this.props.match.path === '/history'
              })}
              to={'/history'}
            >
              Historique
            </Link>
            <Link
              className={classNames('nav-item', 'is-tab', 'is-primary ', {
                'is-active': this.props.match.path === '/profile'
              })}
              to="/profile"
            >
              Profile
            </Link>

            <Link className="nav-item is-tab" onClick={this.logout} to="/">
              Log out
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
