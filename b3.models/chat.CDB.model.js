const mongoose=require('mongoose');

const MONGO_OPTIONS={
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retryWrites: false
}

//const MONGO_USERNAME=process.env.MONGO_USERNAME || 'gmatosc';
//const MONGO_PASSWORD=process.env.MONGO_PASSWORD || 'nosqlls31287';
//const MONGO_HOST=process.env.MONGO_URL || 'cdb-nosql-test1.p8ubd58.mongodb.net/test1MongoCDB?retryWrites=true&w=majority';

const MONGO_USERNAME=process.env.MONGO_USERNAME;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
const MONGO_HOST=process.env.MONGO_URL;

const MONGO={
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

let connChatCDB=mongoose.createConnection(MONGO.url,MONGO_OPTIONS)

const chatCollection='chatBasic'

const chatSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    correo:{type:String, require:true,max:100},
    edad:{type:Number, require:true,max:100},
    fecha:{type:String, require:true,max:100},
    thumbnail:{type:String, require:true,max:100},
    textIngresado:{type:String, require:true,max:100}
})

const chatCDBModel=connChatCDB.model(chatCollection,chatSchema)
module.exports=chatCDBModel;