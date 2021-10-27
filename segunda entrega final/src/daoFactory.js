const FileSystemDao = require("./daos/FileSystemDao.js");
const MySqlLocalDao = require("./daos/MySqlLocalDao");
const MySqlDBaasDao = require("./daos/MySqlDBaasDao");
const SQLite3Dao = require("./daos/SQLite3Dao.js");
const MongoDbLocalDao = require("./daos/MongoDbLocalDao.js");
const MongoDBaasDao = require("./daos/MongoDBaasDao");
const FirebaseDao = require("./daos/FirebaseDao.js");


class DaoFactory{
  constructor(){
    this.opcion = 0
  }
  getDao(opcion){
    switch (opcion) {
      case 1:
        return FileSystemDao;
        break;
      case 2:
        return MySqlLocalDao;
        break;
      case 3:
        return MySqlDBaasDao;
        break;
      case 4:
        return SQLite3Dao;
        break;
      case 5:
        return MongoDbLocalDao;
        break;
      case 6:
        return MongoDBaasDao;
        break;
      case 7:
        return FirebaseDao;
        break;
      default:
        throw new Error("DAO no encontrado");
    }
  }
}

module.exports = new DaoFactory()