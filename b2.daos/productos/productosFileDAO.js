const ContenedorMongo=require('../../b4.contenedores/contenedorFile')

class productosGeneralFileDAO extends ContenedorMongo{
    constructor(){
        super('productosGeneralObjetos.json')
    }
}

module.exports=productosGeneralFileDAO