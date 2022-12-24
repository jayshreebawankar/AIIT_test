const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('../Routes/userRoute')

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use('/user',userRoute)

mongoose.connect(
    `mongodb+srv://jayshreeaiit:Jayshree1@cluster0.md0tshx.mongodb.net/?retryWrites=true&w=majority`
).then(()=>{
    app.listen(PORT);
    console.log(`Server connected at PORT ${PORT}`);
}).catch(err=> console.log(err))    