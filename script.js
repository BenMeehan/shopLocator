var mymap = L.map("mapid").setView([51.505, -0.09], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmVubWVlaGFuIiwiYSI6ImNrbzlseXVkbDB1OGUycXFrcW9nNWo0MWoifQ.W-dWZxXJuEf5XTl0uEna6Q",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(mymap);

var marker = L.marker([51.5, -0.09], { draggable: true, autoPan: true }).addTo(
  mymap
);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Allow Location access");
}

let lat = undefined;
let long = undefined;

const address1 = document.getElementById("address1");
const address2 = "";
const pincode = document.getElementById("pincode");
const statecity = document.getElementById("state-city");
const district = document.getElementById("district");
const area = document.getElementById("area");

function setFields(reverseGeoStr) {
  $.get(reverseGeoStr, function (data) {
    console.log(data);
    address1.value = data.display_name;

    if (data.address.postcode) {
      pincode.value = data.address.postcode;
    }

    if (data.address.state) {
      statecity.value = data.address.state;
    }

    if (data.address.state_district) {
      district.value = data.address.state_district;
    }
  });
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  setFields(
    `https://eu1.locationiq.com/v1/reverse.php?key=pk.44251552e61402067c5e1b4e0c496cc5&lat=${lat}&lon=${long}&format=json`
  );
  mymap.setView([lat, long], 13);
  marker.setLatLng(new L.LatLng(lat, long));
}

const onDragStart = (e) => {
  address1.value = "fetching";
  statecity.value = "";
  district.value = "";
  pincode.value = "";
  area.value = "";
};
const onDragStop = (e) => {
  lat = marker.getLatLng().lat;
  long = marker.getLatLng().lng;
  let reverseGeoStr = `https://eu1.locationiq.com/v1/reverse.php?key=pk.44251552e61402067c5e1b4e0c496cc5&lat=${lat}&lon=${long}&format=json`;
  let nearby = `https://eu1.locationiq.com/v1/nearby.php?key=pk.44251552e61402067c5e1b4e0c496cc5&lat=${lat}&lon=${long}&tag=all&format=json`;
  setFields(reverseGeoStr);
};

marker.on("dragstart", onDragStart);
marker.on("dragend", onDragStop);
