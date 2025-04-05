const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ZUgE2QJC#h9VEMz2YHlKSnuE2zkksL_swQ2lKBZmH3qnJooRgSJE",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
ALWAYS_OFFLINE: process.env.ALWAYS_OFFLINE || "true",
ALWAYS_TYPING: process.env.ALWAYS_TYPING || "false",
ALWAYS_RECORDING: process.env.ALWAYS_RECORDING || "true",
};
