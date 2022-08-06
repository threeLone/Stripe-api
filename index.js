const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51Jhe28SE4n7CKlkb2qpd0ynQTQgvMzOEPNdTRP3qEH9HHxxDtPTEW2l5RaaaqGbPQQjkL4QE405xfTRDeeyQDFhL00SIMHUaST');

app.post('/Webhook', async (req, res) => {
  let data;
  let eventType;

  const webhookSecret = 'whsec_9c959b78bbbc72b57e2a62fab9bbb6f3a470b43b1d244c5fbf268df27b457153';

  if (webhookSecret) {
    let event;
    let signature =  req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
          req['rawBody'],
          signature,
          webhookSecret

        );
    } catch (err) {
      console.log('webhook signature verification failed')
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
     data = req.body.data;
     eventType = event.type;
 
  }
  switch (eventType) {
    case 'checkout.session.completed':
      break;

    case 'invoice.paid':
      break;

    case 'invoice.payment_failed':

    default:

  }
})

app.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1K0eSWSE4n7CKlkbzojOajfq',
        },
      ],
      
      success_url:
        'http://google.com/dashboard?session_id=12',
      cancel_url: 'http://google.com/error',
    });
  
    res.send(session);
  });



app.listen(8080, () => console.log('alive on http://127.0.0.1:8080'))

