const mongoose=require('mongoose');

const URI='mongodb://localhost:27017/todoDb';

const mongodb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log('connect to database success')
    } catch (error) {
        console.log(error.message)
    }
   
}

module.exports= mongodb()


