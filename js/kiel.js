// THIS IS NOT MY CODE - used for teaching purposings on refactoring
// Tutorial copied from:
// https://www.w3schools.com/howto/howto_js_slideshow.asp

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

document.querySelector(".prev").addEventListener("click", (e) => {
  plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", (e) => {
  plusSlides(1);
});

document.querySelectorAll(".dot").forEach((el, i) => {
  el.addEventListener("click", () => showSlides((slideIndex = i + 1)));
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

var map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json", // Style URL; see our documentation for more options
  center: [6.942373, 50.332852], // Initial focus coordinate (long, lat)
  zoom: 14,
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

// First, we define our marker locations. You can use whatever format you want when
// working with custom markers, but we have chosen to use GeoJSON for this example, as
// a lot of geospatial data comes in this form. If you have a lot of data, you may want to
// put it in another file that is loaded separately.
var markerCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        // NOTE: in GeoJSON notation, LONGITUDE comes first. GeoJSON
        // uses x, y coordinate notation
        coordinates: [6.940046, 50.333947],
      },
      properties: {
        title: "Nürburgring",
      },
    },
  ],
};

// Next, we can add markers to the map
markerCollection.features.forEach(function (point) {
  // Since these are HTML markers, we create a DOM element first, which we will later
  // pass to the Marker constructor.
  var elem = document.createElement("div");
  elem.className = "marker";

  // Now, we construct a marker and set it's coordinates from the GeoJSON. Note the coordinate order.
  var marker = new maplibregl.Marker(elem);
  marker.setLngLat(point.geometry.coordinates);

  // You can also create a popup that gets shown when you click on a marker. You can style this using
  // CSS as well if you so desire. A minimal example is shown. The offset will depend on the height of your image.
  var popup = new maplibregl.Popup({ offset: 24, closeButton: false });
  popup.setHTML("<div>" + point.properties.title + "</div>");

  // Set the marker's popup.
  marker.setPopup(popup);

  // Finally, we add the marker to the map.
  marker.addTo(map);
});
