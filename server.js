const express = require('express');
const connectDB = require('./config/db');
const UssdMenu = require('ussd-menu-builder');
const path = require('path');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const {
  getBalance,
  getcustomer,
  rechargeCode,
  getReciepient,
  transfer,
  registerCustomer,
  isvalidTransfer,
  getCustomerPin
} = require('./controler');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//////////////////////////
//////////////////////////

let menu = new UssdMenu();

menu.startState({
  next: {
    '': async function () {
      const customer = menu.args.phoneNumber;
      const bool = await getcustomer(customer);
      if (bool) {
        return 'main';
      } else {
        return 'register';
      }
    }
  }
});

menu.state('main', {
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      'Welcome to Save-me Global, choose options:' +
        '\n1. save-me Balance' +
        '\n2. Save-me recharge' +
        '\n3. Save-me Account' +
        '\n4. Transfers' +
        '\n5. Help'
    );
  },
  // next object links to next state based on user input
  next: {
    1: 'showBalance',
    2: 'easyRecharge',
    3: 'myAccount',
    4: 'easytransfer',
    5: 'help',
    6: 'welcome'
  }
});

//registration menu
menu.state('register', {
  run: async () => {
    menu.con(
      'Welcome to Save-me, ' +
        'kindly follow the prompt to create ' +
        'your account and start saving ' +
        'Enter Your First Name'
    );
  },
  next: {
    '*[a-zA-Z]+': 'firstname'
  }
});

menu.state('firstname', {
  run: () => {
    let firstName = menu.val;
    localStorage.setItem('firstName', firstName);
    menu.con(`Hello ${firstName} Enter your last name to continue`);
  },
  next: {
    '*[a-zA-Z]+': 'lastname'
  }
});

menu.state('lastname', {
  run: async () => {
    let lastname = menu.val;
    localStorage.setItem('lastName', lastname);
    menu.con(
      `almost done ${
        ' ' + lastname + ' '
      } please Kindly choose a four digit secured save-me PIN`
    );
  },

  next: {
    '*\\d+': 'choosepin'
  }
});

menu.state('choosepin', {
  run: async () => {
    let pinCode = menu.val;
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const number = menu.args.phoneNumber;

    const response = await registerCustomer(
      firstName,
      lastName,
      pinCode,
      number
    );

    if (response) {
      menu.con(
        `congratulations ${
          firstName + ' ' + lastName
        } your account has been creatd press 1 to go to main menu`
      );
      localStorage.clear;
    } else {
      localStorage.clear;
      menu.end('Error While processing' + 'please try again');
    }
  },
  next: {
    1: 'main'
  }
});

//cash widrawal
menu.state('easytransfer', {
  run: () => {
    menu.con(
      'Transfer to' +
        '\n1. Bank Account' +
        '\n2. Save-me User' +
        '\n3. Wills-Smart Touch n Go Wallet' +
        '\n4. Return Home'
    );
  },
  next: {
    1: 'bank',
    2: 'savetosaveme',
    3: 'touchngo',
    4: 'main'
  }
});

//help
menu.state('help', {
  run: () => {
    menu.end(
      'How can we help you?' +
        'call Us on 0001002' +
        'Visit us online at savemeglobaltech.com'
    );
  }
});

// Account
menu.state('myAccount', {
  run: () => {
    menu.con(
      'Save-me Global User Account' +
        '\n1. Save-me wallet balance' +
        '\n2. Reset Pin' +
        '\n3. Transfer' +
        '\n4. Invest' +
        '\n5. Main Menu'
    );
  },
  next: {
    1: 'showBalance',
    2: 'resetPin',
    3: 'easytransfer',
    4: 'invest',
    5: 'main'
  }
});
//Easy Recharge via USSD. easyRecharge
menu.state('easyRecharge', {
  run: () => {
    //todo check for Valid Vauchernumber; var oldPin = Number(menu.val);
    menu.con('Enter Save-me Vaucher');
  },
  next: {
    '*\\d+': 'vaucherNumber'
  }
});

//Invest
menu.state('invest', {
  run: () => {
    menu.con('Please choose your Duration for your Investment');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'durationInvest'
  }
});

//
menu.state('durationInvest', {
  run: () => {
    menu.con(
      'Please choose how much you wish to be deposite' +
        '\n1. N50,000.00' +
        '\n2. 100,000.00' +
        '\n3. 200,000.00' +
        '\n4. 500,000.00' +
        '\n5. 1,000,000.00'
    );
  },
  next: {
    '*\\d+': 'processinginvest'
  }
});

//processinginvest
menu.state('processinginvest', {
  run: () => {
    menu.end('your request is being proccessed');
  }
});

// credit account durationInvest

menu.state('vaucherNumber', {
  run: async () => {
    var vcode = Number(menu.val);
    var number = menu.args.phoneNumber;

    const res = await rechargeCode(vcode, number);
    //const message = res.message;
    const amount = res.amount;

    if (amount) {
      menu.end(`success!, N${amount} has been added to your Save-me wallet `);
    } else {
      menu.end('there was an error with your recharge');
    }
  }
});
//getAccount Balance

