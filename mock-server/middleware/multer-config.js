const multer  = require('multer');
const constants = require('../utils/const');

/**
 * Configuration du stockage des zip
 * en leur donnant la destination du projet ainsi que de son dossier tmp pour son transit
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, constants.localisationMockedApp.replace('*', '') + req.body.login + '/tmp');
    },
    filename: (req, file, callback) => {
        const name = file.originalname;
        callback(null, name  );
    }
});

module.exports = multer({ storage: storage})
    .fields([{ name: 'server.js', maxCount: 1 },
        { name: 'dist.zip', maxCount: 1 },
        { name: 'mock.zip', maxCount: 1 }]);

