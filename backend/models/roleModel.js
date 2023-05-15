const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a role name'],
        unique: true
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}]
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Role', roleSchema)