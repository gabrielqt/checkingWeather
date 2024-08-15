

const body = document.getElementById('body')
const input = document.getElementById('inp-city')
const btn = document.getElementById('btn-search')
const title = document.getElementById('title')
const temp = document.querySelector('.temp')
const icon = document.querySelector('.icon')
const weather = document.getElementById('weather')
const loading = document.querySelector('.loading')


const images =
[ 
'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1509565840034-3c385bbe6451?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1502790671504-542ad42d5189?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://plus.unsplash.com/premium_photo-1675359655284-908223d534f5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1498477386155-805b90bf61f7?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1526749837599-b4eba9fd855e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


async function getWeather(lat,lon){
  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=apikey&lang=pt_br&units=metric`)
  
  const data = await response.json()

  title.innerHTML = data['name'] 
  temp.innerHTML = Math.round(data['main']['temp']) + '°C'
  weather.innerHTML = data['weather'][0]['description']
  icon.src = `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`


}




async function getCity(){
  let city = document.getElementById('inp-city').value
  loading.style.display = 'flex'

  try{
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},BR&appid=apikey`)
    
    if (!response.ok){
      throw new Error('Houve um problema com sua requisição')
    }

    const data = await response.json()

    if (data.length === 0){
      title.innerHTML = 'Cidade não encontrada'
    }

    let lat = data[0]['lat']
    let lon = data[0]['lon']
    
    let weather = await getWeather(lat,lon)


  }
  catch(error){
    weather.innerHTML = ''
    temp.innerHTML = ''
    icon.src = ''
    title.innerHTML = `<p class="error"> <i class="bi bi-exclamation-octagon-fill"></i>&nbsp${error}</p>`
  }
  finally{
      loading.style.display = 'none'
  }

}




btn.addEventListener('click',()=>{
  getCity()
})

input.addEventListener('keydown',(event)=>{
  if(event.key === 'Enter'){
    getCity()
  }
})


index = getRandomInt(0,9)
body.style.backgroundImage = `url(${images[index]})`

