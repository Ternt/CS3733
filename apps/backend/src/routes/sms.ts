import express, {Router, Request, Response} from "express";
import {Twilio} from 'twilio';

const router: Router = express.Router();

const twilioNumber = '+18666745632';
const accountSid = 'ACe090c19b4ac0b1699991ce7af4bd4b6d';
const authToken = '32a4202f264de97346ea9a9e93c3ecd8';
const client = new Twilio(accountSid, authToken);

// Validate E164 format
function validE164(num: string) {
    return /^\+?[1-9]\d{1,14}$/.test(num);
}

router.post("/", async function (req: Request, res: Response) {
    const msg:string = req.body.message;
    const phone:string= (req.body.phone)+"";

    // start sending message
    if (!validE164(phone)) {
        throw new Error('number must be E164 format!');
    }

    client.messages
        .create({
            from: twilioNumber,
            to: phone,
            body: msg,
        })
        .then(message => console.log(message.sid))
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        });

    res.sendStatus(200);
});

export default router;
