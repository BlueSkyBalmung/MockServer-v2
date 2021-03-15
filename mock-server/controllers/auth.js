const fs = require('fs');
const crypto = require('crypto');

const constants = require('../utils/const');

/**
 * Permet la création du fichier pwd
 * Le mot de passe transmis par l'utilisateur est hashé puis stocké dans un fichier txt
 * @param user
 * @param path
 */
createPwdFile = (user, path) => {
    const pwdCrypt = crypto.createHash('sha256').update(user.password).digest('hex');
    const nameFile = path + '/' + user.login + '-cfg.txt';
    fs.writeFileSync(nameFile, pwdCrypt, 'utf-8');
};


/**
 * Permet d'initier un repo pour le projet:
 *  - crée le dossier du login
 *  - crée un dossier /tmp pour les futurs upload
 *  - crée également le fichier contenant le mot de passe
 * @param user
 * @param basePath
 */
createRepo = (user, basePath) => {
    try {
        const path = basePath.replace('*', '')  + user.login;
        fs.mkdirSync(path);
        console.log(path + ' fait.');
        createPwdFile(user, path);
        console.log("fichier pwd fait.");
        fs.mkdirSync(path + '/tmp');
        console.log('Dossier temporaire fait.');
    } catch (err) {
        switch (err.code) {
            case 'EEXIST':
                throw  new Error('Ce répertoire existe déjà : ' + user.login);
            case 'ENOENT':
                throw new Error(`Accès refusé`);
            default:
                throw err;
        }
    }
    console.log('Initialisation du repo : Ok...');
};


/**
 * Enregistrement nouvel utilisateur
 * Init du repo
 */
exports.signup = (req, res) => {
    const user = req.body;
    console.log('Init de repo en cours ...');
    /**
     * Si le user est bien renseigné, initialisation du repo sinon non
     */
    if (user.login && user.password) {
        try {
            createRepo(user, constants.localisationMockedApp);
            res.status(200).jsonp('ok');
        } catch (err) {
            console.log('Init de repo échouée ...');
            console.log(err.message);
            res.status(500).jsonp(err.message);
        }
    } else {
        console.log('Init de repo échouée ...');
        res.status(500).send('Erreur, la requête est incorrecte');
    }
};

/**
 * Appel du login
 * Vérification du password
 */
exports.login = (req, res) => {
    const dbConnect = require('../db/db-connection.json');
    res.status(200).jsonp(dbConnect.connectionSuccess);
};
