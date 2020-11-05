const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./models");

// JE SYNCHRONISE MA BDD
db.sequelize.sync();

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