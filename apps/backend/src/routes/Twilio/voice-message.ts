import express, {Router, Request, Response} from "express";
const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
    try {
        const xmlString =
            "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<Response>\n" +
            "  <Say voice=\"woman\">Alex is hosting the Carstravaganza!</Say>\n" +
            "</Response>";

        res.set('Content-Type', 'text/xml');
        res.send(xmlString);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Error getting XML');
    }
});

export default router;
