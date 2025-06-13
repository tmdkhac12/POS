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

const countBans = async () => {
    try {
        return await banModel.getNumberOfTable();
    } catch (error) {
        console.error("Count Bans (BanController): " + error.message);
        throw error;
    }
}

const addBan = async (name) => {
    try {
        return await banModel.insertTable(name);
    } catch (error) {
        console.error("Add Ban (BanController): " + error.message);
        throw error;   
    }
}

const updateBan = async (name, id) => {
    try {
        return await banModel.updateTable(name, id);
    } catch (error) {
        console.error("Update Ban (BanController): " + error.message);
        throw error;
    }
}

const deleteBan = async (id) => {
    try {
        return await banModel.softDeleteBan(id);
    } catch (error) {
        console.error("Delete Ban (BanController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedBans,
    countBans,
    addBan,
    updateBan,
    deleteBan
}