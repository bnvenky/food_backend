const Restaurant = require('../models/restaurantModel');

// Create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, location } = req.body;

    const restaurant = new Restaurant({ name, location });
    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a restaurant's details
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (restaurant) {
      restaurant.name = req.body.name || restaurant.name;
      restaurant.location = req.body.location || restaurant.location;

      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new menu item to a restaurant
const addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (restaurant) {
      const { name, description, price, availability } = req.body;
      restaurant.menu.push({ name, description, price, availability });
      await restaurant.save();
      res.status(201).json(restaurant.menu);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (restaurant) {
      const menuItem = restaurant.menu.id(req.params.itemId);
      if (menuItem) {
        menuItem.name = req.body.name || menuItem.name;
        menuItem.description = req.body.description || menuItem.description;
        menuItem.price = req.body.price || menuItem.price;
        menuItem.availability = req.body.availability || menuItem.availability;
        await restaurant.save();
        res.json(menuItem);
      } else {
        res.status(404).json({ message: 'Menu item not found' });
      }
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRestaurant, updateRestaurant, addMenuItem, updateMenuItem };
