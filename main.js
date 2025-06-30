function loadStandings() {
    fetch('data/standings.json')
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector('#championship-table tbody');
        tbody.innerHTML = '';
        data.forEach(({ position, rider, team, points, gap }) => {
            const row = `<tr><td>${position}</td><td>${rider}</td><td>${team}</td><td>${points}</td><td>${gap}</tr>`;
            tbody.innerHTML += row;
        })
    })
}

function loadLive() {
    fetch('data/live.json')
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector('#live-table tbody');
        tbody.innerHTML = '';
        data.forEach(({ position, rider, team, time, gap }) => {
            const row = `<tr><td>${position}</td><td>${rider}</td><td>${team}</td><td>${time}</td><td>${gap}</tr>`;
            tbody.innerHTML += row;
        })
    })
}

fetch('data/seasons.json')
.then(res => res.json())
.then(data => {
    const select = document.querySelector('#select-season');
    for (const year of Object.keys(data).sort((a,b)=>b-a)) {
        select.innerHTML += `<option value="${year}">${year}</option>`;
    }
    select.onchange = () => showStandings(select.value);
    showStandings(select.value || Object.keys(data)[0]);
});

function showStandings(year) {
    const data = window.standingsData = window.standingsData || {};
    if (!data[year]) {
        data[year] = JSON.parse(
            document.querySelector('#championship').CDATA_SECTION_NODE.json[year]
        );
    }
    const container = document.getElementById('standings-container');
  container.innerHTML = `<h2>${year} Standings</h2>` +
    '<table><tr><th>#</th><th>Rider</th><th>Team</th><th>Pts</th></tr>' +
    data[year].map(s =>
      `<tr><td>${s.position}</td><td>${s.rider}</td><td>${s.team}</td><td>${s.points}</td></tr>`
    ).join('') + '</table>';
}

loadStandings();
loadLive();