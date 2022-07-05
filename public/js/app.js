 const weatherform =document.querySelector('form')
 const search= document.querySelector('input')
 const msgone=document.querySelector('#essage1')
 const msgtwo=document.querySelector('#essage2')



 weatherform.addEventListener('submit',(e)=>{
   e.preventDefault()
     const location=search.value
    
   console.log(location)

    url='http://localhost:5000/weather?address='+location+''

   fetch(url).then((response)=>{
  response.json().then((data)=>{
      if(data.error){
        
        msgone.textContent=data.error
      }else{
        msgone.textContent=data.location
        msgtwo.textContent= ''+data.forecast.desc+': current teperatue is'+data.forecast.cur_temp+'. feels like'+data.forecast.feel_temp+''
}
  })
})
 })

