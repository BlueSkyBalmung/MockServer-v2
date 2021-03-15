//TAB INSTANCES SERVER
const instanceSrv = [];
const mapInstanceWithEndpoint = new Map();
const fixDirectoryFile = './../';
// CONFIG FILE & IMPORT
const glob = require("glob");
const fs = require('fs');
const fse = require('fs-extra');
const unzipper = require('unzipper');

/**
 * Permet de supprimer les routes pour une base d'api rest donnée :
 *  /nom_appli/wsrest/* (trouvée à l'aide de la map
 * @param serverFile
 * @param expressRouter
 */
const suppress = function suppressRoutesForEndpoint(serverFile,expressRouter) {
    console.log('Info : les routes de l\'api vont être supprimées ...');
    expressRouter.filter (route => route.route &&
        route.route['path'].includes(mapInstanceWithEndpoint.get(serverFile).toString()))
        .forEach( routeTemp => {
            console.log('Delete : ' + routeTemp.route['path']);
            expressRouter.splice(expressRouter.indexOf(routeTemp), 1);
        });
};
/**
 * Permet d'ajouter un fichier server.js au main server seulement si celui ci est valide
 * Sinon je lance une erreur
 * @param jsFile
 * @param express
 */
const runFile = function runJsFileServer(jsFile, express) {
    try {
        const instanceOfJsFile = require( fixDirectoryFile + jsFile);
        instanceOfJsFile.startApi(express);
        instanceSrv.push(jsFile);
        mapInstanceWithEndpoint.set(jsFile,instanceOfJsFile.baseEndpoint);
        console.log('Chargement réussi ...\n');
        return true;
    } catch (err) {
        console.error('Erreur : fichier  ' + jsFile);
        console.log('Chargement échoué ... \n');
        return false;
    }
};
/**
 * Initialise le server en chargeant tous les server js valides
 * @param localisationMockedApp
 * @param express
 */
const initLoad = function(localisationMockedApp, express) {
    console.log('Init du serveur le ' + new Date());
    console.log('Detection des fichiers.. \n');
    glob(localisationMockedApp  + "/server.js", {}, function (er, files) {
        files.forEach(file => {
            console.log('Chargement du fichier : ' + file);
            runFile(file, express);
        });
    });
};
/**
 * Permet de retrouver un file depuis le nom du server/projet
 * @param servername
 * @returns {*}
 */
const findFile = function (servername) {
    return instanceSrv.find(server => server.includes(servername));
};

/**
 * Fonction pour deplacer le dist:
 * Cela supprime l'ancien dossier pour en recreer un nouveau
 * @param fileSrc
 * @param login
 */
const moveDistToServerHttp =  function (fileSrc, login) {
    const pathHttpServer = './../http/' + login;
    /**
     * Je vérifie que le fichier source existe
     * je supprime si il existe le dossier du projet dans le dossier http et je le recrée afin d'eviter de potentiels conflits
     * Je crée ensuite un stream me permettant d'extraire le zip
     * Si je vois qu'a la fin du dezippage j'ai un dossier /dist (qui vient du zip original)
     * Alors je copie les fichiers vers le dossier parent pour enfin supprimer le dossier dist
    * Cela a pour but d'aider la MO IHM lors de la création des "cards" d'accès au teleservice
     * (le lien -> http/DCA au lieu de http/DCA/dist )
     */
    if (fs.existsSync(fileSrc)) {
        if (fs.existsSync(pathHttpServer)){
            fse.moveSync(pathHttpServer, pathHttpServer + 'archive');
        }
        fse.mkdirpSync(pathHttpServer, {recursive: true});

        fs.createReadStream(fileSrc)
            .pipe(unzipper.Extract({ path:pathHttpServer })).on('close', close => {
                try {
                    if (fse.pathExistsSync(pathHttpServer + '/dist')) {
                        fse.copySync(pathHttpServer + '/dist/', pathHttpServer +'/');
                        fse.removeSync(pathHttpServer + '/dist/');
                        fse.removeSync(fileSrc);
                    }
                } catch (err) {
                    throw err;
                }
            });

    }  else {
        throw Error('Error: Pas de dist présent');
    }
};

