const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51N2o4GHfAKzKWyNeqPlIDKCPYp1LuTsqnZq4sCGkR0zcKrDq6WVaMIKDfTdxXM699opOl4VGqt3131NAYiXWCrkc00FXtVhlSE"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  let lineItems = [];
  const items = req.body.items;
  console.log("itesm in server", items);
  items.forEach((item) => {
    lineItems.push({
      //   price: item.id,
      //   quantity: item.quantity,
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
