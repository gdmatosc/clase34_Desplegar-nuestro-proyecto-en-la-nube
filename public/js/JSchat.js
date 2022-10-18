/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const socket=io.connect();
//const element1=document.getElementById('form1ro')
//const element2=document.getElementById('form2do') <img src="./img/icon_48px_man1.png" style='width:40px;'>
console.log('socket ui')
let usuarioElegidoID=1
let textoIn=''
const usuariosBackup=[
    {id:1,nombre:"Jose",correo:"jose.r@company.com", edad:25,thumbnail:"./img/icon_48px_man1.png"},
    {id:2,nombre:"Ricardo",correo:"ricardo.v@company.com", edad:27,thumbnail:"./img/icon_48px_man2.png"},
    {id:3,nombre:"Luis",correo:"luis.r@company.com", edad:29,thumbnail:"./img/icon_48px_man3.png"}
]
/* #endregion */ 

/* #region. 2.Imprimir mensajes de socket en los div id:messages, id:messages1*/
//Recepción de datos del socket
imprimirMensajes()
function imprimirMensajes(){
    socket.on('messages',(messages)=>{
        console.log('mensajes.socket.cliente.recibido.JS',messages);
        render(messages);
    }) 
}


//Función render
const render=(data)=>{
    const html=data.map((element,index)=>{
        return(`
            <div class="contenedorChatRespuesta">
                <strong >${element.correo}</strong>
                <strong >[${element.fecha}]</strong>: 
                <em >${element.textoIngresado} </em>
                <img src=${element.thumbnail} style='width:40px;'>
            </div>
        `)
    }).join('');
    document.getElementById('messages').innerHTML=html;
}
//Recepción de datos del socket
/*socket.on('messages',(messages)=>{
    console.log(messages);
    render2(messages);
}) */

/* #endregion */ 

/* #region. 3.Impresiones de pantalla con funciones de soporte*/
imprimirSelect()
imprimirInputs()
imprimirBotonEnvio()

function imprimirSelect(){
    let html=`
    <br>
    <div class="containerVirtualForm">
    <label>Nombre:</label>
    `
    html+="<select name='userSelect' id='userSelect' onchange='loadNombreSelect()'>"
    for (const usuarioB of usuariosBackup){
            html+=`
            <option value=${usuarioB.id}>${usuarioB.nombre}</option>
            `
    }
    html+="</select>"  
    html+=`
    </div>
    <br>`
    document.getElementById('virtualSelect').innerHTML=html
    //form1EnvioDatos()
}

function imprimirInputs(){
    let html=`<div id='groupInputs'>`      
    html+=`
        <div class="containerVirtualForm">
            <label>Correo:</label>
            <input type="text" name="correo" value='${valorSelectCorreo(usuarioElegidoID)}'>
        </div>
        <br>
        <div class="containerVirtualForm">
            <label>Edad:</label>
            <input type="number" name="edad" value=${valorSelectedad(usuarioElegidoID)}>
        </div>
        <br>
        <div class="containerVirtualForm">
            <label>Mensaje:</label>
            <input type="text" name="textoIngresado" id="textoIngresado">
        </div>
        <div class="containerBotones">
        <div id="BotonEnvio">
        </div>
        <div>
        <br>
        <button class="btnLimpiarBD" onclick=eliminarContenidoBD() type="submit">LimpiarBD</button>
        </div>
        </div>
        <br><br>  `
    html+=`</div>`
    document.getElementById('virtualForm').innerHTML=html
    //form1EnvioDatos()
}

function imprimirBotonEnvio(){
    let html=`<br>`
    html+=`<button class="btnEnviar" type="button" onclick="groupInputsEnviarDatos('${valorSelectnombre(usuarioElegidoID)}',${valorSelectedad(usuarioElegidoID)},'${valorSelectCorreo(usuarioElegidoID)}','${valortextoIngresado()}')">Enviar`
    html+="</button>"  
    document.getElementById('BotonEnvio').innerHTML=html
    console.log("boton impreso")
}

function valorSelectnombre(usuarioElegidoID){
    let edadSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["nombre"]
    console.log("valorSelect.nombreSeleccionado",edadSeleccionado)
    return (edadSeleccionado)
}

