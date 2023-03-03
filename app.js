const path = require("path");
const express = require("express");
const { auth, requiresAuth } = require('express-openid-connect');

require("dotenv").config();

const app = express();

app.enable('trust proxy');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    idpLogout: true,
    issuerBaseURL: "https://id-sandbox.cashtoken.africa",
    baseURL: "http://localhost:3000",
    clientID: 'wprQYMZBqqx-dgszFUfQG',
    clientSecret: process.env.SECRET,
    authorizationParams: { 
        response_type: 'code', // This requires you to provide a client secret
        audience: 'https://id-sandbox.cashtoken.africa',
        client_id: 'wprQYMZBqqx-dgszFUfQG',
        scope: 'openid profile email',
      },
  })
);

/* app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
); */

app.get("/", (req,res)=> {
    /* res.send(req.oidc.isAuthenticated() ? 'Logged in': 'Logged out'); */

    if(req.oidc.isAuthenticated()) {
        res.render('index', { title: 'Express', user: req.oidc.user})
    } else {
        res.render('login', { title: 'Express' })
    }
});

/* app.get('/callback', (req, res) =>
  res.send("Hi")
);

app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
res.send("Hi")
); */


app.get("/profile", requiresAuth(), (req,res) => {
    res.render('profile', { user: req.oidc.user })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App running on PORT ${PORT}`));