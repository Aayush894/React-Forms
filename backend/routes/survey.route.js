const express = require('express');
const surveyController = require('../controllers/survey.controller');
const router = express.Router();

router.get('/questions/:topic', surveyController.fetchAdditionalQuestions);

module.exports = router;
