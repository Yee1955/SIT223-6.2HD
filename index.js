var express = require('express');
const { auth } = require('express-openid-connect');
require('dotenv').config();
var app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET,
};

app.use(express.json());    // Middleware to parse JSON request bodies
app.use(auth(config));
app.use('/api/art', require('./Controller/ArtController'));
app.use('/api/art-gallery', require('./Controller/ArtGalleryController'));
app.use('/api/artist', require('./Controller/ArtistController'));

// ----------- Generate Model ----------
// // Resource: https://github.com/sequelize/sequelize-auto?tab=readme-ov-file
// // Resource: https://sequelize.org/docs/v6/getting-started/
// const SequelizeAuto = require('sequelize-auto');
// const options = {caseFile: 'p', caseModel: 'p', caseProp: 'c' };

// const auto = new SequelizeAuto(sequelize, null, null, options);
// auto.run()

app.use((req, res, next) => {
    console.log('Session:', req.session);
    console.log('OIDC Context:', req.oidc);
    next();
});

app.get('/', (req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
});

app.get('/profile', (req, res) => {
    res.send(req.oidc.user ? req.oidc.user : 'No user info');
});

app.get('*', function(req, res){
    res.send('This is an invalid URL.');
});

app.listen(3000, function() {
    console.log('Listening on http://localhost:3000');
});