menu.state('showBalance', {
  run: () => {
    const num = menu.args.phoneNumber;
    getBalance(num, (response) => {
      menu.end(`Save-me wallet balance is ${response}`);
    });
  }
});

//save-me to save-me transfer savetosaveme
menu.state('savetosaveme', {
  run: () => {
    menu.con("Enter reciepient's Save-me phoneNumber in form of (0803****)");
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'recievernum'
  }
});

//save me transfer

menu.state('recievernum', {
  run: async () => {
    const number = +menu.val;
    const reciepientNumber = `${234}${number}`;
    //get cusomer my phoneNumber
    const reciepientName = await getReciepient(reciepientNumber);

    if (reciepientName) {
      localStorage.setItem('transferReciever', reciepientNumber);
      menu.con(`Enter amount you wish to transfer to ${reciepientName}`);
    } else {
      menu.con('Invalid User, please enter a valid Save-me phone Number');
    }
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'transferAmount'
  }
});

menu.state('transferAmount', {
  run: async () => {
    let transferAmount = Number(menu.val);
    localStorage.setItem('transferAmount', transferAmount);
    const response = await isvalidTransfer(
      transferAmount,
      menu.args.phoneNumber
    );
    if (response) {
      menu.con(
        `Enter your 4 digit unique Save-me secure PIN, Note That N ${response} will be charged for this transfer `
      );
    } else {
      menu.end(
        `Please you cannot continue with this transfer because your account balance is less than the requested amount.`
      );
    }
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'userTransferPin'
  }
});
//validate Pin And Transfer
menu.state('userTransferPin', {
  run: async () => {
    let transferAmount = localStorage.getItem('transferAmount');
    let transferReciever = localStorage.getItem('transferReciever');
    let totaltransaction = localStorage.getItem('totaltransaction');
    let customer = menu.args.phoneNumber;

    const response = getCustomerPin(customer, pin);

    if (response) {
      transfer(
        customer,
        transferAmount,
        transferReciever,
        totaltransaction,
        (res) => {
          menu.end(`your transaction  ${res.status}`);
        }
      );
    } else {
      menu.end('Wrong PIN, try again');
    }

    localStorage.clear;
  }
});

//Account Pin Reset
menu.state('resetPin', {
  run: () => {
    menu.con('Enter old Pin');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'resetPin.pin'
  }
});

//validate pin
menu.state('resetPin.pin', {
  run: () => {
    //todo check if oldpin === user.pin with var oldPin = Number(menu.val);
    menu.con('Enter new Pin');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'resetPin.newPin'
  }
});

//reset pin
menu.state('resetPin.newPin', {
  run: () => {
    var newPin = Number(menu.val);
    menu.end(`new pin has been updated ${newPin}`);
  }
});
//cash widrawal via Touch n' go
menu.state('touchngo', {
  run: () => {
    menu.con('Enter Naija Touch-n-go ID ' + '\n0. Back');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'touchngo.number',
    0: 'widrawal'
  }
});
menu.state('touchngo.number', {
  run: () => {
    menu.con('Enter the amount you wish to recieve');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'touchngo.ammount'
  }
});
menu.state('touchngo.ammount', {
  run: () => {
    menu.con('Enter your Save-me secure PIN');
  },
  next: {
    '*\\d+': 'pinCode'
  }
});

menu.state('pinCode', {
  run: () => {
    menu.end('Transfer Successful');
  }
});

//Banking Transfer

menu.state('bank', {
  run: () => {
    menu.con(
      'Select your bank' +
        '\n1. GTBANK' +
        '\n2. UNION' +
        '\n3. UBA' +
        '\n4. FCMB' +
        '\n5. ZENITH' +
        '\n6. FBN' +
        '\n7. POLARIS' +
        '\n8. FIDELITY' +
        '\n8. WEMA'
    );
  },
  next: {
    1: 'gtbank',
    2: 'unionbank',
    3: 'uba',
    4: 'fcmb',
    5: 'zenith',
    6: 'firstbank',
    7: 'polaris',
    8: 'fidelitybank',
    8: 'wema'
  }
});

menu.state('gtbank', {
  run: () => {
    menu.con('Please Enter a valid GTBank Account Number');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'gtbank'
  }
});

//validate GtBank Account Number
menu.state('gtbanktrans', {
  run: async () => {
    //validate Accoount and return Account Name
    //if enter ammount you wish to transfer to
    // if customer.ballance ==  widrawall funds+ 2000
    // transfer widrawal fee + 2000 to account
    // wallet allocation = 1 % of transferammount
    //wallet allocation save to...

    menu.con('Please Enter Ammount you wish to transfer to Malik Oredona');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'transfer_amount'
  }
});

menu.state('accountNumber', {
  run: () => {
    menu.con('Please Enter Save Me Secure Pin to widraw 1000');
  },
  next: {
    // using regex to match user input to next state
    '*\\d+': 'widrawalpin'
  }
});
menu.state('widrawalpin', {
  run: () => {
    menu.end('Success!');
  }
});

///////////////////////////////////////
//////////////////////////////////////

// Registering USSD handler with Express
app.post('/ussd', function (req, res) {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
//app.use('/api/vaucher', require('./routes/api/vaucher'));
//app.use('/api/test', require('./routes/api/test'));

//app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
