const { v4: uuidv4 } = require('uuid');

const getUUID = () => {
    return uuidv4();
}
// Si la aplicacion es muy simple puede parecer esto inesesario pero en una aplicacion compleja con solo modificar este archivo
// modificaremos los miles de archivos que usaban esta dependencia

module.exports = {
    getUUID
}