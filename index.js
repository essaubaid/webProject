const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const productRouter = require("./routes/product");
const orderdetailsRouter = require("./routes/orderdetails");
const orderRouter = require("./routes/order");
const eventsRouter = require("./routes/events");
const reviewsRouter = require("./routes/reviews");

dotenv.config();

mongoose.connect("mongodb://localhost:27017/Project").then(() =>
    console.log("DB Connected Successfully")
).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRouter);
app.use("/api/orderdetails", orderdetailsRouter);
app.use("/api/order", orderRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/events", eventsRouter);

app.listen(5000, () => {
    console.log("Backend server is running")
});