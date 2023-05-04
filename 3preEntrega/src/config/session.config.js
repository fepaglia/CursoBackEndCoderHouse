import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from './config.js';

//Configuracion sesion:
const sessionExpress = (app) =>{
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true },
        ttl: 3600
       }),
    secret: 'secretCoder',  
    resave: true,
    saveUninitialized: true
}))};

export default sessionExpress;