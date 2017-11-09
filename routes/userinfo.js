var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://127.0.0.1:27017/mydb');
var app = express();
var cookie = require('cookie-parser');
app.use(cookie())

router.post('/checkuserName', (req, res, next) => {
    let acountname = req.body.acount;
    db.bind('personCenter');
    db.personCenter.findOne({ acountname: acountname }, (err, result) => {
        if (err) throw err;
        console.dir(result)
        if (result) {
            res.send('数据已存在')
        } else {
            res.send('可以注册')
        }
    })
});
router.post('/checkPhone', (req, res, next) => {
    let phone = req.body.phone;
    db.bind('personCenter');
    db.personCenter.findOne({ phone: phone }, (err, result) => {
        if (err) throw err;
        console.dir(result)
        if (result) {
            res.send('数据已存在')
        } else {
            res.send('可以注册')
        }
    })

})
router.post('/register', (req, res, next) => {
    const acountname = req.body.acount,
        password = req.body.password,
        phone = req.body.phone,
        sex = req.body.sex,
        area = req.body.area,
        registerDate = new Date().toLocaleString();
    if (!acountname || !password || !phone || !sex || !area) {
        res.send('参数错误');
        return false;
    };
    db.bind('personCenter');
    db.personCenter.save({
        acountname: acountname,
        password: password,
        phone: phone,
        sex: sex,
        area: area,
        registerDate: registerDate
    }, (err, result) => {
        res.send('注册成功');
    });
})
router.get('/information', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
    if (req.cookies.already) {
        res.send('already')
    } else {
        res.cookie('already', 1, { maxAge: 60 * 1000 });
        db.bind('personCenter').find({}, { 'password': 0 }).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
        });
    }
});

module.exports = router