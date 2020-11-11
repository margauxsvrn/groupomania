// Vérifie la Session Storage pour l'élément user
// S'il y a un utilisateur connecté avec accessToken (JWT), renvoie l'en-tête d'autorisation HTTP.
// Sinon, on retourne un object vite

export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('margaux_oc'));
  
    if (user && user.accessToken) {
      return {  'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

