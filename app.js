import express from "express";
import { engine, create } from "express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {  
  res.render("index");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}`));
