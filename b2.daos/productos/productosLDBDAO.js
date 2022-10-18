const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdReal')
const productosLDBModel=require('../../b3.models/productos.LDB.model')

class productosGeneralMongoLDBDAO extends ContenedorMongo{
    constructor(){
        super(productosLDBModel)
    }
}

module.exports=productosGeneralMongoLDBDAO