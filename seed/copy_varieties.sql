-- Connect to database
\c main;

-- Truncate table
TRUNCATE TABLE variety;

SELECT * FROM variety;

-- Insert
COPY variety(
    "id",
    "variety",
    "basicType",
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
FROM './variety.csv' 
DELIMITER ','
CSV HEADER;