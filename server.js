// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_51RbiHVQWoDFBxVYZTVmmL0uQu9dYmy7sYknHRC0fNc4RpuxaBwIgpps7xVwsRxwhE8JRjgK9yFZv2pIDqlLrmYkw00c4Zx8vAg'); // ⚠️ Заміни на свій
const app = express();
app.use(express.json());
app.use(express.static('public')); // для HTML

app.post('/create-checkout-session', async (req, res) => {
  const { massagePrice, date, name, phone } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'pln',
        unit_amount: parseInt(massagePrice),
        product_data: {
          name: `Masaż – ${date} – ${name}`
        }
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: 'https://example.com/success.html',
    cancel_url: 'https://example.com/cancel.html',
    metadata: { name, phone, date }
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('✅ Serwer działa na http://localhost:4242'));
