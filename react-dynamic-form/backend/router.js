const express= require('express');
const app=express();
const path=require("path");
const cors=require('cors')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname,'../react-form/build')));
const {MongoClient}=require('mongodb');
const url=require('./path.js');
MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((client)=>{
    console.log("db connected");
    let db=client.db("login-api");
    let login=db.collection("login");
    app.post('/login',(req,res)=>{
        login.insertOne({name:req.body.name,email:req.body.email,password:req.body.password}).then((res)=>{
            console.log("data added");
        }).catch((err)=>console.error(err));
    })
});
const PORT=process.env.port || 6700;
app.listen(PORT,()=>{
    console.log(`server is listening to ${PORT}`);
})
