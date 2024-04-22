import express, {Router, Request, Response} from "express";
import {Twilio} from 'twilio';

const router: Router = express.Router();

// Validate E164 format
function validE164(num: string) {
    return /^\+?[1-9]\d{1,14}$/.test(num);
}

router.post("/", async function (req: Request, res: Response) {
    const twilioNumber = '+18666745632';
    const accountSid = 'ACe090c19b4ac0b1699991ce7af4bd4b6d';
    const authToken = '32a4202f264de97346ea9a9e93c3ecd8';

    const client = new Twilio(accountSid, authToken);

    // start sending message
    if (!validE164('+17742908219')) {
        throw new Error('number must be E164 format!');
    }

    client.messages
        .create({
            from: twilioNumber,
            to: '+17742908219',
            body: 'Hello',
        })
        .then(message => console.log(message.sid))
        .catch(error => console.error(error));

    res.sendStatus(200);
});

export default router;
