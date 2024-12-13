package repositories

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type BlogTagRepository struct {
	DB *DatabaseRepository
}

func (s *BlogTagRepository) Open() error {
	if s.DB == nil {
		fmt.Println("Database is nil")
		s.DB = &DatabaseRepository{}
	}

	return s.DB.Open()
}

func (s *BlogTagRepository) Close() {
	s.DB.Close()
}

func (s *BlogTagRepository) Count(search *string) (int, error) {
	// Execute SQL
	sql := "SELECT * FROM count_blog_tag(@search);"
	args := pgx.NamedArgs{
		"search": *search,
	}
	value := 0
	err := s.DB.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogTagRepository) GetAll(search *string, limit *int, page *int) ([]models.BlogTag, error) {
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
	sql := "SELECT * FROM get_all_blog_tag(@search, @limit, @page);"
	args := pgx.NamedArgs{
		"search": *search,
		"limit":  *limit,
		"page":   *page,
	}
	value := []models.BlogTag{}
	rows, err := s.DB.Query(config.CTX, sql, args)
	if err != nil {
		return value, err
	}
	for rows.Next() {
		item := models.BlogTag{}

		if err := rows.Scan(&item.Id, &item.Name); err != nil {
			return nil, err
		}

		value = append(value, item)
	}

	// If success return nil
	return value, nil
}

func (s *BlogTagRepository) Create(input *models.BlogTag) (models.BlogTag, error) {
	// Execute SQL
	sql := "SELECT * FROM create_blog_tag(@name);"
	args := pgx.NamedArgs{
		"name": input.Name,
	}
	value := models.BlogTag{}
	err := s.DB.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Name)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogTagRepository) Update(input *models.BlogTag) (models.BlogTag, error) {
	// Execute SQL
	sql := "SELECT * FROM update_blog_tag(@id, @name);"
	args := pgx.NamedArgs{
		"id":   input.Id,
		"name": input.Name,
	}
	value := models.BlogTag{}
	err := s.DB.QueryRow(config.CTX, sql, args).Scan(&value.Id, &value.Name)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}

func (s *BlogTagRepository) Remove(id *string) (string, error) {
	// Execute SQL
	sql := "SELECT * FROM remove_blog_tag(@id);"
	args := pgx.NamedArgs{
		"id": *id,
	}
	value := ""
	err := s.DB.QueryRow(config.CTX, sql, args).Scan(&value)
	if err != nil {
		return value, err
	}

	// If success return nil
	return value, nil
}
