const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const db = require('../models');


router.post('/:userId/products', authenticate, async (req, res) => {
  try {
    // if (req.params.userId !== req.user.id.toString()) {
    //   return res.status(403).send('Unauthorized');
    // }
    const newProduct = await db.Product.create({ ...req.body, UserId: req.user.id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:userId/products', authenticate, async (req, res) => {
  try {
    console.log(`Authenticated user ID: ${req.user.id}`);
    console.log(`Requested user ID: ${req.params.userId}`);

    if (req.params.userId !== req.user.id.toString()) {
      return res.status(403).send('Unauthorized');
    }

    const products = await db.Product.findAll();
    console.log(`Products for user ID ${req.user.id}: ${JSON.stringify(products, null, 2)}`);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Error from products.js: " + error.message);
  }
});


router.put('/:userId/products/:id', authenticate, async (req, res) => {
  try {
    console.log(req.params.id);
    if (req.params.userId !== req.user.id.toString()) {
      return res.status(403).send('Unauthorized');
    }
    const product = await db.Product.findByPk(req.params.id);
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete('/:userId/products/:id', authenticate, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id.toString()) {
      return res.status(403).send('Unauthorized');
    }

    const product = await db.Product.findByPk(req.params.id);
console.log(product.dataValues.id +"  "+req.params.id)
    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.dataValues.id != req.params.id) {
      return res.status(403).send('Unauthorized call');
    }

    await product.destroy();
    res.status(200).send('Product deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
