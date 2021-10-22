const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

// Routes #1
app.get("/flowersAPI/combo", (req, res) => {
  // console.log(req);
});

app.listen(port, () => console.log(`RESTful API server started on: ${port}`));
