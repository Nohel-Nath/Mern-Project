const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser")


dotenv.config( { path : '.env'} )
const app = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



const useRoute = require('./router/routes');
app.use('/', useRoute);


const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

const connectDB = require('./db/connection');
connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


