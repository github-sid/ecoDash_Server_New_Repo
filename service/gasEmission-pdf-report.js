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
  doc.fontSize(24).text("Greenhouse Gases Report", { align: "center" });
  doc.moveDown(0.5);

  // Subtitle
  doc.fontSize(18).text("Generated on: " + new Date().toLocaleDateString(), {
    align: "center",
  });
  doc.moveDown(0.5);

  const analysis = `The provided data offers insights into the emissions associated with various fuel types, particularly focusing on carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O). This information is crucial for understanding the environmental impact of different energy sources and for formulating strategies to mitigate climate change.

**1. Carbon Dioxide Emissions:**
The data reveals significant disparities in carbon dioxide emissions across different fuel types. "Natural Gas" has the highest carbon dioxide emissions at 56,100, indicating a substantial contribution to overall greenhouse gas emissions. On the other hand, "Liquified Petroleum Gases" exhibit the lowest carbon dioxide emissions at 1.61. This variation underscores the importance of transitioning to lower-emission energy sources to reduce the overall carbon footprint.

**2. Methane and Nitrous Oxide Emissions:**
While methane and nitrous oxide are potent greenhouse gases with a higher global warming potential than carbon dioxide, their absolute emissions from these fuel types are comparatively lower. "Natural Gas" again stands out with the highest methane emissions at 5, emphasizing the need for addressing fugitive emissions in natural gas extraction and distribution. Nitrous oxide emissions are generally minimal across all fuel types, with the highest from "Natural Gas" at 0.1. Strategies to minimize methane emissions and strategies to address nitrous oxide emissions, although relatively low, should be considered in comprehensive climate action plans.

**3. Comparison between Fuel Types:**
Analyzing the emissions from different fuel types allows for informed decision-making in energy policies and practices. "Residual fuel oil," "Anthracite," and "Coke oven coke" demonstrate relatively high carbon dioxide emissions, indicating a higher environmental impact compared to other fuels. This data underscores the importance of transitioning to cleaner energy sources to meet sustainability goals.

**4. Implications for Energy Transition:**
Understanding the emissions associated with various fuels is crucial for guiding the global transition to cleaner and more sustainable energy sources. Policymakers, industries, and consumers can use this information to prioritize the adoption of energy sources with lower carbon footprints. Additionally, it emphasizes the importance of investing in research and development to enhance technologies that reduce emissions from traditional, high-emission fuels.

In conclusion, the analysis of emissions data from different fuel types highlights the urgent need for a transition to cleaner energy sources. As the world grapples with the challenges of climate change, informed decision-making based on such data is essential for creating effective policies and practices that contribute to a more sustainable and environmentally friendly future.`;

  // Body Text
  doc.fontSize(12).text(analysis, { align: "justify" });
  doc.moveDown(2); // Add two lines of space

  // Move the table down by adjusting the tableTop variable
  const tableData = [
    ["Continent", "Emission(metric_tons)", "Price"],
    ["Item 1", "5", "$10"],
    ["Item 2", "3", "$8"],
    ["Item 3", "2", "$5"],
    ["Total", "", "$23"],
  ];
  const tableWidth = 450;
  const tableHeight = 20 * (tableData.length + 1); // Adjusted the table height based on the number of rows
  const tableTop = doc.y; // Place the table right after the text content
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
