const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "YOU MUST ENTER ADDRESS IN SEARCH TEXT BOX",
    });
  }

  weatherData(address, (error, { temperature, description, cityName } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    console.log(temperature, description, cityName);
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "PAGE NOT FOUND",
  });
});

app.listen(port, () => {
  console.log("SERVER IS UP AND RUNNING ON PORT :", port);
});
