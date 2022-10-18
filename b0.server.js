/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const express=require('express');
const session=require('express-session')
const app=express();
require('dotenv').config({ path: './b7.configuraciones/config.env' })
const hostname = process.env.HOSTNAME;
//const port = process.env.PORT;
//const { log } = require('./b7.configuraciones/logging.js')
const logd = require('./b7.configuraciones/logging.js')
const modname='[b0.server.js]'
const logr=logd.child({modulo:`${modname}`})
//const logd=factoryLog('[b0.server.js]')
//const loge=factoryLog('[b0.server.js][Server]')
const MongoStore=require('connect-mongo')
const mongoose=require('mongoose')

const apiRouterClientes=require('./b1.routes/apiRouterClientes');
const apiRouterOper=require('./b1.routes/apiRouterOperaciones');
const apiRouterAuth=require('./b1.routes/apiRouterAuth')
const { Server }=require("socket.io");

const http=require('http');
const server=http.createServer(app)
const io=new Server(server);

//const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy

const path = require('path')

const UsersModel=require('./b3.models/user.model')

const process_PORT=parseInt(process.argv[2]) || 8081;

const yargs=require('yargs')(process.argv.slice(2))
const argv=yargs
    .default({
        PORT: 8081,
        ruta: 'local'
    })
    .alias({
        p: 'PORT'
    })
    .boolean('admin')
    .argv
//logr.verbose(argv)
//logr.verbose(argv.ruta)
logr.info(argv.PORT,{recurso:'[Puerto]'})

/* #endregion */

/* #region. 2.Recursos de web socket*/
const mensajesDBTest=[
    {id:1,nombre:"User 1",correo:"u1@company.com",edad:20,textoIngresado:"Iniciamos!"},
    {id:2,nombre:"User 2",correo:"u2@company.com",edad:21,textoIngresado:"Primero!"},
    {id:3,nombre:"User 3",correo:"u3@company.com",edad:22,textoIngresado:"Que empiece!"}
]

let messages=[]

let GetComentarios=()=>{
    const options = {
        host : 'localhost',
        port : argv.PORT,
        path: '/apiClientes/comentarios',
        method: 'GET'
    };
    // Sending the request
    const req = http.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk;
    });
    // Ending the response 
    res.on('end', () => {
        messages = JSON.parse(data);
        //logr.verbose("mensajes",data)
        //logr.verbose('mensajesJson:', JSON.parse(data))
    });
       
    }).on("error", (err) => {
    logr.error("Error: ", err)
    }).end()
            
} 

io.on('connection',(socket)=>{
    const loger=logd.child({modulo:`${modname}[io.on-connection]`})
    GetComentarios()
    socket.emit('messages',messages)
    loger.verbose(`User conectado con id: ${socket.id}`,{recurso:'socket.id'});
    let mensajesDBTemporal=messages
    loger.verbose('Usuario conectado socket inicial',{recurso:'na'})
    socket.on('new-message',data=>{
        const loger=logd.child({modulo:`${modname}[io.on-connection-socketOn_new-message]`})
        GetComentarios()
        loger.verbose("Recibido new-message",{recurso:'na'})
        dataJson=JSON.parse(data)
        loger.verbose(`DataSinId: ${dataJson}`,{recurso:'dataJson'})
        dataJson["id"]="1";
        loger.verbose(`DataConId: ${dataJson}`,{recurso:'dataJson'})
        mensajesDBTemporal.push(dataJson)
        //messagesTemp.push(data)
        io.sockets.emit('messages',mensajesDBTemporal);
        loger.verbose(`mensajesDBTemporal.new-message-fin: ${mensajesDBTemporal}`,{recurso:'mensajesDBTemporal'})
    });
    socket.on('new-message-delete',data=>{
        const loger=logd.child({modulo:`${modname}[io.on-connection-socketOn_new-message-delete]`})
        GetComentarios()
        mensajesDBTemporal=[]
        //messagesTemp.push(data)
        io.sockets.emit('messages',mensajesDBTemporal);
        loger.verbose(`mensajesDBTemporal.new-message-delete-fin: ${mensajesDBTemporal}`,{recurso:'mensajesDBTemporal'})
        
    });
    
})
/* #endregion */ 

