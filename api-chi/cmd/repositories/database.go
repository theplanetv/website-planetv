package repositories

import (
	"api-chi/cmd/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DatabaseRepository struct {
	*pgxpool.Pool
}

func (s *DatabaseRepository) Open() error {
	config.LoadDatabaseConfig()
	conn, err := pgxpool.New(config.CTX, config.POSTGRES_URL)
	if err != nil {
		return err
	}

	// Gán kết nối vào struct thông qua field Pool
	s.Pool = conn
	return nil
}

func (s *DatabaseRepository) Close() {
	if s.Pool != nil {
		s.Pool.Close()
	}
}
