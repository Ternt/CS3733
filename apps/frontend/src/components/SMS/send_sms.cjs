const twilioNumber = '+18666745632';
const accountSid = 'ACe090c19b4ac0b1699991ce7af4bd4b6d';
const authToken = '32a4202f264de97346ea9a9e93c3ecd8';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Please Work',
    from: twilioNumber,
    to: '+17742908219'
  })
  .then(message => console.log(message.sid));
