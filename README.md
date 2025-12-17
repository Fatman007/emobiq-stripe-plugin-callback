# Emobiq Stripe Plugin Callback

A simple landing page application for receiving callbacks from the Emobiq AI Stripe plugin mobile app after payment processing.

## Features

- ✅ Success callback page with transaction details
- ❌ Cancel/failure callback page with error information
- 🎨 Beautiful, responsive UI with animations
- 📱 Mobile-friendly design
- 🔌 RESTful API endpoints for webhooks
- 📝 Detailed logging of all callbacks

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Fatman007/emobiq-stripe-plugin-callback.git
cd emobiq-stripe-plugin-callback
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Start the Server

```bash
npm start
```

The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### Callback URLs

Configure these URLs in your Emobiq AI Stripe plugin:

- **Success URL**: `http://your-domain.com/success?session_id={CHECKOUT_SESSION_ID}&amount={AMOUNT}&currency={CURRENCY}&payment_intent={PAYMENT_INTENT_ID}`
- **Cancel URL**: `http://your-domain.com/cancel?session_id={CHECKOUT_SESSION_ID}&reason={REASON}`

### API Endpoints

#### GET Endpoints

- `GET /` - Main landing page
- `GET /success` - Success callback page (displays payment success)
  - Query params: `session_id`, `amount`, `currency`, `payment_intent`
- `GET /cancel` - Cancel callback page (displays payment cancellation)
  - Query params: `session_id`, `reason`

#### POST Endpoints (Webhooks)

- `POST /webhook/success` - Success webhook endpoint
- `POST /webhook/cancel` - Cancel webhook endpoint

## Deployment

### Deploy to Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Any Node.js Host

Simply upload the files and run:
```bash
npm install
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## Testing Locally

1. Start the server:
```bash
npm start
```

2. Test the success page:
```
http://localhost:3000/success?session_id=test_123&amount=99.99&currency=USD&payment_intent=pi_test
```

3. Test the cancel page:
```
http://localhost:3000/cancel?session_id=test_123&reason=User%20cancelled
```

## License

ISC
