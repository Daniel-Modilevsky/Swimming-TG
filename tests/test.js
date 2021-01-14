const Train = require('../api/trains/trains-model');
const Excercise = require('../api/exercisies/exercisies-model');
const User = require('../api/users/users-model');
const axios = require('axios');

axios.get('/api/users')
.then(function (response) {
    console.log(`response - ${response}`);
  })
  .catch(function (error) {
    console.log(`error - ${error}`);
  })
  .then(function () {
  });

//UNIT test - User Read
//UNIT test - User Create
//UNIT test - User Update
//UNIT test - User Delete

//UNIT test - Excercise Read
//UNIT test - Excercise Create
//UNIT test - Excercise Update
//UNIT test - Excercise Delete

//UNIT test - Train Read
//UNIT test - Train Create
//UNIT test - Train Update
//UNIT test - Train Delete



//COMPONENT TEST - User

//COMPONENT TEST - Excercise

//COMPONENT TEST - Train


// Implication Test - User Train


// Implication Test - Train Excercise
