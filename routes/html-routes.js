const router = require("express").Router();
const path = require("path");

//route to get to homepage
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//route to get to dashboard
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

//route to get to continue workout or new wortkout
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;