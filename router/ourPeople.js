const express = require("express");
const router = express.Router();
const pdfService = require("../service/people-pdf-service");

const contractorSchema = require("../model/ourPeople/contractor");
const empAgeSchema = require("../model/ourPeople/empAge");
const newHireSchema = require("../model/ourPeople/newHire");
const newHireGenderSchema = require("../model/ourPeople/newHireGender");
const partTimeCountrySchema = require("../model/ourPeople/partTimeCountry");
const permanentOrTempSchema = require("../model/ourPeople/permanentOrTemp");
const rolesSchema = require("../model/ourPeople/roles");

router.use((req, res, next) => {
  console.log("Our-people router middleware");
  next();
});

router.get("/", async (req, res) => {
  try {
    const contractorData = await contractorSchema.find();
    //console.log("---------------------------");
    //console.log(contractorData);

    const empData = await empAgeSchema.find();
    //console.log("---------------------------");
    //console.log(empData);

    const newHireData = await newHireSchema.find();
    //console.log("---------------------------");
    //console.log(newHireData);

    const newHireGenderData = await newHireGenderSchema.find();
    //console.log("---------------------------");
    //console.log(newHireGenderData);

    const partTimeCountryData = await partTimeCountrySchema.find();
    //console.log("---------------------------");
    //console.log(partTimeCountryData);

    const permanentOrTempData = await permanentOrTempSchema.find();
    //console.log("---------------------------");
    //console.log(permanentOrTempData);

    const roleData = await rolesSchema.find();
    //console.log("---------------------------");
    //console.log(roleData);

    const responseData = {
      contractorData: contractorData,
      empData: empData,
      newHireData: newHireData,
      newHireGenderData: newHireGenderData,
      partTimeCountryData: partTimeCountryData,
      permanentOrTempData: permanentOrTempData,
      roleData: roleData,
    };

    //console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/employment-report/", (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=employment-report.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});
module.exports = router;
