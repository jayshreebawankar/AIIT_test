const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('../Routes/userRoute')

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoute)

mongoose.connect(
    `mongodb+srv://Account2023:zS9yc4PyIj0ERhfE@cluster0.ddzi0la.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    app.listen(PORT);
    console.log(`Server connected at PORT ${PORT}`);
}).catch(err => {
    console.log("Failed to connect")
    console.log(err)
}

)    