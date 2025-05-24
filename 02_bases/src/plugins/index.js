const { getAge } = require("./get-age.plugin");
const { getUUID } = require("./get-id.plugin");
const { http } = require("./http-client.plugin");
// Como es una exportacion por defecto no usamos llave
const buildLogger = require('../plugins/logger.plugin');

module.exports = {
    getAge,
    getUUID,
    http,
    buildLogger
}
