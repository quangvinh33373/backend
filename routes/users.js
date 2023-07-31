var express = require('express');
var router = express.Router();
// getting-started.js
const mongoose = require('mongoose');

var fs = require('fs');
var multer = require('multer');
var path = require('path');
var app = express();

// ADD THIS
var cors = require('cors');
app.use(cors());




app.use(express.static('user'))
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img');
    },
    filename: function(req, file, cb) {
        var name="file"+~~(Math.random() * 20)+".png"

        cb(null, name);
    },

});
var upload = multer({ storage: storage,
});


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://nguyenvinh1k30:vinhnq@cluster0.6jptxqy.mongodb.net/');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
router.get('/',
    async function (req, res, next) {
        const SV = mongoose.model('ASM', Oto, 'Oto');
        const kittens = await SV.find()
        const id = req.params.id;

        res.render('users', {data: kittens,});
    });

const Oto = new mongoose.Schema({
    maXe: String,
    tenXe: String,
    giaTien: String,
namSX: String,
hinhAnh:Array,
tenSua:String

});
router.get("/getData",(req,res)=>{
res.send("hello");

});


router.get('/test',  function (req, res, next) {
    res.send("hello");
})
router.get('/delete/:id', async function (req, res) {
    const id = req.params.id
    const SV = mongoose.model('ASM', Oto, 'Oto');
    await SV.deleteOne({_id: id})
    const data = await SV.find({})
    res.render('users', {message: 'Xoa thanh cong !!!',data:data})
})

    router.post('/updateUser',upload.single('avatar'), async function (req, res) {
        const id = req.body.id;
        const maXe = req.body.maXe;
        const tenXe = req.body.tenXe;
        const giaTien =req.body.giaTien;
        const namSX=req.body.namSX;
        const obj = {
            img: {
                data: req.file.filename
            },
        };

        const hinhAnh=obj.img;
    const SV = mongoose.model('ASM', Oto, 'Oto');
    await SV.updateOne({
        _id: id,
        maXe: maXe,
        tenXe: tenXe,
        giaTien :  giaTien,
        namSX :namSX,
        hinhAnh: hinhAnh

    })
    const data = await SV.find({})
    res.render('users', {message: 'Update thanh cong!!!', data : data})
})
router.post('/createUser',upload.single('avatar'),   async function (req, res) {

    const maXe = req.body.maXe;
    const tenXe = req.body.tenXe;
    const giaTien =req.body.giaTien;
    const namSX=req.body.namSX;

    const obj = {
        img: {
            data: req.file.filename
        },
    };

    const hinhAnh=obj.img;

    const SV = mongoose.model('ASM', Oto, 'Oto');
    //  tham số 1 là tên model
    // tham số 2 là Schema
    // tham số 3 là tên của collection . nếu ko dùng tham số 3 thì hàm tự tạo collection bằng tên
    // của tham số 1 là + thêm s
    await SV.create({
        maXe: maXe,
        tenXe: tenXe,
        giaTien :  giaTien,
        namSX :namSX,
        hinhAnh: hinhAnh
    })
    const data = await SV.find({})

    res.render("users", {message: 'Them thanh cong!!!',data:data})

})
/* GET users listing. */

router.post('/uploadfile' ,upload.single('avatar'), function (req, res){

    res.send("Thành công")
    if (err instanceof multer.MulterError) {
        alert("chỉ up được tối đa 5 file 1 lần");
    }

})

module.exports = router;
