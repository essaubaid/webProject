const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const productRouter = require("./routes/product");

dotenv.config();

mongoose.connect("mongodb://localhost:27017/Project").then(()=> 
    console.log("DB Connected Successfully")
).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRouter);

app.listen(5000, ()=> {
    console.log("Backend server is running")
});