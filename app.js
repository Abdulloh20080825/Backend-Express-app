import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";

const PORT = process.env.PORT || 8080;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Data Base is working");
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(`Server has been started on PORT: ${PORT}`);
});
