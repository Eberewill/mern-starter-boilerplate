import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div class="container">
        <div class="row ">
          <div class="main-center ">
            <form class="form-signin" onSubmit={onSubmit}>
              <h2 class="form-signin-heading">Please sign in</h2>
              <div class="form-group">
                <label for="username" class="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required="required"
                  autofocus="autofocus"
                />
              </div>
              <div class="form-group">
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  roleId="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength="6"
                  required="required"
                />
              </div>
              <div class="form-group">
                <input type="checkbox" name="remember-me" id="remember-me" />{' '}
                &nbsp; Remember me
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
              </button>
            </form>

            <hr />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
