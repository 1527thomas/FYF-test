/**
 *
 */
const tools = require("./Combinations");

const cors = require("cors");
const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// Routes #1
app.get("/flowersAPI/combo", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const combinations = tools.findCombinations();
  const count = combinations.length;
  const fullResult = {
    count: count,
    combinations: combinations,
  };
  res.send(fullResult);
});

// Routes #2
app.get("/flowersAPI/anarchy", (req, res) => {
  const combinations = tools.findArbitraryCombinations(req.query);
  const count = combinations.length;
  const fullResult = {
    count: count,
    combinations: combinations,
  };
  res.send(fullResult);
});

app.listen(port, () => console.log(`RESTful API server started on: ${port}`));
