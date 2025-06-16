function parseRank(rank) {
    if (rank === "copper") 
        return "Đồng";
    else if (rank === "silver")
        return "Bạc";
    else if (rank === "gold")
        return "Vàng";
    else if (rank === "diamond")
        return "Kim Cương";
    else 
        return "Đồng";
}

module.exports = {
    parseRank
}