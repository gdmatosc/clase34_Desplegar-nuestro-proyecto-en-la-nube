const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdReal')
const ChatLDBModel=require('../../b3.models/chat.LDB.model')

class ChatMongoLDBDAO extends ContenedorMongo{
    constructor(){
        super(ChatLDBModel)
    }
}

module.exports=ChatMongoLDBDAO