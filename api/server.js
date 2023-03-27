const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to Database")).catch(console.error);

const User = require('./models/user');

app.get('/user', async (req, res)=> {
    const user = await User.find();

    res.json(User)
})

app.post('/', (req, res) =>{
    res.json("Successfull Post")
})

app.listen(3005, () => console.log("Server started on port 3005"));
