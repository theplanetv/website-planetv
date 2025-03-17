mod api;
mod application;
mod domain;
mod infrastructure;
mod schema;

use axum::{Router, routing::get};
use std::sync::{Arc, Mutex};
use infrastructure::database::establish_connection;

#[tokio::main]
async fn main() {
    // Kết nối cơ sở dữ liệu
    let connection = establish_connection();
    let state = Arc::new(Mutex::new(connection));

    // Tạo router với Axum
    let app = Router::new()
        .route("/blog-tags", get(api::blog_tag::get_all_blog_tags))
        .with_state(state);

    // Chạy server
    let listener = tokio::net::TcpListener::bind("localhost:3000").await.unwrap();
    println!("Server running on http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}