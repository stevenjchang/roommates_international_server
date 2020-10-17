CREATE TABLE IF NOT EXISTS account (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  email text UNIQUE,
  display_name text,
  created_at TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);
CREATE TABLE IF NOT EXISTS listing_category (
  id serial PRIMARY KEY,
  category_name text
);
CREATE TABLE IF NOT EXISTS listing_detail (
  id serial PRIMARY KEY,
  price int,
  bedrooms int,
  shared boolean,
  available boolean,
  shared_room boolean
);
CREATE TABLE IF NOT EXISTS listing (
  id serial PRIMARY KEY,
  title text,
  summary text,
  account_id int REFERENCES account (id),
  category_id int REFERENCES listing_category (id),
  listing_detail_id int REFERENCES listing_detail (id)
);

INSERT INTO listing_category (category_name)
VALUES 
  ('house'),
  ('apartment')
  ;

