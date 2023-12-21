const mongoose=require('mongoose')

const Todoschema= mongoose.Schema(
    {
        title:{type: String, required: true},
        description: String,
    },
    {timestamps : true}
    );

const Todo=mongoose.model("todo",Todoschema)

module.exports=Todo