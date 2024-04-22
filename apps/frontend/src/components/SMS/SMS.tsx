import { Twilio } from "twilio";

const twilioNumber = '+18666745632';
const accountSid = 'ACe090c19b4ac0b1699991ce7af4bd4b6d';
const authToken = '32a4202f264de97346ea9a9e93c3ecd8';

const client = new Twilio(accountSid, authToken);

// start sending message
export function sendText() {

    if (!validE164('+17742908219')) {
        throw new Error('number must be E164 format!');
    }

    client.messages
        .create({
            from: twilioNumber,
            to: '+17742908219',
            body: 'Please Work',
        })
        .then(message => console.log(message.sid))
        .catch(error => console.error(error));
}

// Validate E164 format
function validE164(num: string) {
    return /^\+?[1-9]\d{1,14}$/.test(num);
}
