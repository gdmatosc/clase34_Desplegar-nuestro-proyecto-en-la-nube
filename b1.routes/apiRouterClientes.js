/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const { Router }=require('express');
const FactoryDAO=require('../b2.daos/indexDao')
const DAO=FactoryDAO()
const router=Router(); 
const logd = require('../b7.configuraciones/logging.js')
const modname='[indexDAO.js]'
const logr=logd.child({modulo:`${modname}`})
//const loger=logd.child({modulo:`${modname}[submod]`})
/* #endregion */ 

/* #region. 2.Get.chat*/

router.get('/comentarios', async (req, res) => {
    let contenedorVar=await DAO.chatGeneral.getAll();
    //console.log("contenedorVar.comentariosMongoDB.routerGet",contenedorVar)//debug
    res.json(contenedorVar)
    //console.log("Enviado.comentariosMongoDB.routerGet")//debug
});

/* #endregion */

/* #region. 3.Post.chat*/

router.post('/comentarios',async (req,res)=>{
    const dataBody=req.body;
    //console.log("username-text.comentariosFile.routerPost",dataBody)//debug
    await DAO.chatGeneral.save(dataBody);
    //console.log("Guardado.comentariosFile.routerPost")//debug
    res.send("Guardado")
})

/* #endregion */

/* #region. 3.Get.productos y carrito*/

router.get('/objetos', async (req, res) => {
    let contenedorVar=await DAO.productosGeneral.getAll();
    //console.log("contenedorVar.objetosFile.RouterGet",contenedorVar)//debug
    res.json(contenedorVar)
    //console.log("Enviado.objetosFile.RouterGet")//debug
});

router.get('/objetosCarrito',async(req,res)=>{
    res.json(await DAO.carritoProductos.getAll())
})

router.get('/objetosCarrito/:id',async(req,res)=>{
    const {id}=req.params;
    //console.log("id.routerGet",id) //debug
    let resultado=await DAO.carritoProductos.getById(Number(id))
    //console.log("getById.RouterGet",resultado) //debug
    res.json(resultado)
})
/* #endregion */

/* #region. 4.Post.productos y carrito*/

router.post('/objetos',async (req,res)=>{
    let dataBody=req.body;
    //console.log("req.bodyPost.objetosFile.RouterPost",req.body) //debug
    dataBody.precio=Number(dataBody.precio);
    if(!dataBody.nombre || !dataBody.img || !dataBody.precio){
        return res.status(400).send({error: `Los datos están incompletos ahora: ${req.body}`});
    }
    await DAO.productosGeneral.save(dataBody);
    //console.log("Guardado.objetosFile.routerPost") //debug
    res.send("Guardado.routerObjetosPostFile")
})

router.post('/objetosCarrito/:id/objetos',async(req,res)=>{
    let product=req.body
    //console.log("producto ingresado: ",product) //debug
    const cartID=req.params.id
    //console.log("cartID: ",cartID) //debug
    const cart=await DAO.carritoProductos.getById(Number(cartID))
    //console.log("cart_delID: ",cart) //debug
    let newObj={}
    if(cart.length!==0){  
        product=await DAO.carritoProductos.addID(product,cart.products)
        //console.log("cartProducts_delID: ",cart.products) //debug
        cart.products.push(product)
        //console.log("cart_preContainer.post: ",cart) //debug
        newObj=await DAO.carritoProductos.editByBody(cart)
        //console.log("newObj: ",newObj) //debug
    }
    else {
        cart.id=cartID
        cart.products=[]
        //console.log("cart_inicial.post: ",cart) //debug
        cart.products.push(product)
        //console.log("cart_preContainer.post: ",cart) //debug
        newObj=await DAO.carritoProductos.save(cart)
        //console.log("newObj: ",newObj) //debug
    }
   
    res.json(newObj)
})

/* #endregion */

/* #region. 5.Delete.General*/

router.delete('/objetos/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        //console.log("req.paramas.apiClientes.delete",req.params)//debug
        //console.log("routerDeleteID.apiClientes.delete",id)//debug
        await DAO.productosGeneral.deleteById(id)
        res.send({message:`El producto con id ${id} de un file se borró exitosamente`})
    }catch(error){
        throw error
    }
})

router.delete('/objetos',async(req,res)=>{
    res.json(await DAO.productosGeneral.deleteAll())
    //console.log("borradoTotal.objetosFile.routerDelete")//debug
})

router.delete('/comentarios',async(req,res)=>{
    res.json(await DAO.chatGeneral.deleteAll())
    //console.log("borradoTotal.comentariosFile.routerDelete")//debug
})

router.delete('/objetosCarrito/:id/objetos',async(req,res)=>{
    try{
        let product=req.body
        //console.log("id de producto ingresado: ",product) //debug
        const cartID=req.params.id
        product.cartID=cartID
        //console.log("product.cartID,id: ",product) //debug
        const newObj=await DAO.carritoProductos.deleteByBody(product)
        //console.log("newObj: ",newObj) //debug
        res.json(newObj)
        

    }catch(error){
        throw error
    }
})

/* #endregion */

module.exports=router;


/* #region. Bloc*/

