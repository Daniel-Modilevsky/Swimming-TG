const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Train = require('./trains-model');
const Exercisie = require('../exercisies/exercisies-model');

let message = '';

const middlewareTrainId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const train = await Train.findById({id});
        if(!train){
            message = 'Error - Ctrainomment not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the train`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find train';
        logger.error(message);
        return res.status(401).json({message});
    }
};
const getAllTrains = async function(req, res){
    try{
        logger.info('getAllTrains');
        const trains = await Train.find();
        logger.info(`founded ${trains.length} Comments`);
        return res.status(200).json(trains);
    }
    catch(error){
        message = 'Error - Failed searching for all trains';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getTrain = async function(req, res){
    try{
        logger.info('getTrain');
        const train = await Train.findById({ id: req.params.id });
        logger.info(train);
        return res.status(200).json({message});
    }
    catch (error) {return res.status(400).json({error});}
};

const createTrain = async function(req, res){
    try{
        logger.info('createTrain');
        if(!req.body.exercisies || !req.body.totalDistance){
            logger.error('Error - Missing Params - can not complete valis creation without (exercisies & totalDistance)  params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (exercisies & totalDistance) params');
        }
        let newTrain = { id: mongoose.Types.ObjectId(), exercisies: req.body.exercisies, totalDistance: req.body.totalDistance };
        if(req.params.name) newTrain.name = req.params.name;
        if(req.params.date) newTrain.date = req.params.date;
        const train = await Train.findById({id:newTrain.id});
        if(!train){
            newTrain.save();
            logger.info(`Success - Created New Train ${newTrain}`);
            return res.status(200).json(newTrain);
        }
        else{
            message = 'Error - Train already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new Train';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateTrain = async function(req, res){
    try{
        logger.info('updateTrain');
        const train = await Train.findById({ id: req.params.id });
        if(req.params.exercisies) train.exercisies = req.params.exercisies;
        if(req.params.totalDistance) train.totalDistance = req.params.totalDistance;
        if(req.params.name) train.name = req.params.name;
        if(req.params.date) train.date = req.params.date;        
        Train.update({ id: train.id });
        logger.info(train);
        return res.status(200).json({train});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteTrain = async function(req, res){
    try{
        logger.info('deleteTrain');
        const train = await Train.findById({ id: req.params.id });
        if (train.isDeleted == false) train.isDeleted = true;
        train.update({ id: train.id });
        logger.info(train);
        return res.status(200).json({train});
    }
    catch (error) {return res.status(400).json({error});}
};
module.exports =  { middlewareTrainId, getAllTrains, getTrain, createTrain, updateTrain, deleteTrain  };
