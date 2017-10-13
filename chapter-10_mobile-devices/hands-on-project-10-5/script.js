/*  JavaScript 6th Edition
    Chapter 10
    Hands-on Project 10-5

    Author: Shakila Sivarajah
    Date:   11/28/2016

    Filename: script.js
*/

"use strict";

// global variables
var waitForUser;

function setUpPage() {
	var buttons = document.querySelectorAll("#cities div");
	for (var i = 0; i < buttons.length; i++) {
	    if (buttons[i].addEventListener) {
		    buttons[i].addEventListener("click", createMap, false);
	    } else if (buttons[i].attachEvent) {
		buttons[i].attachEvent("onclick", createMap);
	    }
	}
}

function geoTest() {
	waitForUser = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
	} else {
		fail();
	}
}

function createMap(position) {
	var Lat;
	var Lng;
	clearTimeout(waitForUser);
	if (position.coords) {
	    Lat = position.coords.latitude;
	    Lng = position.coords.longitude;
	} else {
		var city = this.innerHTML;
		if (city === "Beijing") {
			Lat = 39.911163;
			Lng = 116.393313;
		}
		if (city === "Paris") {
			Lat = 48.864952;
			Lng = 2.330734;
		}
		if (city === "Rio de Janeiro") {
			Lat = -22.909583;
			Lng = -43.237526;
		}
		document.getElementById("caption").innerHTML = city;
	}
	var mapOptions = {
	  center: new google.maps.LatLng(Lat, Lng),
	  zoom: 10
    };
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	// Geocode - Beijing, China: 39.911163, 116.393313
	// geocode - Paris, France: 48.864952, 2.330734
	// geocode - Rio de Janeiro, Brazil: -22.909583, -43.237526
}

function fail() {
	document.getElementById("map").innerHTML = "Unable to access your current location.";
}

if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}
