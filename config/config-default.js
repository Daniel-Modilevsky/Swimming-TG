const dotenv =  require('dotenv');
dotenv.config();

// enviroment variable
const config = {
    LOGFILE: process.env.logFile,
    CS: process.env.CS,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    OPTIONS: process.env.options
}


module.exports = config;