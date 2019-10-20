const jwt = require("jsonwebtoken");
const jwstkey = require('../utils/key');

module.exports = {
    verifyToken: (req, res, next) => {
        if (!req.headers.ngstackauth) {
            return next('Invalid');
        }
        jwt.verify(req.headers.ngstackauth, jwstkey.jwt, (err, data) => {
            if (err) throw err;

            req.body.idUser = data.id;
            req.body.owner = data.name;
            return next();
        })

    }
};