
const mongoose = require('mongoose');


//database connection
//connect to mongo db atlas
mongoose.connect("mongodb+srv://autofy:YAAUflivz7eqYqu9@autofycluster-sewgr.mongodb.net/tasky?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true  })
let connection = mongoose.connection;

//check db connection
connection.once('open',()=>{
    console.log("connected to mongodb");
});
//check for db error
connection.on('error',(err)=>{
    console.log(err)
});

module.exports = connection;
