const BASE_URL = "http://localhost:3003/car/"
const url = new URL(window.location.href)
const carId = url.searchParams.get("carId");
const responseWrap = document.querySelector('.response');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};

const toDisplayData = (carData) => {
    const car = carData;

    if (car) {
        const carTitle = document.querySelector('#car-edit-title');
        carTitle.setAttribute("value", car.title)

        const carPrice = document.querySelector('#car-edit-price');
        carPrice.setAttribute("value", car.price)

        const carNumberPlates = document.querySelector('#car-edit-numberplates');
        carNumberPlates.setAttribute("value", car.numberplates);

        const productImage = document.querySelector('#car-edit-image');
        productImage.setAttribute("value", car.image)

        return car;
    } else {
        return null;
    }
}
const fetchExistingData = async () => {
    try {
        let response = await fetch(BASE_URL + carId);
        if (response.ok) {
            const car = await response.json();
            return car;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};
const updateCar = async (carUpdated) => {
    try {
        let response = await fetch(BASE_URL + carId, {
            method: 'PUT',
            body: JSON.stringify(carUpdated),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const responseCar = await response.json();
            return responseCar;
        } else {
            console.error('PUT request failed:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error sending PUT request:', error);
        return false;
    }
};

const onCheckCar = (car) => {
    if (car) {
        const urlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

        const title = document.querySelector('#car-edit-title').value;
        const price = document.querySelector('#car-edit-price').value;
        const numberplates = document.querySelector('#car-edit-numberplates').value;
        const image = document.querySelector('#car-edit-image').value;
        responseWrap.innerHTML = '';
        if (!title || !price || !numberplates) {  // validation
            createResponseAlert('Please fill all fields');
            return false;
        } else if (image === '') {
            createResponseAlert('Image input field empty but you can continue');
            setTimeout(() => {
                window.location.replace("./details.html?carId=" + carId);
            }, 2000)
            return true;
        } else if (!urlRegex.test(image)) {
            createResponseAlert('Image url not right');
            return false;
        } else {
            createResponseAlert('Car successfully updated');
            setTimeout(() => {
                window.location.replace("./details.html?carId=" + carId);
            }, 2000)
            return true;
        }
    } else {
        return false
    }
}
const onCarClickToUpdate = async (e) => {
    e.preventDefault();
    const car = await fetchExistingData();
    if (car) {
        const carTitle = document.getElementById('car-edit-title').value;
        const carImage = document.getElementById('car-edit-image').value;
        const carPrice = document.getElementById('car-edit-price').value;
        const carNumberPlates = document.getElementById('car-edit-numberplates').value;

        car.title = carTitle;
        car.numberplates = carNumberPlates;
        car.image = carImage;
        car.price = carPrice;

        const onAddCar = await updateCar(car);

        if (onAddCar) {
            onCheckCar(onAddCar)

        } else {
            return false
        }

        toDisplayData(car)
    }
}
document.querySelector('#edit-btn').addEventListener('click', onCarClickToUpdate);

const editData = async () => {
    const carData = await fetchExistingData();
    const car = carData.response;
    if (car) {
        toDisplayData(car);
    }
}
editData();


