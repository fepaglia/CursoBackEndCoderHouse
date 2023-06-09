import dotenv from 'dotenv';

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    enviroment: process.env.NODE_ENVIROMENT
}