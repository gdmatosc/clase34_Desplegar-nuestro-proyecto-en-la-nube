const calculo=(cantidad)=>{
    let num_random= []
    let new_arr = []
    num_random =generar_num_random(cantidad)
    //res.json({num_random})//debug
    contar_num(num_random)

    function generar_num_random(cantidad){
        for (let i=0; i<cantidad;i++){
            let numR=Math.ceil(Math.random()*1000)
            let id=i+1
            num_random[i]={id,numR}
        }
        return num_random
    }

    function contar_num(num_target){
        new_obj = {};

        for (obj of num_target) {
          let key = obj["numR"];
          new_obj[key] = num_target.filter(a => a["numR"] == key).length;
        }
    
        for (const [num, count] of Object.entries(new_obj)) {
          let row1={"número random generado":num,"contador de cada número":count}
          new_arr.push(row1)
         
        }
    }
    //res.json({new_arr})//debug
    return new_arr
}

module.exports = { calculo }


