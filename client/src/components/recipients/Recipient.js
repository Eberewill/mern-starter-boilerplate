import React from 'react';

const Recipient = () => {
  return (
    <div class="container main">
      <div class="row">
        <div class="col-md-6">
          <h3>Recipient Information</h3>
          <form method="post">
            <input type="hidden" name="id" />

            <div class="form-group">
              <label for="recipientName">Name</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="recipientName"
                placeholder="Name"
              />
            </div>
            <div class="form-group">
              <label for="recipientEmail">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="recipientEmail"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="recipientPhone">Phone</label>
              <input
                type="text"
                class="form-control"
                name="phone"
                id="recipientPhone"
                placeholder="Phone"
              />
            </div>
            <div class="form-group">
              <label for="recipientAccountNumber">Account Number</label>
              <input
                type="text"
                class="form-control"
                name="accountNumber"
                id="recipientAccountNumber"
                placeholder="Account Number"
              />
            </div>
            <div class="form-group">
              <label for="recipientDescription">Description</label>
              <textarea
                class="form-control"
                name="description"
                id="recipientDescription"
                placeholder="Description"
              ></textarea>
            </div>

            <input
              type="hidden"
              name="${_csrf.parameterName}"
              value="${_csrf.token}"
            />

            <button class="btn btn-primary" type="submit">
              Add/Edit Recipient
            </button>
          </form>

          <div class="col-md-6"></div>
        </div>
      </div>
      <br />
      <div class="row">
        <h3>List of Recipients</h3>
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>Recipient Name</th>
                <th>Recipient Email</th>
                <th>Recipient Phone</th>
                <th>Recipient Account Number</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr data-th-each="eachRecipient : ${recipientList}">
                <td>
                  <a data-th-text="${eachRecipient.name}">...</a>
                </td>
                <td data-th-text="${eachRecipient.email}">...</td>
                <td data-th-text="${eachRecipient.phone}">...</td>
                <td data-th-text="${eachRecipient.accountNumber}">...</td>
                <td data-th-text="${eachRecipient.description}">...</td>
                <td>
                  <a>delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recipient;
