DROP DATABASE IF EXISTS nc_olympics;
CREATE DATABASE nc_olympics;

\c nc_olympics

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(40) NOT NULL
);

INSERT INTO events(event_name)
VALUES 
('Tiddlywinks'),
('Hammerthrow'),
('Skipping'),
('Programming: solo'),
('Programming: paired'),
('Standing long jump');

CREATE TABLE athletes(
  athlete_id SERIAL PRIMARY KEY,
  athlete_name VARCHAR(100),
  athlete_bio VARCHAR,
  years_competing INT,
  event_id INT REFERENCES events(event_id) 
);

INSERT INTO athletes
  (athlete_name, athlete_bio, years_competing, event_id)
  VALUES 
   ('Rose', 'cool girl', 1, 3),
   ('Eli', 'spicy eelz', 11, 5),
   ('Haz', 'loves gaming', 5, 4);

SELECT athlete_name, athlete_bio AS bio, years_competing, athletes.event_id FROM athletes
JOIN events ON events.event_id = athletes.event_id;

CREATE TABLE medals (
    medal_id SERIAL PRIMARY KEY,
    medal_type VARCHAR(100)
);

INSERT INTO medals (medal_type)
VALUES
('bronze'),
('silver'),
('gold'),
('participation'),
('chocolate');

CREATE TABLE athletes_medals (
    athlete_id INT REFERENCES athletes(athlete_id),
    medal_id INT REFERENCES medals(medal_id)
);

INSERT INTO athletes_medals (athlete_id, medal_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(1, 2),
(1, 5),
(3, 2), 
(3, 3),
(2, 3),
(2, 3),
(2, 3),
(2, 4),
(2, 4), 
(3, 2);

SELECT AVG(years_competing) FROM athletes;

SELECT (athlete_name), COUNT(medals.medal_id) AS no_of_medals_won FROM athletes_medals
JOIN medals ON medals.medal_id = athletes_medals.medal_id
JOIN athletes ON athletes.athlete_id = athletes_medals.athlete_id
GROUP BY athlete_name;
