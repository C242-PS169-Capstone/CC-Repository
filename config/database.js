module.exports = {
    HOST: "localhost",
    USER: "root", // Change to your MySQL username
    PASSWORD: "", // Change to your MySQL password
    DB: "hearhere_db", // Change to your MySQL database name
    dialect: "mysql", // Change the dialect to 'mysql'
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };