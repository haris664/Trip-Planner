let key = 'pk.eyJ1IjoiaGFyaXM2NjQiLCJhIjoiY2thNXdscHE0MDFoMjJzbWpxeGFoaGJ3eiJ9.eTB8EAoQFT1gFoJzyKtMrg';
const transitKey = 'zEE5nKn5wIFmy03pO7b';
const firstInputEle = document.querySelector('.origin-container');
const startingListEle = document.querySelector('.origins');
const secondInputEle = document.querySelector('.destination-container');
let startLongitude,startLatitude,destLongitude,destLatitude;
const destinationListEle = document.querySelector('.destinations');
const planTripEle = document.querySelector('.button-container');

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
      <div class="name">${loca.place_name.split(',')[0]}</div>
      <div>${loca.place_name.split(',')[1]}</div>
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
        <div class="name">${destination.place_name.split(',')[0]}</div>
        <div>${destination.place_name.split(',')[1]}</div>
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
    
  }
}

planTripEle.onclick = event => {
  if (event.target.tagName === 'BUTTON') {
    planMyTrip(startLatitude,startLongitude,destLatitude,destLongitude);
  }
}

function planMyTrip(lat1,lon1,lat2,lon2) {
  console.log(lat1,lat2,lon1,lon2)
  fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?api-key=${transitKey}&origin=geo/${lat1},${lon1}&destination=geo/${lat2},${lon2}`)
  .then(resp => resp.json())
  .then(data => {
   displayTheTrip(data.plans[0].segments)
  })
}

function displayTheTrip(plans) {
  console.log(plans)
//  let str = "";

  plans.forEach(st => {
    console.log(st)

    if (st.type === "walk" && st.to.stop !== undefined ) {
      console.log(`walk for ${st.times.durations.total} minutes to stop#${st.to.stop.key}-${st.to.stop.name}`);
    }
    if((st.type === 'walk') && (st.to.stop === undefined)) {
       console.log(`Walk for ${st.times.durations.total} minutes to your destination`) }

    if (st.type === 'ride' && st.route.name !== undefined) {
          console.log(`Ride the  ${st.route.name} for ${st.times.durations.total} minutes `)
      }
    
    if (st.type === 'ride' && st.route.name === undefined)  {
        console.log(`Ride the ${st.route.number} for ${st.times.durations.total} minutes`)
      }
   

  
    })
  
  //    
  //     // if(st.type === "transfer") {
      
  //     // }
      

  // })
      //drawTheHTML(str);
}