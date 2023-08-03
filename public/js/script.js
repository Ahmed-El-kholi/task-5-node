
let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitudeF = document.getElementById('latitude')
const longtitudeF = document.getElementById('longitude')



let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:5000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.innerText = data.error
            locationF.innerText = ""
            forecastF.innerText = ""
        }
        else {
            locationF.innerText = data.location
            setTimeout(() => {
                
                forecastF.innerText = data.forecast
            }, 2000);
            setTimeout(() => {

                latitudeF.innerText = data.latitude
            }, 3000);

            setTimeout(() => {

                longtitudeF.innerText = data.longitude
            }, 4000);

            errorF.innerText = ""
        }
    }
    catch (e) {
        console.log(e)
    }
}

// 3 