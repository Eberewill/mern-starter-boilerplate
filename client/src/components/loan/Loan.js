import React, { Component } from 'react';

class Loan extends Component {
  render() {
    return (
      <div class="container main">
        <div class="row">
          <div class="col-md-6">
            <h3>Schedule An Appointment</h3>
            <form method="post" id="appointmentForm">
              <input type="hidden" name="id" />

              <div class="form-group">
                <label for="dateString">Pick a Date and Time:</label>
                <div
                  class="input-append date form_datetime input-group"
                  data-date="2016-10-21T15:25:00Z"
                >
                  <input
                    class="form-control"
                    type="text"
                    value=""
                    readonly="readonly"
                    name="dateString"
                    id="dateString"
                    required="required"
                  />
                  <span class="input-group-addon">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </span>
                  <span class="input-group-addon">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="location">Pick a location:</label>
                <select class="form-control" name="location" id="location">
                  <option disabled="disabled" selected="selected">
                    {' '}
                    -- select the location --
                  </option>
                  <option>Boston</option>
                  <option>New York</option>
                  <option>Chicago</option>
                  <option>San Francisco</option>
                </select>
              </div>

              <div class="form-group">
                <label for="description">Notes:</label>
                <textarea
                  class="form-control"
                  name="description"
                  id="description"
                  placeholder="Description"
                ></textarea>
              </div>

              <input
                type="hidden"
                name="${_csrf.parameterName}"
                value="${_csrf.token}"
              />

              <a class="btn btn-primary" id="submitAppointment">
                Submit Scheduling
              </a>
            </form>

            <div class="col-md-6"></div>
          </div>
        </div>
        <br />

        <div class="table-responsive">
          <table
            id="example"
            class="table table-bordered table-hover table-striped"
          >
            <thead>
              <tr>
                <th>Loan Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr data-th-each="primaryTransaction : ${primaryTransactionList}">
                <td data-th-text="${primaryTransaction.date}">...</td>
                <td data-th-text="${primaryTransaction.description}">...</td>
                <td data-th-text="${primaryTransaction.type}">...</td>
                <td data-th-text="${primaryTransaction.status}">...</td>
                <td data-th-text="${primaryTransaction.amount}">...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Loan;
