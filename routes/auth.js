import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLogin: true,
  });
});

router.get("/register", (req, res) => {
  res.render("register"),
    {
      title: "Register",
      isRegister: true,
    };
});

router.post("/login", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    console.log("User not found");
    return false;
  }

  const isPasswordEqual = await bcrypt.compare(
    req.body.password,
    existUser.password
  );

  if (!isPasswordEqual) {
    console.log("Password wrong");
    return false;
  }
  console.log(existUser);
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await User.create(userData);

  res.redirect("/");
});

export default router;
