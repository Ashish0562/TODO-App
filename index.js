const express=require('express')

const PORT=5000;

const app=express()

app.set("view engine","ejs")

app.listen(PORT,()=>{
    console.log(`server is on port ${PORT}`);
})