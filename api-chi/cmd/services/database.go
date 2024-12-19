package services

import (
	"api-chi/cmd/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DatabaseService struct {
	*pgxpool.Pool
}

func (s *DatabaseService) Open() error {
	config.LoadDatabaseConfig()
	pool, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Assign connection
	s.Pool = pool
	return nil
}
