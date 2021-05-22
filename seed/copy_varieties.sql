-- Connect to database
\c main;

-- Truncate table
TRUNCATE TABLE variety;

SELECT * FROM variety;

-- Insert
COPY variety(
    "id",
    "basicType",
    "variety",
    "instructionsFor",
    "sproutsIn",
    "idealTemp",
    "seedDepth",
    "spaceApart",
    "minSun",
    "growingTips",
    "frostResistant",
    "heatResistant",
    "isFlower",
    "isFruit",
    "isHerb",
    "isVegetable",
    "isCommon"
) 
FROM '/home/dthompson/Code/gardenbuilder-backend-typescript/seed/varieties.csv' 
DELIMITER ','
CSV HEADER;