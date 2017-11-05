var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://127.0.0.1:27017/mydb');

// ERR_CODE = 1;手机号码格式错误
// ERR_CODE = 2; params信息不全
router.post('/userController', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let checkph = /^1[35789]{1}\d{9}$/.test(req.body.phone);
    const username = req.body.username,
        password = req.body.password,
        phone = req.body.phone,
        sex = req.body.sex,
        birthDay = new Date(req.body.birthDay).toLocaleString().slice(0, 10),
        paiduser = req.body.paiduser;

    if (!username || !password || !phone || !sex || !birthDay || !paiduser) {
        res.send('ERR_CODE = 2');
        return false;
    };
    if (!checkph) {
        res.send('ERR_CODE = 1');
        return false;
    };
    db.bind('username');
    console.log(1);
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
router.get('/userController', (req, res, next) => {
    db.bind('username');
    // db.username.find({}, (err, result) => {
    //     if (!result) {
    //         res.send('没有数据')
    //         return;
    //     }
    //     res.send(result)
    // })
    db.username.find().toArray((err, result) => {
        if (err) throw err;
        let obj = {};
        obj.code = 'ok';
        obj.msg = result;
        res.send(obj);
        console.log(result);
    });
});

module.exports = router;