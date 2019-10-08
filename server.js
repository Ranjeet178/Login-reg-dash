var express = require('express');
var cor=require('cors');   
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var jwt =require('jwt-simple');


const port= 3000;
var User =  require('./models/user.js');

var posts =[
    {message: 'hello world'},
    {gretting: 'what is goin on'},
    
]

app.use(cor());
app.use(bodyParser.json());

app.get('/posts',(req,res)=> {
    console.log("Web Browser Opened");
    res.send(posts)
});
app.get('/users', async(req,res)=> {
    try{
    let users= await User.find({},'-password -__v')
    res.send(users);
    }catch(error){
consolee.log(error);
res.sendStatus(500);
    }
});

app.get('/profile/:id', async(req,res)=> {
    try{
    let user= await User.findById(req.params.id,'-password -__v')
    res.send(user);
    }catch(error){
consolee.log(error);
res.sendStatus(500);
    }
});
app.post('/register',(req,res)=> { 
    let userData= req.body;
    console.log(userData);
   let user = new User(userData);
user.save((err,result)=>{
    if(err){
        console.log("having trouble adding the user");
    }else {
        res.sendStatus(200);
    }
})  

   });

   app.post('/login', async(req,res)=> { 
    let userData= req.body;
    let user= await User.findOne({email:userData.email});
    if(!user){
      return res.status(401).send({message:'Email or password invalid'})
    }if(userData.password!=user.password){
        return res.status(401).send({message:'Email or password invalid'})
    }
let payload={}
let token= jwt.encode(payload,'123456')

   
    res.status(200).send({token});

   });

   mongoose.connect('mongodb+srv://ranjit-yadav:Ranjeet12@cluster0-ykqhy.mongodb.net/admin?retryWrites=true&w=majority',(err)=>{
       if(!err){
           console.log("connected to mongo");
       }
       else {  
           console.log("not connected");
       }
   })
   
app.listen(port);   