const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ZUgE2QJC#h9VEMz2YHlKSnuE2zkksL_swQ2lKBZmH3qnJooRgSJE",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
ALWAYS_ONLINE: process.env.ADDRESSES === undefined ? 'true' : process.env.ADDRESSES,
AUTO_TYPING: process.env.AUTO_TYPING === undefined ? 'false' : process.env.AUTO_TYPING,
AUTO_RECORDING: process.env.AUTO_RECORDING === undefined ? 'true' : process.env.AUTO_RECORDING,
};
