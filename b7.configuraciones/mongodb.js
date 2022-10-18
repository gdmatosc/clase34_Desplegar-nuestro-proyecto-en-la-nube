const options={
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
  
  const connection={
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: options,
    urlC: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    urlL: 'mongodb://localhost:27017/dbCoderTest'
  }
  
  module.exports={connection,options}