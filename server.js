/**
 *
 */
const tools = require("./Combinations");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Routes #1
app.get("/flowersAPI/combo", (req, res) => {
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
  // req.body holds the arguments as the examples shows in email

  const combinations = tools.findArbitraryCombinations(req.body);
  const count = combinations.length;
  const fullResult = {
    count: count,
    combinations: combinations,
  };
  res.send(fullResult);
});

app.listen(port, () => console.log(`RESTful API server started on: ${port}`));
