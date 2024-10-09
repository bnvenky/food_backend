const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant.menu', required: true },
    quantity: { type: Number, required: true },
  }],
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  deliveryAddress: { type: String, required: true },
  estimatedDeliveryTime: { type: Date },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
