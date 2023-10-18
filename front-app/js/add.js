const ADD_URL = "http://localhost:3003/add-car/";
const responseWrap = document.querySelector('.response');
const button = document.getElementById('car-add');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};

const getValues = () => {
    const carTitle = document.querySelector('#car-title').value;
    const carPrice = document.querySelector('#car-price').value;
    const carNumberplates = document.querySelector('#car-numberplates').value;
    const carImage = document.querySelector('#car-image').value;
    const car = {
        title: carTitle,
        image: carImage,
        numberplates: carNumberplates,
        price: carPrice,
    }
    console.log(car)
    return car

}

const insertValues = async (car) => {
    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });

        const carData = await response.json();

        return carData;

    } catch (error) {
        console.error('Error:', error);
    }

}
const onCheckAddCar = (carData) => {
    if (carData) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

        const title = document.querySelector('#car-title').value;
        const price = document.querySelector('#car-price').value;
        const numberplates = document.querySelector('#car-numberplates').value;
        const image = document.querySelector('#car-image').value;

        responseWrap.innerHTML = '';
        if (!title || !price || !numberplates) {   // validation
            createResponseAlert('Please fill all fields');
            return false;
        } else if (image === '') {
            createResponseAlert('Image input field empty, but you can continue');
            setTimeout(() => {
                window.location.replace("./index.html");
            }, 3000)
            return true;
        } else if (!urlRegex.test(image)) {
            createResponseAlert('Image url not right');
            return false;
        } else {
            document.querySelector('#car-title').value = '';
            document.querySelector('#car-price').value = '';
            document.querySelector('#car-numberplates').value = '';
            document.querySelector('#car-image').value = '';
            createResponseAlert('Car successfully Added');
            setTimeout(() => {
                window.location.replace("./index.html");
            }, 3000)
            return true;
        }
    } else {
        return false
    }
}
button.addEventListener('submit', async (e) => {
    e.preventDefault();
    const car = getValues();
    if (onCheckAddCar(car)) {
        const insertedCar = await insertValues(car);
        if (!insertedCar) {
            return false
        }
    }
});
