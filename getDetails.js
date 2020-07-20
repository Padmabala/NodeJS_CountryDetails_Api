const got=require('got')
const getDetails=()=>{
    // console.log("world")
    return new Promise((resolve,reject)=>{
        got('https://restcountries.eu/rest/v2/lang/es')
        .then(data=>{
            resolve(data)
        })
        .catch((error=>{
            reject(error)
        }))
    })
}
module.exports=getDetails;