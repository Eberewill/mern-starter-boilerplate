const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Vaucher = require('./models/Vaucher');
const Test = require('./models/TestModel');
const Wallets = require('./models/Wallets');

const Recharges = require('./models/Recharges');
const Transfers = require('./models/Transfers');

const { response } = require('express');

async function getcustomer(phoneNumber) {
  try {
    const customer = await Customer.findOne({ phoneNumber });
    // const { firstName, lastName, pinCode, phoneNumber } = await customer;

    if (customer) {
      var fname = customer.firstName;
      var lname = customer.lastName;

      if (fname && lname) {
        return 5 > 1;
      } else {
        return 10 > 100;
      }
    } else {
      return 10 > 100;
    }
  } catch (error) {
    return 10 > 100;
  }
}
//get recieverof transfer betweeen save-me
async function getReciepient(phoneNumber) {
  try {
    const reciever = await Customer.findOne({ phoneNumber });
    if (reciever) {
      const recieverName = reciever.firstName + ' ' + reciever.lastName;
      return recieverName;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

//calculate commision percentage
function percent(value, percent) {
  return (percent / 100) * value;
}

//validate transfer
function isvalidTransfer(ammount, phoneNumber) {
  try {
    const customer = Customer.findOne({ phoneNumber });
    const ballance = customer.balance;

    if (ballance >= percent(ammount, 1)) {
      return percent(ammount, 1);
    } else {
      return;
    }
  } catch (error) {
    return;
    console.error(error.message);
  }
}

async function transfer(
  customer,
  amount,
  reciever,
  totaltransaction,
  response
) {
  try {
    const serviceCharge = percent(amount, 1);

    let reciepient = await Customer.findOneAndUpdate(
      { phoneNumber: reciever },
      {
        $inc: { balance: +amount }
      },
      { new: true }
    );
    await reciepient.save();

    let sender = await Customer.findOneAndUpdate(
      { phoneNumber: customer },
      {
        $inc: { balance: -totaltransaction }
      },
      { new: true }
    );
    await sender.save();

    //initiate transfer to easysave wallet,
    let transferFee = await Wallets.findByIdAndUpdate(
      '5fa56428b7445d510022c72d',
      {
        $inc: { ballance: +serviceCharge }
      },
      { new: true }
    );
    await transferFee.save();

    const transfer = new Transfers({
      from: customer._id,
      to: reciever._id,
      amount: amount,
      serviceFee: serviceCharge,
      status: response.status,
      channel: 'SaveMe'
    });

    await transfer.save();

    response({
      status: 'was successful',
      message: 'Completed transfer',
      reciever: reciepient.firstName,
      totalAmmount: totaltransaction,
      customer: sender.phoneNumber
    });
  } catch (error) {
    response({
      status: 'Failed',
      message: error.message
    });
  }
}

//send new user sms
async function sendComfirmsms(phone) {
  try {
    const customer = await Customer.findOne({ phoneNumber: phone });

    if (firstName && lastName && pinCode) {
      const accountSid = 'AC06256ba40387c28f19dcf3a182767a04';
      const authToken = 'effd58e1bcd6a1095750f344894330a1';
      const client = require('twilio')(accountSid, authToken);

      client.messages
        .create({
          body: `${firstName} ${' '}  ${lastName} Welcome to Save-me Global, Your account has been successfuly created and your secured PIN is ${pinCode}`,
          from: '+18324302642',
          to: `+${phoneNumber}`
        })
        .then((message) => console.log(message));
    } else {
      return 'not commpleted';
    }
  } catch (error) {
    console.error(error);
    return 'server error';
  }
}

async function saveNumber(phoneNumber) {
  try {
    const num = new Test({
      phoneNumber
    });

    await num.save();
  } catch (error) {
    console.error(error.message);
  }
}

async function getBalance(phoneNumber, next) {
  //get user with phoneNumber
  try {
    var customer = await Customer.findOne({ phoneNumber });
    if (customer) {
      const ballance = customer.balance;
      next(ballance);
    } else {
      next('no user');
    }
  } catch (error) {
    next('serer error');
  }
}
async function registerCustomer(firstName, lastName, pinCode, phoneNumber) {
  try {
    let customer = await Customer.findOne({ phoneNumber });

    if (!customer) {
      customer = new Customer({
        firstName,
        lastName,
        pinCode,
        phoneNumber
      });

      await customer.save();

      return customer;
    }
  } catch (error) {
    return;
  }
}

async function rechargeCode(vCode, phoneNumber) {
  try {
    //get vaucher,
    //const customern = await Vaucher.findOne({ phoneNumber });
    const vaucher = await Vaucher.findOne({ code: vCode });
    if (!vaucher || vaucher.used) {
      return { message: 'invalid vaucher ' };
    } else {
      const ammount = vaucher.unitPrice;
      const customer = await Customer.findOneAndUpdate(
        { phoneNumber },
        {
          $inc: { balance: ammount }
        }
      );

      vaucher.used = true;

      await vaucher.save();
      const recharge = new Recharges({
        customer: customer._id,
        status: 'completed',
        vaucher: vaucher._id
      });

      await recharge.save();
      //customer.deposites.unshift({ ammount });
      //await customer.save();
      return { amount: ammount, message: 'success' };
    }

    //apply callback
  } catch (error) {
    console.log(error.message);
    return { message: 'failed' };
  }
}

async function getCustomerPin(phoneNumber, pinCode) {
  try {
    const customer = await Customer.findOne({ phoneNumber });
    const goodPin = customer.pinCode;

    if (pinCode == goodPin) return customer;
  } catch (error) {
    return;
  }
}
module.exports.getCustomerPin = getCustomerPin;
module.exports.rechargeCode = rechargeCode;
module.exports.sendComfirmsms = sendComfirmsms;
module.exports.registerCustomer = registerCustomer;

module.exports.getBalance = getBalance;
module.exports.getcustomer = getcustomer;

module.exports.isvalidTransfer = isvalidTransfer;

module.exports.transfer = transfer;
module.exports.getReciepient = getReciepient;
