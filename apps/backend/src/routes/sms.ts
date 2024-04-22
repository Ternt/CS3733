import express, {Router, Request, Response} from "express";
import {Twilio} from 'twilio';

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
    console.log(req.body);
    //todo put the code to take the message and phone number to send from the req.body, check that its valid, and send an sms message
    res.sendStatus(200);
});

export default router;
