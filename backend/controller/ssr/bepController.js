const banModel = require("../../models/BanModel.js");
const nhomModel = require('../../models/NhomModel.js');
const monAnModel = require('../../models/MonAnModel.js')

const getHomePage = async function (req, res) {
    try {
        const bans = await banModel.getAllBans();

        const groups = await nhomModel.getAllNhoms();
        const dishes = [];
        for (const group of groups) {
            dishes.push(await monAnModel.getDishesByGroup(group.ma_nhom));
        }

        const homePageData = {
            bans,
            dishes
        }

        // console.log(bans);
        res.render("bep/index", homePageData);
    } catch (error) {
        console.error("Error in getHomePage: " + error.message);
        res.status(500).send("Lỗi Server");
    }
}

module.exports = {
    getHomePage
};