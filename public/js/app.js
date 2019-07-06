console.log('client side js file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg-1')
const msgtwo = document.querySelector('#msg-2')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msgone.textContent = 'Loading...'
    msgtwo.textContent= ''
    fetch('http://localhost:3000/weather?address='+ search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgone.textContent= data.error
        }else{
        msgone.textContent= data.location
        msgtwo.textContent= data.forecast
    }
    })
})
})