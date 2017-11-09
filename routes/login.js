var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://127.0.0.1:27017/mydb');

// ERR_CODE = 1;手机号码格式错误
// ERR_CODE = 2; params信息不全
// 增
router.post('/userController', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let checkph = /^1[35789]{1}\d{9}$/.test(req.body.phone),
        err_obj = {};
    const username = req.body.username,
        password = req.body.password,
        phone = req.body.phone,
        sex = req.body.sex,
        birthDay = new Date(req.body.birthDay).toLocaleString().slice(0, 10),
        paiduser = req.body.paiduser;
    if (!username || !password || !phone || !sex || !birthDay || !paiduser) {
        err_obj.err_code = 2;
        res.send(err_obj);
        return false;
    };
    if (!checkph) {
        err_obj.err_code = 1;
        res.send(err_obj);
        return false;
    };
    db.bind('username');
    db.username.findOne({ 'phone': phone }, (err, result) => {
        if (!result) {
            db.username.insert({
                'username': username,
                "password": password,
                "phone": phone,
                "sex": sex,
                "birthDay": birthDay,
                "paiduser": paiduser
            }, (err, result) => {
                res.send(result);
            });
            return;
        } else {
            res.send('数据已存在');
            return;
        }
    });
    console.log(3)
});
// 查
router.get('/userController', (req, res, next) => {
    db.collection('username').find().sort({ "phone": 1 }).toArray((err, result) => {
        if (err) throw err;
        let obj = {};
        obj.code = 'ok';
        obj.msg = result;
        res.send(obj);
        console.log(result);
    });
});
// 改
router.get('/revise', (req, res, next) => {
    db.bind('username');
    db.username.update({ 'phone': '77777' }, { $set: { 'phone': '15665438551' } }, (err, result) => {
        res.send(result);
    })
});
// 删
router.get('/pop', (req, res, next) => {
    db.bind('username');
    db.username.remove({ 'phone': '15665438551' }, (err, result) => {
        res.send(result);
    })
});

module.exports = router;