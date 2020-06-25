const mongoose= require('mongoose');

//mongodb crea la base de datos mernstack
//const URI = 'mongodb://localhost/mernstack';
// si existe la variable de entorno MONGODB_URI crea esa db sino exite crea la db databasetest
const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost/databasetest';
    
mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection= mongoose.connection;
connection.once('open', () => {
    console.log('db is connected')
});