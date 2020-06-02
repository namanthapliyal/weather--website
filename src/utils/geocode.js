const request=require('request')
 
const geocode= (address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGl2aW5nZHJlYW1zIiwiYSI6ImNrYTRpbmtyNDBka20zbW9hNnpkamt0c2YifQ.vc9YNxPCIi02puA1PrFV6Q&limit=1'
    request({url, json:true},(error, {body}={})=>{
        if(error){
            return callback("Unable to connect to the server!", undefined)
        }else if(address===undefined || body.features.length===0){
            callback("Enter valid place!")
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }    
            
})
}

//exporting module
module.exports = geocode