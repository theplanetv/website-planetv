FROM postgres:17-alpine

# Copy the appropriate setup file based on the environment
COPY database-postgresql/src /docker-entrypoint-initdb.d/src
COPY database-postgresql/setup-database-dev.sql /docker-entrypoint-initdb.d
