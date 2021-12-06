const stripe = require("stripe")(`${process.env.REACT_APP_SECRET_KEY}`);

//@desc create stripe checkout page
module.exports.Checkout = async (req, res) => {
  const data = req.body.cart;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      automatic_tax: {
        enabled: true,
      },
      line_items: data.itemName.map((item, index) => {
        const lineItem = {
          price_data: {
            currency: "cad",
            product_data: {
              name: `${data.itemSize[index]} ${item}`,
            },
            tax_behavior: "exclusive",
            unit_amount: data.itemPrice[index] * 100,
          },
          quantity: data.itemQuantity[index],
        };
        return lineItem;
      }),

      success_url: "https://www.google.com",
      cancel_url: "https://www.fb.com",
    });
    res.json({ url: session.url, session: session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//@desc checks payment status returns data about paymentIntent
module.exports.PaymentSuccess = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.body.paymentIntent
    );
    res.json({ status: paymentIntent.status, pi: paymentIntent });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
