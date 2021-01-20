const http = require('http');
const app = require('./lib/express');
const logger = require('./lib/logs');
const config = require('./config/config-default');
const { initConnection } = require('./lib/mongoose');
let port = process.env.PORT || 8080;
try{
    initConnection();

    const server = http.createServer(app);
    server.listen(port, () => logger.info(`Lisining to Server : ${port}`));
}
catch(error){
    logger.error(`Server Problem - Server will not up : ${error}`);
    res.status(500).json({message:`Server Problem - Server will not up` });
}

