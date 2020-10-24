CREATE TABLE IF NOT EXISTS account (
  account_id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  email text UNIQUE,
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

INSERT INTO
  account (username, email, first_name, last_name)
VALUES
  ('user1', 'email1@test.com', 'Joe', 'Burrow'),
  ('user2', 'email2@test.com', 'Josh', 'Jacobs'),
  ('user3', 'email3@test.com', 'Joe', 'Mixon');

INSERT INTO
  listing_category (category_name)
VALUES
  ('house'),
  ('apartment');

INSERT INTO
  listing (title, summary, account_id, category_id)
VALUES
  (
    '2 bedroom near park',
    'Been looking for a 2BR home (all upstairs) in False Creek? You have just found it. Located at the end of a quiet hillside cul de sac, this 1960 built 2BR, 1 bath 1 owner home has been beautifully maintained and offers excellent privacy with no neighbours to the north and west.',
    1,
    2
  ),
  (
    '4 bedroom near bart',
    'Brand new, modern home with HEAT PUMP!! Kitchen has eating bar w/gorgeous floor to ceilings windows to allow plenty of natural lighting.',
    2,
    1
  ),
  (
    '1 bedroom in-law unit',
    'Very affordable Gastown border cottage with separate studio guest suite is a sanctuary. Immaculate south facing 1BR, 1 bath corner suite in the community of Mouat Park. Secure parking and additional storage in a downtown concrete building, this home delivers the very best of warm,period charm & superior upgrading. Walking distance to everything.',
    3,
    1
  ),
  (
    '3 bedroom near park',
    'Very affordable Gastown border cottage with separate studio guest suite is a sanctuary. Immaculate south facing 1BR, 1 bath corner suite in the community of Mouat Park. Secure parking and additional storage in a downtown concrete building, this home delivers the very best of warm,period charm & superior upgrading. Walking distance to everything.',
    2,
    1
  ),
  (
    '4 bedroom near bart',
    'Very affordable Gastown border cottage with separate studio guest suite is a sanctuary. Immaculate south facing 1BR, 1 bath corner suite in the community of Mouat Park. Secure parking and additional storage in a downtown concrete building, this home delivers the very best of warm,period charm & superior upgrading. Walking distance to everything.',
    2,
    1
  ),
  (
    '4 bedroom near bart',
    'Very affordable Gastown border cottage with separate studio guest suite is a sanctuary. Immaculate south facing 1BR, 1 bath corner suite in the community of Mouat Park. Secure parking and additional storage in a downtown concrete building, this home delivers the very best of warm,period charm & superior upgrading. Walking distance to everything.',
    2,
    1
  ),
  (
    '4 bedroom near bart',
    'Very affordable Gastown border cottage with separate studio guest suite is a sanctuary. Immaculate south facing 1BR, 1 bath corner suite in the community of Mouat Park. Secure parking and additional storage in a downtown concrete building, this home delivers the very best of warm,period charm & superior upgrading. Walking distance to everything.',
    2,
    1
  );

INSERT INTO
  listing_attribute (
    listing_id,
    total_bedrooms,
    price,
    shared_room,
    shared_house
  )
VALUES
  (1, 2, 1200, false, true),
  (2, 4, 1000, true, true),
  (3, 1, 1800, false, false),
  (4, 3, 1500, false, true);