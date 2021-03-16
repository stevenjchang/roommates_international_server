CREATE TABLE IF NOT EXISTS comment (
  comment_id serial PRIMARY KEY,
  account_id int REFERENCES account(account_id),
  listing_id int REFERENCES listing(listing_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

