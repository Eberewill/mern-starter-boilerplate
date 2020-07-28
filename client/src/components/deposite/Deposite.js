import React from 'react';

const Deposite = () => {
  return (
    <div className="container main">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label for="accountType">
                1. Please select the account you would like to deposit:
              </label>
              <select
                className="form-control"
                name="accountType"
                id="accountType"
                required="required"
              >
                <option disabled="disabled" selected="selected">
                  {' '}
                  -- select your account --{' '}
                </option>
                <option>Primary</option>
                <option>Savings</option>
              </select>
              <br />
            </div>

            <div className="form-group">
              <label>
                2. Please specify the amount you would like to deposit:{' '}
              </label>
              <span className="input-group-addon">Amount $</span>
              <input
                type="text"
                name="amount"
                id="amount"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>

            <input type="hidden" name="hideninput" />

            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Deposit
            </button>
          </form>

          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Deposite;
