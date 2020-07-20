import React from 'react';

const Profile = () => {
  return (
    <div class="container">
      <div class="row main">
        <div class="col-md-6">
          <h2 class="title">My Profile</h2>
          <hr />
          <form method="post">
            <input type="hidden" name="id" />

            <div class="form-group">
              <label for="firstName">First Name</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-user fa" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    name="firstName"
                    roleId="firstname"
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
                    id="lastName"
                    name="lastName"
                    roleId="lastName"
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
                    roleId="phone"
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
              <span class="bg-danger pull-right">Email already exists</span>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-envelope fa" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    roleId="email"
                    placeholder="Enter your Email"
                    required="required"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="username" class="cols-sm-2 control-label">
                Username
              </label>
              <span class="bg-danger pull-right">Username already exists</span>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-users fa" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    roleId="username"
                    placeholder="Enter your Username"
                    required="required"
                  />
                </div>
              </div>
            </div>

            <div class="form-group ">
              <button type="submit" class="btn btn-primary btn-block ">
                Change Settings
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <div class="panel-heading">
            <div class="panel-title text-center">
              <h1 class="title">Your Account Information</h1>
              <hr />
            </div>
            <table class="responstable">
              <tr>
                <th>Wallet ID</th>
                <th>Your Insights</th>
              </tr>

              <tr>
                <td>7474747...</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
