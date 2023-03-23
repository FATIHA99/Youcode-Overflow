const mongoose = require('mongoose');


const UserShema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true,
        default:'client'
    },
    password: { 
        type: String, 
        required: true 
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model('User', UserShema);