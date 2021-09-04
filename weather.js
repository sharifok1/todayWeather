
const search = ()=>{
const searchInput = document.getElementById('search-field')
const searchText = searchInput.value;
document.getElementById('no-result').textContent=''
if(searchText === ''){
    const emptyMsg = document.getElementById('emptyText')
    emptyMsg.innerHTML=`<h4>Please enter city name to know weather status!!!</h4>`;
    }
else{
    const my_key = '833d163821ccf2f75390eb242695c659'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${my_key}&units=metric`
fetch(url)
.then(res => res.json())
.then(data => loadData(data));

searchInput.value = ''
document.getElementById('emptyText').textContent='';
document.getElementById('weather-status').textContent = ''

}
document.getElementById('weather-status').textContent = ''
}
// enter button for search//
document.getElementById('search-field').addEventListener('keyup',function(event){
    if(event.keyCode ===13){
    search()
}
})
// background change function-------------------------
const changeBackground = imgUrl=>{
    const background = document.getElementById('background');
    background.style.backgroundImage=imgUrl ;
    background.style.height='100vh';
    background.style.backgroundSize='cover';
    background.style.backgroundPositionX= 'center';  
}



// display weather status--------------------------------/
const loadData = data =>{
    if(data.cod === '404'){
        const emptyResult = document.getElementById('no-result')
        emptyResult.innerHTML=`<h4 class="text-white">invalid name or city not found. <br> Please try again by correct city name!!!</h4>`;
    }
        //---- change background----
        const changeWeather = (condition,imgUrl)=>{
            if(data.weather[0].main == condition){
                changeBackground(imgUrl)
            }
        }
        changeWeather('Clouds','url(img/clouds.jpg)')
        changeWeather('Rain','url(img/rainy.jpg)')
        changeWeather('Haze','url(img/haze.jpg)')
        changeWeather('Clear','url(img/clear.jpg)')
        changeWeather('Thunderstorm','url(img/Thunderstorm.jpg)')

    const weatherStatus =document.getElementById('weather-status');
    weatherStatus.innerHTML=`
        <div class=" text-center mt-5">
            <h3 class="rounded shadow-lg- bg-primary py-1 px-4 text-white d-inline-block"> City</h3>
            <h1 class ='text-white'>${data.name}</h1>
            <h2 class ='text-white'>${data.sys.country}</h2>
        </div>
        <div class=" text-center mt-5">
            <h3 class="bg-primary d-inline-block rounded py-1 px-2 text-white">weather</h3> <br>
            <img class='bg-info rounded' src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h1 class ='text-white'>${data.main.temp}&#8451</h1>
            <h3 class ='text-white'>${data.weather[0].main}</h3>   
        </div>
    `
    
}