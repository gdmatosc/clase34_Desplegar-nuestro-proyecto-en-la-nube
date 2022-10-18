/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

let carritoElegido=1
let carritoElegido1=1000
obtenerLocal()
/* #endregion */ 

/* #region. 2.Llenar ícono de carrito con su cantidad de productos*/


fetch('/apiClientes/objetosCarrito',{headers:{admin:'true'}})
        .then(response=>response.json())
        .then(cartDatos=>{
            console.log("carritoGet: ",cartDatos)
            console.log("carritoGetSize: ",cartDatos.length)
            
            let html2="<select name='carSelect' id='carSelect' onchange='loadCarritoElegido()'>"
            html2+='<option value="" selected="selected" hidden="hidden">Seleccionar N° carrito</option>'
            html2+=`
            <option value=1>Standard</option>
            <option value=2>Premium</option>
            <option value=3>Platinum</option>
            <option value=4>Empresarial</option>
            <option value=5>Corporativo</option>
            `
            
            /*
                if(cartDatos.length!==0){
                    for (const cartItem of cartDatos){
                        html2+=`
                        <option value=${cartItem.id}>${cartItem.id}</option>
                        `
                        }
                }
                else{
                    html2+=`
                        <option value=1>1</option>
                        `
                }
                */
            
            html2+="</select>"
            
            
            document.getElementById('comboCarrito').innerHTML=html2
            carritoElegido=document.getElementById("carSelect").value;
            
            console.log("carritoElegidoInterno",carritoElegido)
           
            guardarLocal("CartIdentificador", JSON.stringify(carritoElegido));
            
        })
        .catch(error=>{
            console.log(error)
        });

function loadCantidadItemsxCarrito(carritoElegidoLast){
    console.log("carritoElegidoArg.loadCantidadItemsxCarrito",carritoElegidoLast)
    fetch(`/apiClientes/objetosCarrito/${carritoElegidoLast}`,{headers:{admin:'true'}})
        .then(response=>response.json())
        .then(productDatos=>{
            
            
            
            //console.log("carritoTest1",carritoTest1)
            console.log("productosDatos.Fetch.productosClientes",productDatos)
            if (!productDatos || !productDatos.products){
                console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",0)
                let html1=`<span>0</span>`
                console.log("html1.noDatos.fetch",html1)
                document.getElementById('Resumen1').innerHTML=html1  
            }
            else{

                console.log("productosGetCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products)
                console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products.length)
                console.log("carritoElegidoArg.fetch.loadCantidadItemsxCarrito",carritoElegidoLast)
                let html1=`<span>${productDatos.products.length}</span>`
                console.log("html1.siDatos.fetch",html1)
                document.getElementById('Resumen1').innerHTML=html1 
            }
            
            
            
            
        })
        .catch(error=>{
            console.log(error)
        });
}

function loadCarritoElegido(){
    //carritoElegido=1
    carritoElegido=document.getElementById("carSelect").value;
    guardarLocal("CartIdentificador", JSON.stringify(carritoElegido));
    carritoTest1=50;
    //obtenerLocal()
    loadCantidadItemsxCarrito(carritoElegido)
    console.log("carritoElegidoExterno1",carritoElegido)
    
    return carritoElegido
}



/* #endregion */ 

/* #region. 3.Llenar la lista de productos disponibles para comprar*/
fetch('/apiClientes/objetos',{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    
    console.log("productosGet: ",productDatos)
    console.log("productosGetSize: ",productDatos.length)
    
    //let html1=`<span>${productDatos.length}</span>`
    let html="<div class='card-deck mb-3 row text-center'>"
    for (const product of productDatos){
        html+=`
                <div class="card card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-bold">${product.nombre}</h4>
                    </div>
                    <div class="card-body">
                        <img src=${product.img} class="card-img-top_3img">
                        <h1 class="card-title pricing-card-title precio">$ <span class="">${product.precio}</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li></li>
    
                            <li>${product.descripcion}</li>
                            <li>${product.promocion}</li>
                        </ul>
                        <button type="button" onclick="agregarCarritoNew('${product.nombre}','${product.img}',${product.precio},'${product.descripcion}','${product.promocion}')" href="" class="btn btn-block btn-primary" data-id="1">Comprar</button>
                    </div>
                </div>
        `
    }
    html+="</div>"
    document.getElementById('lista-productos').innerHTML=html
    //document.getElementById('Resumen1').innerHTML=html1
    
})
.catch(error=>{
    console.log(error)
});
/* #endregion */ 

