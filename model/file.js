const mongoose = require('mongoose');
const schema = mongoose.Schema({
    fileName: String,
    owner: String,
    created: Date,
    lastModified: Date,
    content: String// 只有在meta_only=false时有
});
module.exports = mongoose.model('File', schema);