// API Controller
const banModel = require("../../models/BanModel.js");

const getPaginatedBans = async (name, limit, offset) => {
    try {
        return await banModel.searchBan(name, limit, offset);
    } catch (error) {
        console.error("Get Paginated Bans (BanController): " + error.message);
        throw error;
    }
}

const getTable = async (id) => {
    try {
        return await banModel.getTableById(id);
    } catch (error) {
        console.error("Get Table (BanController): " + error.message);
        throw error;
    }
} 

const countBans = async (name = "") => {
    try {
        return await banModel.getNumberOfTable(name);
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

const updateBanStatus = async (status, id) => {
    try {
        return await banModel.updateTableStatus(status, id);
    } catch (error) {
        console.error("Update Ban Status (BanController): " + error.message);
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
    getPaginatedBans, getTable,
    countBans,
    addBan,
    updateBan, updateBanStatus,
    deleteBan,
}