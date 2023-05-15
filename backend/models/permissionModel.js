const mongoose = require('mongoose')

const permissionchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a permission name'],
        unique: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Permission', permissionchema)