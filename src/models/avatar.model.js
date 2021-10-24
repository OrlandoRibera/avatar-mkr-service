const mongoose = require('mongoose');
const { Schema } = mongoose;

const AvatarSchema = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { strict: false })

const Avatar = mongoose.model('Avatar', AvatarSchema);
module.exports = Avatar;