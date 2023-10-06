const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { PrismaClient } = require('@prisma/client');
const { hashValue } = require('../helpers/hash-value');

const client = new PrismaClient();

// Initialize BasicStrategy for use with Passport
const passportStrategyInit = () => {
  passport.use(new BasicStrategy(
    // verify the given data from the strategy
    async (username, password, done) => {
      // Getting the user
      const user = await client.user.findFirst({
        where: {
          username: username
        }
      });
      if (!user)
        return done('Unauthorized', false);
    
      const hashedPassword = hashValue(password);
      
    if (user.password === hashedPassword)
      return done(null, user);

    return done('Unauthorized', false);
  }));
}

module.exports.passportStrategyInit = passportStrategyInit;