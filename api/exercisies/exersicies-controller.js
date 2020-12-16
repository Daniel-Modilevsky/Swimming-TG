const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Excercise = require('./exercisies-model');

let message = '';


const middlewareExcerciseId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const excercise = await Excercise.findById({id});
        if(!excercise){
            message = 'Error - Excercise not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the excercise`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find movie';
        logger.error(message);
        return res.status(401).json({message});
    }
};
const getAllexcercises = async function(req, res){
    try{
        logger.info('getAllexcercises');
        const excercisies = await Excercise.find();
        logger.info(`founded ${excercisies.length} excercisies`);
        return res.status(200).json(movies);
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
        const excercise = await Excercise.findById({ id: req.params.id });
        logger.info(excercise);
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
        let newExcercise = {
            id: mongoose.Types.ObjectId(),
            count: req.body.count,
            distance: req.body.distance,
            multiple: req.body.multiple,
        };
        if(req.params.step) newExcercise.step = req.params.step;
        if(req.params.tempo) newExcercise.tempo = req.params.tempo;
        if(req.params.break) newExcercise.break = req.params.break;
        if(req.params.isPullbuoy) newExcercise.isPullbuoy = req.params.isPullbuoy;
        if(req.params.rate) newExcercise.isFins = req.params.isFins;
        if(req.params.rate) newExcercise.isHandPaddles = req.params.isHandPaddles;
        if(req.params.rate) newExcercise.isKickBoard = req.params.isKickBoard;


        const excercise = await Excercise.findById({id:newExcercise.id});
        if(!newExcercise){
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


module.exports =  { middlewareExcerciseId, getAllexcercises, getExcercise, createExcercise, updateExcercise, deleteExcercise  };
