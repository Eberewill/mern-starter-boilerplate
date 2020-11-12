import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/user';

import { getCustomers } from '../../actions/customers';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  auth,
  getCurrentUser,
  getCustomers,
  customers,
  user: { loading, currentUser }
}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!customers && loading)
    return (
      <>
        <Spinner />
      </>
    );
  return (
    <Fragment>
      <div class="container main">
        <div class="row">
          <div class="col-lg-12"></div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="panel panel-info">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-6">
                    <i class="fa fa-money fa-5x"></i>
                    <h2>Total Balance: </h2>
                  </div>
                  <div class="col-xs-6 text-right">
                    <h1>
                      <i class="fa " aria-hidden="true"></i>₦ <span>000</span>
                    </h1>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">View Details</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
            <div class="panel panel-success">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-6">
                    <h2>Loaded Vauchers Balance: </h2>
                  </div>
                  <div class="col-xs-6 text-right">
                    <h1>
                      <i class="fa" aria-hidden="true"></i>{' '}
                      <span> ₦ 30000...</span>
                    </h1>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">View Details</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="panel panel-yellow">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-3">
                    <i class="fa fa-credit-card fa-5x"></i>
                  </div>
                  <div class="col-xs-9 text-right">
                    <div>Deposit</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">Go to Deposit</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="panel panel-yellow">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-3">
                    <i class="fa fa-credit-card fa-5x"></i>
                  </div>
                  <div class="col-xs-9 text-right">
                    <div>Deposit</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">Go to Deposit</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="panel panel-red">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-3">
                    <i class="fa fa-money fa-5x"></i>
                  </div>
                  <div class="col-xs-9 text-right">
                    <div>Withdraw</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">Go to Withdrawal</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="panel panel-red">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-3">
                    <i class="fa fa-money fa-5x"></i>
                  </div>
                  <div class="col-xs-9 text-right">
                    <div> Total Customers</div>
                  </div>
                </div>
              </div>
              <a href="#">
                <div class="panel-footer">
                  <span class="pull-left">Go to Withdrawal</span>
                  <span class="pull-right">
                    <i class="fa fa-arrow-circle-right"></i>
                  </span>
                  <div class="clearfix"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  customers: state.customers
});

export default connect(mapStateToProps, { getCurrentUser, getCustomers })(
  Dashboard
);
