const fs = require("fs");
require("dotenv").config();

module.exports = {
SESSION_ID: process.env.SESSION_ID || "ZUgE2QJC#h9VEMz2YHlKSnuE2zkksL_swQ2lKBZmH3qnJooRgSJE",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
AUTO_READ_MSG: process.env.AUTO_READ_MSG || "true",
AUTO_READ_CMD: process.env.AUTO_READ_CMD || "false",
ALWAYS_TYPING: process.env.ALWAYS_TYPING || "false",
ALWAYS_RECORDING: process.env.ALWAYS_RECORDING || "true",
};
