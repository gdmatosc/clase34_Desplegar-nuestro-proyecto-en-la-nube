const ContenedorMongo=require('../../b4.contenedores/contenedorFile')

class carritoProductosFileDAO extends ContenedorMongo{
    constructor(){
        super('carritoProductos.json')
    }
}

module.exports=carritoProductosFileDAO