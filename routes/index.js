const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;

