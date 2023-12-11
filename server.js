const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/addDataPoint", (req, res) => {
  console.log("Received POST request to /addDataPoint");
  const newDataPoint = req.body;
  console.log("New Data Point:", newDataPoint);

  // Assuming CSV structure: lng,lat
  const newCSVRow = `${newDataPoint.lng},${newDataPoint.lat}\n`;

  fs.appendFile("datapoints.csv", newCSVRow, "utf8", (err) => {
    if (err) {
      console.error("Error appending to CSV file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data point added to CSV file successfully.");
      res.status(200).send("Data point added successfully.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
