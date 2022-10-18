const mongoose=require('mongoose');
const mongodb = require('../b7.configuraciones/mongodb.js')

let connChatLDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const chatCollection='chatBasic'

const chatSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    correo:{type:String, require:true,max:100},
    edad:{type:Number, require:true,max:100},
    fecha:{type:String, require:true,max:100},
    thumbnail:{type:String, require:true,max:100},
    textoIngresado:{type:String, require:true,max:100}
})

const chatLDBModel=connChatLDB.model(chatCollection,chatSchema)
module.exports=chatLDBModel;

/*
const MONGO_OPTIONS={
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retryWrites: false
}

const MONGO_USERNAME=process.env.MONGO_USERNAME;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
const MONGO_HOST=process.env.MONGO_URL;

const MONGO={
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    urlC: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    urlL: 'mongodb://localhost:27017/dbCoderTest'
}
*/