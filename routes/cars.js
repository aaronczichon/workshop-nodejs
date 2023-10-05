
const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../helpers/file-handler');

router.get('/', async (req, res) => {
  const manufacturers = await readFile();
  const cars = manufacturers.map(manufacturer => manufacturer.cars).flat();

  res.json(cars).send();
});

router.get('/:carId', async (req, res) => {
  const manfacturers = await readFile();
  // [[{...car}, {...car2}], [{...car3}, {...car4}]]
  const mergedData = manfacturers.map(manufacturer => manufacturer.cars);
  // [{...car}, {...car2}, {...car3}, {...car4}]
  const flattedData = mergedData.flat();

  const car = flattedData.find(item => item.model.toLowerCase() === req.params.carId.toLowerCase());
  res.json(car).send();
});

router.put('/:carId', async (req, res) => {
  const manufacturers = await readFile();
  // Merge all cars into one list
  const allCars = manufacturers.map(item => item.cars).flat();

  // Search for the car we want to update
  const car = allCars.find(item => item.model.toLowerCase() === req.params.carId.toLowerCase());
  // If not found, throw a 404 error
  if(!car) {
    return res.status(404).send('Car not found');
  }

  // Update the car object with the updated parameters
  const updatedCar = {
    ...car,
    ...req.body
  }

  // Search and update the car in the manufacturers list
  for (let i = 0; i < manufacturers.length; i++) {
    for (let k = 0; k < manufacturers[i].cars.length; k++) {
      if (manufacturers[i].cars[k].model.toLowerCase() === req.params.carId.toLowerCase()) {
        manufacturers[i].cars[k] = {
          ...updatedCar
        };
      }
    }
  }

  // Write the updated manufacturers list into the file
  await writeFile(manufacturers);

  // Return the updated car
  res.json(updatedCar).send();
});

module.exports = router;