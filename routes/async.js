let express = require('express'),
    router = express.Router();

router.get('/1', (req, res, next) => {
    setTimeout(() => {
        res.send('no.1');
    }, 4000)
})
router.get('/2', (req, res, next) => {
    setTimeout(() => {
        res.send('no.2');
    }, 3000)
})
router.get('/3', (req, res, next) => {
    setTimeout(() => {
        res.send('no.3');
    }, 2000)
})
router.get('/4', (req, res, next) => {
    res.send('no.4');
})
router.get('/5', (req, res, next) => {
    res.send('no.5');
})

module.exports = router;