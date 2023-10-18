const BASE_URL = 'http://localhost:3003/cars';
const CAR_URL = 'http://localhost:3003/car/';
const responseWrap = document.querySelector('.response');
const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};

const showData = (cars) => {
    console.log(cars)
    if (cars.length === 0) {
        createResponseAlert('There are no cars');
    } else {
        cars.forEach(car => {
            const carsWrap = document.querySelector('#cars-output');
            const carAnchorWrap = document.createElement('a');
            carAnchorWrap.setAttribute('class', 'car-item');
            carAnchorWrap.setAttribute("href", "./details.html?carId=" + car.id);

            const carDelete = document.createElement('a');
            carDelete.setAttribute('class', 'delete-btn');
            carDelete.textContent = "Delete";
            carDelete.setAttribute('data-car-id', car.id);

            const topBlock = document.createElement('div');
            topBlock.setAttribute("class", 'top-block')

            const bottomBlock = document.createElement('div');
            bottomBlock.setAttribute("class", 'bottom-block')

            const carTitle = document.createElement('h4');
            carTitle.innerHTML = car.title;

            const carNumberplates = document.createElement('h2');
            carNumberplates.innerHTML = car.numberplates;

            const carImageWrap = document.createElement('div');
            carImageWrap.setAttribute('class', 'img-wrapper')
            const carImage = document.createElement('img');
            carImage.setAttribute('src', car.image || 'images/icon-image-not-found-free-vector.jpg');
            carImage.setAttribute('class', 'car-img');
            carImage.setAttribute('alt', car.title);

            carsWrap.appendChild(carAnchorWrap);
            carAnchorWrap.appendChild(topBlock);

            topBlock.appendChild(carNumberplates);
            topBlock.appendChild(carTitle);

            carAnchorWrap.appendChild(carImageWrap);
            carImageWrap.appendChild(carImage);
            carAnchorWrap.appendChild(bottomBlock);
            bottomBlock.appendChild(carDelete);
        });

    }
}

const deleteCar = async (carId) => {
    try {
        let response = await fetch(CAR_URL + carId, {
            method: "DELETE"
        });

        if (response.ok) {
            const product = await response.json();
            return product;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};


const checkOnDeleteCar = (product) => {
    responseWrap.innerHTML = '';
    if (product) {
        alert('Car successfuly deleted')
        setTimeout(() => {
            window.location.replace("./index.html");
        }, 400);

    } else {
        createResponseAlert('Car was not deleted');
        return false
    }
}

const onClickToDelete = async (e) => {
    e.preventDefault();
    const carId = e.target.dataset.carId;
    const deleteObj = await deleteCar(carId);
    checkOnDeleteCar(deleteObj);
};
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        onClickToDelete(e);
    }
});

const fetchData = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            const data = await response.json();
            const cars = data.response;
            showData(cars)
        } else {
            console.error('Network response was not ok', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData()

