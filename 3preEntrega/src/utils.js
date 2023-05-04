import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => {return bcrypt.hashSync(password, bcrypt.genSaltSync())};
export const isValidPassword = (user, password) => {return bcrypt.compareSync(password, user.password)};

export const authorization = (role) => {
    async (req, res, next) => {
      if (req.user.role !== role)
        return res.status(403)
          .send({ status: "error", message: "You don't have permissions" });
      next();
    };
};

export const isAdmin = (email, password) => {
  email === config.admin_email && password === config.admin_password;
}


export default __dirname;