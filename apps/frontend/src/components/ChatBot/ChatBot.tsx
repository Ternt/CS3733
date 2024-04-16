import OpenAI from "openai";
import {useState} from "react";
import Button from "@mui/material/Button";

import {KEY} from "./key/private.ts";
import {Box, Typography} from "@mui/material";

const openai = new OpenAI({apiKey: KEY, dangerouslyAllowBrowser: true});
const seed: string = "You are an AI Chatbot for my mock brigham and women's hospital";

//Seeding ChatGPT
const seedMessage = await openai.chat.completions.create({
    messages: [{role: "system", content: seed!}],
    model: "gpt-3.5-turbo",
});
console.log(seedMessage);

export default function Chatbot() {
    console.log("Initialization Done");
    const [chatMessages, setChatMessages] = useState([{role: "system", content: "Hi! I am a friendly AI ChatBot here to help!"}]);

    const sendUserMessage = async () => {

        const userMessage = prompt("You: ");

        if (userMessage) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {role: "user", content: userMessage},
            ]);
        }

        try {
            const response = await openai.chat.completions.create({
                messages: [{role: "system", content: userMessage!}],
                model: "gpt-3.5-turbo",
            });

            //Adding ChatGPT Response to messages array
            const assistantMessage = response.choices[0].message!.content!;
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {role: "ChatBot", content: assistantMessage},
            ]);

        } catch (error) {
            console.error("Error getting response:", error);
            return "Sorry, there was an error getting the response.";
        }
    };

    return (
        <Box sx={{
            width: '30%',
            backgroundColor: 'whitesmoke',
            position: 'fixed',
            zIndex: 3,
            top: '35%',
            left: '65%',
            padding: '1%',
            borderRadius: '23px',
        }}>
            <Box sx={{
                overflowY: 'scroll',
                height: "50vh",
            }}>
                {chatMessages.map((message, index) => (
                    <div key={index}>

                        <Box sx={{
                            backgroundColor: message.role === "user" ? '#012d5a' : '#f6bd38',
                            width: 'fit-content',
                            borderRadius: '23px',
                            padding: '10px'
                        }}>
                            <Typography sx={{
                                color: message.role === "user" ? 'white' : 'black',
                            }}>
                                {message.role === "user" ? "You: " : "ChatBot: "}
                                {message.content}
                            </Typography>

                        </Box>

                    </div>
                ))}
            </Box>
            <Button onClick={sendUserMessage}>Send Message</Button>
        </Box>
    );
}
