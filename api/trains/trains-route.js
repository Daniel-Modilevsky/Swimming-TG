const express = require('express');
const { middlewareTrainId, getAllTrains, getTrain, createTrain, updateTrain, deleteTrain  } = require('./trains-controller');
let router = express.Router();


//Routes
router.get('/api/trains/', getAllTrains)
      .post('/api/trains/', createTrain);
router.get('/api/trains/:id', middlewareTrainId,getTrain)
      .put('/api/trains/:id', middlewareTrainId,updateTrain)
      .delete('/api/trains/:id', middlewareTrainId,deleteTrain);

module.exports = router;