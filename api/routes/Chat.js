const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // console.log("Entered chat route")
    // console.log(`our body is: ${req.body}`)

    try{
        if(!process.env.OPENAI_KEY){
            console.log("No api key")
            throw new Error('No OPENAI_KEY env variable set')
        }

        const {content} = req.body;
        console.log(`This is content received`, content)

        if(!content){
            throw new Error('No contentsent')
        }

        const reqMessages = content.messages;

        if(!reqMessages){
            throw new Error('No message data provided, please try again')
        }


    }catch(err){

    }

    res.json("You are in the chat route")
})

module.exports = router;
