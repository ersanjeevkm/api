const express = require("express");
const cors = require("cors");
const { response } = require("express");

const stripe = require("stripe")(
  "sk_test_51KM40WSGSwiG5OthUwlqtXEmwDLyC53VlYedsKT7Pc6GrHmgTN5Sh7r8Se1EUDcORGmoGwm0ZVZahk07ABudy3nB008wPzdP6m"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes and
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    response.status(201).send({ clientSecret: null });
  }
});

// Listen command
app.listen(process.env.PORT || 3000);
//example endpoint
