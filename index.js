require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const cors = require('cors');
const models = require('./models/models.js')
const router = require('./routes/index.js');


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}




start()