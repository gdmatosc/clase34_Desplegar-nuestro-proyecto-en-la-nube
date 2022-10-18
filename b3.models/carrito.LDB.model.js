const mongoose=require('mongoose');
const mongodb = require('../b7.configuraciones/mongodb.js')

let connCarritoLDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const carritoCollection='carritoProductos'

const productosSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:100},
    descripcion:{type:String, require:true,max:100},
    promocion:{type:String, require:true,max:100},
})

const carritoSchema = new mongoose.Schema({
    id:{type:Number, require:true,max:100},
    products: [productosSchema]
  });

const carritoLDBModel=connCarritoLDB.model(carritoCollection,carritoSchema)
module.exports=carritoLDBModel;

/* //bloc
const mongoose=require('mongoose');
const productosCollection='productosGeneral'

let connProductosLDB=mongoose.createConnection('mongodb://localhost:27017/dbCoderTest',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

const productosSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:100},
    descripcion:{type:String, require:true,max:100},
    promocion:{type:String, require:true,max:100},
})

const productosLDBModel=connProductosLDB.model(productosCollection,productosSchema)
module.exports=productosLDBModel;

const postSchema = new Schema({
    title: String,
    content: String
  });
  
  const userSchema = new Schema({
    name: String,
    posts: [postSchema]
  });
  
  module.export = mongoose.model('User', userSchema);


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
