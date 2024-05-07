window.onload = () => {
    loadGoogleMapAPI();
    loadMountainData();
    const mountains = document.querySelector('select[name="mountains"]');
    mountains.addEventListener('change', dynamicRenderMountainDetail);
    reset();
    
}
function loadGoogleMapAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=fetchMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}
var map, marker;
function fetchMap() {
    const options = {
        zoom:16,
        center: {lat: 37.0902, lng: -95.7129}
    }
    map = new google.maps.Map(document.getElementById('map'), options);
    marker = new google.maps.Marker ({
        position: {lat: 37.0902, lng: -95.7129},
        map: map
    });
}

function loadMountainData() {
    const mountains = document.querySelector('select[name="mountains"]');
    mountains.innerHTML = '<option value=""> --- Select One Mountain ---</option>'
    mountainsArray.forEach(mountain => {
        const option = document.createElement('option');
        option.value = mountain.name;
        option.textContent = mountain.name;
        mountains.appendChild(option);
    });
}

async function dynamicRenderMountainDetail(e) {
    const detailContainer = document.getElementById('detail-container');
    const mountainName = e.target.value;
    const mountainInfo = mountainsArray.find(mountain => mountain.name === mountainName);
    if (!mountainInfo) return;
    const detail = document.getElementById('detail');
    detail.style.backgroundColor ='rgb(225,225,225,0.8)'
    detailContainer.style.display = 'flex';
    const mapContainer = document.getElementById('map');
    mapContainer.style.display = 'block';
    const {lat, lng} = mountainInfo.coords;
    const getFetchData = await fetchSunData(lat, lng);
    const { sunrise, sunset} = getFetchData.results;
    console.log(sunrise, sunset)
    fetchMap();
    map.setCenter({lat, lng});
    marker.setPosition({lat, lng});
    detailContainer.innerHTML = `
    <div class="d-flex flex-column flex-md-row gap-md-5 align-items-center m-md-2 p-md-2">
        <div class="d-flex flex-column algin-items-center">
        <h2 class="text-center">${mountainInfo.name}</h2>
        <img class="py-1" src="../images/${mountainInfo.img}" alt="${mountainInfo.name}">
        </div>
        <div class="d-flex flex-column align-items-start justify-content-cneter gap-md-3">
        <div class="fw-normal"><span class="fw-semibold fs-5">Height</span>: ${mountainInfo.elevation}m</div>
        <div class="fw-normal d-flex flex-column">
            <div class="fw-semibold fs-5">Sunrise & Sunset time</div>
            <div>Today is <b>${new Date().toDateString()}</b></div>
            <div>
            <span class="fw-semibold">Sunrise</span>:  ${sunrise}   UTC
            <span class="fw-semibold ms-1">Sunset</span>:  ${sunset}   UTC</div>
            </div>
        <div lass="fw-normal"><span class="fw-semibold fs-5">Description</span>: ${mountainInfo.desc}</div>
        </div>
       
    </div>
    
    `;
}

function reset() {
    const resetBtn = document.querySelector('button[type="reset"]');
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const detailContainer = document.getElementById('detail-container');
        detailContainer.style.display = 'none';
        const mountains = document.querySelector('select[name="mountains"]');
        mountains.value = '';
    });
    
}

async function fetchSunData(lat, lng) {
    try{
        const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
        if (res.ok) {
            return res.json();
        }   
    } catch(error) {
        console.log(error);
    }
}
