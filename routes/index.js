var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

router.get(function(a, b, c) {
    console.log(123)
})

router.get('/tests', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        hello: 'world'
    });
});
router.get('/jsonp', (req, res, next) => {
    let _cb = req.query.callback,
        data = { 'hello': 'world' };
    if (_cb) {
        res.type('text/javascript');
        res.send(_cb + '(' + JSON.stringify(data) + ')');
    };
});




module.exports = router;