const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

console.log(process.env.URI, "key")

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to Database")).catch(console.error);

app.listen(3001, () => console.log("Server started on port 3001"));
