const request= require('request')


const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=42e83f729b6e5e5ff268be2bcbbc7a34&query='+longitude+','+latitude+''
request({ url:url, json:true },(error,response)=>{
    if(error){
        callback('unable to connect',undefined)
    }
    else if(response.body.success===false){
        callback('unable to find coordinates',undefined)
    }
    else{
        forecastdata={
            desc:response.body.current.weather_descriptions[0],
            cur_temp:response.body.current.temperature,
            feel_temp:response.body.current.feelslike
        }
        callback(undefined,forecastdata)

    }
})
    
}

module.exports=forecast







