require('dotenv').config({path: './.env'});
const stripe = require('stripe')(process.env.PAYMENT_KEY);

const paymentModel = require('../database/model/paymentModel');

const pay = async (req, res) => {
  const { paymentMethodId, paymentIntentId, order, currency, useStripeSdk } = req.body;

  try {
    let intent;
    if (paymentMethodId) {
      const orderAmount = order.items.reduce((total, item) => total + item.food.price, 0) * 100;
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      intent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        use_stripe_sdk: useStripeSdk,
      });
      // After create, if the PaymentIntent's status is succeeded, fulfill the order.
    } else if (paymentIntentId) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on the client.
      intent = await stripe.paymentIntents.confirm(paymentIntentId);
      // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
    }
    const response = await generateResponse(intent);
    return res.json(response);
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
   return res.status(500).json({ error: e.message });
  }
}

const refound = () => {
// TODO: refound logics
}

const generateResponse = async (intent) => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
    case "requires_source_action":
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret
      };
    case "requires_payment_method":
    case "requires_source":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method"
      };
    case "succeeded":
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log("💰 Payment received!");
      // on payment received, save the client secret to 
      // mongo db
      const payment = new paymentModel({ clientSecret: intent.client_secret });
      await payment.save((error) => {
        if (error) {
          console.log('save payment model error', error);
        }
      });
      return { clientSecret: intent.client_secret };
  }
};

module.exports = {
  pay,
  refound,
}
