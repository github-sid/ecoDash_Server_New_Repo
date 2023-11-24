const PDFDocument = require("pdfkit");
const path = require("path");

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument({
    bufferPages: true,
    size: [842, 595],
    font: "Courier",
  });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Page 1: Full Image
  const imagePath = path.join(__dirname, "reportImage.jpg");
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const imageAspectRatio = 600 / 400;
  let imageWidth = pageWidth;
  let imageHeight = pageHeight; // Adjusted to fit the entire height

  if (imageWidth / imageAspectRatio > pageHeight) {
    imageWidth = pageHeight * imageAspectRatio;
  }

  doc.image(imagePath, 0, 0, { width: imageWidth, height: imageHeight });

  // Page 2: Monthly Report Content
  doc.addPage();

  doc.font("Helvetica");

  // Title
  doc.fontSize(24).text("Water Report", { align: "center" });
  doc.moveDown(0.5);

  // Subtitle
  doc.fontSize(18).text("Generated on: " + new Date().toLocaleDateString(), {
    align: "center",
  });
  doc.moveDown(0.5);

  // Body Text
  doc
    .fontSize(12)
    .text(
      "The provided data offers a comprehensive five-year overview (2017-2021) of water consumption, categorizing it into SurfaceWater, GroundWater, SeaWater, and ThirdPartyWater, with aggregated yearly totals. SurfaceWater shows a consistent rise, attributed to factors like population growth and industrial expansion. GroundWater exhibits a fluctuating pattern, peaking in 2018 and declining in 2021, influenced by precipitation and economic shifts. SeaWater consumption rises steadily, signaling a need for alternative sources in water-scarce regions. ThirdPartyWater sees a substantial decrease from 2019 to 2021, possibly due to changes in water trading or economic conditions. Aggregated totals indicate an overall increase in water consumption, urging targeted strategies for specific sources. Analyzing regional disparities can guide policy interventions, addressing disproportionate increases. Water consumption's environmental and economic impacts underscore the need for sustainable practices. Future considerations emphasize the importance of climate change, technology, and socio-economic factors in water management. In conclusion, this data snapshot aids understanding and informs decision-making in policy, sustainability, and resource management.",
      { align: "justify" }
    );
  doc.moveDown(15);

  // Move the table down by adjusting the tableTop variable
  const tableData = [
    ["Item", "Quantity", "Price"],
    ["Item 1", "5", "$10"],
    ["Item 2", "3", "$8"],
    ["Item 3", "2", "$5"],
    ["Total", "", "$23"],
  ];
  const tableWidth = 450;
  const tableHeight = 150;
  const tableTop = pageHeight / 2 + 50; // Adjust the value to move the table down
  const tableLeft = (pageWidth - tableWidth) / 2;

  // Headers
  doc.fontSize(12).font("Helvetica-Bold");
  for (let i = 0; i < tableData[0].length; i++) {
    doc.fillColor("#CCCCCC");
    doc.rect(tableLeft + i * 150, tableTop, 150, 20).fill();
    doc.fillColor("#000000");
    doc.text(tableData[0][i], tableLeft + i * 150 + 5, tableTop + 5);
  }

  // Data
  doc.fontSize(12).font("Helvetica");
  for (let i = 1; i < tableData.length; i++) {
    for (let j = 0; j < tableData[i].length; j++) {
      doc.fillColor("#EEEEEE");
      doc.rect(tableLeft + j * 150, tableTop + i * 20, 150, 20).fill();
      doc.fillColor("#000000");
      doc.text(tableData[i][j], tableLeft + j * 150 + 5, tableTop + i * 20 + 5);
    }
  }

  doc.end();
}

module.exports = { buildPDF };