//  5.Put.General.Sin uso
/*
router.put('/objetos/file/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const {field,value}=req.body;
        await contenedorFileProducts.editById(Number(id),field,value);
        res.send({message:`El producto con id ${id} se modificó exitosamente`})
    }catch(error){
        throw error
    }
})
*/

//const modelProduct=require('../b3.models/product.model');
//const modelChat=require('../b3.models/chat.LDB.model');

//const ContenedorFile=require('../b4.contenedores/contenedorFile')
//const contenedorFileProducts=new ContenedorFile('productosObjetosAdv.json')
//const contenedorFileUsuarios=new ContenedorFile('usuarios.json')
//const contenedorFileChat=new ContenedorFile('mensajesT1.json')
//const contenedorFileChat=new ContenedorFile('chatBasic.json')
//const ContenedorMongo=require('../b2.contenedores/contenedorMongo')
//const contenedorMongoProducts=new ContenedorMongo('mongodb://localhost:27017/productosM2',modelProduct)
//const contenedorMongoChat=new ContenedorMongo('mongodb://localhost:27017/dbCoderTest',modelChat)

/*
const messagesP=[
    {"id":1,"title":"Escuadra","thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png","price":45},
    {"id":2,"title":"Calculadora19","thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png","price":56},
    {"id":3,"title":"Globo t.","thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png","price":67}
]
*/

/*
router.get('/comentarios/file', async (req, res) => {
    await contenedorFileChat.init();
    let contenedorVar=await contenedorFileChat.getAll();
    console.log("contenedorVar.comentariosFile.RouterGet",contenedorVar)
    res.json(contenedorVar)
    console.log("Enviado.comentariosFile.RouterGet")
});
*/

/*
router.get('/comentarios/mongoDB', async (req, res) => {
    let contenedorVar=await DAO.chatGeneral.getAll();
    //let contenedorVar=await contenedorMongoChat.getAll();
    console.log("contenedorVar.comentariosMongoDB.routerGet",contenedorVar)
    res.json(contenedorVar)
    console.log("Enviado.comentariosMongoDB.routerGet")
});
*/

//let contenedorVar=await contenedorMongoChat.getAll();

/*
router.post('/comentarios/file',async (req,res)=>{
    const dataBody=req.body;
    console.log("username-text.comentariosFile.routerPost",dataBody)
    await contenedorFileChat.save(dataBody);
    console.log("Guardado.comentariosFile.routerPost")
})
*/
/*
router.post('/comentarios/mongoDB',async (req,res)=>{
    const {username,text}=req.body;
    console.log("username-text.comentariosMongoDB.routerPost",{username,text})
    await contenedorMongoChat.save({username,text});
    console.log("Guardado.comentariosMongoDB.routerPost")
})
*/
//await contenedorFileChat.save(dataBody);

/*
router.get('/objetos/mongoDB', async (req, res) => {
    let contenedorMongoProductsNew=await contenedorMongoProducts.getAll();
    contenedorVar=contenedorMongoProductsNew;
    console.log("contenedorVar.objetosMongoDB.RouterGet",contenedorVar)
    res.json(contenedorMongoProductsNew)
    console.log("Enviado.objetosMongoDB.RouterGet")
});
*/

//await contenedorFileProducts.init();
//let contenedorVar=await contenedorFileProducts.getAll();

//app.get('/products',async (req,res)=>res.send(await productDao.getAll()))

/*
router.post('/objetos/mongoDB',async (req,res)=>{
    let {title,thumbnail,price}=req.body;
    console.log("req.bodyPost",req.body)
    price=Number(price);
    if(!title || !thumbnail || !price){
        return res.status(400).send({error: `Los datos están incompletos ahora: ${req.body}`});
    }
    await contenedorMongoProducts.save({title,thumbnail,price});
    console.log("Guardado.objetosMongoDB.routerPost")
    res.send("Guardado")
})
*/

 //let {nombre,img,precio,descripcion,promocion}=req.body;
 //precio=Number(precio);
 //await DAO.productosGeneral.save({nombre,img,precio,descripcion,promocion});
 //await contenedorFileProducts.save({title,thumbnail,price});

 //app.post('/products',async (req,res)=>res.send(await productoDao.save(req.body)))

/*
router.delete('/objetos/mongoDB/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("routerDeleteMongoDBID",id)
        await contenedorMongoProducts.deleteById(id);
        res.send({message:`El producto con id ${id} de un mongoDB se borró exitosamente`})
    }catch(error){
        throw error
    }
})
*/

/*
router.delete('/objetos/mongoDB',async(req,res)=>{
    res.json(await contenedorMongoProducts.deleteAll())
    console.log("borradoTotal.objetosmongoDB.routerDelete")
})
*/

/*
router.delete('/comentarios/mongoDB',async(req,res)=>{
    res.json(await contenedorMongoChat.deleteAll())
    console.log("borradoTotal.comentariosMongoDB.routerDelete")
})
*/
/*
router.delete('/',async(req,res)=>{
    res.json(await contenedorFileProducts.deleteAll())
    console.log("borrador total")
})
*/

//await contenedorFileProducts.deleteById(Number(id));
//res.json(await contenedorFileProducts.deleteAll())
//res.json(await contenedorFileChat.deleteAll())

/* #endregion */