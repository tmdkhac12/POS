const monAnModel = require('../../models/MonAnModel.js');

const getPaginatedMonAns = async (name, limit, offset) => {
    try {
        return await monAnModel.searchDishes(name, limit, offset);
    } catch (error) {
        console.error("Get Mon Ans (MonAnController): " + error.message);
        throw error;
    }
}

const addMonAn = async (name, price, categoryId, discountId, image) => {
    try {
        return await monAnModel.insertMonAn(name, price, categoryId, discountId, image);
    } catch (error) {
        console.error("Add Mon An (MonAnController): " + error.message);
        throw error;
    }
}

const updateFull = async (name, price, categoryId, discountId, image, id) => {
    try {
        return await monAnModel.updateMonAn(name, price, categoryId, discountId, image, id);
    } catch (error) {
        console.error("Update Mon An (MonAnController): " + error.message);
        throw error;
    }
}

const updateWithoutImage = async (name, price, categoryId, discountId, id) => {
    try {
        return await monAnModel.updateMonAnWithoutImg(name, price, categoryId, discountId, id);
    } catch (error) {
        console.error("Update Mon An Without Image (MonAnController): " + error.message);
        throw error;
    }
}

const deleteMonAn = async (id) => {
    try {
        return await monAnModel.softDeleteMonAn(id);
    } catch (error) {
        console.error("Delete Mon An (MonAnController): " + error.message);
        throw error;
    }
}

const coutnMonAn = async (name) => {
    try {
        return await monAnModel.getNumberOfDishes(name);
    } catch (error) {
        console.error("Count Mon An (MonAnController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedMonAns,
    coutnMonAn,
    addMonAn,
    updateFull, updateWithoutImage,
    deleteMonAn
}