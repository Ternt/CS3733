import OpenAI from "openai";
import {useState} from "react";
import Button from "@mui/material/Button";
import {KEY} from "./key/private.ts";
import {Box, TextField, Typography} from "@mui/material";
import NaturalLanguageDirection from "../NaturalLanguageDirection/naturalLanguageDirection.tsx";

const openai = new OpenAI({apiKey: KEY, dangerouslyAllowBrowser: true});
const seed: string = "You are an AI Chatbot for my mock brigham and women's hospital";

//Seeding ChatGPT
const seedMessage = await openai.chat.completions.create({
    messages: [{role: "system", content: seed!}],
    model: "gpt-3.5-turbo",
});
console.log(seedMessage);

async function sendToChatGPT(
    userMessage: string,
    chatMessages: { role: string; content: string }[]
): Promise<{ chatMessages: { role: string; content: string }[]; error: string | null }> {
    try {
        const response = await openai.chat.completions.create({
            messages: [{role: "user", content: userMessage}],
            model: "gpt-3.5-turbo",
        });

        const assistantMessage = response.choices[0].message?.content;

        if (!assistantMessage) {
            return {chatMessages, error: "No response received from ChatGPT"};
        }

        return {
            chatMessages: [...chatMessages, {role: "assistant", content: assistantMessage}],
            error: null,
        };
    } catch (error) {
        console.error("Error getting response:", error);
        return {chatMessages, error: "Sorry, there was an error getting the response."};
    }
}

function checkUserMessage(message: string): { start: string; end: string } {
    const pattern = /^How do I get from (.*) to (.*)\?$/;
    const match = message.match(pattern);

    if (match) {
        const [, start, end] = match;
        return {start, end};
    } else {
        return {start: '', end: ''};
    }
}

export default function Chatbot() {
    const [showBot, setShowBot] = useState(false);

    console.log("Initialization Done");
    const [chatMessages, setChatMessages] = useState([{
        role: "system",
        content: "Hi! I am a friendly AI ChatBot here to help!"
    }]);

    const [userMessage, setUserMessage] = useState('');


    async function sendUserMessage() {
        setChatMessages((prevMessages) => [
            ...prevMessages,
            {role: "user", content: userMessage},
        ]);


        //Hijacking for Natural Language
        const {start, end} = checkUserMessage(userMessage);
        if (start !== '' && end !== '') {
            const res = await NaturalLanguageDirection(start, end);
            let path = ['Path text error'];
            if (res !== undefined)
                path = res;
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {role: "ChatBot", content: 'Path from ' + start + ' to ' + end + ': ' + path},
            ]);
            return;
        }

        const {chatMessages: updatedChatMessages, error} = await sendToChatGPT(userMessage, chatMessages);
        setChatMessages(updatedChatMessages);
        if (error) {
            console.error(error);
        }
    }

    return (
        <Box sx={{
            height: '65vh',
            position: 'fixed',
            width: '30%',
            top: '30%',
            left: '70%',
            padding: '1%',
            boxShadow: 100,
            opacity: showBot ? '0%' : '100%',
            zIndex: showBot ? -1 : 3,
        }}>
            <Button onClick={() => setShowBot(true)} sx={{
                position: 'absolute',
                top: '4%',
                left: '83%'
            }}>X</Button>

            <Box sx={{
                height: '12%',
                backgroundColor: '#012d5a',
                borderRadius: '23px 23px 0 0 ',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',

            }}>

                <Typography sx={{
                    fontWeight: 500,
                    color: 'white',
                    fontSize: '25px',
                    mt: '2%',
                }}>
                    CHATBOT
                </Typography>
            </Box>
            <Box sx={{
                backgroundColor: 'whitesmoke',
                borderRadius: '0 0 23px 23px',
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
                                padding: '10px',
                                margin: '3%',
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

                <Box sx={{
                    display: 'flex',
                    backgroundColor: 'grey',
                    outline: 'black',
                    pl: '3%',
                    paddingY: '1%',
                    paddingX: '3%',
                    borderRadius: '0 0 23px 23px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Type Your Message"
                        variant="standard"
                        style={{width: '70%'}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendUserMessage();
                        }}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <Button
                        onClick={sendUserMessage}
                        sx={{
                            backgroundColor: '#012d5a',
                            borderRadius: '23px',
                            height: '10%',
                            paddingX: '10%',

                            "&:hover": {
                                background: "#1a426a",
                                color: "white"
                            },
                        }}
                    >
                        <Typography sx={{
                            fontSize: '15px',
                            color: 'white'
                        }}>
                            Send
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
