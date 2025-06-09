const banModel = require("../../models/BanModel");

const getHomePage = async function (req, res) {
    try {
        const bans = await banModel.getAllBans();
    
        const homePageData = {
            bans
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