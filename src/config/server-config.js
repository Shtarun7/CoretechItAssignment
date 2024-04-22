const dotenv = require("dotenv");
dotenv.config();

module.exports={
    PORT:process.env.PORT || 8000,
    MONGO_DB_URI:process.env.MONGO_DB_URI,
    HASH_ROUNDS:10,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    this.ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
}