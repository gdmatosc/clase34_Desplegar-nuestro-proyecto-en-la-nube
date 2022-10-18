const ContenedorMongo=require('../../b4.contenedores/contenedorMongoIdAlias')
const carritoCDBModel=require('../../b3.models/carrito.CDB.model')

class carritoProductosMongoCDBDAO extends ContenedorMongo{
    constructor(){
        super(carritoCDBModel)
    }
}

module.exports=carritoProductosMongoCDBDAO