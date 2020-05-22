let key = "pk.eyJ1IjoiaGFyaXM2NjQiLCJhIjoiY2thNXdscHE0MDFoMjJzbWpxeGFoaGJ3eiJ9.eTB8EAoQFT1gFoJzyKtMrg";
const firstInputEle = document.querySelector('.origin-container');
const startingListEle = document.querySelector('.origins');
const secondInputEle = document.querySelector('.destination-container');
let startLongitude,startLatitude,destLongitude,destLatitude;
const destinationListEle = document.querySelector('.destinations');
firstInputEle.onsubmit = event => {
  const input = event.target.querySelector('input');
  if (input.value.length > 0) {
    startingLocation(input.value);
  }
  event.preventDefault();
  input.value = '';
}

function startingLocation(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=${key}`)
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error ('something not working');
    }
  })
  .then(data => {
    insertStartingLocation(data.features)
  })
}

function insertStartingLocation(location) {
  startingListEle.innerHTML = '';
  let html = '';

  location.forEach(loca => {
    html += 
    `<li data-long=${loca.geometry.coordinates[0]} data-lat=${loca.geometry.coordinates[1]} class="">
      <div class="name">${loca.text}</div>
      <div>${loca.properties.address}</div>
    </li>`
  })

  startingListEle.insertAdjacentHTML('afterbegin',html);
}

startingListEle.onclick = event => {
  const click = event.target.closest('li');
  if (click !== null) {
    click.className = 'selected';
    startLongitude = click.dataset.long;
    startLatitude = click.dataset.lat;
    console.log(startLongitude,startLatitude)
    
  }
}

secondInputEle.onsubmit = event => {
  const input = event.target.querySelector('input');

  if (input.value.length > 0) {
    destinationLocation(input.value);
  }
    event.preventDefault();
    input.value = '';
}

function destinationLocation(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=${key}`)
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error ('something went wrong');
    }
  })
  .then(data => {
    insertDestinationLocation(data.features)
  })
}

function insertDestinationLocation(list) {
  destinationListEle.innerHTML = '';
  let html = '';
  list.forEach(destination => {
    html += `
      <li data-long=${destination.geometry.coordinates[0]} data-lat=${destination.geometry.coordinates[1]} class="">
        <div class="name">${destination.text}</div>
        <div>${destination.properties.address}</div>
      </li>`
  })
  destinationListEle.insertAdjacentHTML('afterbegin',html)
}

destinationListEle.onclick = event => {
  const click = event.target.closest('li');
  if (click !== null) {
    click.className = 'selected';
    destLongitude = click.dataset.long;
    destLatitude = click.dataset.lat;
    console.log(destLatitude,destLongitude)
  }
}