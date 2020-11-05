const jwt = require('jsonwebtoken'); // Crée un token pour gérer l'authentification

// Objet JSON encodé qu'on envoi à un client qui s'est authentifié avec succès

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({error});
  }
};