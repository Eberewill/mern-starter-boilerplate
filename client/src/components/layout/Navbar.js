import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import auth from '../../reducers/auth';

const Navbar = ({
  auth: { isAuthenticated, loading },
  user: { currentUser },
  logout
}) => {
  const nav = (
    <div className="navbar">
      <nav class="navbar navbar-default " role="navigation">
        <div class="container">
          <div class="navbar-header page-scroll">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-ex1-collapse"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link class="navbar-brand page-scroll" to="/dashboard">
              Home
            </Link>
          </div>

          <div class="collapse  navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
              <li class="hidden">
                <a class="page-scroll" href="#page-top"></a>
              </li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Wallet <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link to="/account">View Wallet</Link>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <Link to="/deposite">Deposite</Link>
                  </li>
                </ul>
              </li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Transfer <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#">Between Accounts</a>
                  </li>
                  <li>
                    <a href="#">To Someone Else</a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="/recipients">Add/Edit Recipient</a>
                  </li>
                </ul>
              </li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Widrawals <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#">Widrawals requests</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Me <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link to="/profile"> Profile</Link>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {!loading && (
        <Fragment>{isAuthenticated && currentUser ? nav : <> </>}</Fragment>
      )}
    </>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, { logout })(Navbar);
