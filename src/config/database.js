const mongoose = require("mongoose");
const db ="mongodb+srv://papato:yUbWXlysZOhHqM1b@test-dash.jkejpiw.mongodb.net/erp?retryWrites=true&w=majority";
exports.connect = () => {
    // Connecting to the database
    mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};
