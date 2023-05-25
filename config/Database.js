const mongoose = require("mongoose");
const dbConnection = () => {
  // Connect to database
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`database conncted : ${conn.connection.host}`);
  });
};

module.exports = dbConnection;
