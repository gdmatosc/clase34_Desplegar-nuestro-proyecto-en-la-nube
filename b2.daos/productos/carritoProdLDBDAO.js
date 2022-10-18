const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdAlias')
const carritoLDBModel=require('../../b3.models/carrito.LDB.model')

class carritoProductosMongoLDBDAO extends ContenedorMongo{
    constructor(){
        super(carritoLDBModel)
    }
}

module.exports=carritoProductosMongoLDBDAO