package controllers

import (
	"api-chi/cmd/models"
	"api-chi/cmd/services"
	"api-chi/internal/message"

	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type BlogTagController struct {
	service services.BlogTagService
}

func (c *BlogTagController) Count(w http.ResponseWriter, r *http.Request) {
	// Retrieve query parameters
	search := r.URL.Query().Get("search")

	// Open and close database after end
	err := c.service.Open()
	defer c.service.Close()
	if err != nil {
		log.Fatal(err)
	}

	// Execute Count and return if failed or success
	data, err := c.service.Count(&search)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, message.Response{
			Message: message.GET_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, message.Response{
		Message: message.GET_DATA_SUCCESS,
		Data:    data,
	})
}

func (c *BlogTagController) GetAll(w http.ResponseWriter, r *http.Request) {
	// Retrieve query parameters
	search := r.URL.Query().Get("search")
	limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
	if err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, message.Response{
			Message: message.GET_DATA_FAILED,
			Data:    nil,
		})
		return
	}
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, message.Response{
			Message: message.GET_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	// Open and close database after end
	err = c.service.Open()
	defer c.service.Close()
	if err != nil {
		log.Fatal(err)
	}

	// Execute Count and return if failed or success
	data, err := c.service.GetAll(&search, &limit, &page)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, message.Response{
			Message: message.GET_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, message.Response{
		Message: message.GET_DATA_SUCCESS,
		Data:    data,
	})
}

func (c *BlogTagController) Create(w http.ResponseWriter, r *http.Request) {
	// Get JSON from user input
	input := models.BlogTag{}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, message.Response{
			Message: message.CREATE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	// Open and close database after end
	err := c.service.Open()
	defer c.service.Close()
	if err != nil {
		log.Fatal(err)
	}

	// Execute Count and return if failed or success
	data, err := c.service.Create(&input)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, message.Response{
			Message: message.CREATE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, message.Response{
		Message: message.CREATE_DATA_SUCCESS,
		Data:    data,
	})
}

func (c *BlogTagController) Update(w http.ResponseWriter, r *http.Request) {
	// Get JSON from user input
	input := models.BlogTag{}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, message.Response{
			Message: message.UPDATE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	// Open and close database after end
	err := c.service.Open()
	defer c.service.Close()
	if err != nil {
		log.Fatal(err)
	}

	// Execute Count and return if failed or success
	data, err := c.service.Update(&input)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, message.Response{
			Message: message.UPDATE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, message.Response{
		Message: message.UPDATE_DATA_SUCCESS,
		Data:    data,
	})
}

func (c *BlogTagController) Remove(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, message.Response{
			Message: message.REMOVE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	// Open and close database after end
	err := c.service.Open()
	defer c.service.Close()
	if err != nil {
		log.Fatal(err)
	}

	// Execute Count and return if failed or success
	data, err := c.service.Remove(&id)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, message.Response{
			Message: message.REMOVE_DATA_FAILED,
			Data:    nil,
		})
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, message.Response{
		Message: message.REMOVE_DATA_SUCCESS,
		Data:    data,
	})
}
