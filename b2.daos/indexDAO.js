const chatFileDAO=require('./chat/chatFileDAO')
const chatMongoLDBDAO=require('./chat/chatMongoLDBDAO')
const chatMongoCDBDAO=require('./chat/chatMongoCDBDAO')
const productosGeneralFileDAO=require('./productos/productosFileDAO')
const productosGeneralMongoLDBDAO=require('./productos/productosLDBDAO')
const productosGeneralMongoCDBDAO=require('./productos/productosCDBDAO')
const carritoProductosFileDAO=require('./productos/carritoProdFileDAO')
const carritoProductosMongoLDBDAO=require('./productos/carritoProdLDBDAO')
const carritoProductosMongoCDBDAO=require('./productos/carritoProdCDBDAO')

const logd = require('../b7.configuraciones/logging.js')
const modname='[indexDAO.js]'
const logr=logd.child({modulo:`${modname}`})
///const productosMantenimientoFileDAO=require('./products/productsAdvFileDAO')
//const chatBasicMongoLdbDAO=require('./chat/chatBasicMongoLdbDAO')

//const typeDB=process.env.typeDB
//let typeDB='mongoCDB'
let typeDB='mongoLDB'
//let typeDB='file'
const FactoryDAO=()=>{
    const loger=logd.child({modulo:`${modname}[FactoryDAO]`})
    //const typeDB=process.env.typeDB || 'file'
    loger.info(typeDB,{recurso:'typeDB'})
    if(typeDB=='file') {
        loger.verbose(`Generate DAO with File: ${typeDB}`,{recurso:'typeDB'})
        return{
            //chatBasic:new chatBasicFileDAO(),
            chatGeneral:new chatFileDAO(),
            productosGeneral: new productosGeneralFileDAO(),
            carritoProductos: new carritoProductosFileDAO()
        }
    } else if(typeDB=='mongoLDB'){
        loger.verbose(`Generate DAO with Mongo Ldb: ${typeDB}`,{recurso:'typeDB'})
        return{
            //chatBasic:new chatBasicMongoLdbDAO(),
            chatGeneral:new chatMongoLDBDAO(),
            productosGeneral: new productosGeneralMongoLDBDAO(),
            carritoProductos: new carritoProductosMongoLDBDAO()
        }
    } else if(typeDB=='mongoCDB'){
        loger.verbose(`Generate DAO with Mongo Cdb: ${typeDB}`,{recurso:'typeDB'})
        return{
            //chatBasic:new chatBasicMongoCdbDAO(),
            chatGeneral:new chatMongoCDBDAO(),
            productosGeneral: new productosGeneralMongoCDBDAO(),
            carritoProductos: new carritoProductosMongoCDBDAO()
        }
    }
    throw new Error('typeDB is not found')
}  

module.exports=FactoryDAO