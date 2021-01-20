const Train = require('../trains/trains-model');
const Excercise = require('../exercisies/exercisies-model');
const User = require('../users/users-model');
const axios = require('axios').default;
const logger = require('../../lib/logs');

//==========================================================================
//=========================UNIT=TESTS=======================================
//==========================================================================


//===================================
//USER Unit Tests
//===================================
//UNIT test - Users Read
async function testUserRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/users');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - User Read
async function testOneUserRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/users/5ff0d50fbeace3359897e29c');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}

//===================================
//EXCERCISE Unit Tests
//===================================
//UNIT test - Excercisies Read
async function testExcerciseRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/excercisies');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Excercise Read
async function testOneExcerciseRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/excercisies/5ff0d6f6b29d031d6ced6d6c');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Excercise Create
async function testExcerciseCreate() {
  try {
      const response = await axios.post('http://localhost:8080/api/excercisies', {
        count: 4,
        distance:  50 , 
        multiple: "Freestyle", 
        step: "Swim Down",
        tempo:"Easy" ,
        break:  15

      });
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testExcerciseCreate - ${error}`);
  }
}
//UNIT test - Excercise Update
async function testExcerciseUpdate() {
  try {
      const response = await axios.put('http://localhost:8080/api/excercisies/6002fac4a95df31d5ce58f0b', {
        count: 4,
        distance:  100 , 
      });
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testExcerciseUpdate - ${error}`);
  }
}
//UNIT test - Excercise Delete
async function testExcerciseDelete() {
  try {
      const response = await axios.delete('http://localhost:8080/api/excercisies/6002fac4a95df31d5ce58f0b');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testExcerciseDelete - ${error}`);
  }
}


//===================================
//TRAIN Unit Tests
//===================================
//UNIT test - Trains Read
async function testTrainRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/trains');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Train Read
async function testOneTrainRead() {
  try {
      const response = await axios.get('http://localhost:8080/api/trains/5ffa1e678a3b0c0df40e4521');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}

//==========================================================================
//=========================FAIL=TESTS=======================================
//==========================================================================
//UNIT test - invalid route
async function testinvalidRoute() {
  try {
      const response = await axios.post('http://localhost:8080/sdasdas');
      if(response.status == 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Users CREATE - missing params
async function testUserfaildCreate() {
  try {
      const response = await axios.post('http://localhost:8080/api/users', {user_name: 'rafi'});
      if(response.status != 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Excecise CREATE - missing params
async function testExcecisefaildCreate() {
  try {
      const response = await axios.post('http://localhost:8080/api/excercisies', {user_name: 'one'});
      if(response.status != 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}
//UNIT test - Train CREATE - missing params
async function testTrainfaildCreate() {
  try {
      const response = await axios.post('http://localhost:8080/api/trains', {user_name: 'two'});
      if(response.status != 200) return true;
      return false;
  } catch (error) {
      logger.error(`error - testUserRead - ${error}`);
  }
}




//==========================================================================
//=========================COMPONENT=TESTS==================================
//==========================================================================
//COMPONENT TEST - User
const UserComponentTest = async (req, res, next) => {
    let test1 = await testUserRead();
    let test2 = await testOneUserRead();
    if(test1 && test2)
      logger.info('Success - User Component tests')
    else
      logger.error('Failed - User Component tests')
    next();
}
//COMPONENT TEST - Excercise
const ExcerciseComponentTest = async (req, res, next) => {
  let test1 = await testExcerciseRead();
  let test2 = await testOneExcerciseRead();
  let test3 = await testExcerciseCreate();
  let test4 = await testExcerciseUpdate();
  let test5 = await testExcerciseDelete();

  if(test1 && test2 && test3) 
    logger.info('Success - Excercise Component tests')
  else
    logger.error('Failed - Excercise Component tests')
  next();
}
//COMPONENT TEST - Train
const TrainComponentTest = async (req, res) => {
  let test1 = await testTrainRead();
  let test2 = await testOneTrainRead();
  if(test1 && test2)
    logger.info('Success - Train Component Tests')
  else
    logger.error('Failed - Train Component Tests')
}




module.exports = { UserComponentTest , ExcerciseComponentTest, TrainComponentTest }

