const express = require("express");
const router = express.Router();
const Vaucher = require("../../Models/Vaucher");
const { check, validationResult } = require("express-validator");
var voucher_codes = require("voucher-code-generator");

//createVaucher
router.post(
  "/",
  [
    check("unitPrice", "unit price is required").not().isEmpty(),
    check("quantity", "quantity is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { unitPrice, quantity } = req.body;

    try {
      await generatevaucher(quantity, (vauch) => {
        vauch.forEach((vaucher) => {
          saveVaucher(vaucher, unitPrice, (newvaucher) => {
            newvaucher.save();
          });
        });
      });
      const newvaucher = await Vaucher.find()
        .limit(Number(quantity))
        .sort([["created", "descending"]]);

      res.json(newvaucher);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//get all Vauchers
router.get("/", async (req, res) => {
  const vaucher = await Vaucher.find();
  if (vaucher) {
    res.json({ vaucher });
  }
});

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
