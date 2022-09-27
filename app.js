const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ContactService = require("./app/services/contact.service");
const MongoDB = require("./app/utils/mongodb.util");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Welcome to contact book application."});
});
// handle 404 response
// app.use((req, res, next) => {
//     return next(new ApiError(404, "Resource not found"));
// });

// app.use((err, req, res, next) => {
//     return res.status(console.err.statusCode || 500).json({
//         message: err.message || "Internal Server Error",
//     });
// });


module.exports = app;