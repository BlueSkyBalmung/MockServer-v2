const fs = require('fs');
const crypto = require('crypto');
const constants = require('../utils/const');

/**
 * Permet de verifier le mot de passe
 * @param user
 * @param basePath
 * @returns {boolean}
 */
checkPwd = (user, basePath) => {
    const pwdCrypt = crypto.createHash('sha256').update(user.password).digest('hex');
    const path = basePath.replace('*', '') + user.login + '/' + user.login + '-cfg.txt';
    let pwdFromFile;
    try {
        pwdFromFile =  fs.readFileSync(path,'utf8');
    } catch (error) {
        pwdFromFile = '';
    }

    return pwdCrypt === pwdFromFile;
};

module.exports = (req, res, next) => {
    const dbConnect = require('../db/db-connection.json');
    if (checkPwd(req.body, constants.localisationMockedApp)) {
        next();
    } else {
        res.status(401).jsonp(dbConnect.connectionRefused);
    }
};
