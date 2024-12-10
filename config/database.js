module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER, // Change to your MySQL username
    PASSWORD: process.env.DB_PASS, // Change to your MySQL password
    DB: process.env.DB_NAME, // Change to your MySQL database name
    dialect: "mysql", // Change the dialect to 'mysql'
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };