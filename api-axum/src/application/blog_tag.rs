use diesel::prelude::*;
use std::sync::{Arc, Mutex};
use diesel::pg::PgConnection;
use crate::domain::blog_tag::BlogTag;
use crate::schema::blog_tag::dsl::*;

pub fn get_all(connection: Arc<Mutex<PgConnection>>) -> Vec<BlogTag> {
    let mut conn = connection.lock().unwrap();
    blog_tag
        .load::<BlogTag>(&mut *conn)
        .expect("Error loading blog tags")
}
