const express=require('express');
const bodyParser = require('body-parser');
require('./connect/connect');
const routes=require('./Routes/routes');
const path=require('path')

const app=express();


const PORT= 5000;



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use('/',routes)
app.use(express.static(path.join(__dirname,'public')))


app.listen(PORT,()=>{
    console.log(`server is on port ${PORT}`);
})