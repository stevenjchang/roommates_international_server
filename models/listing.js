const client = require("../pg.js");

const getAllListingsQuery = `SELECT * FROM listing 
INNER JOIN listing_attribute as A 
USING (listing_id) 
WHERE (A.price > $1) 
AND (A.price < $2) 
AND (A.shared_room = $3 OR $3 IS NULL) 
AND (A.shared_house = $4 OR $4 IS NULL)`;

const getListingByIdQuery = `
SELECT * FROM listing WHERE listing_id = $1
`;

const createListingQuery = `
INSERT INTO listing (title, summary) VALUES ($1, $2) RETURNING *
`;

exports.getAllListings = async ({
  price_min = 1,
  price_max = 9999999,
  shared_room = null,
  shared_house = null,
}) => {
  const values = [price_min, price_max, shared_room, shared_house];
  const dbResult = await client.query(getAllListingsQuery, values);
  return dbResult.rows;
};

exports.getListingById = async ({ listing_id }) => {
  const dbResult = await client.query(getListingByIdQuery, [listing_id]);
  return dbResult.rows;
};
exports.createListing = async ({ title, summary }) => {
  const dbResult = await client.query(createListingQuery, [title, summary]);
  return dbResult.rows;
};
