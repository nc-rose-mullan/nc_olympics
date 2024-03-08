const { Pool } = require('pg');
const pool = new Pool();

function getAthletes() {
    pool.query('SELECT * FROM athletes;').then(({rows: athletes}) => {
        console.log(athletes);
        pool.end()
    });
}

// getAthletes()

function getAthleteById(id) {
    pool.query(`SELECT * FROM athletes WHERE athlete_id=${id}`).then(({ rows: [athlete] }) => {
        console.log(athlete);
        pool.end();
    });
}

getAthleteById(1)
