
const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../helpers/file-handler');
const { route } = require('.');
const { timeMiddleware } = require('../helpers/time-middleware');
const { PrismaClient } = require('@prisma/client');
const { hashValue } = require('../helpers/hash-value');
const passport = require('passport');

const client = new PrismaClient();

router.get('/', async (req, res) => {
  const manufacturers = await client.manufacturer.findMany();

  if (req.query.format === 'json') {
    const cars = await client.car.findMany();
    // Using the map for manufactures and cars because SQLite doesnt support the include currently
    manufacturers.forEach(manufacturer => manufacturer.cars = cars.filter(car => car.manufacturer_id === manufacturer.id));
    return res.json(manufacturers).send();
  }

  res.render('manufacturers', { 
    title: 'CarAPI - Manufacturers', 
    heading: 'Manufacturers',
    manufacturers: manufacturers
  });

  
  
});

/**
 * @typedef Manufacturer
 * @property {string} name - The name of the manufacturer
 * @property {number} foundingYear - The year the manufacturer was founded
 * @property {string} headquarters - The location of the manufacturer's headquarters
 * @property {number} id - ID
 */

/**
 * Used to create a new manufacturer
 * @route POST /manufacturer
 * @param {string} name - The name of the manufacturer
 * @param {number} foundingYear - The year the manufacturer was founded
 * @param {string} headquarters - The location of the manufacturer's headquarters
 * @return {Manufacturer.model} 200 - The created manufacturer
 * @return {string} 400 - Missing required fields
 */
router.post('/', 
passport.authenticate('basic', {session: false}),
async (req, res) => {
  const newManufacturer = { name, foundingYear, headquarters } = req.body;
  if (!newManufacturer.name || !newManufacturer.foundingYear || !newManufacturer.headquarters)
    return res.status(400).send('Missing required fields');

  const manufacturer = await client.manufacturer.create({
    data: newManufacturer
  });
  res.json(manufacturer).send();
})

/**
 * Returns a single manufacturer by ID if found
 * @route GET /manufacturer/:manufacturerId
 * @param {number} manufacturerId - ID of manufacturer
 * @return {Manufacturer.model} 200 - The found manufacturer
 * @return {string} 404 - Mnaufacturer not found
 */
router.get('/:manufacturerId', async (req, res) => {
  const manufacturer = await client.manufacturer.findUnique({
    where: {
      id: parseInt(req.params.manufacturerId),
    }
  });

  if (!manufacturer)
    return res.status(404).send('Manufacturer not found');

  res.json(manufacturer).send();
});

router.get('/:manufacturerId/car', async (req, res) => {
  const cars = await client.car.findMany({
    where: {
      manufacturer_id: parseInt(req.params.manufacturerId),
    }
  });
  res.json(cars).send();
});

router.post('/:manufacturerId/car', async (req, res) => {
  const manufacturer = await client.manufacturer.findUnique({
    where: {
      id: parseInt(req.params.manufacturerId),
    },
  });

  if (!manufacturer)
    return res.status(404).send('Manufacturer not found');

  const car = { yearBuilt, model, price } = req.body;
  if (!yearBuilt || !model || !price)
    return res.status(400).send('Missing required fields');

  const createdCar = await client.car.create({
    data: {
      ...car,
      manufacturer_id: manufacturer.id
    }
  });

  res.json(createdCar).send();
});

module.exports = router;