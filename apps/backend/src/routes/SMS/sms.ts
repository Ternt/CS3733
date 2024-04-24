import express, {Router, Request, Response} from "express";
import {Twilio} from 'twilio';
import axios from "axios";

const router: Router = express.Router();

// Validate E164 format
function validE164(num: string) {
    return /^\+?[1-9]\d{1,14}$/.test(num);
}

router.post("/", async function (req: Request, res: Response) {
    const msg:string = req.body.message;
    const phone:string= (req.body.phone)+"";

    const keys = await axios.get("https://matthagger.me/apps/softeng/smskey.json");
    if(keys.status !== 200){
        console.error("Failed to retrieve Keys");
    }

    const auth = keys.data.AUTH_KEY;
    const id = keys.data.ACC_ID;
    const twilioNumber = keys.data.TWILIO_NUMBER;

    const client = new Twilio(id, auth);

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
