/**
* Main entrypoint for database seeding
* Used to call files in order
* Called from root directory (where package.json is)
*/

-- \i seed/create_gardens.sql;
\i seed/copy_varieties.sql;
