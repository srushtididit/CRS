const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, gender, partTimeJob, schoolMissed, extracurricular, studyHours, careerAspiration, scores } = req.body;

    // Example logic to determine career recommendation (Replace with ML model or actual logic)
    let recommendation = "Software Engineer"; // Default recommendation

    if (scores.math > 80 && scores.physics > 70) {
        recommendation = "Engineer";
    } else if (scores.history > 80 && scores.english > 75) {
        recommendation = "Historian";
    } else if (scores.biology > 80 && scores.chemistry > 75) {
        recommendation = "Doctor";
    }

    res.json({ recommendation });
});

module.exports = router;
