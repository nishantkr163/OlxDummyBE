require("dotenv").config();

const cors = require('cors');
const express = require('express');
const connection = require("./connection");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.route");
const itemRoutes = require("./routes/item.route")

app.use("/auth", authRoutes);
app.use("/item", itemRoutes);

app.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log("Connection Established Successfully!");
    } catch (error) {
        console.log("Error while connecting", error)
    }
})