const mongoose = require('mongoose');

// async function to connect to mongodb
const connectToDB = async() => {
    try {
        // connecting to mongo db at localhost and using our database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully.")
    } catch (error) {
        console.log("Error: Unable to connect DB", error.message);
    }
}
// exporting the function 
module.exports = connectToDB;