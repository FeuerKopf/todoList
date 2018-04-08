const express = require('express')
const router = express.Router()
const pug = require('pug');
const users = require('../model/users');
const bcrypt = require('bcrypt');

router.all('/login', async (req, res) => {
    if (req.body.name && req.body.pass) {
        const user = await users.find({
            where: { name: req.body.name }
        })

        if (!user) {
            res.send(404)
            
            return;
        }

        if (bcrypt.compare(req.body.pass, user.pass)) {
            req.session.user_id = user.id;
            res.redirect('/');
            return;
        }
    }
    res.render('user/login')
});

router.all('/register', async (req, res) => {
    if (req.body.name && req.body.pass) {
        const hash = bcrypt.hashSync(req.body.pass, 10);
        let user = await users.create({
            name: req.body.name,
            pass: hash
        });
        res.redirect('/');
        return;
    }
    res.render('user/login')
});



module.exports = router