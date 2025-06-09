const monAnModel = require('../../models/MonAnModel.js');

const getPaginatedMonAns = async (limit, offset) => {
    try {
        return await monAnModel.getDishesJoinGroup(limit, offset);
    } catch (error) {
        console.error("Get Mon Ans (MonAnController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedMonAns
}