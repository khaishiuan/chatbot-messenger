// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // For sending messages back to Messenger
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'YOUR_VERIFY_TOKEN'; // Replace with your verify token
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const webhook_event = entry.messaging[0];
      const senderId = webhook_event.sender.id;
      const messageText = webhook_event.message.text;

      // Respond to the message
      sendMessage(senderId, messageText);
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Function to send messages
const sendMessage = (recipientId, messageText) => {
  const PAGE_ACCESS_TOKEN = 'YOUR_PAGE_ACCESS_TOKEN'; // Replace with your page access token
  const requestBody = {
    recipient: { id: recipientId },
    message: { text: messageText }
  };

  fetch(`https://graph.facebook.com/v10.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
