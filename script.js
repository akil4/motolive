import axios from 'axios';
import fs from 'fs';

const BASE = 'https://api.motogp.pulselive.com/motogp/v1';

async function getSeasons() {
  const res = await axios.get(`${BASE}/results/seasons`);
  return res.data;
}

async function getCategory(seasonUuid) {
  const res = await axios
    .get(`${BASE}/results/categories`, { params: { seasonUuid } });
  return res.data.find(cat => cat.name.includes('MotoGP'));
}

async function getStandings(seasonUuid, categoryUuid) {
  const res = await axios
    .get(`${BASE}/results/standings`, { params: { seasonUuid, categoryUuid } });
  return res.data.classification;
}

async function main() {
  const seasons = await getSeasons();
  const sorted = seasons.sort((a, b) => b.year - a.year);
  const [current, previous] = sorted;

  const seasonsData = {};

  for (const season of [current, previous]) {
    const category = await getCategory(season.id);
    if (!category) continue;

    const standings = await getStandings(season.id, category.id);
    seasonsData[season.year] = standings.map(s => ({
      position: s.position,
      rider: s.rider.full_name,
      team: s.team.name,
      points: s.points
    }));
  }

  fs.writeFileSync('data/standings_seasons.json', JSON.stringify(seasonsData, null, 2));
  console.log('✅ Updated standings for', Object.keys(seasonsData).join(', '));
}

main().catch(console.error);
