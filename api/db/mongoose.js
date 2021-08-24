//this file will handle the connection logic to the mongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser: true}).then(() =>{
    console.log("Connected to mongodb successfully :");
}).catch((e)=>{
    console.log("error while attempting to connect to mongodb");
    console.log(e);
});

//to prevent deprectation warnings (from mongodb native drivers)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};