
var mymap = L.map('mapid').setView([28.607417678833008, 77.09991829736328], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXBwZXJ3YWwiLCJhIjoiY2lxNmVvcGo4MDA3MGZ2bTY1b255OW14dSJ9.h18VG_xCO7yQXMajIqKyHg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var markerMap = new Map()

var redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-red.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [15, 24],
    iconAnchor: [7, 24],
    popupAnchor: [1, -14],
    shadowSize: [24, 24]
});

  var blueIcon = new L.Icon({
    iconUrl: 'img/marker-icon-blue.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [15, 24],
    iconAnchor: [7, 24],
    popupAnchor: [1, -14],
    shadowSize: [24, 24]
});

/* var marker = L.marker([28.507417678833008, 77.09491729736328]).addTo(mymap);
marker.update(); */

locationCallback = function(vehiclePos) {

    vNumber = vehiclePos.getVehicle().getId()
    trip_id = vehiclePos.getTrip().getRouteId()

    var letterNumber = /[a-z]/i

    this.console.log(vNumber, trip_id)
    if(!markerMap.has(vNumber)) {
        var newLatLng = new L.LatLng(vehiclePos.getPosition().getLatitude(), vehiclePos.getPosition().getLongitude());

        if(trip_id.match(letterNumber)) {
            mar_icon = redIcon
        } else {
            mar_icon = blueIcon
        }
        var marker = L.marker(newLatLng, {autoPan: false, icon: mar_icon});
        marker.bindPopup("<center>Vehicle Number<br><b>"+vNumber+"</b><br/><i>" + trip_id + "</i></center>").openPopup();
        /* var popup = L.popup({autoPan: false, zoomAnimation: false, keepInView: true, closeButton: false});
        popup.setLatLng(newLatLng)
        popup.setContent("<center>Vehicle Number<br><b>"+vNumber+"</b></center>"); */
        
        var marPop = {
            marker: marker,
            popup: null
        }
        
        //mymap.addLayer(popup);
        mymap.addLayer(marker)
        markerMap.set(vNumber, marPop);
        
    } else {
        this.console.log('already exist')
        var marPop = markerMap.get(vNumber)
        var newLatLng = new L.LatLng(vehiclePos.getPosition().getLatitude(), vehiclePos.getPosition().getLongitude());
        marPop.marker.setLatLng(newLatLng);
        //marPop.popup.setLatLng(newLatLng);
    }
    this.console.log(marPop)
    this.console.log(vehiclePos.getPosition().getLatitude(), vehiclePos.getPosition().getLongitude());
    var newLatLng = new L.LatLng(vehiclePos.getPosition().getLatitude(), vehiclePos.getPosition().getLongitude());
    //marPop.marker.setLatLng(newLatLng);
    //marPop.popup.setLatLng(newLatLng);
    //marPop.popup.openOn(mymap);
    //mymap.openPopup();
    //marker.bindPopup("Vehicle Number<br><b>"+vNumber+"</b>");
}

let m = new meshgrt.MeshGTFSR()

e = m.subscribe()
e.on('data', msg => {
    console.log(msg)

    msg.getEntityList().forEach(function(entity, idx) {
        locationCallback(entity.getVehicle())
        console.log(entity)
    })
}).on('status', msg => {
    console.log(msg)

})
