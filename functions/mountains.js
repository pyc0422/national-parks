window.onload = () => {
    loadMountainData();
    const mountains = document.querySelector('select[name="mountains"]');
    mountains.addEventListener('change', dynamicRenderMountainDetail);
    reset();
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
    detailContainer.style.display = 'flex';
    const getFetchData = await fetchSunData(mountainInfo.coords.lat, mountainInfo.coords.lng);
    const { sunrise, sunset} = getFetchData.results;
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
            <span class="fw-semibold">Sunrise</span>:  ${sunrise}
            <span class="fw-semibold ms-1">Sunset</span>:  ${sunset}</div>
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