const express = require('express');
const router = express.Router();

// Import the Controller
const {
  getAllChefs,
  createChef,
  getChefById,
  updateChef,
  deleteChef,
} = require('../controllers/chefController');

// 1. If user goes to GET /chefs -> Ask Chef to getAllChefs
router.get('/chefs', getAllChefs);
// 2. If user sends POST /chefs -> Ask Chef to createChef
router.post('/chefs', createChef);
// 3. If user goes to GET /chefs/:id -> Ask Chef to getChefById
router.get('/chefs/:id', getChefById);
// 4. If user sends PUT /chefs/:id -> Ask Chef to updateChef
router.put('/chefs/:id', updateChef);
// 5. If user sends DELETE /chefs/:id -> Ask Chef to deleteChef
router.delete('/chefs/:id', deleteChef);
module.exports = router;
