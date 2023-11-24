const express = require("express");
const router = express.Router();
const pdfService = require("../service/gasEmission-pdf-report");

const greenHouseSchema = require("../model/greenHouse/greenHouse");
const groupSchema = require("../model/greenHouse/groupCO2");
const measureCO2Schema = require("../model/greenHouse/measureCO2");

router.use((req, res, next) => {
  console.log("Green House router middleware");
  next();
});

router.get("/", async (req, res) => {
  try {
    const greenHouseData = await greenHouseSchema.find();
    //console.log("---------------------------");
    //console.log(contractorData);

    const groupData = await groupSchema.find();
    //console.log("---------------------------");
    //console.log(empData);

    const measureCO2Data = await measureCO2Schema.find();
    //console.log("---------------------------");
    //console.log(newHireData);

    const responseData = {
      greenHouseData: greenHouseData,
      groupData: groupData,
      measureCO2Data: measureCO2Data,
    };

    //console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/gases-report/", (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=greenhouse_gases-report.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});
module.exports = router;
