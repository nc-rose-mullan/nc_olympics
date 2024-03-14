const db = require('./connection.js');
const format = require("pg-format")

const seed = ({athletesData, eventsData, medalsData}) => { 
    return db.query('DROP TABLE IF EXISTS athletes;').then(() => {
        return db.query('DROP TABLE IF EXISTS events');
    }).then(() => {
        return db.query(`CREATE TABLE events(
        event_id SERIAL PRIMARY KEY,
        event_name VARCHAR(40) NOT NULL
        )`);
    }).then(() => {
        return db.query(`CREATE TABLE athletes(
        athlete_id SERIAL PRIMARY KEY,
        athlete_name VARCHAR(40) NOT NULL,
        athlete_bio VARCHAR,
        years_competing INT,
        event_id INT REFERENCES events(event_id))`
        );
    }).then(() => {
        const formattedEvents = eventsData.map((event) => { 
            return [event.event_name]
        })
        const inserteventsQueryString = format(`
            INSERT INTO events (event_name) VALUES %L RETURNING *;`,
            formattedEvents)
        return db.query(inserteventsQueryString)
    }).then(({ rows }) => { 
        console.log(rows)
        // how are we going to give each snack a category id?
    })
};

module.exports = seed;