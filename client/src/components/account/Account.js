import React from 'react';

const Account = () => {
  return (
    <div class="container main">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">Dashboard</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-md-6"></div>
        <div class="col-lg-6 col-md-6">
          <div class="panel panel-info">
            <div class="panel-heading">
              <div class="row">
                <div class="col-xs-6">
                  <h2>Primary Balance: </h2>
                </div>
                <div class="col-xs-6 text-right">
                  <h1>
                    <i class="fa fa-usd" aria-hidden="true"></i>{' '}
                    <span>...</span>
                  </h1>
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table
          id="example"
          class="table table-bordered table-hover table-striped"
        >
          <thead>
            <tr>
              <th>Post Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Available Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr data-th-each="primaryTransaction : ${primaryTransactionList}">
              <td data-th-text="${primaryTransaction.date}">...</td>
              <td data-th-text="${primaryTransaction.description}">...</td>
              <td data-th-text="${primaryTransaction.type}">...</td>
              <td data-th-text="${primaryTransaction.status}">...</td>
              <td data-th-text="${primaryTransaction.amount}">...</td>
              <td data-th-text="${primaryTransaction.availableBalance}">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
