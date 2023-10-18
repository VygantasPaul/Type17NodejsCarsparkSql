
const BASE_URL = 'http://localhost:3003/car';
const url = new URL(window.location.href)
const carId = url.searchParams.get("carId");


const showToScreen = (car) => {
    console.log(car)

    const buttonEdit = document.querySelector('#edit-btn');
    buttonEdit.setAttribute('href', './edit.html?carId=' + car.id);

    const carTitle = document.querySelector('#car-title')
    carTitle.innerHTML = `<strong>Title: </strong> ${car.title}`

    const carNumberplates = document.querySelector('#car-numberplates')
    carNumberplates.innerHTML = `Number plates: ${car.numberplates}`

    const carImage = document.querySelector('#car-img')
    carImage.setAttribute("src", car.image)

    const carPrice = document.querySelector('#car-price')
    carPrice.innerHTML = `<strong>Price: </strong> ${car.price}$`
}

const getCar = async () => {
    let response = await fetch(BASE_URL + '/' + carId);
    try {
        if (response.ok) {
            const car = await response.json();
            return car;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const displayData = async () => {
    const car = await getCar();
    if (car) {
        const data = car.response;
        showToScreen(data)
    }

}

displayData()