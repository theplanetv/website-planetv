package routes

import (
	"api-chi/cmd/controllers"
	"api-chi/cmd/middlewares"

	"github.com/go-chi/chi/v5"
)

func BlogFileRoutes(r chi.Router) {
	controller := controllers.BlogFileController{}
	authMiddleware := middlewares.AuthMiddleware{}

	r.Route("/blogfile", func(r chi.Router) {
		r.Get("/count", controller.Count)
		r.Get("/", controller.GetAll)

		r.With(authMiddleware.CheckLogin).Post("/", controller.Create)
		r.With(authMiddleware.CheckLogin).Patch("/", controller.Update)
		r.With(authMiddleware.CheckLogin).Delete("/{id}", controller.Remove)
	})
}
