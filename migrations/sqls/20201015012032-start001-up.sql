CREATE TABLE IF NOT EXISTS account (
  account_id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  email text UNIQUE,
  password varchar(100),
  first_name text,
  last_name text,
  country_code text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listing_category (
  category_id serial PRIMARY KEY,
  category_name text
);

CREATE TABLE IF NOT EXISTS listing (
  listing_id serial PRIMARY KEY,
  title text,
  summary text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  bumped_at TIMESTAMP,
  account_id int REFERENCES account (account_id),
  category_id int REFERENCES listing_category (category_id) -- attribute_id int REFERENCES listing_attribute (attribute_id)
  -- status 
);

CREATE TABLE IF NOT EXISTS listing_attribute (
  attribute_id serial PRIMARY KEY,
  price int,
  total_bedrooms int,
  shared_room boolean,
  shared_house boolean,
  --lease_term - should only 1 choice be possible or multiple 
  listing_id int REFERENCES listing (listing_id)
);

CREATE TABLE IF NOT EXISTS comment (
  comment_id serial PRIMARY KEY,
  account_id int REFERENCES account (account_id),
  listing_id int REFERENCES listing (listing_id),
  content text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS msg (
  msg_id serial PRIMARY KEY,
  msg_from int REFERENCES account (account_id),
  -- sender_id
  msg_to int REFERENCES account (account_id),
  -- receiver_id
  msg_content text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- msg_type, status, message
);

CREATE TABLE IF NOT EXISTS user_listing_bookmark (
  account_id int REFERENCES account (account_id),
  listing_id int REFERENCES listing (listing_id),
  note text,
  is_active boolean
);
