const Question = require("../models/question.model");

const getQuestions = async (req, res) => {
  try {
    if (!req.session.test_started) {
      return res.status(400).json({
        message: "You have not started the test yet",
        data: null,
        success: "false",
      });
    }

    const questions = await Question.aggregate([{ $sample: { size: 3 } }]);
    return res.status(200).json({
      message: "Questions fetched",
      data: questions,
      success: "true",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unknown error",
      data: null,
      success: "false",
    });
  }
};

const createQuestion = async (req, res) => {
  try {
    console.log("create question");
    const { question, answer } = req.body;
    const createdQuestion = await Question.create({
      question,
      answer,
    });

    return res.status(201).json({
      message: "question created",
      data: createQuestion,
      success: "true",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unknown error",
      data: null,
      success: "false",
    });
  }
};

module.exports = { getQuestions, createQuestion };
