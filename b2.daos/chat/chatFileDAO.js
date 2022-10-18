const ContenedorMongo=require('../../b4.contenedores/contenedorFile')

class ChatFileDAO extends ContenedorMongo{
    constructor(){
        super('chatMensajes.json')
    }
}

module.exports=ChatFileDAO