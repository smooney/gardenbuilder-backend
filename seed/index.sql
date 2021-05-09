/**
* Main entrypoint for database seeding
* Used to call files in order
* Replace '/Users/user' with path to your local directory
*/

\i /Users/user/gardenbuilder-backend-typescript/seed/test_data.sql;
\i /Users/user/gardenbuilder-backend-typescript/seed/species.sql;
\i /Users/user/gardenbuilder-backend-typescript/seed/plant_varieties.sql;