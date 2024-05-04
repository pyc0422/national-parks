window.onload = () => {
    dynamicRenderOptions();
    search();
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

function search() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchType = document.querySelector('input[name="searchType"]:checked').value
        const optionVal = form.querySelector('select[name="options"]').value.toLowerCase();
        if (searchType === 'state') {
            const res = nationalParksArray.filter(park => park.State.toLowerCase() === optionVal);
            displayResults(res);
        }
       
       
    })
}

function displayResults(results) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    console.log('results', results)
    const table = document.querySelector('table');
    console.log('table', table)
    if (results && results.length > 0) {table.style.display = 'block';}
    results.forEach(park => {
        const tr = document.createElement('tr');
        console.log(park)
        tr.innerHTML = `
            <td>${park.LocationID}</td>
            <td>${park.LocationName}</td>
            <td>${park.Phone}</td>
            <td>${park.Fax}</td>
            <td>${park.Address}</td>
            <td>${park.City}</td>
            <td>${park.State}</td>
            <td>${park.ZipCode}</td>
            <td>${park.Visit ? `<a href=${park.Visit}>${park.Visit}</a>`:'None'}</td>

        `;
        tbody.appendChild(tr);
    })
}
