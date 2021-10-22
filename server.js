// const { findCombinations } = require("./Combinations");
const tools = require("./Combinations");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

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

app.listen(port, () => console.log(`RESTful API server started on: ${port}`));
