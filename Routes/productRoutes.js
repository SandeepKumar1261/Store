const express = require('express');
const router = express.Router();
const {addProduct, deleteProduct} = require('../Controllers/productController');

router.post('/addProduct',addProduct);
router.delete('/deleteProduct/:id',deleteProduct);


module.exports = router;
