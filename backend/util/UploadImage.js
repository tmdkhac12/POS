const path = require('path');
const multer = require('multer');

const phanLoaiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./frontend/images/group");
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname); //.jpg
        const fileName = path.basename(file.originalname, extension); // ramen
        const date = Date.now();

        cb(null, `${fileName}_${date}${extension}`);
    }
})

const monAnStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./frontend/images/dishes");
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname); //.jpg
        const fileName = path.basename(file.originalname, extension); // ramen
        const date = Date.now();

        cb(null, `${fileName}_${date}${extension}`);
    }
})

const uploadPhanLoai = multer({ storage: phanLoaiStorage });
const uploadMonAn = multer({ storage: monAnStorage });

module.exports = {
    uploadPhanLoai,
    uploadMonAn
}