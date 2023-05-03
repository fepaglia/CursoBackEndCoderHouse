import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import { transport } from "../config/nodeMailer.config.js";
import __dirname  from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () =>{

//LOCAL
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',       
    }, async (req, username, password, done)=>{
            const { first_name, last_name, email, age } = req.body;
            
        try {
            const user = await userModel.findOne({ email: username });

            if(user) {
                console.log('El usuario ya existe');
                return done(null, false)
            }

            const newUser = {
                first_name, 
                last_name,
                email,
                age,
                password: createHash(password)
            };

            const result = await userModel.create( newUser );
 
            await transport.sendMail({

                from: '3PreEntrega <proyectoCoder@gmail.com>',
                to: newUser.email,
                subject: 'Aviso de registro',
                html: `<div><h1>Bienvenido a la aplicacion  en Contruccion ${first_name}/h1></div>`,
                attachments: []
            });

            return done(null, result);

        } catch (error) {
            return done(`Error al registrar usuario, ${error}`);
        }
    } ));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) =>{
        try {
            const user = await userModel.findOne({ email: username });

            if (!user) {
                return done(null, false);
            };

            if(!isValidPassword(user, password)) return done(null, false);
            return done(null, user);

        } catch (error) {
            return done(`Error al loguear usuario, ${error}`);
        }
    }));
//GITHUB
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.4af316fb966c709f',
        clientSecret: 'c8c3ebba0faccfcbec467f1157a955375efeafa5',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile);

            const user = await userModel.findOne({ email: profile._json.email });

            if(!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '' 
                };

                const result = await userModel.create(newUser);
                done(null, result);

            } else {
                done(null, user);
            }

        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) =>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findById(id);
        done(null,user);
    })

}
export default initializePassport;