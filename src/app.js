const express=require('express')
const path =require('path')
const hbs =require('hbs')
const request =require('request')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')


const app=express()
//define paths for express config
const viewspath= path.join(__dirname,'../templates/views')

const partialspath=path.join(__dirname,'../templates/partials')

//handlebars- dynamic pages engine and views location 
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name: 'andrew',
       
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather',
        name: 'andrew'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'weather',
        name: 'andrew',
        help:'help page'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send('provide search term')
    }
    else{
    res.send(req.query)
    }
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
     return   res.send({
            error:'provide address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send(error)
            }
                
                 forecast(latitude,longitude,(error,forecastdata)=>{
                     if(error){
                         res.send(error)
                     }
            
                res.send({
                    forecast:forecastdata,
                    location,
                    address: req.query.address
                })
            }
            )
            
        
            })
        
    }


})


// render static pages-- setup static directory
 const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

// app.get('/forecast',(req,res)=>{
//      res.send('thi is used to get fore cast')
// })

app.get('/help/*',(req,res)=>{
    res.render('error',
        { title:'weather',
        name: 'andrew',
            error:'not found help article'
        }
    )
})

app.get('*',(req,res)=>{
    res.render('error',
        { title:'weather',
        name: 'andrew',
            error:'error 404'
        }
)
    })



app.listen(5000,()=>{
    console.log('server is set up on port 5000')
})