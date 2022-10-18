
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

let connProductosCDB=mongoose.createConnection(MONGO.url,MONGO_OPTIONS)

const productosCollection='productosGeneral'

const productosSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:100},
    descripcion:{type:String, require:true,max:100},
    promocion:{type:String, require:true,max:100},
})

const productosCDBModel=connProductosCDB.model(productosCollection,productosSchema)
module.exports=productosCDBModel;
