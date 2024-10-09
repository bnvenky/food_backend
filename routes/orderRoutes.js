const express = require('express');
const { placeOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',  placeOrder);
router.get('/',  getUserOrders);
router.put('/:orderId',  updateOrderStatus);

module.exports = router;
