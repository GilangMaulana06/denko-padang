require('dotenv').config()
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router()
const db = require('./models')
const routes = require('./routes/data.routes');
const cors = require('cors')

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

db.mongoose.connect(db.URL, mongooseConfig)
    .then(() => console.log('database connected'))
    .catch(err => {
        console.log(err)
        console.log('gagal connect')
        process.exit();
    })

app.use('/api/padang', routes)

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
});

module.exports.handler = serverless(app);