function valorSelectedad(usuarioElegidoID){
    let edadSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["edad"]
    console.log("valorSelect.edadSeleccionado",edadSeleccionado)
    return (edadSeleccionado)
}

function valorSelectThumbnail(){
    let thumbailSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["thumbnail"]
    console.log("valorSelect.thumbnailSeleccionado",thumbailSeleccionado)
    return (thumbailSeleccionado)
}

function valorSelectCorreo(usuarioElegidoID){
    //usuarioElegidoID=document.getElementById("userSelect").value;
    let correoSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["correo"]
    console.log("valorSelect.correoSeleccionado",correoSeleccionado)
    return correoSeleccionado
}

function valortextoIngresado(){
    textoIn=document.getElementById("textoIngresado").value;
    //let correoSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["correo"]
    console.log("textoIn.correoSeleccionado",textoIn)
    return textoIn
}

inputTextListener()
function inputTextListener(){
    const input = document.getElementById('textoIngresado');
    input.addEventListener('input', function updateValue(e) {
        imprimirBotonEnvio()
        console.log("fin.InputaddEventListener")
      })
}

function loadNombreSelect(){
    usuarioElegidoID=document.getElementById("userSelect").value;
    let nombreSeleccionado=usuariosBackup.find(function(x) { return x.id == usuarioElegidoID })["nombre"]
    console.log("loadMensajeSelect.nombreSeleccionado",nombreSeleccionado)
    imprimirInputs()
    valorSelectThumbnail()
    imprimirBotonEnvio()
    inputTextListener()
    console.log("fin.loadNombreSelect")
    return nombreSeleccionado
}

function loadTextoIngresado(){
    textoIn=document.getElementById("textoIngresado").value;
    console.log("loadTextoSelect.textoIn",textoIn)
    imprimirBotonEnvio()
    console.log("fin.loadTextoSelect")
}
/* #endregion */ 

/* #region. 4.Envío y eliminación a backend desde formularios y botones*/
 
/*Virtual form 1ro*/
function groupInputsEnviarDatos(dato1,dato2,dato3,dato4){
    
    
    let usuarioSend={}
    usuarioSend.nombre=dato1
    usuarioSend.edad=dato2
    usuarioSend.correo=dato3
    let dateString=new Date().toLocaleString()
    usuarioSend.fecha=dateString
    usuarioSend.thumbnail=valorSelectThumbnail()
    usuarioSend.textoIngresado=dato4
    usuarioSendParsed=JSON.stringify(usuarioSend)
    
    fetch('/apiClientes/comentarios', 
        {method: 'POST',
        headers:{'content-type':'application/json'},
        body: usuarioSendParsed
        }).then(res => {
            console.log("resPostFetch")
            res}).then(data => {
            console.log("dataPostFetch")
        //console.log("dataPost",data)
        //console.log("usuarioSendParsed.fetch.apiComentariosFile",usuarioSendParsed)
    });
        
    console.log("usuarioSendParsed.groupInputsEnviarDatos-final",usuarioSendParsed)
    //socket.emit('new-message',usuarioSendParsed);
    socket.emit('new-message',usuarioSendParsed);
}
/* Formulario 2do */
/*
form2Listener()
function form2Listener(){
    const form2 = document.getElementById('form2do');
    form2.addEventListener('submit', function(e) {
        console.log("form2AddEventListener-Inicio")
        e.preventDefault();
        const payload = new FormData(form2);
        let object = {};
        payload.forEach((value, key) => object[key] = value);
        let newPayload = JSON.stringify(object);
        
        fetch('/api/comentarios', {method: 'POST',headers:{'content-type':'application/json'},body: newPayload})
         .then(res => res.json())
         .then(data => {
            console.log("dataPost",data)
            console.log("newPayload",newPayload)
        })
        
        socket.emit('new-message',newPayload);
        console.log("SocketnewPayload1",newPayload)
})
}*/

function eliminarContenidoBD(){
    fetch(`/apiClientes/comentarios`,{method: 'DELETE',headers:{'content-type':'application/json'}})
    .then(response=>response)
    .then(productDatos=>{
        console.log("productosDatos.fetch.apiComentariosFile: ",productDatos)
        console.log("productosDatosLength.fetch.apiComentariosFile: ",productDatos.length)
        socket.emit('new-message-delete',{});
    })
    .catch(error=>{
        console.log(error)
    });
}

/* #endregion */