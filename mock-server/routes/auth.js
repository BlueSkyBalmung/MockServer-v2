const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authCtrl = require('../controllers/auth');

/**
 * Enregistrement nouvel utilisateur
 * Init du repo
 */
router.post('/signup', authCtrl.signup);

/**
 * Appel du login
 * Vérification du password
 */
router.post('/login', auth, authCtrl.login);

module.exports = router;
