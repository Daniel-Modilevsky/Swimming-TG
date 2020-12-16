const express = require('express');
const { middlewareTrainId, getAllTrains, getTrain, createTrain, updateTrain, deleteTrain  } = require('./trains-controller');
let router = express.Router();


//Middlewares
router.use('/api/trains/:id', middlewareTrainId);


//Routes
router.get('/api/trains/', getAllTrains)
      .post('/api/trains/', createTrain);
router.get('/api/trains/:id', getTrain)
      .put('/api/trains/:id', updateTrain)
      .delete('/api/trains/:id', deleteTrain);

module.exports = router;