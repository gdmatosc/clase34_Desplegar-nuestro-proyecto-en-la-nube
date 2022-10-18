const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdReal')
const productosCDBModel=require('../../b3.models/productos.CDB.model')

class productosGeneralMongoCDBDAO extends ContenedorMongo{
    constructor(){
        super(productosCDBModel)
    }
}

module.exports=productosGeneralMongoCDBDAO