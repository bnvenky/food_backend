const express = require('express');
const { createRestaurant, updateRestaurant, addMenuItem, updateMenuItem } = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createRestaurant);
router.put('/:restaurantId',  updateRestaurant);
router.post('/:restaurantId/menu',  addMenuItem);
router.put('/:restaurantId/menu/:itemId', updateMenuItem);

module.exports = router;