/* #region. 3.Configuraciones de lib express, uso de EJS y APIs*/

//3.1.config. general de Lib express
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname+'/public'))
//3.2.config. APIs
app.use('/apiClientes',apiRouterClientes);
app.use('/apiOperaciones',apiRouterOper);
//3.3.config. EJS
app.set('views','./f1.views')
app.set('view engine','ejs')

/* #endregion */ 

/* #region. 4.Passport con enrutamiento*/
//4.1.Configuración de passport
passport.use('login',new LocalStrategy(
    (username,password,done)=>{
        UsersModel.findOne({username},(err,user)=>{
            if(err) return done(err)
            if(!user){logr.verbose('User not found')}

            return done(null,user)
        })
    }
))

passport.use('signup',new LocalStrategy(
    {passReqToCallback: true},
    (req,username,password,done)=>{
        logr.verbose('signup...')
        
        UsersModel.findOne({username},(err,user)=>{
            if(err) return done(err)
            if(user){
                logr.verbose('User already exists')
                return done(null,user)
            }

            const newUser={username,password,name:req.body.name}
            UsersModel.create(newUser,(err,userWithID)=>{
                if(err) return done(err)

                logr.verbose(userWithID)
                return done(null,userWithID)
            })
            
        })
        
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    UsersModel.findById(id,done)
})

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    rolling:true,
    cookie:{
        maxAge:60000,
        secure:false,
        httpOnly:true
    }
}))

app.use(passport.initialize())
app.use(passport.session())

/* #endregion */ 

/* #region. 5.Enrutamiento de autenticación y autorización*/

//5.1.Rutas de autenticación
app.get('/',apiRouterAuth.getRoot)
app.get('/login',apiRouterAuth.getLogin)

app.post(
    '/login',
    passport.authenticate('login'),
    apiRouterAuth.postLogin
    
)
app.get('/signup',apiRouterAuth.getSignup)
app.post(
    '/signup',
    passport.authenticate('signup',{failureRedirect: '/failsignup'}),
    apiRouterAuth.postSignup
)

app.get('/user_data', apiRouterAuth.getUserData);

app.get('/logout',checkAuthentication,(req,res)=>{
    let username=req.user.username
    req.session.destroy()
    return res.render('logout',{username})

})

app.get('/failsignup',apiRouterAuth.getFailSignup)

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()) next()
    else res.redirect('/login')
}

function noCheckAuthentication(req,res,next){
    next()
}

app.get('/private',checkAuthentication,(req,res)=>{
    const {user}=req
    res.send('<h1>Solo pudiste entrar porque está logueado</h1>')
})

//5.2.Rutas de autorización
app.get('/homeGeneral',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-homeGeneral]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"[username]"})
    if(!username) return res.redirect('/login')
    return res.render('homeGeneral',{username})
})

app.get('/chatGeneral',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-chatGeneral]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"[username]"})
    return res.render('chatGeneral.ejs',{username})
})

app.get('/productosClientes',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-productosClientes]`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    return res.render('productosClientes.ejs',{username})
    //return res.sendFile(path.resolve(__dirname, '../Clase28.desafio/f1.views')+'/productosClientes.html')
})

app.get('/carritoClientes',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-carritoClientes]`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    return res.render('carritoClientes.ejs',{username})
})

app.get('/homeAdmin',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-homeAdmin]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"username"})
    return res.render('homeAdmin',{username})
})

app.get('/productosMantenimiento',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-productosMantenimiento]`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSession.Username]"})
    return res.render('productosMantenimiento.ejs',{username})
})

app.get('/operaciones/randoms',checkAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-operaciones1Admin`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSession.Username]"})
    return res.render('operaciones1Admin.ejs',{username})
})

