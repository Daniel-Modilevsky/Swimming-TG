const express = require('express');
const { UserComponentTest , ExcerciseComponentTest, TrainComponentTest   } = require('./test-controller');
let router = express.Router();


router.get('/api/test', UserComponentTest , ExcerciseComponentTest, TrainComponentTest ); 


module.exports = router;