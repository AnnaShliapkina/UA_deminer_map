const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("./datapoints.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
  });
export const data = fs.createReadStream;
