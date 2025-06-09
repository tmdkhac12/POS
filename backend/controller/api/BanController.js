// API Controller
const banModel = require("../../models/BanModel.js");

const getPaginatedBans = async (limit, offset) => {
    try {
        return await banModel.getBans(limit, offset);
    } catch (error) {
        console.error("Get Bans (BanController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedBans
}