package services

import (
	"api-chi/cmd/models"
	"api-chi/cmd/repositories"
)

type BlogTagService struct {
	Repo *repositories.BlogTagRepository
}

func (s *BlogTagService) Open() error {
	return s.Repo.Open()
}

func (s *BlogTagService) Close() {
	s.Repo.Close()
}

func (s *BlogTagService) Count(search *string) (int, error) {
	return s.Repo.Count(search)
}

func (s *BlogTagService) GetAll(search *string, limit *int, page *int) ([]models.BlogTag, error) {
	return s.Repo.GetAll(search, limit, page)
}

func (s *BlogTagService) Create(input *models.BlogTag) (models.BlogTag, error) {
	return s.Repo.Create(input)
}

func (s *BlogTagService) Update(input *models.BlogTag) (models.BlogTag, error) {
	return s.Repo.Update(input)
}

func (s *BlogTagService) Remove(id *string) (string, error) {
	return s.Repo.Remove(id)
}
