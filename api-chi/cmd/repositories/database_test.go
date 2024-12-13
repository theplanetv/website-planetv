package repositories

import (
	"context"
	"testing"
)

func Test_DatabaseRepository(t *testing.T) {
	// Initialize the repository
	repo := &DatabaseRepository{}

	// Test Open method
	t.Run("Open Connection", func(t *testing.T) {
		err := repo.Open()
		if err != nil {
			t.Fatalf("failed to open database connection: %v", err)
		}

		if repo.Pool == nil {
			t.Fatal("expected Pool to be initialized, but got nil")
		}

		// Test if the connection is working by pinging the database
		err = repo.Pool.Ping(context.Background())
		if err != nil {
			t.Fatalf("failed to ping database: %v", err)
		}
	})

	// Test Close method
	t.Run("Close Connection", func(t *testing.T) {
		repo.Close()

		// Attempt to use the Pool after Close
		err := repo.Pool.Ping(context.Background())
		if err == nil {
			t.Fatal("expected error when pinging a closed pool, but got none")
		}
	})
}
