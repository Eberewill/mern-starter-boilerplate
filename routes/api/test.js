const express = require("express");
const router = express.Router();
const Vaucher = require("../../Models/Vaucher");
const Wallets = require("../../Models/Wallets");
const Test = require("../../Models/TestModel");
const { check, validationResult } = require("express-validator");
var voucher_codes = require("voucher-code-generator");
const {
  registerCustomer,
  getcustomer,
  getBalance,
  addName,
  addNumber,
  addLastName,
  addPin,
  sendComfirmsms,
  rechargeCode,
  transfer,
  isvalidTransfer,
} = require("../../controler");
const Customer = require("../../Models/Customer");

//isuser validation

//post user
router.post("/transfer", async (req, res) => {
  try {
    const { customer, amount } = req.body;
    isvalidTransfer(amount, customer, (response) => {
      res.json(response);
    });
  } catch (error) {
    console.error(error);
    res.json(error.message);
  }
});

//add wallet
router.post("/walet", async (req, res) => {
  const name = req.body.walletName;
  try {
    let wallet = new Wallets({
      walletName: name,
    });

    const newallet = await wallet.save();

    res.json(newallet);
  } catch (error) {
    res.json("Error");
    console.error(error);
  }
});

router.post("/useruserpin", async (req, res) => {
  const { phoneNumber, pinCode } = req.body;
  try {
    const response = await addPin(phoneNumber, pinCode);
    res.send(response);
  } catch (error) {
    res.send("Server error");
  }
});
//add name to user
router.post("/user", async (req, res) => {
  try {
    const { phoneNumber, pinCode, firstName, lastName } = req.body;

    const neCustomer = new Customer({
      phoneNumber,
      lastName,
      pinCode,
      firstName,
      phoneNumber,
    });
    const response = await neCustomer.save();
    res.send(neCustomer);
  } catch (error) {
    res.send("Server error");
  }
});

//get all Vauchers
router.get("/", async (req, res) => {
  const vauchers = await Vaucher.find();

  if (vauchers) {
    res.json(vauchers);
  }
});

//generating vauchers todo: Add authentication middleware
function generatevaucher(quantity, next) {
  const vauchers = voucher_codes.generate({
    length: 8,
    count: quantity,
    charset: "0123456789",
  });
  next(vauchers);
}

function saveVaucher(code, unitPrice, next) {
  nvaucher = new Vaucher({
    code,
    unitPrice,
  });
  next(nvaucher);
}

module.exports = router;
