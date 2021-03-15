const express = require('express');
const router = express.Router();
const appliManagCtrl = require('../controllers/appli-manager');

/**
 * Appel du login
 * Vérification du password
 */
router.get('/initCards', appliManagCtrl.getApplis);

module.exports = router;
