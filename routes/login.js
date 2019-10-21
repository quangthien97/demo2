const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const key = {
    tokenKey: "djghhhhuuwiwuewieuwieuriwu"
}
const UserModel = require('../models/User');

router.post('/register', async function (req, res, next) {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (user == null) {
            const hash = await bcrypt.hash(req.body.password, 8);
            const User = new UserModel(req.body);
            User.password = hash;
            const userCreate = await User.save();
            return res.json({ code: 200, message: null, data: { userCreate } });
        } else {
            return res.json({ code: 200, message: "Da trung ten dang nhap", data: null })
        }
    } catch (err) {
        return res.json({ code: 400, message: err.message, data: null });
    }
});

router.post('/', async function (req, res, next) {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (user == null) { return res.json({ code: 401, message: "sai ten dang nhap", data: null }) };
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result == true) {
            var token = jwt.sign({ _id: user._id }, key.tokenKey);
            return res.header('auth-token', token).json({
                code: 200,
                message: "dang nhap thanh cong",
                data: { user },
                token
            });
        } else {
            return res.json({ code: 400, message: "sai mat khau", data: null });
        }
    } catch (err) {
        return res.json({ code: 400, message: err.message, data: null });
    }
})

module.exports = router;