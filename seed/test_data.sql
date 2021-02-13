/**
* Insert data for a test user into db 
* Test user id is 12
*/

\c main;

-- Insert gardens for test user 
INSERT INTO garden(
    "name",
    "isActive",
    "ownerId"
)
VALUES
('Garden One', true, 12),
('Garden Two', true, 12),
('Garden One', true, 1),
('Garden Two', true, 1);