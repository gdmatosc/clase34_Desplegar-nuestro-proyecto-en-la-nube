/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const formEnvioDatos = document.getElementById('formSendDatos');
//enviarDatosGet(0)
//imprimirDatos(1)
/* #endregion */

/* #region. 2.Recepción de datos de formulario*/

formEnvioDatos.addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = new FormData(formEnvioDatos);
    let object = {};
    payload.forEach((value, key) => object[key] = value);
    //let newPayload = JSON.stringify(object.nombre);
    let newPayload1 = object.nombre;
    if (!newPayload1){
        console.log("newPayload1.noInput.formEnvioDatos",parseInt(newPayload1))
        enviarDatosGet(50000)
        }
    else{
        console.log("newPayload1.Input.formEnvioDatos",parseInt(newPayload1))
        enviarDatosGet(parseInt(newPayload1))
    }
    //dbElegidoEscritura=dbElegidoEscrituraFunct()
    //setTimeout( function() { obtenerDatos(); }, 1000);
})

/* #endregion */ 



/* #region. 4.function...enviar.datos->any BD*/
function enviarDatosPost(newPayload){
    fetch('/apiOperaciones', {method: 'POST',headers:{'content-type':'application/json'},body: newPayload})
     .then(res => {
        res
            
        })
        
     .then(data => {
        console.log("dataPostEnviarDatos",data)
        console.log("newPayloadFetchEnviarDatos",newPayload)
        
    })
    
     .catch(error=>{
        console.log(error)
     });
}

function enviarDatosGet(cant){
    fetch(`/apiOperaciones/numerosRandom/0?cant=${cant}`)
    .then(r =>  r.json()
    .then(data => {
        console.log("data",data)
        imprimirDatos(data)
    }))
}
/*
function enviarDatosGet(cant){
    fetch(`/apiOperaciones/numerosRandom`)
    .then(response=>response)
    .then(numeroDatos=>{
        console.log("numeroGetNow: ",numeroDatos)

        imprimirDatos(numeroDatos)

    })
    .catch(error=>{
        console.log(error)
    });
}
*/
/* #endregion */ 

/* #region. 5.function...lectura.BD:obtenerDatos.anyBD*/
function obtenerDatos(){

    fetch('/apiOperaciones')
    .then(response=>response.json())
    .then(productDatos=>{
        console.log("productosDBGetNow: ",productDatos)
        console.log("productosDBGetSize: ",productDatos.length)

        imprimirDatos(productDatos)

    })
    .catch(error=>{
        console.log(error)
    });
}

/* #endregion */ 

/* #region. 6.Function...imprimir->Tabla...any DB*/
function imprimirDatos(resultado){
    //let resultadoStr=JSON.stringify(resultado)
    //document.getElementById('resultadoFuncion1').innerHTML=html
    let html=`<table class='table' id='lista-compra'>
    <thead>
        <tr>
            <th scope="col">Número random</th>
            <th scope="col">Contador</th>
            
        </tr>
    </thead>
    <tbody >`
    for (const item of resultado){
       
            html+=`
            <tr>
                <td>${item['número random generado']}</td>
                <td>${item['contador de cada número']}</td>
                
            </tr>      
            `
    }
    html+=`
    </tbody>
    </table>
    `
    document.getElementById('resultadoFuncion1').innerHTML=html
}