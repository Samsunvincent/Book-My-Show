const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = require('../server/db/connect');

const router = require('../server/user-Router/router');


app.use(express.static('../client'));
app.use('/uploads',express.static('./uploads'));
app.use(express.json({limit : "500mb"}));
app.use(express.urlencoded({extended : true}));
app.use(router)

mongoConnect()



app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})
