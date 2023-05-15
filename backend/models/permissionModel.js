const mongoose = require('mongoose')

const permissionchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a permission name']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Permission', permissionchema)