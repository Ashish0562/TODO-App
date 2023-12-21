const express=require('express');
const router=express.Router();
const Todo=require('../model/Schema')
const moment=require('moment')


router.get('/',async (req,res,next)=>{

    try {
        const alltodo= await Todo.find({}).sort({createdAt:-1})
        res.locals.moment=moment
        res.render("index",{title:"Todo",alltodo})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/add-todo',(req,res,next)=>{
    try {
        res.render("todo-form",{title:"Add todo"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/update-todo', async(req,res,next)=>{
    try {
        const id=req.query.id;
        const todo= await Todo.findById(id)
        res.render("update",{title:"Edit todo",todo})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/delete-todo',(req,res,next)=>{
    try {
        const id=req.query.id
        // console.log(id);
        res.render("delete",{title: "Delete todo",id})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.post('/add-todo',async (req,res,next)=>{
try {
    // console.log(req.body);
    const {title,description}=req.body;
    const newtodo= new Todo({title,description})
    
    if (!title) {
        return res.status(400).json({message:"title is required"})
    }
    
    await newtodo.save();

    res.redirect('/')

} catch (error) {
    res.status(500).json({message:error.message})
}   
})

router.post('/update-todo/:id',async (req,res,next)=>{
    try {
        const {id}=req.params;
        const {title,description}=req.body;
        const todo= await Todo.findById(id)
        
        if (!todo) {
            return res.status(404).json({message:"not found"})
        }

        todo.title=title
        todo.description=description
        
        await todo.save();
    
        res.redirect('/')
    
    } catch (error) {
        res.status(500).json({message:error.message})
    }   
    })


    router.get('/confirm-delete',async(req,res,next)=>{
        try {

            const {id,confirm}=req.query
            if (confirm ==='YES') {
                await Todo.findByIdAndDelete(id)
            }
            res.redirect('/')
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    })

module.exports=router