const express = require('express'); 
const router = express.Router(); 
const groceriesController = require("../controllers/groceriesController");
router.use(express.json());

router.get('/groceries',groceriesController.groceries_get)
router.post('/groceries',groceriesController.groceries_post)
router.put('/groceries/:id',groceriesController.groceries_put)
router.delete('/groceries/:id',groceriesController.groceries_delete)
router.delete('/groceries',groceriesController.groceries_deleteAll)

module.exports = router;