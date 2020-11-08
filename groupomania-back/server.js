const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet'); // Installation de Helmet qui configure de manière appropriée des en-têtes HTTP liés à la sécurité

const app = express();
const db = require("./models");

// J'APPEL MON FICHIER .ENV QUI CONTIENT LES ID DE CONNEXION A LA BDD
require('dotenv').config()


// UTILISATION DE HELMET
app.use(helmet());


// JE SYNCHRONISE MA BDD
db.sequelize.sync();


// UTILISATION DE CORS
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// FONCTION JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// J'ENREGISTRE LE ROUTEUR POUR TOUTES LES DEMANDES FAITES VERS LES L'API

require("./routes/post.routes")(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app);

// MISE EN PLACE DU PORT ET D'UN ÉCOUTEUR D'ÉVÈNEMENT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});