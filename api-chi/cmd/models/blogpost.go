package models

import "time"

type BlogPost struct {
	Id        string    `json:"id"`
	Title     string    `json:"title"`
	Slug      string    `json:"slug"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	IsDraft   bool      `json:"is_draft"`
}
