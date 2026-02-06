const Chef = require('../models/chefModel');

// 1. GET ALL: Show all chefs
const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find(); // .find() means "Get Everything"
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. CREATE: Add a new chef
const createChef = async (req, res) => {
  try {
    const newChef = await Chef.create(req.body); // .create() means "Save New"
    res.status(201).json(newChef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE: Change a chef's details
const updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE: Remove a chef
const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json({ message: 'Chef deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a specific chef by ID
const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id); // Find by the ID number
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export these route can use them
module.exports = {
  getAllChefs,
  createChef,
  updateChef,
  deleteChef,
  getChefById,
};
