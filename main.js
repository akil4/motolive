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

loadStandings();