use axum::{Json, extract::State};
use serde::Serialize;
use std::sync::{Arc, Mutex};
use diesel::pg::PgConnection;
use crate::application::blog_tag::get_all;
use crate::domain::blog_tag::BlogTag;

#[derive(Serialize)]
pub struct ApiResponse {
    data: Vec<BlogTag>,
}

pub async fn get_all_blog_tags(
    State(connection): State<Arc<Mutex<PgConnection>>>,
) -> Json<ApiResponse> {
    let blog_tags = get_all(connection);
    Json(ApiResponse { data: blog_tags })
}
