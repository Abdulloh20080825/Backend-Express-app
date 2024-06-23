import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(authRouter);
app.use(productsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Data Base is working");
  })
  .catch((e) => {
    console.log(e);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
});
