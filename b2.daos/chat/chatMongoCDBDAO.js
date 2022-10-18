const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdReal')
const ChatCDBModel=require('../../b3.models/chat.CDB.model')

class ChatMongoCDBDAO extends ContenedorMongo{
    constructor(){
        super(ChatCDBModel)
    }
}

module.exports=ChatMongoCDBDAO