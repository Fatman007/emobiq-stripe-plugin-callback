const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Root route - redirect to a landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Success callback endpoint
app.get('/success', (req, res) => {
  const { session_id, amount, currency, payment_intent } = req.query;
  
  console.log('Payment Success Callback:', {
    session_id,
    amount,
    currency,
    payment_intent,
    timestamp: new Date().toISOString()
  });
  
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Failure/Cancel callback endpoint
app.get('/cancel', (req, res) => {
  const { session_id, reason } = req.query;
  
  console.log('Payment Cancel Callback:', {
    session_id,
    reason,
    timestamp: new Date().toISOString()
  });
  
  res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});

// POST endpoints for webhooks (if needed)
app.post('/webhook/success', (req, res) => {
  console.log('Success Webhook received:', req.body);
  res.status(200).json({ received: true, status: 'success' });
});

app.post('/webhook/cancel', (req, res) => {
  console.log('Cancel Webhook received:', req.body);
  res.status(200).json({ received: true, status: 'cancel' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Callback server running on port ${PORT}`);
  console.log(`Success URL: http://localhost:${PORT}/success`);
  console.log(`Cancel URL: http://localhost:${PORT}/cancel`);
});
