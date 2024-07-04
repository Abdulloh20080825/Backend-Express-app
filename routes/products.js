import { Router } from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().lean()
  console.log(products);
  res.render("index", {
    title: "Boom Shop",
    products: products
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products",
    isProduct: true,
  });
});

router.get("/add", authMiddleware, (req, res) => {
  res.render("add", {
    title: "Add Product",
    isAdd: true,
    errorAddProducts: req.flash("errorAddProducts"),
  });
});

router.post("/add-products", userMiddleware, async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("errorAddProducts", "All fields is required");
    res.redirect("/add");
    return;
  }
  await Product.create({ ...req.body, user: req.userId });
  res.redirect("/");
});

export default router;
