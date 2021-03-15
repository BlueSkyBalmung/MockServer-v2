const app = require('../utils/serveur-express');
const tools = require('../utils/tools');
const constants = require('../utils/const');

/**
 * Permet de redemarrer une api en fonction du nom du server (login de la personne et nom du folder)
 * @param serverName
 * @param res
 */
startApi = (serverName, res) => {
    //Récupère le fichier grace au nom du server (login)
    let serverFile = tools.findFile(serverName);
    console.log('Start api ' + serverName);
    /**
     * Si le serveur est déjà lancé
     * Suppression du cache
     * Suppression des api du server dans express
     */
    if (serverFile) {
        // Supprime du cache les fichiers json du projet
        tools.deleteCache(serverName);
        delete require.cache[require.resolve(serverFile.replace('app-mocked', '../app-mocked'))];
        tools.suppress(serverFile, app._router.stack);
    } else {
        /**
         * Si le fichier n'existe pas encore, récupère le fichier manuellement
         */
        serverFile = constants.localisationMockedApp.replace('*', '') + serverName + '/server.js';
    }

    // Lance le nouveau fichier
    const returnOfFileLoad = tools.runFile(serverFile, app);

    //Si le lancement ne fonctionne pas alors retourne une erreur
    if (!returnOfFileLoad) {
        throw Error('Erreur dans l\'api,  redemarrage arreté');
    }

};

/**
 * Upload des fichiers permettant le bon fonctionnement du mock :
 * dist.zip qui contient l'application angular qui sera stocké dans le dossier http/login de l'user
 * mock.zip qui contient les jsons du projet
 * server.js qui est le server express du projet et qui contient les appels rest à bouchonnés
 */
exports.upload = (req, res) => {
    // Définition du path
    const path = constants.localisationMockedApp.replace('*', '') + req.body.login;
    console.log('Upload pour : ' + req.body.login + ' ....');

    /**
     * Archive d'abord les précedents fichiers pour faciliter un rollback dans l'e cas d'une erreur
     * Supprime les anciens fichiers pour les remplacer par les nouveaux issuent du folder /tmp
     *  Extrait le dist dans le repertoire qui convient dans http
     *  Extrait ensuite le mock.zip
     *  Enfin relance de l'api
     */
    let firstInstall = tools.moveNewFileToRoot(path);
    tools.extractFolderMock(path + '/mock.zip', path + '/mock')
        .then(() => {
            tools.moveDistToServerHttp(path + '/dist.zip', req.body.login);
            startApi(req.body.login, res);
            res.status(200).jsonp('Api restarted');
        }).catch((err) => {
            console.log('ERREUR : un rollback va être effectué!');
            console.log(err.message);
            tools.rollbackUpload(req.body.login, path);
            if (!firstInstall) {
                startApi(req.body.login, res);
            }
            res.status(500).jsonp(err.message);
        }).finally(() => tools.deleteSave(req.body.login, path));
};
