const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// GET
router.get('/', controller.get);
router.get('/:id', controller.getOne);

// POST
router.post('/', controller.post);

// PUT
router.put('/', controller.put);

// DELETE
router.delete('/', controller.delete);

// Export
module.exports = router;
