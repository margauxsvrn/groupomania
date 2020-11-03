// J'APPEL MON FICHIER .ENV QUI CONTIENT LES ID DE CONNEXION A LA BDD
require('dotenv').config()

// JE CONNECTE MA BDD
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./post.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;