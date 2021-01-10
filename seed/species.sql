/**
* Insert plant type data in plant_type table 
*/

\c main;

-- Truncate table
TRUNCATE TABLE species;
ALTER SEQUENCE species_id_seq RESTART WITH 1;

-- Insert
INSERT INTO plant_option(
    "commonName",
    "otherCommonName",
    "isVegetable",
    "isHerb",
    "isFruit",
    "isCommon",
    "slug",
    "scientificName",
)
VALUES

-- Vegetables
('arugula', 'arugula', null, true, false, false, true, 'arugula', 'Eruca vesicaria'),
('asparagus', 'asparagus', null, true, false, false, true, 'asparagus', 'Asparagus officinalis'),
('bean', 'beans', null, true, false, false, true, 'bean', 'Phaseolus vulgaris'),
('beet', 'beets', null, true, false, false, true, 'beet', 'Beta vulgaris'),
('cabbage', 'cabbage', null, true, false, false, true, 'cabbage', 'Brassica oleracea'),
('carrot', 'carrots', null, true, false, false, true, 'carrot', 'Daucus carota'),
('celery', 'celery', null, true, false, false, true, 'celery', 'Apium graveolens'),
('chive', 'chives', null, true, false, false, true, 'chive', 'Allium schoenoprasum'),
('corn', 'corn', null, true, false, false, true, 'corn', 'Zea mays'),
('cucumber', 'cucumbers', null, true, false, false, true, 'cucumber', 'Cucumis sativus'),
('eggplant', 'eggplants', null, true, false, false, true, 'eggplant', 'Solanum melongena'),
('kale', 'kale', null, true, false, false, true, 'kale', 'Brassica oleracea'),
('lettuce','lettuces', null, true, false, false, true, 'lettuce', 'Lactuca sativa'),
('onion', 'onions', null, true, false, false, true, 'onion', 'Allium cepa'),
('pea', 'peas', null, true, false, false, true, 'pea', 'Pisum sativum'),
('pepper', 'peppers', null, true, false, false, true, 'pepper', 'Capsicum annuum'),
('potato', 'potatoes', null, true, false, false, true, 'potato', 'Solanum tuberosum'),
('pumpkin', 'pumpkins', null, true, false, false, true, 'pumpkin', 'Cucurbita pepo'),
('radish', 'radishes', null, true, false, false, true, 'radish', 'Raphanus sativus'),
('soybean', 'soybeans', null, true, false, false, true, 'soybean', 'Glycine max'),
('spinach', 'spinach', null, true, false, false, true, 'spinach', 'Spinacia oleracea'),
('squash', 'squashes', null, true, false, false, true, 'squash', 'Cucurbita pepo'),
('swiss chard', 'swiss chard', null, true, false, false, true, 'swissChard', 'Beta vulgaris'),
('tomato', 'tomatoes', null, false, false, false, true, 'tomato', 'Solanum lycopersicum'),
('tomatillo', 'tomatillos', null, false, false, false, true, 'tomatillo', 'Physalis philadelphica'),
('turnip', 'turnips', null, false, false, false, true, 'turnip', 'Brassica rapa'),

-- Fruits
('blueberry', 'blueberries', null, false, false, true, true, 'blueberry', 'Vaccinium formosum'),
('blackberry', 'blackberries', null, false, false, true, true, 'blackberry', 'Rubus aboriginum'),
('cantaloupe', 'cantaloupes', 'muskmelon', false, false, true, true, 'cantaloupe', 'Cucumis melo'),
('strawberry', 'strawberries', null, false, false, true, true, 'strawberry', 'Fragaria × ananassa'),

-- Herbs
('cilantro', 'cilantro', 'coriander', false, true, false, true, 'cilantro', 'Coriandrum sativum'),
('dill', 'dill', null, false, true, false, true, 'dill', 'Anethum graveolens'),
('fennel', 'fennel', null, false, true, false, true, 'fennel', 'Foeniculum vulgare'),
('parsley', 'parsley' null, false, true, false, true, 'parsley', 'Petroselinum crispum'),
('sage', 'sage', null, false, true, false, true, 'sage', 'Salvia officinalis')

-- Companion plants
('sunflower', 'sunflowers' null, false, false, false, true, 'sunflower', 'Helianthus annuus'),
;


-- Connect to DB
\c test;

-- Truncate table
TRUNCATE TABLE species;

INSERT INTO species(
    "commonName",
    "pluralName",
    "otherCommonName",
    "isVegetable",
    "isHerb",
    "isFruit",
    "isCommon",
    "stub",
    "scientificName"
)
VALUES

-- Mythical Fruits and Vegetables
('magic bean', 'magic beans', null, true, false, false, true, 'magicBean', 'Phaseolus magicus'),
('golden apple', 'golden apples', null, false, false, true, true, 'goldenApple', 'Malus aurum')
;