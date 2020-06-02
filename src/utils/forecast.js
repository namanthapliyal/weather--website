const request= require('request')

//forecast fuction
const forecast =(lat, lon, callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&%20exclude=hourly,daily&appid=29caf9c789e283172fa6781e3f3199bc&units=metric'
    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to the server...',undefined)
        }else if(body.cod==400){
            callback(body.message, undefined)
        }else{
            callback(undefined, "It is currently "+ body.current.temp+ " degrees out ."+ "There is  "+ body.current.humidity +"% humidity.")
        }
    })
}

//exporting function forecast
module.exports= forecast
