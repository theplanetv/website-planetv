-- Create tables
\i /docker-entrypoint-initdb.d/src/data_tables.sql

-- Create functions
\i /docker-entrypoint-initdb.d/src/functions/blog_tag.sql
