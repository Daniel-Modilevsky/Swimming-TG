const express = require('express');
const { middlewareExcerciseId, getAllexcercises, getExcercise, createExcercise, updateExcercise, deleteExcercise  } = require('./exersicies-controller');
let router = express.Router();


//Middlewares
router.use('/api/excercisies/:id', middlewareExcerciseId);


//Routes
router.get('/api/excercisies/', getAllexcercises)
      .post('/api/excercisies/', createExcercise);
router.get('/api/excercisies/:id', getExcercise)
      .put('/api/excercisies/:id', updateExcercise)
      .delete('/api/excercisies/:id', deleteExcercise);

module.exports = router;