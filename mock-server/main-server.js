// CONFIG EXPRESS
const bodyParser = require('body-parser');
// IMPORT des utils
const tools = require('./utils/tools.js');
const app = require('./utils/serveur-express.js');
const constants = require('./utils/const');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const appliManagRoutes = require('./routes/appli-manager');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
// Permet de faire du cross domain -> le temps de dev
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Expose-Headers','Content-Length,Content-Range');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});


/**
 * Chargement initial
 */
tools.initLoad(constants.localisationMockedApp, app);

// Routes pour l'authentification
app.use(constants.mainApi + constants.authent, authRoutes);
// Routes pour l'upload d'un projet
app.use(constants.mainApi + constants.uploadAPI, uploadRoutes);
// Routes pour l'upload d'un projet
app.use(constants.mainApi + constants.appliManager, appliManagRoutes);

// LAUNCH SERVER
app.listen(constants.port, () => {
});