/**
 * Permet de deplacer les fichiers stockés dans le dossier root
 * @param pathSrc
 */
const moveNewFileToRoot =  function(pathSrc) {
    let firstInstall = true;
    //Sauvegarde les anciens fichiers s'ils étaient déjà présents
    if (fse.pathExistsSync(pathSrc + '/mock') || fse.pathExistsSync(pathSrc + '/server.js')) {
        fse.moveSync(pathSrc + '/mock', pathSrc + '/archive/mock');
        fse.moveSync(pathSrc + '/server.js', pathSrc + '/archive/server.js');
        firstInstall = false;
    }
    fse.copySync(pathSrc +'/tmp', pathSrc + '/');
    fse.removeSync(pathSrc + '/tmp/dist.zip');
    fse.removeSync(pathSrc + '/tmp/mock.zip');
    fse.removeSync(pathSrc + '/tmp/server.js');
    return firstInstall;
};

/**
 * Permet d'extraire un zip
 * @param fileSrc
 * @param fileDest
 */
const extractFolderMock = function (fileSrc, fileDest) {
    /**
     * Si le fichier est présent alors
     * Je supprime le fichier de destination et je le récrée pour eviter des conflits
     * Je crée ensuite le stream permettant l'extraction et idem quepour le traitement du dist
     * Si un dossier /mock est present à la racine du zip je déplace les fichiers vers le dossiers parents
     * pour eviter d'eventuels conflits dans les server.js des équipes
     * Exemple -> mock/test.json au lieu mock/mock.json qui necessiterai une correction par l'utilisateur
     */
    return new Promise((resolve) =>{
        if (fs.existsSync(fileSrc)) {
            fse.removeSync(fileDest);
            fse.mkdirpSync(fileDest, {recursive: true});
            fs.createReadStream(fileSrc)
                .pipe(unzipper.Extract({path: fileDest})).on('close', close => {
                fse.removeSync(fileSrc);
                try {
                    if (fse.pathExistsSync(fileDest + '/mock/')) {
                        fse.copySync(fileDest + '/mock/', fileDest +'/');
                        fse.removeSync(fileDest + '/mock/');
                        fse.removeSync(fileSrc);
                    }
                    resolve();
                } catch (err) {
                    throw err;
                }
            });
        } else {
            throw new Error('Le fichier mock.zip n\'existe pas');
        }
    })
};

/**
 * Supprimer du cache tous les fichiers json d'un projet
 * @param projet
 */
const deleteCache = function(projet) {
    Object.keys(require.cache).forEach(function(key) {
        if (key.includes('.json') && key.includes(projet)) {
            console.log(key);
            delete require.cache[key]
        }
    });
};

/**
 * Faire un rollback du projet, remplace le fichier server.js et les répertoires dist et mock
 * par la version précédente de la mise à jour
 * @param login
 * @param pathProjet
 */
const rollbackUpload = function(login, pathProjet) {
    // Rollback du dist
    const pathHttpServer = './../http/' + login;
    // Suppresion du nouveau dist
    fse.removeSync(pathHttpServer);
    // Si l'archive existe on remet le dist précédent
    if (fs.existsSync(pathHttpServer + 'archive')) {
        fse.moveSync(pathHttpServer + 'archive', pathHttpServer);
    }

    // Rollback du Mock et server.js
    // Suppression du nouveau Mock et server.js
    fse.removeSync(pathProjet + '/mock');
    fse.removeSync(pathProjet + '/server.js');
    // Si l'archive existe on remet le mock et server.js précédent
    if (fs.existsSync(pathProjet + '/archive')){
        fse.copySync(pathProjet + '/archive', pathProjet + '/');
    }
};

/**
 * Supprimer la sauvegarde des données précédentes
 * @param login
 * @param pathProjet
 */
const deleteSave = function(login, pathProjet) {
    const pathHttpServerArchive = './../http/' + login + 'archive';
    fse.removeSync(pathHttpServerArchive);
    fse.removeSync(pathProjet + '/archive');
};

/**
 * Permet d'exporter le module
 */
module.exports = {
    suppress, runFile, findFile, initLoad,
    moveDistToServerHttp,
    extractFolderMock, moveNewFileToRoot,
    deleteCache, rollbackUpload, deleteSave
};


