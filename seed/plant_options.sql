/**
* Insert plant type data in plant_type table 
*/

\c main;

-- Truncate table
TRUNCATE TABLE plant_option;
ALTER SEQUENCE plant_option_id_seq RESTART WITH 1;

-- Insert
INSERT INTO plant_option(
    "commonName",
    "otherCommonName",
    "isVegetable",
    "isHerb",
    "isFruit",
    "isCommon"
)
VALUES

-- Vegetables
('arugula', null, true, false, false, true),
('asparagus', null, true, false, false, true),
('bean', null, true, false, false, true),
('beet', null, true, false, false, true),
('cabbage', null, true, false, false, true),
('carrot', null, true, false, false, true),
('celery', null, true, false, false, true),
('chive', null, true, false, false, true),
('corn', null, true, false, false, true),
('cucumber', null, true, false, false, true),
('eggplant', null, true, false, false, true),
('kale', null, true, false, false, true),
('lettuce', null, true, false, false, true),
('onion', null, true, false, false, true),
('pea', null, true, false, false, true),
('pepper', null, true, false, false, true),
('potato', null, true, false, false, true),
('pumpkin', null, true, false, false, true),
('Radishes', null, true, false, false, true),
('Soybeans', null, true, false, false, true),
('Snow Peas', null, true, false, false, true),
('Spinach', null, true, false, false, true),
('Squash', null, true, false, false, true),
('Swiss Chard', null, true, false, false, true),
('Sunflowers', null, false, false, false, true),
('Tomatoes', null, false, false, false, true),
('Tomatillos', null, false, false, false, true),
('Turnips', null, false, false, false, true),
('Zucchini', null, false, false, false, true),

-- Fruits
('Blueberries', null, false, false, true, true),
('Cantaloupes', 'Muskmelons', false, false, true, true),
('Strawberries', null, false, false, true, true),

-- Herbs
('Cilantro', 'Coriander', false, true, false, true),
('Dill', null, false, true, false, true),
('Parsley', null, false, true, false, true),
('Sage', null, false, true, false, true)
;


-- Connect to DB
\c test;

-- Truncate table
TRUNCATE TABLE plant_option;

INSERT INTO plant_option(
    "commonName",
    "otherCommonName",
    "isVegetable",
    "isHerb",
    "isFruit",
    "isCommon"
)
VALUES

-- Mythical Fruits and Vegetables
('Magic Beans', null, true, false, false, true),
('Everlasting Gobstoppers', null, false, false, true, true),
('Golden Apples', null, false, false, true, true)
;