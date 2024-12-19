package services

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_DatabaseService(t *testing.T) {
	service := DatabaseService{}

	t.Run("Open and close connection success", func(t *testing.T) {
		// Connect database
		err := service.Open()
		defer service.Close()
		assert.NoError(t, err)
	})
}
