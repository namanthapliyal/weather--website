console.log('This is client side javascript..')

const weatherform=document.querySelector('form')
const search =document.querySelector('input') 
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')
weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const value=search.value
    
    message1.textContent='Loading'
    message2.textContent=''

    fetch('http://localhost:3000/weather?address='+value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
            return
        }
        message1.textContent=data.forecast
        message2.textContent= data.location
    })
})

})