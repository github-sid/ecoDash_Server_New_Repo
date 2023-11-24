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
  doc.fontSize(24).text("Employment Report", { align: "center" });
  doc.moveDown(0.5);

  // Subtitle
  doc.fontSize(18).text("Generated on: " + new Date().toLocaleDateString(), {
    align: "center",
  });
  doc.moveDown(0.5);

  const analysis = `Examining the regional data, it's evident that different continents face unique demographic challenges. Africa has a relatively balanced distribution across age groups, while North America and Australia show more pronounced peaks in the 30-50 years range. These variations could influence regional policies related to education, healthcare, and employment opportunities.

  Turning to the workplace roles data, the substantial gender gaps in supervisory and operational roles may indicate systemic barriers or biases affecting women's access to leadership positions. The limited representation of women in senior and executive management suggests a need for targeted initiatives to promote gender diversity in leadership roles.
  
  Combining both datasets, it becomes apparent that gender imbalances persist across various contexts, urging a holistic approach to address these disparities. This could involve targeted interventions in education, recruitment, and leadership development, as well as fostering inclusive workplace cultures that encourage diversity and equal opportunities for all. Ultimately, a comprehensive strategy is essential to create more equitable societies and workplaces globally.`;

  // Body Text
  doc.fontSize(12).text(analysis, { align: "justify" });
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
