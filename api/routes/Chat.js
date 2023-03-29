const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
    try{
        if(!process.env.OPENAI_KEY){
            console.log("No api key")
            throw new Error('No OPENAI_KEY env variable set')
        }

        const { messagesContent } = req.body;
        console.log(`This is content received`, messagesContent)

        // if(!data){
        //     throw new Error('No body received')
        // }

        const messagesArr = messagesContent;

        if(!messagesArr){
            throw new Error('No message data provided, please try again')
        }

        //MODERATE RESULTS AS FOR OPENAI DOCUMENTATION

        async function moderateResponse(messages){
            const modResponse = await axios.post('https://api.openai.com/v1/moderations',{
                input: messages[messages.length - 1].content
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
                    }
            })
            const results = await modResponse.data.results[0].flagged;

            if(results) return false;

            return true;
        }

        moderateResponse(messagesArr).then((passedModeration) => {
            if(!passedModeration){
                res.json({
                    error: "Did not pass moderation"
                })
            }else{
                console.log("Passed moderation test!")
            }
        })

        const prompt = 'You are a virtual assistant for a company called RealAssist.AI that focuses on Real Estate.'
        const messages = [{role: 'system', content: prompt}, ...messagesArr]

        const chatOptions = {
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.8,
        }

        throw new Error("STOP HERE")

        async function chatFetch(chatOps){
            const chatResults = await fetch(`https://api.openai.com/v1/chat/completions`,{
                headers:{
                    Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(chatOps)
            })

            if(!chatResults.ok){
                console.log("CHAT RESULTS NOT OKAY")
            }

            return chatResults;
        }

        console.log(chatFetch(chatOptions));

    }catch(err){
        console.log(`ERROR: ${err}`)
    }

    // res.json("You are in the chat route")
})

module.exports = router;
