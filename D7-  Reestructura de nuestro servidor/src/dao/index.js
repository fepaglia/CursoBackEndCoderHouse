import mongoProductsDao from './dbProductManager.dao.js';
import mongoCartsDao from './dbCartManager.dao.js';
import mongoUsersDao from './dbUsersManager.dao.js';

//Importamos el config
import config from '../config/config.js';

const MongoProductsDao = new mongoProductsDao();
const MongoCartsDao = new mongoCartsDao();
const MongoUsersDao = new mongoUsersDao();

console.log(config.persistence)
export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryToysDao : MongoProductsDao;
export const CARTSDAO = config.persistence === 'MEMORY' ? MemoryUsersDao : MongoCartsDao;
export const USERSDAO = config.persistence === 'MEMORY' ? MemoryUsersDao : MongoUsersDao;


//Falta agregar persistencia en memoria