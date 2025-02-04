-- Create tables
\i /docker-entrypoint-initdb.d/src/data_tables.sql

-- Create functions
\i /docker-entrypoint-initdb.d/src/functions/blog_post.sql
\i /docker-entrypoint-initdb.d/src/functions/blog_tag.sql

-- Create test values
\i /docker-entrypoint-initdb.d/src/insert-test-data.sql
