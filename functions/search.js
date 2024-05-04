window.onload = () => {
    dynamicRenderOptions();
    formActions();
    showAllParksClicked()
}

function dynamicRenderOptions() {
    const searchType = document.getElementById('searchType');
    const checked = document.getElementById('state').checked;
    if(checked){loadData(locationsArray)}
    searchType.addEventListener('change', (e) => {
        e.preventDefault();
        const searchValue = document.getElementById('state').checked ? 'location' : 'parkType';
        const dataArr = searchValue === 'location' ? locationsArray : parkTypesArray;
        loadData(dataArr);
    })

}
function loadData(arrayData) {
    const parent = document.querySelector('select[name="options"]');
    parent.innerHTML = '<option value=""> --- Select One Choice ---</option>'
    arrayData.forEach(data => {
        const option = document.createElement('option');
        option.value = data;
        option.textContent = data;
        parent.appendChild(option);
    });
}

function formActions() {
    const form = document.getElementById('search-form');
    const optionVal = form.querySelector('select[name="options"]');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchType = document.querySelector('input[name="searchType"]:checked').value
        const res = getParkWithType(searchType, optionVal.value.toLowerCase())
        displayResults(res);
    })
    form.addEventListener('reset', (e) => {
        e.preventDefault();
        optionVal.value = '';
        document.querySelector('input[name="searchType"][value="state"]').checked = true;
        document.querySelector('table').style.display = 'none';
    })
}

function displayResults(results) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const table = document.querySelector('table');
    if (results && results.length > 0) {table.style.display = 'block';}
    results.forEach(park => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${park.LocationID.toUpperCase()}</td>
            <td>${park.LocationName}</td>
            <td>${park.Phone == '0' ? '/' : park.Phone}</td>
            <td>${park.Fax == '0' ? '/' : park.Fax}</td>
            <td>${park.Address}</td>
            <td>${park.City}</td>
            <td>${park.State}</td>
            <td>${park.ZipCode}</td>
            <td>${park.Visit ? `<a href=${park.Visit}>Visit WebSite</a>`:'/'}</td>

        `;
        tbody.appendChild(tr);
    })
}

function getParkWithType(type, val) {
    return nationalParksArray.filter(park => {
        return type === 'state' ? 
                park.State.toLowerCase() === val
                : park.LocationName.toLowerCase().includes(val);
    })
}

function showAllParksClicked() {
    const btn = document.getElementById('showAllPark');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        displayResults(nationalParksArray);
    })
}
