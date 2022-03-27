const multer = require('multer');

const uploadImage = multer({
	storage: multer.memoryStorage(),
}).single('image');

module.exports = uploadImage;
