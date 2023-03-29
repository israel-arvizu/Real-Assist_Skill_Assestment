const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {

    // async function moderateResponse(messages){
    //     const modResponse = await axios.post('https://api.openai.com/v1/moderations',{
    //         input: messages[messages.length - 1].content
    //     },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    //             }
    //     })
    //     const results = await modResponse.data.results[0].flagged;

    //     if(results) return false;

    //     return true;
    // }

    // moderateResponse(messagesArr).then((passedModeration) => {
    //     if(!passedModeration){
    //         res.json({
    //             error: "Did not pass moderation"
    //         })
    //     }else{
    //         console.log("Passed moderation test!")
    //     }
    // })

    (async function(){

        if(!process.env.OPENAI_KEY){
            res.json({error: 'No OPENAI_KEY env variable set'})
            return false;
        }

        const { messagesContent } = req.body;
        const messagesArr = messagesContent;
        console.log("Receiving this:", messagesArr)

        if(messagesArr.length  < 1 || !messagesArr[messagesArr.length - 1].content){
            res.json({error: 'No message data provided, please try again'})
            return false;
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
            res.json({
                error: "Did not pass moderation"
            })
            return false
        }else{
            //TAKE THIS OFF FOR PRODUCTION
            console.log("Passed moderation test!")
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
        })


        if(! (await chatResults.ok)){

            console.log("CHAT RESULTS NOT OKAY", chatResults.ok)
        }

        let finalResults = chatResults.data.choices

        if(finalResults){
            res.json(finalResults[0])
            return true
        }


    }())
})

module.exports = router;
