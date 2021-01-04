const mongoose = require('mongoose');

const excerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    count: { type: Number,enum: [1, 2, 3, 4, 5, 6, 7 , 8 , 9, 10], require: true },
    distance: { type: Number, enum: [25, 50, 100, 200, 400], require: true }, 
    multiple: { type: [String], enumValues: ["Freestyle", "Breaststroke", "Butterfly","BeckStroke", "Mix"], require: true }, 
    details: { type: String , default: 'none'},

    step: { type: String ,enum:["Worm Up", "Main Set", "Swim Down", "Race"], default: "Worm Up"},
    tempo: { type: String ,enum:["Easy", "Medium", "Fast"], default: "Easy"},
    break: { type: Number,  enum: [10, 15, 20, 30, 45, 60], default: 10},

    isPullbuoy: { type: Boolean, default: false},
    isFins: { type: Boolean, default: false },
    isHandPaddles: { type: Boolean, default: false },
    isKickBoard: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false } 
}, {collection: 'excercisies'});

let Excercise = module.exports = mongoose.model('Excercise', excerciseSchema);



