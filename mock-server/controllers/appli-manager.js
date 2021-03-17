const glob = require("glob");
const fs = require('fs');
const constants = require('../utils/const');

/**
 * Récupére la liste des applis
 */
exports.getApplis = (req, res) => {
    const listApplisInfos = [];
    console.log('Récupération infos applis ...');
    glob(constants.localisationMockedApp  + "/*.json", {}, function (er, files) {
        files.forEach(file => {
            let fichier = fs.readFileSync(file);
            let appliInfos = JSON.parse(fichier);
            listApplisInfos.push(appliInfos);
         });
        res.status(200).jsonp(listApplisInfos);
    });
};

exports.updateInfos = (req, res) => {
    const infosFile = constants.localisationMockedApp.replace('*', '') + req.body.name + '/' + req.body.name + '.json';
    let donnees = JSON.stringify(req.body);
    fs.writeFileSync(infosFile, donnees);
    res.status(200);
};
