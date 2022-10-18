/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

//let dbElegidoLectura='file'
//let dbElegidoEscritura='file'
const formEnvioDatos = document.getElementById('formSendDB');
//dbElegidoLectura=document.getElementById("dbSelectLectura").value;
//dbElegidoEscritura=document.getElementById("dbSelectEscritura").value;
//console.log("Antes de obtenerDatos.dbElegidoLectura",dbElegidoLectura)
//console.log("Antes de obtenerDatos.dbElegidoEscritura",dbElegidoEscritura)
obtenerDatos()

/* #endregion */ 

/* #region. 2.Key.function..objeto.Select:dbSelect*/
/*
function seleccionar_actualizarContenidoDB(){
    dbElegidoLectura=document.getElementById("dbSelectLectura").value;
    console.log("dbElegidoLecturaJSproductos",dbElegidoLectura)
    obtenerDatos(dbElegidoLectura)
}

let dbElegidoEscrituraFunct=function seleccionarEscribirDB(){
    dbElegidoEscritura=document.getElementById("dbSelectEscritura").value;
    console.log("dbElegidoEscrituraJSproductos",dbElegidoEscritura)
    return dbElegidoEscritura
}
*/
/* #endregion */ 

/* #region. 3.Key.function..objeto.Formulario:formSendDB */

formEnvioDatos.addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = new FormData(formSendDB);
    let object = {};
    payload.forEach((value, key) => object[key] = value);
    object.descripcion="generico"
    object.promocion="generico"
    let newPayload = JSON.stringify(object);
    console.log("newPayload.formEvioDatos",newPayload)
    //dbElegidoEscritura=dbElegidoEscrituraFunct()
    enviarDatos(newPayload)
    setTimeout( function() { obtenerDatos(); }, 1000);

})

/* #endregion */ 

/* #region. 4.function...enviar.datos->any BD*/
function enviarDatos(newPayload){
    fetch('/apiClientes/objetos', {method: 'POST',headers:{'content-type':'application/json'},body: newPayload})
     .then(res => {
        res
        //res.json()
        
            /*Toastify({
                text: "Guardado!",
                duration: 3000,
                gravity: 'top',
                offset: {
                    x: '60em', 
                    y: '12em' 
                  },
                style: {
                    background: 'linear-gradient(to right, rgb(4, 88, 25), rgb(16, 100, 37))'
                }
            }).showToast();*/
            
        })
        
     .then(data => {
        console.log("dataPostEnviarDatos",data)
        console.log("newPayloadFetchEnviarDatos",newPayload)
        
    })
    /*
     .catch(error=>{
        console.log(error)
     });*/
}
/* #endregion */ 

/* #region. 5.function...lectura.BD:obtenerDatos.anyBD*/
function obtenerDatos(){

    fetch('/apiClientes/objetos',{headers:{admin:'true'}})
    .then(response=>response.json())
    .then(productDatos=>{
        console.log("productosDBGetNow: ",productDatos)
        console.log("productosDBGetSize: ",productDatos.length)

        imprimirTablaCompleta(productDatos)

    })
    .catch(error=>{
        console.log(error)
    });
}
/*
fetch('/apiClientes/objetos',{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    
    console.log("productosGet: ",productDatos)
    console.log("productosGetSize: ",productDatos.length)
    
    //let html1=`<span>${productDatos.length}</span>`
    
    //document.getElementById('Resumen1').innerHTML=html1
    
})
.catch(error=>{
    console.log(error)
});
*/
/* #endregion */ 

/* #region. 6.Function...imprimir->Tabla...any DB*/
function imprimirTablaCompleta(productDatos){
    let html=`<table class='table' id='lista-compra'>
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">imagen</th>
            <th scope="col">Eliminar</th>
        </tr>
    </thead>
    <tbody >`
    for (const product of productDatos){
        if (product["_id"]){
            let product_id=product["_id"]
            html+=`
            <tr id='itemFila${product_id}'>
                <td>${product.nombre}</td>
                <td>${product.precio}</td>
                <td><img src=${product.img} style='width:40px; height:30px;'></td>
                <td>
                    <a href="#" id='itemRegistro' ><i class='fa fa-times-circle' style='color: rgb(221, 215, 215)' onclick='eliminarPorID("${product_id}")'></i></a>
                </td>
            </tr>      
            `
        }
        else{
            html+=`
            <tr id='itemFila${product.id}'>
                <td>${product.nombre}</td>
                <td>${product.precio}</td>
                <td><img src=${product.img} style='width:40px; height:30px;'></td>
                <td>
                    <a href="#" id='itemRegistro' ><i class='fa fa-times-circle' style='color: rgb(221, 215, 215)' onclick='eliminarPorID("${Number(product.id)}")'></i></a>
                </td>
            </tr>      
            `
        }
       
    }
    html+=`
    </tbody>
    </table>
    `
    document.getElementById('tablaBD').innerHTML=html
}
/* #endregion */ 

/* #region. 7.function...eliminaciónxID...any DB*/
function eliminarPorID(idProducto){
    console.log("idProducto.círculo de delete 0",idProducto)
    fetch(`/apiClientes/objetos/${idProducto}`,{method: 'DELETE',headers:{'content-type':'application/json'}})
    .then(response=>response)
    .then(productDatos=>{
        //console.log("productosDBGetElimando: ",productDatos)
        console.log("productosDBGetSizeEliminado: ",productDatos.length)
        console.log("dbElegidoLecturaInFetchEliminado",idProducto)
    })
    .catch(error=>{
        console.log(error)
    });
    document.getElementById(`itemFila${idProducto}`).remove();
    setTimeout( function() { obtenerDatos(); }, 1000);
    //console.log("círculo de delete 1.idProducto",idProducto)
}
/* #endregion */ 

/* #region. 8.function...eliminación.total.mongoDB*/
/*
function eliminarContenidoDB(){
    fetch(`/api/objetos/mongoDB`,{method: 'DELETE',headers:{'content-type':'application/json'}})
    .then(response=>response)
    .then(productDatos=>{
        console.log("productosDBGetElimando: ",productDatos)
        console.log("productosDBGetSizeEliminado: ",productDatos.length)
        console.log("dbElegidoLecturaInFetchEliminado",dbElegidoLectura)
    })
    .catch(error=>{
        console.log(error)
    });
}
*/
/* #endregion */ 
/*
Toastify({
    text: "Actualizado!",
    duration: 3000,
    gravity: 'top',
    offset: {
        x: '38em', 
        y: '12em' 
      },
    style: {
        background: 'linear-gradient(to right, rgb(4, 88, 25), rgb(16, 100, 37))'
    }
}).showToast();*/