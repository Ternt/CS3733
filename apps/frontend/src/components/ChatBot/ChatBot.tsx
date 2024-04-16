    import OpenAI from "openai";
    import {useState} from "react";
    import Button from "@mui/material/Button";
    //import NaturalLanguageDirection from "../NaturalLanguageDirection/NaturalLanguageDirection.tsx";
    import {KEY} from "./key/private.ts";
    import {Box, TextField, Typography} from "@mui/material";
    const openai = new OpenAI({apiKey: KEY, dangerouslyAllowBrowser: true});
    const seed: string = "You are an AI Chatbot for my mock brigham and women's hospital";

    //Seeding ChatGPT
    const seedMessage = await openai.chat.completions.create({
        messages: [{role: "system", content: seed!}],
        model: "gpt-3.5-turbo",
    });
    console.log(seedMessage);

    export default function Chatbot() {
        const [showBot, setShowBot] = useState(false);

        console.log("Initialization Done");
        const [chatMessages, setChatMessages] = useState([{
            role: "system",
            content: "Hi! I am a friendly AI ChatBot here to help!"
        }]);

        const [userMessage, setUserMessage] = useState('');

        //For Sending Message
        const handleChange = (fieldName: string, value: string) => {
            setUserMessage(value);
        };

        //Sending Message if you hit enter
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                sendUserMessage();
            }
        };

        const sendUserMessage = async () => {
            if (userMessage) {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {role: "user", content: userMessage},
                ]);
            }

            //Hijacking for Natural Language
            function checkUserMessage(message: string): { start: string; end: string } {
                const pattern = /^How do I get from (.*) to (.*)\?$/;
                const match = message.match(pattern);

                if (match) {
                    const [, start, end] = match;
                    return { start, end };
                } else {
                    return { start: '', end: '' };
                }
            }

            if(checkUserMessage(userMessage).start !== '' && checkUserMessage(userMessage).end !== ''){
                const start: string = checkUserMessage(userMessage).start;
                const end: string = checkUserMessage(userMessage).end;

                //const NaturalLanguage = NaturalLanguageDirection({startLocation: start, endLocation: end})

                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {role: "ChatBot", content: 'Path from ' + start +  ' to ' + end + ': PATH HERE'},
                ]);
                return;
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
                setUserMessage('');

            } catch (error) {
                console.error("Error getting response:", error);
                setUserMessage('');
                return "Sorry, there was an error getting the response.";
            }
        };

        return (
            <Box sx={{
                height: '65vh',
                zIndex: 3,
                position: 'fixed',
                width: '30%',
                top: '30%',
                left: '70%',
                padding: '1%',
                boxShadow: 100,
                opacity: showBot ? '0%' : '100%',
            }}>
                <Button onClick={() => setShowBot(true)} sx={{
                    position: 'absolute',
                    top: '0vh',
                    backgroundColor: 'black',
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
                            style={{ width: '70%' }}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => handleChange('userMessage', e.target.value)}
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
