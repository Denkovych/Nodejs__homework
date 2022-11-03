const app = require("./app");

const { PORT, DB_HOST } = process.env;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("\x1B[32m Database connection successful");

        app.listen(PORT, () => {
            console.log(
                `\x1B[32m Server running. Use our API on port: \x1B[37m http://localhost:${PORT}`
            );
        });
    })
    .catch(() => {
        console.log("\x1B[31mDatabase connection failed");
        process.exit(1);
    });