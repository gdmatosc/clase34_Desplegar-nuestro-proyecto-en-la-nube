//Conexión con nube
const mongoose=require('mongoose')

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
    urlC: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

let connUsers=mongoose.createConnection(MONGO.urlC,MONGO_OPTIONS)

const usersCollection='Users'

const usersSchema=new mongoose.Schema({
    username:{type:String, require:true,max:100},
    password:{type:String, require:true,max:100},
    name:{type:String, require:true,max:100},
})

const usersModel=connUsers.model(usersCollection,usersSchema)
module.exports=usersModel;

//Conexión local
/*
let connUser=mongoose.createConnection('mongodb://localhost:27017/dbCoderTest',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

module.exports=connUser.model('Users',{
    username: String,
    password: String,
    name: String
})
*/