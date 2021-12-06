const express = require("express");
const router = express.Router();

const controller = require("../controllers/stripe.controllers");

router.post("/checkout", controller.Checkout);

router.post("/payment", controller.PaymentSuccess);

module.exports = router;
