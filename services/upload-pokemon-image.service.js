const multer = require('multer');
const fs = require('fs');
const path = require('path');
const documentDir = path.join(__dirname.replace('services', ''), 'public/files');

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    cb(null, true);
};

async function readFileFromRequest(req) {
    let promiseFunction = async (resolve, reject) => {
        let path = `${documentDir}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        let upload = multer({ dest: path, preservePath: true, fileFilter: imageFilter, storage: imageStorage }).any();
        upload(req, resolve, (err) => {
            if (err) {
                reject({ success: false, message: 'Unable to upload file(s)!', error: err });
            } else if (req.files && req.files[0] && req.files[0].path) {
                let fileDetails = req.files[0];
                let body = req.body;
                resolve({ success: true, data: { fileDetails: fileDetails, body: body } });
            } else if ((!req.files || !req.files[0] || !req.files[0].path) && req.body) {
                let fileDetails = [];
                let body = req.body;
                resolve({ success: true, data: { fileDetails: fileDetails, body: body } });
            } else {
                reject({ success: false, message: 'Unable to upload document(s)! No document(s) found!' });
            }
        });
    };
    return new Promise(promiseFunction);
}

module.exports = { imageStorage: imageStorage, imageFilter: imageFilter, readFileFromRequest: readFileFromRequest };