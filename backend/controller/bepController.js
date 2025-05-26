const banModel = require("../models/BanModel");

const getHomePage = async function (req, res) {
    const bans = await banModel.getAllBans();

    const homePageData = {
        bans
    }

    // console.log(bans);
    res.render("bep/index", homePageData);
}

module.exports = {
    getHomePage 
};