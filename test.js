import express from "express";
import Provider from 'oidc-provider';

const oidc = new Provider('http://localhost:3000');
const app = express();

app.use('/oidc', oidc.callback());


app.listen(3000);

