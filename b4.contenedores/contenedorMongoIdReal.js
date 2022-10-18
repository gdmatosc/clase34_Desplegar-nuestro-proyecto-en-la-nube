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
        //this.uri=uri
        this.model=model
    }

    async save(obj){
        const newProduct=new this.model(obj);
        console.log("saveContenedorMongoDB")
        await newProduct.save()
        return newProduct
    }
 
    async getById(id){
        return this.model.find({_id: new ObjectId(id)})
    }

    async getAll(){
        return this.model.find({})
    }

    async editById(obj,id){
        console.log('UPDATE');
        const objUpdated=await this.model.updateOne(
            {_id: new ObjectId(id)},
            {$set:obj}
        )
        return objUpdated
    }

    async editByBody(obj){
        console.log('UPDATE');
        const objUpdated=await this.model.updateOne(
            {id: new ObjectId(obj.id)},
            {$set:obj}
        )
        return objUpdated
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


module.exports=ContenedorMongo;