const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ead', { useNewUrlParser: true });

module.exports = mongoose;
