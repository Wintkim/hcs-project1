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
  style: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json", // 지도 스타일 URL
  center: [6.942373, 50.332852], // 초기 중심 좌표 (경도, 위도)
  zoom: 14, // 초기 줌 레벨
});

map.addControl(new maplibregl.NavigationControl()); // 네비게이션 컨트롤 추가

// 마커 컬렉션 정의
var markerCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.940046, 50.333947],
      },
      properties: {
        title: "Nürburgring",
      },
    },
  ],
};

// 각 마커 생성 및 지도에 추가
markerCollection.features.forEach(function (point) {
  var elem = document.createElement("div");
  elem.className = "marker";

  var marker = new maplibregl.Marker(elem);
  marker.setLngLat(point.geometry.coordinates);

  var popup = new maplibregl.Popup({ offset: 24, closeButton: false });
  popup.setHTML("<div>" + point.properties.title + "</div>");

  marker.setPopup(popup);
  marker.addTo(map);
});

const weatherAPIKey = "3d2340498dc50ebb779c60f179115883";

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Kiel&appid=${weatherAPIKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateWeatherInfo() {
  const weatherData = await fetchWeather();
  const weatherInfoEl = document.getElementById("weather-info");

  if (weatherData) {
    const { weather, main } = weatherData;
    weatherInfoEl.innerHTML = `
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
    `;
  } else {
    weatherInfoEl.innerHTML = "<p>Failed to load weather data.</p>";
  }
}

// 날씨 정보를 업데이트
updateWeatherInfo();