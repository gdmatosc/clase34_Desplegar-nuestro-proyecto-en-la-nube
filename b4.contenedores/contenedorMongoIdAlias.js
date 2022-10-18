/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const mongoose=require('mongoose');
const ObjectId=require('mongoose').Types.ObjectId;
/* #endregion */

/* #region. 2.Key.function:ContenedorMongo*/
class ContenedorMongo {
    //argumentos del constructor: uri,model
    constructor(model){
        this.model=model
    }

    async save(obj){
        const newProduct=new this.model(obj);
        //console.log("saveContenedorMongoDB") //debug
        await newProduct.save()
        return newProduct
    }
 
    async getById(id){
        //console.log("id.getById",id) //debug
        let resultado=await this.model.find({id: id})
        //console.log("resultado.getById",resultado) //debug
        if (typeof resultado !== 'undefined' && resultado.length > 0){
            //console.log("find.getById",resultado[0].products) //debug
            return resultado[0]
        }
        else{
            return []
        }
        
    }

    async getAll(){
        let resultado=await this.model.find({})
        if (typeof resultado !== 'undefined' && resultado.length > 0){
            //console.log("find.getAll",resultado[0].products) //debug
            return resultado[0]
        }
        else{
            return []
        }
        
    }

    async editById(obj,id){
        console.log('UPDATE');
        const objUpdated=await this.model.updateOne(
            {id: id},
            {$set:obj}
        )
        return objUpdated
    }

    async addID(objeto,dataBase){
        try{
            //console.log("this.data.length.addID",dataBase.length) //debug
            //console.log("objeto.addID",objeto) //debug
            return objeto
        }
        catch (error){
            console.log(error)
        }
    }

    async editByBody(obj){
        console.log('UPDATE');
        console.log("obj.editByBody",obj)
        const objUpdated=await this.model.updateOne(
            {id:obj.id},
            {$set:obj}
        )
        //console.log("objUpdated.editByBody",objUpdated) //debug
        return objUpdated
    }

    async deleteByBody(obj){
        //console.log("objID.contenedorMongoDBdeleteByID",obj.id) //debug
        //console.log("objCartID.contenedorMongoDBdeleteByID",obj.cartID) //debug
        let resultado=await this.model.find({id: obj.cartID})
        //let resultadoDelete=resultado[0].products //debug
        //console.log("resultadoDelete.contenedorMongoDBdeleteByID",resultadoDelete) //debug
        await this.model.updateOne({ id: obj.cartID }, { $pull: {products:{ _id: new ObjectId(obj.id) } }})

        return true
    }

    async deleteById(id){
        console.log("MongoDBdeleteByID",id)
        const userDelete=await this.model.deleteOne({_id: new ObjectId(id)})
        return true
    }

    async deleteAll(){
        console.log("deleteAllContenedorMongoDB")
        const userDeleteAll=await this.model.deleteMany()
        return true
    }

}
/* #endregion */


module.exports=ContenedorMongo;


/*
    async editByBody(obj){
        console.log('UPDATE BY BODY');
        const objUpdated=await this.model.findOneAndUpdate(
            {"subschema.keyName": {keyName: "keyName_Valor"}.keyName},
            {$set:{"subschema.keyName.$": {KeyNameTarget:"value"}}}
        )
        return objUpdated
    }
*/