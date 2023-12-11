const { DeckGL, HexagonLayer } = deck;

const deckgl = new DeckGL({
  mapStyle: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  initialViewState: {
    longitude: 37.5434,
    latitude: 47.0971,
    zoom: 8,
    minZoom: 7,
    maxZoom: 15,
    pitch: 40.5,
  },
  controller: true,
});

fetch("./datapoints.csv")
  .then((response) => response.text())
  .then((csvData) => {
    const data = parseCSV(csvData);
    console.log(data);

    const OPTIONS = ["radius", "coverage", "upperPercentile"];
    const COLOR_RANGE = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78],
    ];

    OPTIONS.forEach((key) => {
      document.getElementById(key).oninput = renderLayer;
    });

    renderLayer();

    function renderLayer() {
      const options = {};
      OPTIONS.forEach((key) => {
        const value = +document.getElementById(key).value;
        document.getElementById(key + "-value").innerHTML = value;
        options[key] = value;
      });

      const hexagonLayer = new HexagonLayer({
        id: "heatmap",
        colorRange: COLOR_RANGE,
        data: data,
        elevationRange: [0, 100],
        elevationScale: 250,
        extruded: true,
        getPosition: (d) => [Number(d.lng), Number(d.lat)],
        opacity: 1,
        ...options,
      });

      deckgl.setProps({
        layers: [hexagonLayer],
      });
    }
  })
  .catch((error) => console.error("Error loading CSV file:", error));

// Функція для розбору CSV даних в масив об'єктів
function parseCSV(csv) {
  const lines = csv.split("\n");
  console.log(lines);
  const headers = lines[0].split(",");

  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    console.log(currentLine);
    if (currentLine.length === headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }
      result.push(obj);
    }
  }
  console.log(result);
  return result;
}