app.get('/operaciones/info',noCheckAuthentication,(req,res)=>{
    //logr.verbose(req.session);
    let username=req.session.username
    let dato1='hola'
    let id_proceso=process.pid
    nombre_plataforma=process.platform
    version_node=process.version
    carpeta_proyecto=process.cwd()
    path_ejecucion=process.execPath
    memoria_reservada=process.memoryUsage.rss()
    argumentos_entrada=process.execArgv
    logr.verbose(username,{recurso:"reqSessionUsername.appGet"})
    return res.render('operaciones2Admin.ejs',{username,id_proceso,nombre_plataforma,version_node,carpeta_proyecto,path_ejecucion,memoria_reservada,argumentos_entrada})
})

app.get('*', function (req, res) {
    const loger=logd.child({modulo:`${modname}[get-Ruta-Default]`})
    let ruta=req.path
    loger.warn(ruta,{recurso:"[path]"})
    res.send('<h1>la ruta no existe</h1>');
})

/* #endregion */ 

/* #region. 6.Pruebas temporales*/
//let datoL='Ok'
//const childLogger=logger.child({modulo:'b0.server.js'})
const loger=logd.child({modulo:`${modname}[Pruebas]`})
loger.info('Test Info message',{recurso:'[na]'});
loger.debug(`Test Debug: ${JSON.stringify({
    cookie: {path: '/',_expires: '2022-09-30T17:35:03.710Z',originalMaxAge: 60000,httpOnly: true,secure: false},
    passport: { user: 'yo' } })}`,{recurso:'[na]'});
loger.verbose('Test Verbose message',{recurso:'[na]'});
loger.warn(JSON.stringify('Test Warn message'),{recurso:'[na]'});
loger.error(JSON.stringify('Test Error message'),{recurso:'[na]'});
//loger.verbose(JSON.stringify('Test Crit message'),{recurso:'[na]'});
//loger.silly(JSON.stringify('Test Alert message'),{recurso:'[na]'});
//loger.emerg(JSON.stringify('Test Emerg message'),{recurso:'[na]'});

/* #endregion */ 

/* #region. 7.Iniciando servidor general*/
server.listen(process_PORT,()=>{
    logr.info(`Server desplegado en http://${hostname}:${process_PORT}`,{recurso:'[listen]'});
    logr.warn(`PID WORKER ${process.pid}`)
})
/* #endregion */ 

/* #region. Bloc*/

/*
const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});*/

/*
app.post('/login',passport.authenticate('login'),(req,res)=>{
    logr.verbose("req.user.postLogin.b0ServerJS",req.user)
    let username=req.session.username
    res.render('home',{username})
})

*/

/*
app.use(session({
    store:new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/sessions'
    }),
    secret:'conrat',
    resave:false,
    saveUninitialized:false
}))
*/

//3.3.Envío de datos a URLs
/*
app.get('/login',(req,res)=>{
    if(req.session.username) return res.redirect('/home')
    res.sendFile('login.html',{root: __dirname+'/public'})
})

app.post('/login',(req,res)=>{
    req.session.username=req.body.username
    return res.redirect('/home')
})

app.get('/home',(req,res)=>{
    logr.verbose(req.session);
    let username=req.session.username
    logr.verbose("reqSessionUsername.appGet",username)
    if(!username) return res.redirect('/login')
    return res.render('home',{username})
})

app.get('/logout',(req,res)=>{
    let username=req.session.username
    req.session.destroy()
    return res.render('logout',{username})

})

app.get('/chat',(req,res)=>{
    logr.verbose(req.session);
    let username=req.session.username
    logr.verbose("reqSessionUsername.appGet",username)
    return res.render('chat.ejs',{username})
})

app.get('/productos',(req,res)=>{
    logr.verbose(req.session);
    let username=req.session.username
    logr.verbose("reqSessionUsername.appGet",username)
    return res.render('productos.ejs',{username})
})
*/

//mongoose.connect
/*
function connectDB(url,cb){
    mongoose.connect(
        url,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true

        },
        err=>{
            if(!err) logr.verbose('Connected DB para passport')
            if(cb!=null) cb(err)
        }
    )
}

connectDB('mongodb://localhost:27017/dbCoderTest',err=>{
    if(err) return logr.verbose('Error connecting DB',err)   
})
*/

/* #endregion */ 



