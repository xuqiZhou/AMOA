const express = require("express");
const router = express.Router();
const Module = require("../models/Module");
const QuizQuestion = require("../models/QuizQuestion");

// Get all modules
router.get("/", (req, res) => {
  Module.find().then(modules => res.json(modules));
});

// Get Module Content for id
router.get("/editmodule/:_id", (req, res) => {
  Module.findById(req.params._id, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ title: "", body: "" });
    else res.json(module);
  });
});

// Get Quiz Questions with module id
router.get("/editmodule/quiz/:_id", (req, res) => {
  QuizQuestion.find({ moduleId: req.params._id }, (err, quizQuestions) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!quizQuestions) res.json({ errMassage: "Module Not Exist" });
    else {
      res.json(quizQuestions);
    }
  });
});

// Get Quiz Questions with question id
router.get("/editmodule/quiz/question/:_id", (req, res) => {
  QuizQuestion.findById(req.params._id, (err, question) => {
    if (err)
      console.log(`Error finding question: ${question} Error: ${question}`);
    else if (!question) res.json({ errMassage: "Question not found" });
    else res.json(question);
  });
});

//Post new Module
router.post("/", (req, res) => {
  new Module({
    moduleCode: req.body.moduleCode,
    title: req.body.title,
    body: req.body.body,
    public: req.body.public
  })
    .save()
    .then(module => res.json(module));
});

//Post new Quiz Question
router.post("/editmodule/quiz/:_id", (req, res) => {
  new QuizQuestion({
    moduleId: req.body.moduleId,
    question: req.body.question,
    options: req.body.options
  })
    .save()
    .then(quizQuestion => res.json(quizQuestion));
});

//Update Existing Module
router.post("/editmodule", (req, res) => {
  console.log(req.body._id);
  const updatedModule = {
    moduleCode: req.body.moduleCode,
    title: req.body.title,
    body: req.body.body,
    public: req.body.public
    // })
    //   .save()
    //   .then(module => res.json(module));
  };
  console.log(updatedModule);

  Module.findOneAndUpdate(
    { _id: req.body._id },
    updatedModule,
    (err, module) => {
      if (err) console.log(`Error finding module: ${module} Error: ${module}`);
      else res.json(module);
    }
  );
});

//Update Existing Quiz Question
router.post("/editmodule/editquiz/:_id", (req, res) => {
  console.log(req.body._id);
  const updatedQuestion = {
    question: req.body.question,
    options: req.body.options
  };
  console.log(updatedQuestion);
  QuizQuestion.findOneAndUpdate(
    { _id: req.body._id },
    updatedQuestion,
    (err, question) => {
      if (err)
        console.log(`Error finding question: ${question} Error: ${question}`);
      else res.json(question);
    }
  );
});

//Handle delete quiz questions
router.delete("/editmodule/quiz/delete/:id", (req, res) => {
  QuizQuestion.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;