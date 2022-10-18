const autocannon=require('autocannon')
const {PassThrough}=require('stream')

function run(url){
    const buf=[]
    const outputStream=new PassThrough()
    const inst=autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst,{outputStream})

    outputStream.on('data',data=>{
        buf.push(data)
    })

    inst.on('done',()=>{
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log('Running all benchmarks in parallel from b8.pruebas_performance....')

//run("http://127.0.0.1:8080/productosMantenimiento")
//run("http://127.0.0.1:8080/apiClientes/objetos")
run("http://127.0.0.1:8081/operaciones/info")
//run("http://127.0.0.1:8080/apiOperaciones/numerosRandom/0?cant=10000")







