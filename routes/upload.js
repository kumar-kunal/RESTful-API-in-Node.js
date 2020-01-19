const express = require('express');

const router = express.Router();

const UploadController = require('../controllers/upload');


router.post('/', UploadController.upload_post);


module.exports = router;