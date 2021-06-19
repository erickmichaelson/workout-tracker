const router = require("express").Router();
const db = require("../models/workout");

//route to get workouts
router.get("/api/workouts", (req, res) => {
    db.find({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//route to create new workouts
router.post("/api/workouts", (req, res) => {
    db.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//route to add exercises
router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//route for workouts in range
router.get("/api/workouts/range", (req, res) => {
    db.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {

            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;