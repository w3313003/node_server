let express = require('express'),
    router = express.Router(),
    db = require('mongoskin').db('mongodb://127.0.0.1:27017/mydb');

router.post('/login', (req, res, next) => {
    db.bind('personCenter');
});