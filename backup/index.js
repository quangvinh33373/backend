var express = require('express');
var router = express.Router();
const multer= require("multer")
const today=new Date();
const year=today.getFullYear();
const month=today.getMonth()+1;
const day=today.getDay()+16;
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './user');
    },
    filename: function(req, file, cb) {
        var name=year+""+month+""+day+""+~~(Math.random() * 10)

        cb(null, name);
    },

});
//mongodb
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vinhnq0373:12345@cluster0.c09o5ge.mongodb.net/?retryWrites=true&w=majority";
//
const schema = new mongoose.Schema({
    name: String
});
const TestModel = mongoose.model('Test', schema);
const MaxSize=2*1024*1024
var upload = multer({ storage: storage,

    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg" ) {

            cb(null, true);
        }else{
            return cb( new Error('Only jpg allowed'));
            cb(null, false);
        }
        if(file>MaxSize){
            return cb( new Error('Max size is 2mb'));
            cb(null, false);
        }

    },
    limits: { fileSize:MaxSize,files:5}



});
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://vinhnq0373:12345@cluster0.c09o5ge.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/login' , function (req, res){
    const username = req.query.username;
    const password = req.query.password;
    res.send(username+"--"+password)


})
router.post('/login' ,upload.array('avatar',5), function (req, res){

    res.send("Thành công")
    if (err instanceof multer.MulterError) {
        alert("chỉ up được tối đa 5 file 1 lần");
    }

})
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
async function run() {
    await mongoose.connect('mongodb+srv://nguyenvinh1k30:vinhnq@cluster0.6jptxqy.mongodb.net/');
    await TestModel.create({
        name: 'Test Testerson'
    });
}
run();
module.exports = router;
