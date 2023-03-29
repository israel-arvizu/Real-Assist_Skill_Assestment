const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const chatRoute = require('./routes/Chat')

app.use(express.json());
app.use(cors());
app.use('/chat', chatRoute);

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to Database")).catch(console.error);


app.listen(3005, () => console.log(`Server started on port ${process.env.PORT}`));
