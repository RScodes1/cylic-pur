const express = require('express');
const app = express();
require('dotenv').config()

// modules of diff
const {connection} = require('./config/db');
const {userRouter} = require('./routes/user.routes');
const {picRouter} = require('./routes/pics.routes')
const cors = require('cors');

// routes
app.use(express.json());
app.use('/users',userRouter);
app.use('/pics',picRouter)
app.use(cors());

app.get('/',(req,res)=> {
   res.send({msg: "welcome to the server"});
})

app.listen(process.env.port, async()=> {
    try {
        await connection
        console.log('connecting to mongodb');
        console.log('connected');
        console.log(`server is running on port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})