/**
* Insert data for a test user into db 
* Test user id is 18
*/

\c main;

-- Insert gardens for test user 
INSERT INTO garden(
    "name",
    "isActive",
    "ownerId"
)
VALUES
('Garden One', true, 18),
('Garden Two', true, 18),
('Garden One', true, 1),
('Garden Two', true, 1);