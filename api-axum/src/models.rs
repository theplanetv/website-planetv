use diesel::prelude::*;
use uuid::Uuid;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::blog_tag)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct BlogTag {
    pub id: Uuid,
    pub color: String,
    pub name: String,
}