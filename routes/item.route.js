const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.post('/add', itemController.addNewItem);

router.get("/getAllItems", itemController.getAllItems);

router.get("/getMySellingItems/:id", itemController.getMySellingItems);


module.exports = router;