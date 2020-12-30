/**
* Insert plant type data in plant_type table 
*/

-- Connect to DB
\c main;

-- Truncate table
TRUNCATE TABLE plant_option;

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
('Arugula', null, true, false, false, true),
('Asparagus', null, true, false, false, true),
('Beans', null, true, false, false, true),
('Beets', null, true, false, false, true),
('Cabbage', null, true, false, false, true),
('Carrots', null, true, false, false, true),
('Celery', null, true, false, false, true),
('Chives', null, true, false, false, true),
('Corn', null, true, false, false, true),
('Cucumbers', null, true, false, false, true),
('Eggplants', null, true, false, false, true),
('Kale', null, true, false, false, true),
('Lettuces', null, true, false, false, true),
('Onions', null, true, false, false, true),
('Peas', null, true, false, false, true),
('Peppers', null, true, false, false, true),
('Potatoes', null, true, false, false, true),
('Pumpkins', null, true, false, false, true),
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