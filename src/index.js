const http = require("http");
const bodyParser = require('body-parser')
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors")
const jsonParser = bodyParser.json()
const app = express();
app.use(cors())
app.use(bodyParser.json())
const { PORT } = process.env;
const port = process.env.PORT || PORT || 4000;
app.use('/api', require('./routes/index'));
app.listen(port, () => {console.log(`Server running on port ${port}`);});
