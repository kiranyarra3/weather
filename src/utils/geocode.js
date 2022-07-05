 const request=require('request')
 const geocode=(address,callback)=>{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?&access_token=pk.eyJ1Ijoia2lyYW55YXJyYTMiLCJhIjoiY2w0M2pwOXd1MTQwYzNmcjJrdjYxNW5teiJ9.7pfGM1TOozZIOIVMEd3DPw'
              
request({url:url,json:true},(error,response)=>{
    if(error)
{
    callback('unable to connect',undefined)
}   
else if(!response.body.query[0]) {
  callback({error:'unable to find location'},undefined)
}
else
{
data={
    latitude: response.body.features[0].center[0],
    longitude: response.body.features[0].center[1],
    location:response.body.features[0].place_name
}
callback(undefined,data)
}
})

}





module.exports=geocode