const express = require('express');
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/post");
const uploadMiddleware = multer({dest : "uploads/"});
const { default: mongoose } = require('mongoose');
const app = express();
require("dotenv").config();
const secret = "dievcuidcuisdbcuidbcuwi";
const salt = bcrypt.genSaltSync(10);

main().catch(err => console.log("db not connected"));
async function main() {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected");
}



app.use(cors({
    origin : process.env.FRONT,
    credentials : true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads" ,express.static(__dirname + "/uploads"));
app.post("/register" ,async(req ,res) => {
    const {username ,password} = req.body;
    try {
        const userDoc = new User({username ,
        password : bcrypt.hashSync(password,salt)});
        const userFind = User.find({username:username});
        await userDoc.save();
        res.json(userDoc);
    }
    catch(err) {
        res.status(400).json(err);
    }
    
});

app.post("/login" ,async(req ,res) => {
    const {username ,password} = req.body;
    const userDoc = await User.findOne({username});
    console.log(userDoc);
    if(userDoc) {
        const passOk = bcrypt.compareSync(password ,userDoc?.password);
        if(passOk) {
            jwt.sign({username ,id : userDoc._id},secret ,{} ,(err ,token) => {
                if(err) throw err;
                   res.cookie('token' ,token ,{sameSite : "none" ,secure :true}).json({
                   id : userDoc._id,
                   username
                });
            })
        } else {
            res.status(400).json('wrong credentials');
        }
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.get("/profile" ,(req ,res) => {
    const {token} = req.cookies;
    jwt.verify(token ,secret ,{} ,(err ,info) => {
        if(err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
});

app.post("/logout" ,(req ,res) => {
    res.cookie("token" ,"",{sameSite : "none" ,secure :true}).json("ok");
});

app.post("/post" ,uploadMiddleware.single("file"),async(req ,res) => {
    const {originalname ,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path ,newPath);

    const {token} = req.cookies;
    jwt.verify(token ,secret ,{} ,async(err ,info) => {
        if(err) throw err;
        const {title ,summary ,content} = req.body;
        const post = new Post({
            title ,summary ,content,
            cover : newPath, author : info.id,
        })

        await post.save();
        res.json(post);
    });    
});

app.get("/post" , async(req ,res) => {
    const posts = await Post.find().populate("author" ,["username"]).sort({createdAt : -1}).limit(20);
    
    res.json(posts);
});

app.get("/post/:id" ,async(req ,res) => {
    const id = req.params;
    const postDoc = await Post.findById({_id : id.id}).populate("author" , ['username']);
    res.json(postDoc);
})

app.put("/post" ,uploadMiddleware.single("file"),async(req ,res) => {
    const {originalname ,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path ,newPath);

    const {token} = req.cookies;
    console.log("token : " ,token);
    jwt.verify(token ,secret ,{} ,async(err ,info) => {
        if(err) throw err;
        const {id ,title ,summary ,content} = req.body;
        await Post.findByIdAndUpdate({_id : id} ,{
            title ,
            summary ,
            content ,
            cover: newPath 
        },{upsert : true})
        res.json(info);
    });    
})

const port = process.env.PORT || 8080;
app.listen(port ,() => {
    console.log("server has been started.");
});

