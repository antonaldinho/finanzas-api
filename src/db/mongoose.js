const mongoose = require('mongoose');
var connectionUrl = 'mongodb+srv://antonio:'+process.env.DB_PASSWORD+'@cluster0-buyml.azure.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});