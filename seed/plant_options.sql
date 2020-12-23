/**
* Insert plant type data in plant_type table 
*/

-- Connect to DB
\c main;

-- Insert
INSERT INTO plant_option(
    common_name,
    other_common_name,
    is_vegetable,
    is_herb,
    is_fruit,
    is_common
)
VALUES
('Tomato', null, true, false, false, true)
