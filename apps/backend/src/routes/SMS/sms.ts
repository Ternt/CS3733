import express, {Router, Request, Response} from "express";
import {Twilio} from 'twilio';
import {AUTH_KEY, ACC_ID, TWILIO_NUMBER} from "./key/private.ts";


const router: Router = express.Router();

const client = new Twilio(ACC_ID, AUTH_KEY);

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
            from: TWILIO_NUMBER,
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
