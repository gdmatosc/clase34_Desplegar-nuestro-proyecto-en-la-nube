/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const fs=require('fs')
/* #endregion */

/* #region. 2.Key.class:Contenedor*/

class Contenedor {
    constructor(nombreArchivo){
        this.archivo=nombreArchivo
        this.data=[]
        try{
            console.log('Initializing File connection...')
            this.init()
        }
        catch(error){
            console.log(`Error initializing File connection ${error}`)

        }
    } 

    async init(){
        //console.log("thisdata-inicio.init.contenedorFile: ",this.data)
        this.data=await this.getAll()
        //console.log("thisdata-fin.init.contenedorFile: ",this.data)
    }

    async addID(objeto,dataBase){
        try{
            await this.init()
            console.log("this.data.length.addID",dataBase.length)
            objeto={...objeto,id:dataBase.length+1}
            console.log("objeto.addID",objeto)
            return objeto
        }
        catch (error){
            console.log(error)
        }
    }

    async save(objeto){
        try{
            
            //objeto={...objeto,id:this.data.length+1}
            let objeto1=await this.addID(objeto,this.data)
            this.data.push(objeto1)
            console.log("thisData.save.contenedorFile: ",this.data)
            console.log("objeto.save.contenedorFile: ",objeto)
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,JSON.stringify(this.data)+'\n')
            return objeto
        }
        catch (error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            
            let objetosJSON=await fs.promises.readFile(`./b5.files_storage/${this.archivo}`,'utf-8');
            let objetosParse = JSON.parse(objetosJSON);
            return objetosParse
        }
        catch (error){
            console.log(error)
        }
    }

    async getById(id){
        try{
            let productos=await this.getAll()
            let coincidencia=null
            productos.forEach(product =>{
                if(product.id===id){
                    coincidencia=product
                }
            })
            return coincidencia
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            console.log("deleteAll-inicio.contenedorFile")
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,'[]')
            console.log("deleteAll-final.contenedorFile")
            return "Borrado completado de contenido del File"
        }
        catch(error){
            console.log(error)
        }
    }

    async editById(id,campo,valor){
        try{
            let productos=await this.getAll();
            let producto=productos.filter(producto=>producto.id===id)[0];
            producto[campo]=valor;
            const index=productos.findIndex(producto=>producto.id===id);
            productos.splice(index,1,producto);
            const productosParsed=JSON.stringify(productos);
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,productosParsed)
        }
        catch(error){
            console.log(error)
        }
    }
    
    async editByBody(obj){
        try{
            let productos=await this.getAll(); 
            console.log("productoIni.editByBody: ",productos)
            
            console.log("obj.editByBody: ",obj)
            let producto=productos.filter(producto=>producto.id===obj.id)[0];
            console.log("productoFilter.editByBody: ",producto)
            //con 2 carrito el index es 0 o 1
            const index=productos.findIndex(producto=>producto.id===obj.id);
            console.log("index.editByBody: ",index)
            productos.splice(index,1,obj);
            console.log("productoNew.editByBody: ",productos)
            const productosParsed=JSON.stringify(productos);
            console.log("productosParsed.editByBody: ",productosParsed)
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,productosParsed)
            return obj
        }
        catch(error){
            console.log(error)
        }
    }
    
    /*
    async editByBody(obj){
        try{
            let productos=await this.getAll(); 
            //let producto=productos.filter(producto=>producto.id===obj.id)[0];
            const index=productos.findIndex(producto=>producto.id===obj.id);
            productos.splice(index,1,obj);
            const productosParsed=JSON.stringify(productos);
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,productosParsed)
            return obj
        }
        catch(error){
            console.log(error)
        }
    }
    */
    async deleteById(id){
        try{
            let productos=await this.getAll()
            console.log("id.deleteByID.contenedorFile",id)
            id=Number(id)
            console.log("id.deleteByID.contenedorFile",id)
            let productosCargar=productos.filter(obj=>obj.id !==id)
            let i=0;
            console.log("productosCargar.deleteByID.contenedorFile",productosCargar)
            let productosCargarNew = productosCargar.map(function(obj){
                let rObj = {};
                rObj=obj
                i=i+1
                rObj.id = i;
                console.log("rObj.id",rObj.id)
                return rObj;
                });
            console.log("productosCargarNew.deleteByID.contenedorFile",productosCargarNew)
            
            
            await this.deleteAll()
            let productosTemp=await this.getAll()
            console.log("productosTemp.deleteByID.contenedorFile",productosTemp)
            
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,JSON.stringify(productosCargarNew)+'\n')
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteByBody(obj){
        try{
            let productos=await this.getAll()
            let cartID=parseInt(obj.cartID)
            let productID=parseInt(obj.id)
            console.log("obj.cartID.deleteByBody)",cartID)
            console.log("obj.id.deleteByBody)",productID)
            let productosCarritoFiltroNotCartID=productos.filter(producto=>producto.id !== cartID)[0];
            let productosCargar=[productosCarritoFiltroNotCartID]
            console.log("productosCarritoFiltroNotCartID.deleteByBody: ",productosCarritoFiltroNotCartID)
            console.log("type.of.obj.cartID.next1.deleteByBody)",typeof cartID)
            let productosCarritoFiltroEqCartID=productos.filter(producto=>producto.id===cartID)[0];
            console.log("productosCarritoFiltroEqCartID.deleteByBody: ",productosCarritoFiltroEqCartID.products)
            let productosCarritoFiltroNotIdOfFiltroEqCartId=productosCarritoFiltroEqCartID.products.filter(producto=>producto.id !== productID);
            console.log("productosCarritoFiltroNotIdOfFiltroEqCartId.deleteByBody: ",productosCarritoFiltroNotIdOfFiltroEqCartId)
            
            let i=0;
            let subproductosCargarPre = productosCarritoFiltroNotIdOfFiltroEqCartId.map(function(obj){
                let rObj = {};
                rObj=obj
                i=i+1
                rObj.id = i;
                console.log("rObj.id",rObj.id)
                return rObj;
                });
            console.log("subproductosCargarNewFile.deleteByBody",subproductosCargarPre)

            let subproductosCargar={...{"products":subproductosCargarPre},id:cartID}
            console.log("productosCargar.deleteByBody",productosCargar)
            console.log("subproductosCargar.deleteByBody",subproductosCargar)
            
            productosCargar.push(subproductosCargar)
            console.log("productosCargarFile.deleteByBody",productosCargar)
       
            //
            //console.log("productosCargarNewFile.deleteByBody",productosCargarNew)

            //let productosCargar=productos.filter(obj=>obj.id !==id)
            
            await this.deleteAll()
            
            
            await fs.promises.writeFile(`./b5.files_storage/${this.archivo}`,JSON.stringify(productosCargar)+'\n')
        }
        catch(error){
            console.log(error)
        }
    }

}
/* #endregion */

/* #region. 3.Object.functions...show.values.variables*/

/* #endregion */


module.exports=Contenedor