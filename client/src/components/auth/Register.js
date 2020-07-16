import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstname, lastname, phone, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstname, lastname, phone, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div class="container">
        <div class="row main">
          <div class="panel-heading">
            <div class="panel-title text-center">
              <h1 class="title">Sign Up</h1>
              <hr />
            </div>
          </div>
          <div class="main-login main-center">
            <form class="form-horizontal" onSubmit={onSubmit}>
              <div class="form-group">
                <label for="firstName" class="cols-sm-2 control-label">
                  First Name
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="firstname"
                      value={firstname}
                      onChange={onChange}
                      placeholder="Enter your first name"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="lastName" class="cols-sm-2 control-label">
                  Last Name
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      onChange={onChange}
                      name="lastname"
                      value={lastname}
                      placeholder="Enter your last name"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="phone" class="cols-sm-2 control-label">
                  Phone
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-phone fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      name="phone"
                      onChange={onChange}
                      value={phone}
                      placeholder="xxx-xxx-xxxx"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="cols-sm-2 control-label">
                  Your Email
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-envelope fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      onChange={onChange}
                      value={email}
                      placeholder="Enter your Email"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="cols-sm-2 control-label">
                  Password
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      onChange={onChange}
                      value={password}
                      name="password"
                      placeholder="Enter your Password"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="confirm" class="cols-sm-2 control-label">
                  Confirm Secret
                </label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      onChange={onChange}
                      value={password2}
                      name="password2"
                      placeholder="Confirm your Secret"
                      required="required"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group ">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-block login-button"
                >
                  Sign up!
                </button>
              </div>

              <hr />

              <div class="form-group ">
                <Link
                  class="btn btn-info btn-lg btn-block login-button"
                  to="/login"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
