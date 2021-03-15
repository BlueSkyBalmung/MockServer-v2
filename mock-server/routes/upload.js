const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const uploadCtrl = require('../controllers/upload');

/**
 * Upload des fichiers permettant le bon fonctionnement du mock :
 * dist.zip qui contient l'application angular qui sera stocké dans le dossier http/login de l'user
 * mock.zip qui contient les jsons du projet
 * server.js qui est le server express du projet et qui contient les appels rest à bouchonnés
 */
router.post('/', multer, auth, uploadCtrl.upload);

module.exports = router;
