const mongoose = require('mongoose');

const trainSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    exercisies: { type: [Schema.Types.ObjectId], ref: 'Excercise', require: true  }, 
    totalDistance: { type: Number, min: 25, max: 10000, require: true }, 
    name: { type: String, default: 'none' }, 
    date: { type: Date, default: Date.now() }, 
    isCompleted: { type: Boolean, default: false }, 
    isDeleted: { type: Boolean, default: false }
},{collection: 'trains'});

let Train = module.exports = mongoose.model('Train', trainSchema);



