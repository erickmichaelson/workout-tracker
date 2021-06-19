const router = require("express").Router();
const db = require("../models/workout");

//this rout gets the workouts
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

//this is the route to create a new workout
router.post("/api/workouts", (req, res) => {
    db.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//this is the route to add exercises
router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body,params,"PUT with DB ")
    db.findByIdAndUpdate(req.params.id,{$push:{exercises:req.body}},{new:true})
        .then(dbWorkout => {
            console.log("PUT db after saving to DB",req.body, req.params, dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log("Err in put route",err)
            res.status(400).json(err);
        });
});

//this is a route for exercise duration
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