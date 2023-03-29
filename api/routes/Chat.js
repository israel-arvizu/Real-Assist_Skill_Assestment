const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
    (async function(){

        if(!process.env.OPENAI_KEY){
            res.json({error: {message: 'No OPENAI_KEY env variable set'}})
            return false;
        }

        const { messagesContent } = req.body;
        const messagesArr = messagesContent;

        if(messagesArr.length  < 1 || !messagesArr[messagesArr.length - 1].content){
            console.log("fell into error")
            res.json({error: {message: 'No message data provided, please add some input'}})
            return;
        }

         //MODERATE RESULTS AS FOR OPENAI DOCUMENTATION

        const modResponse = await axios.post('https://api.openai.com/v1/moderations',{
            input: messagesArr[messagesArr.length - 1].content
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.OPENAI_KEY}`
                }
        })

        //true if flagged, false if not
        const modResults = await modResponse.data.results[0].flagged;

        if(modResults){
            res.json({error: {message: "Did not pass moderation"}})
            return;
        }

        const prompt = 'You are a virtual assistant for a company called RealAssist.AI that focuses on Real Estate.'
        const messages = [{role: 'system', content: prompt}, ...messagesArr]

        const chatOptions = {
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.8,
        }

        const chatResults = await axios.post(`https://api.openai.com/v1/chat/completions`,
        JSON.stringify(chatOptions),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.OPENAI_KEY}`
                }
        }).catch(function (error){
            res.json({error: error.toJSON()})
            return;
        })


        let finalResults = chatResults.data.choices

        if(finalResults){
            res.json(finalResults[0])
            return true
        }


    }())
})

module.exports = router;
