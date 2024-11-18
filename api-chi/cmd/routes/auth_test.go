package routes

import (
	"api-chi/cmd/config"
	"api-chi/cmd/models"
	"api-chi/internal/message"
	"time"

	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/stretchr/testify/assert"
)

func Test_AuthRoutes(t *testing.T) {
	r := chi.NewRouter()
	AuthRoutes(r)
	config.LoadAuthConfig()

	t.Run("Login success", func(t *testing.T) {
		// Prepare input data
		input := models.Auth{Username: "admin", Password: "admin"}
		body, _ := json.Marshal(input)

		// Create a response recorder and a dummy request
		req := httptest.NewRequest(http.MethodPost, "/auth/login", bytes.NewBuffer(body))
		res := httptest.NewRecorder()

		// Serve the request through the router
		r.ServeHTTP(res, req)

		// Assert status code
		assert.Equal(t, http.StatusOK, res.Code)

		// Parse the response body
		response := message.Response{}
		err := json.NewDecoder(res.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.LOGIN_SUCCESS, response.Message)
		assert.Nil(t, response.Data)

		// Check the auth-token cookie
		cookie := res.Result().Cookies()
		var authToken string
		for _, c := range cookie {
			if c.Name == "auth-token" {
				authToken = c.Value
				break
			}
		}
		assert.NotEmpty(t, authToken, "auth-token cookie should not be empty")
	})

	t.Run("Logout success", func(t *testing.T) {
		// Create a response recorder and a dummy request
		recorder := httptest.NewRecorder()
		request := httptest.NewRequest(http.MethodDelete, "/auth/logout", nil)

		// Serve the request through the router
		r.ServeHTTP(recorder, request)

		// Validate response status code
		assert.Equal(t, http.StatusOK, recorder.Code)

		// Check the 'auth-token' cookie
		cookies := recorder.Result().Cookies()
		var authTokenCookie *http.Cookie
		for _, cookie := range cookies {
			if cookie.Name == "auth-token" {
				authTokenCookie = cookie
				break
			}
		}

		// Assert that the cookie is set with an expired date
		assert.NotNil(t, authTokenCookie)
		assert.Equal(t, "auth-token", authTokenCookie.Name)
		assert.Equal(t, "", authTokenCookie.Value)
		assert.True(t, authTokenCookie.Expires.Before(time.Now()))

		// Parse and validate JSON response
		response := message.Response{}
		err := json.NewDecoder(recorder.Body).Decode(&response)
		assert.NoError(t, err)
		assert.Equal(t, message.LOGOUT_SUCCESS, response.Message)
		assert.Nil(t, response.Data)
	})
}
