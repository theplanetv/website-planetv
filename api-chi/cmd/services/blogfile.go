package services

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"

	"github.com/jackc/pgx/v5"
)

type BlogFileService struct {
	Conn DatabaseService
}

func (s *BlogFileService) Open() error {
	return s.Conn.Open()
}

func (s *BlogFileService) Close() {
	s.Conn.Close()
}

func (s *BlogFileService) Count(search *string) (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_blog_file(@search);"
	args := pgx.NamedArgs{
		"search": *search,
	}
	value := 0
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogFileService) GetAll(search *string, limit *int, page *int) ([]models.BlogFile, error) {
	// Set default range for limit
	if *limit < 10 {
		*limit = 10
	} else if *limit > 50 {
		*limit = 50
	}

	// Set default range for page
	if *page < 1 {
		*page = 0
	} else {
		*page = *page - 1
	}

	// Execute SQL
	sql := "SELECT * FROM get_all_blog_file(@search, @limit, @page);"
	args := pgx.NamedArgs{
		"search": *search,
		"limit":  *limit,
		"page":   *page,
	}
	value := []models.BlogFile{}
	rows, err := s.Conn.Query(config.CTX, sql, args)
	if err != nil {
		return value, err
	}
	for rows.Next() {
		item := models.BlogFile{}

		if err := rows.Scan(&item.Id, &item.Filename); err != nil {
			return nil, err
		}

		value = append(value, item)
	}

	// If success return nil
	return value, nil
}

func (s *BlogFileService) Create(input *models.BlogFile) (models.BlogFile, error) {
	// Execute SQL
	sql := "SELECT * FROM create_blog_file(@name);"
	args := pgx.NamedArgs{
		"name": input.Filename,
	}
	value := models.BlogFile{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Filename)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogFileService) Update(input *models.BlogFile) (models.BlogFile, error) {
	// Execute SQL
	sql := "SELECT * FROM update_blog_file(@id, @name);"
	args := pgx.NamedArgs{
		"id":   input.Id,
		"name": input.Filename,
	}
	value := models.BlogFile{}
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Filename)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogFileService) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_blog_file(@id);"
	args := pgx.NamedArgs{
		"id": *id,
	}
	value := ""
	err := s.Conn.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
