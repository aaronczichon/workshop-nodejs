
const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../helpers/file-handler');
const { route } = require('.');
const { timeMiddleware } = require('../helpers/time-middleware');

router.get('/', async (req, res) => {
  const manufacturers = await readFile();
  res.json(manufacturers).send();
});

router.get('/:manufacturerId', async (req, res) => {
  const manufacturers = await readFile();
  const manufacturer = manufacturers.find(item => item.name.toLowerCase().indexOf(req.params.manufacturerId.toLowerCase()) > -1);

  if (!manufacturer)
    return res.status(404).send('Manufacturer not found');

  res.json(manufacturer).send();
});

router.get('/:manufacturerId/car', async (req, res) => {
  const manufacturers = await readFile();
  const item = manufacturers.find(item => item.name.toLowerCase() === req.params.manufacturerId.toLowerCase());
  const cars = item ? item.cars : [];
  res.json(cars).send();
});

router.post('/', async (req, res) => {
  const manufacturers = await readFile();

  manufacturers.push(req.body);
  await writeFile(manufacturers);

  res.json(req.body).send();
});

router.post('/:manufacturerId/car', async (req, res) => {
  const manufacturers = await readFile();
  const manufacturer = manufacturers.find(item => item.name.toLowerCase() === req.params.manufacturerId.toLowerCase());
  
  if (!manufacturer)
    return res.status(404).send('Manufacturer not found');

  const { yearBuilt, model, price } = req.body;
  if (!yearBuilt || !model || !price)
    return res.status(400).send('Missing required fields');

  manufacturers.find(m => m.name === manufacturer.name).cars.push({
    model,
    price,
    yearBuilt
  });
  await writeFile(manufacturers);

  res.json(req.body).send();
});

module.exports = router;