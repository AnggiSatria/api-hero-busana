const express = require('express');
require('dotenv').config();
const cors = require('cors');
const router = require('./src/routes');

const app = express();

let corsOptions = {
    origin: '*',
};

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));