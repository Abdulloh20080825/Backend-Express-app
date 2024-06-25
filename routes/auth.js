import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fiels is required");
    res.redirect("/login");
    return;
  }
  const existUser = await User.findOne({ email });
  if (!existUser) {
    console.log("User not found");
    req.flash("loginError", "User not found");
    res.redirect("/login");
    return;
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    req.flash("loginError", "Password wrong");
    res.redirect("/login");
    return;
  }

  console.log(existUser);
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    req.flash("registerError", "All fiels is required");
    res.redirect("/register");
    return;
  }

  const condidate = await User.findOne({ email });

  if (condidate) {
    req.flash("registerError", "Email is already taken");
    res.redirect("/register");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { firstname, lastname, email, password: hashedPassword };
  const user = await User.create(userData);
  res.redirect("/");
});

export default router;
