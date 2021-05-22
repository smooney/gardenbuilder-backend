-- Connect to database
\c main;

-- Truncate table
TRUNCATE TABLE plant_variety;

-- Insert
INSERT INTO plant_variety(
    "speciesId",
    "variety"
)
VALUES

-- Beet
(4, 'Merlin Hybrid'),
(4, 'Chioggia'),

-- Pepper
(16, 'Shishito'),
(16, 'Carmen Red Sweet')
;