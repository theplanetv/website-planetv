package services

import (
	"api-chi/cmd/models"

	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_BlogFileService(t *testing.T) {
	id := ""
	service := BlogFileService{}

	t.Run("Count success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""

		// Count database
		count, err := service.Count(&search)
		assert.NoError(t, err)
		assert.Greater(t, count, 0)
	})

	t.Run("Count success with search", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := "file 1"

		// Count database
		count, err := service.Count(&search)
		assert.NoError(t, err)
		assert.Greater(t, count, 0)
		assert.Less(t, count, 60)
	})

	t.Run("GetAll default success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 10
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.BlogFile{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Filename)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll limit < 10 will return 10 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 9
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.BlogFile{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Filename)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll limit > 50 will return 50 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 51
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.BlogFile{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Filename)
		}
		assert.Equal(t, count, 50)
	})

	t.Run("GetAll page < 1 will return 50 success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := ""
		limit := 10
		page := 0

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.BlogFile{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Filename)
		}
		assert.Equal(t, count, 10)
	})

	t.Run("GetAll with search is filename 1", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		search := "file 1"
		limit := 20
		page := 1

		// Count database
		data, err := service.GetAll(&search, &limit, &page)
		assert.NoError(t, err)
		assert.IsType(t, data[0], models.BlogFile{})
		count := 0
		for _, item := range data {
			count += 1
			assert.NotEmpty(t, item.Id)
			assert.NotEmpty(t, item.Filename)
		}
		assert.Less(t, count, 20)
	})

	t.Run("Create success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.BlogFile{
			Filename: "test tag",
		}

		// Create database
		value, err := service.Create(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Filename, input.Filename)

		// Assign value to id
		id = value.Id
	})

	t.Run("Update success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Declare input
		input := models.BlogFile{
			Id:       id,
			Filename: "this is test tag",
		}

		// Create database
		value, err := service.Update(&input)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
		assert.Equal(t, value.Id, input.Id)
		assert.Equal(t, value.Filename, input.Filename)
	})

	t.Run("Remove success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)

		// Remove database
		value, err := service.Remove(&id)
		assert.NoError(t, err)
		assert.NotEmpty(t, value)
	})
}