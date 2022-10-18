
const res=require('express/lib/response')
const path = require('path')
const logd = require('../b7.configuraciones/logging.js')
const modname='[apiRouterAuth.js]'
const logr=logd.child({modulo:`${modname}`})
//const logd=factoryLog(modname)
//const logdr=factoryLog.child({modulo:`[${modname}]`})

function getRoot(req,res){
    res.sendFile(path.resolve(__dirname, '../public')+'/index.html')
}

function getLogin(req,res){
    //const loge=factoryLog(`${modname}[getlogin]`)
    if(req.isAuthenticated()){
        const user=req.user
        let username=req.user.username
        logr.info(username,{recurso:'[username]'})
        //res.send('login-ok')
        res.render('homeGeneral',{username})
    }else{
        
        res.sendFile(path.resolve(__dirname, '../public')+'/login.html')
    }
}

function postLogin(req,res){
    //const loge=factoryLog(`${modname}[postlogin]`)
    const loger=logd.child({modulo:`${modname}[postLogin]`})
    loger.info(JSON.stringify(req.user),{recurso:'[req.user]'})
    loger.debug(JSON.stringify(req.session),{recurso:'[req.session]'})
    loger.info(JSON.stringify(req.user.username),{recurso:'[req.user.username]'});
    let username=req.user.username
    res.render('homeGeneral',{username})
}

function getSignup(req,res){
    res.sendFile(path.resolve(__dirname, '../public')+'/signup.html')
}

function getFailSignup(req,res){
    res.send('Fail signup')
}

function postSignup(req,res){
    console.log("req.user.postSignup.RoutesJS",req.user)
    let username=req.user.username
    res.render('homeGeneral',{username})

}

function getUserData(req, res) {

    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
            username: req.user
        });
    }
}

module.exports={
    getRoot,
    getLogin,
    postLogin,
    getSignup,
    getFailSignup,
    postSignup,
    getUserData
}