const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    trainsHistory: { type: [Schema.Types.ObjectId], ref: 'Train' },
    isAdmin: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
});

let User = module.exports = mongoose.model('User', userSchema);
