const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Excercise = require('./exercisies-model');
const Math = require('math');

let message = '';


const middlewareExcerciseId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const excercise = await Excercise.findById({_id: id});
        if(!excercise){
            message = 'Error - Excercise not exist';
            logger.error(message + error);
            return res.status(401).json({message});
        }
        else{
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find excercise';
        logger.error(`${message} = ${error}`);
        return res.status(401).json({message});
    }
};
const getAllexcercises = async function(req, res){
    try{
        logger.info('getAllexcercises');
        const excercisies = await Excercise.find();
        logger.info(`founded ${excercisies.length} excercisies`);
        return res.status(200).json(excercisies);
    }
    catch(error){
        message = 'Error - Failed searching for all excercisies';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getExcercise = async function(req, res){
    try{
        logger.info('getExcercise');
        const excercise = await Excercise.findOne({ _id: req.params.id });
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const createExcercise = async function(req, res){
    try{
        logger.info('createExcercise');
        if(!req.body.count || !req.body.distance || !req.body.multiple){
            logger.error('Error - Missing Params - can not complete valis creation without (count & distance & multiple ) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (count & distance & multiple ) params');
        }
        let newExcercise = new Excercise ({
            _id: mongoose.Types.ObjectId(),
            count: req.body.count,
            distance: req.body.distance,
            multiple: req.body.multiple,
        });
        if(req.body.step) newExcercise.step = req.body.step;
        if(req.body.tempo) newExcercise.tempo = req.body.tempo;
        if(req.body.break) newExcercise.break = req.body.break;
        if(req.body.isPullbuoy) newExcercise.isPullbuoy = req.body.isPullbuoy;
        if(req.body.isFins) newExcercise.isFins = req.body.isFins;
        if(req.body.isHandPaddles) newExcercise.isHandPaddles = req.body.isHandPaddles;
        if(req.body.isKickBoard) newExcercise.isKickBoard = req.body.isKickBoard;


        const excercise = await Excercise.findById({_id:newExcercise._id});
        if(!excercise){
            newExcercise.save();
            logger.info(`Success - Created New Excercise ${newExcercise}`);
            return res.status(200).json(newExcercise);
        }
        else{
            message = 'Error - Excercise already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new Excercise';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateExcercise = async function(req, res){
    try{
        logger.info('updateExcercise');
        const excercise = await Excercise.findById({ id: req.params.id });
        if(req.params.count) excercise.count = req.params.count;
        if(req.params.step) excercise.distance = req.params.distance;
        if(req.params.step) excercise.multiple = req.params.multiple;
        if(req.params.step) excercise.step = req.params.step;
        if(req.params.tempo) excercise.tempo = req.params.tempo;
        if(req.params.break) excercise.break = req.params.break;
        if(req.params.isPullbuoy) excercise.isPullbuoy = req.params.isPullbuoy;
        if(req.params.rate) excercise.isFins = req.params.isFins;
        if(req.params.rate) excercise.isHandPaddles = req.params.isHandPaddles;
        if(req.params.rate) excercise.isKickBoard = req.params.isKickBoard;

        Movie.update({ id: excercise.id });
        logger.info(excercise);
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteExcercise = async function(req, res){
    try{
        logger.info('deleteExcercise');
        const excercise = await Excercise.findById({ id: req.params.id });
        if (excercise.isDeleted == false) excercise.isDeleted = true;
        excercise.update({ id: excercise.id });
        logger.info(excercise);
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const getByStep = async function(req, res){
    try{
        //const excercisies = await Excercise.find({ step: {$regex: `${req.params.stepName}`}}).sort();
        logger.debug(req.params.stepName);
        const excercisies = await Excercise.find({ step: req.params.stepName});
        logger.info(excercisies.length);
        return res.status(200).json(excercisies);
    }
    catch (error) {return res.status(400).json({error});}
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

async function randomWarmupExercise(totalwu){
    let firstExerciseWU = 0;
    let secondExerciseWU = 0;
    let results = [];

    if(totalwu > 800){
        firstExerciseWU = 800
        secondExerciseWU = totalwu - firstExerciseWU
    }
    else {
        firstExerciseWU = totalwu;
    }
    results = await Excercise.find({ step: "Warm up" });
    let countFirstExercise = 0
    let countSecondExercise = 0
    let counter = 0
    
    let firstExerciseArray = []
    let secondExerciseArray = []
    let returnExerciseArray = []

    results.forEach(result => {
        if(result.distance * result.count == firstExerciseWU){
            firstExerciseArray.push(result);
            countFirstExercise += 1;
        }
        else if (secondExerciseWU != 0 && result.distance * result.count == secondExerciseWU){
            secondExerciseArray.push(result);
            countSecondExercise += 1;
        }
        counter += 1
    });
    let randFirstExercise = getRandomInt(countFirstExercise - 1)
    returnExerciseArray.push(firstExerciseArray[randFirstExercise])
    if (secondExerciseWU != 0){
        randSecondExercise = getRandomInt(countSecondExercise - 1)
        returnExerciseArray.push(secondExerciseArray[randSecondExercise]) 
    }
    return returnExerciseArray;
}

async function randomWarmdownExercise(totalwu){
    let results = await Excercise.find({ step: "Swim Down" });
    let warmdowmExercises = []
    let returnExercise = []
    let countWarmdownExercise = 0;

    results.forEach(result => {
        if(result.distance * result.count == totalwu){
            warmdowmExercises.push(result);
            countWarmdownExercise += 1;
        }
    });

    let randomExercise = getRandomInt(countWarmdownExercise - 1);
    returnExercise.push(warmdowmExercises[randomExercise])

    return returnExercise;
}

async function randomMainSetExerciseEq(totalMS, isPully , isKick, isPaddles, isFins){
    let results = await Excercise.find({ step: "Main set" });
    let counter = 0;
    let mainSetCounter = 0;

    let allExercises = [];
    let mainsetExercises = [];

    results.forEach(result => {
        counter += 1
        allExercises.push(result);
    });

    let totaltemp = 0;
    let flag = false;

    while(totaltemp < totalMS){
        let num = getRandomInt(counter - 1)
        mainsetExercises.push(allExercises[num])
        mainSetCounter += 1

        if((allExercises[num].isPullbuoy == true && isPully == true) || (allExercises[num].isKickBoard == true && isKick == true) || (allExercises[num].isHandPaddles == true && isPaddles == true) || (allExercises[num].isFins == true && isFins == true)){
            flag = true;
        }
        totaltemp += (allExercises[num].distance * allExercises[num].count);
        allExercises.slice(num);
        // check if it do the work
    }
    if (totaltemp > totalMS){
        let diff = totaltemp - totalMS;
        mainsetExercises.pop();
        let results2 = await Excercise.find({ step: "Main set" });
        allExercises = [];
        let newCounter = 0;

        results2.forEach(result2 => {
            if (result2.distance * result2.count == diff){
                newCounter += 1;
                allExercises.push(result2);
            }
        });
        num = getRandomInt(newCounter - 1)
        mainsetExercises.push(allExercises[num])
        logger.warn(`allExercises[num]`);
        logger.warn(allExercises[num]);
        if((allExercises[num].isPullbuoy == true && isPully == true) || (allExercises[num].isKickBoard == true && isKick == true) || (allExercises[num].isHandPaddles == true && isPaddles == true) || (allExercises[num].isFins == true && isFins == true)){
            flag = true;
        }
        if (flag == false){
            let delRand = getRandomInt(mainSetCounter - 1);
            let findDis = mainsetExercises[delRand].distance;
            mainsetExercises.slice(num);

            while (flag == false &&  newCounter > 0){
                num = getRandomInt(newCounter - 1)
                if((allExercises[num].isPullbuoy == true && isPully == true) || (allExercises[num].isKickBoard == true && isKick == true) || (allExercises[num].isHandPaddles == true && isPaddles == true) || (allExercises[num].isFins == true && isFins == true)&&(allExercises[num].distance == findDis) ){
                    flag = true;
                    mainsetExercises.push(allExercises[num])
                }
                else{
                    allExercises.slice(num);
                    newCounter -= 1;
                }
        }   
    }
    return mainsetExercises;
}
}
function randomExercise(total, isPully , isKick, isPaddles, isFins){
    try{
        let totalWarmUp = total * 0.3;
        let totalWarmDown = 0;
        if (total < 2000)       totalWarmDown = 100
        else if (total <= 4000) totalWarmDown = 200
        else                    totalWarmDown = 300
        let totalMainSet = total - totalWarmUp - totalWarmDown
        let workout = [];
        workout = randomWarmupExercise(totalWarmUp);
        workout += randomMainSetExerciseEq(totalMainSet, isPully , isKick, isPaddles, isFins);
        workout += randomWarmdownExercise(totalWarmDown);
    
        return workout;
    }
    catch(error){
        logger.error(`error of randomExercise ${error}`);
        return res.status(400).json({error});
    }

}

const sendParamsRandom = async function(req, res){
    try{
        logger.info('random');
        logger.debug(req.body);
        let distance = req.body.distance;
        let isFins = req.body.isFins;
        let isPullbuoy = req.body.isPullbuoy;
        let isHandPaddles = req.body.isHandPaddles;
        let isKickBoard = req.body.isKickBoard;
        logger.debug(`distance: ${distance} , isFins: ${isFins} , isPullbuoy: ${isPullbuoy} , isHandPaddles: ${isHandPaddles} , isKickBoard: ${isKickBoard} ,`);
        let workout = randomExercise(distance, isPullbuoy , isKickBoard, isHandPaddles, isFins);
        logger.warn(workout);
        return res.status(200).json({msg: 'random ok', workout});
    }
    catch (error) {
        logger.error(`random - ${error}`);
        return res.status(400).json({error});
    }
}

module.exports =  { middlewareExcerciseId, getAllexcercises, getExcercise, createExcercise, updateExcercise, deleteExcercise, getByStep, sendParamsRandom  };
