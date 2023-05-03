import mongoProductsDao from './dbProductManager.dao.js';
import mongoCartsDao from './dbCartManager.dao.js';
import mongoUsersDao from './dbUsersManager.dao.js';
import mongoTicketDao from './dbTicketManager.dao.js';
import mongoChatDao from './dbChatManager.dao.js';

//Importamos el config
import config from '../config/config.js';

const MongoProductsDao = new mongoProductsDao();
const MongoCartsDao = new mongoCartsDao();
const MongoUsersDao = new mongoUsersDao();
const MongoTicketDao = new mongoTicketDao();
const MongoChatDao = new mongoChatDao();

console.log(config.persistence)
export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryToysDao : MongoProductsDao;
export const CARTSDAO = config.persistence === 'MEMORY' ? MemoryUsersDao : MongoCartsDao;
export const USERSDAO = config.persistence === 'MEMORY' ? MemoryUsersDao : MongoUsersDao;
export const TICKETDAO = config.persistence === 'MEMORY' ? MemoryTicketDao : MongoTicketDao;
export const CHATDAO = config.persistence === 'MEMORY' ? MemoryChatDao : MongoChatDao;
//Falta agregar persistencia en memoria