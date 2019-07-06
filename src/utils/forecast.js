const request = require('request')


const forecast =(lat,long, callback) =>{
    const url = 'https://api.darksky.net/forecast/6949375f950a31bd1c4fd063d5148a0e/' + lat + ","+ long + '?units=si'

    request({url, json: true }, (error ,{body}) => {
    if(error){
        callback('unable to connect to weather service',undefined)
    } else if(body.error){
        callback('unable to find location',undefined)
    } else{
        callback(undefined,  body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +" celcius out with a " + body.currently.precipProbability + '% chance of rain. Temperature high would be ' + body.daily.data[0].temperatureHigh + " celcius and  temp low would be " + body.daily.data[0].temperatureLow + " celcius. Have a nice day!")
    }
})
}

module.exports= forecast