/* #region. 4.Actualizar los productos comprados en carrito*/


let agregarCarritoNew=(dato1,dato2,dato3,dato4,dato5)=>{
    let nuevoProducto={}
    //nuevoProducto.id=document.getElementById("carSelect").value
    nuevoProducto.nombre=dato1
    nuevoProducto.img=dato2
    nuevoProducto.precio=dato3
    nuevoProducto.descripcion=dato4
    nuevoProducto.promocion=dato5
    console.log("nuevoProducto: ",nuevoProducto)
    fetch(`/apiClientes/objetosCarrito/${carritoElegido}/objetos`,{method:'POST',headers:{'content-type':'application/json',admin:'true'},body:JSON.stringify(nuevoProducto)})
        .then(response=>response)
        .then(datosFetch=>{

            console.log("productosPost: ",datosFetch)
            console.log("carritoElegidoTemp",datosFetch.products.length)
            obtenerLocal()
            //loadCantidadItemsxCarrito(carritoElegido)
        })
        .catch(error=>{
            console.log(error)
        });
    
    
    console.log("Click en Botón",dato1,dato2)
}


/* #endregion */ 

/* #region. 5.Guardar y cargar datos de carrito en cache del navegador*/
//Recibir llamada como función para guardar a nivel local
let guardarLocal = (identificador, valor) => { localStorage.setItem(identificador, valor)}

//Recibir llamada como función para obtener cargar el localStorage
function obtenerLocal(){
    let obtenerDatoEnStorage = localStorage.getItem('CartIdentificador')
    let DatoStorageDisponible = JSON.parse(obtenerDatoEnStorage);
    if (!carritoElegido){
        carritoElegido=DatoStorageDisponible
        console.log("carritoElegido.localStorage",carritoElegido)
        
        loadCantidadItemsxCarrito(carritoElegido)
        console.log("DatoStorageDisponible",DatoStorageDisponible)

    }
    else {
        loadCantidadItemsxCarrito(1)
        console.log("DatoStorageDisponible",1)
    }
    
    
}
/* #endregion */ 

/* #region. Bloc*/

/*
let agregarCarrito=(dato1,dato2,dato3,dato4,dato5)=>{
    let nuevoProducto={}
    nuevoProducto.nombre=dato1
    nuevoProducto.img=dato2
    nuevoProducto.precio=dato3
    nuevoProducto.descripcion=dato4
    nuevoProducto.promocion=dato5
    console.log("nuevoProducto: ",nuevoProducto)
    fetch('/api/products',{method:'POST',headers:{'content-type':'application/json',admin:'true'},body:JSON.stringify(nuevoProducto)})
        .then(response=>response.json())
        .then(datosFetch=>{

            console.log("productosPost: ",datosFetch)
        })
        .catch(error=>{
            console.log(error)
        });
    console.log("Click en Botón",dato1,dato2)
}
*/

/*
fetch('/api/products',{headers:{admin:'true'}})
            .then(response=>response.json())
            .then(productsi=>{
                console.log("productos: ",productsi)
                let html="<table>"
                for (const product of productsi){
                    html+=`
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.nombre}</td>
                            <td>${product.descripcion}</td>
                            <td>${product.precio}</td>
                            <td data-id="${product.id}" class="add">Add </td>
                        </tr>   
                    `
                }
                html+="</table>"
                document.getElementById('products').innerHTML=html
                loadEvent()
            })
            .catch(error=>{
                console.log(error)
            });

function loadEvent(){
    const btnAdds=document.getElementsByClassName('add')
    for (const btn of btnAdds){
        btn.onclick=(e)=>{
            const id=e.target.getAttribute('data-id')
            const admin=document.getElementById('isAdmin').checked
            console.log("A guardar el id",id,"Con admin: ",admin)
        }
    }
}

*/

/*
// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {method: 'POST',mode: 'cors', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)});
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
*/

/* #endregion */ 


