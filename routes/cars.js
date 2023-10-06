
const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../helpers/file-handler');
const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

router.get('/', async (req, res) => {
  const cars = await client.car.findMany();

  res.json(cars).send();
});

router.get('/:carId', async (req, res) => {
  const car = await client.car.findUnique({
    where: {
      id: parseInt(req.params.carId),
    }
  });

  if (!car)
  return res.status(404).send('Car not found');

  res.json(car).send();
});

router.put('/:carId', async (req, res) => {
  let car = await client.car.findUnique({
    where: {
      id: parseInt(req.params.carId),
    }
  });

  if (!car)
    return res.status(404).send('Car not found');

  const update = { model, price, yearBuilt } = req.body;
  car = {
    ...update
  }

  // Update the car object with the updated parameters
  const updatedCar = await client.car.update({
    where: {
      id: parseInt(req.params.carId),
    },
    data: car,
  });
  
  // Return the updated car
  res.json(updatedCar).send();
});

module.exports = router;