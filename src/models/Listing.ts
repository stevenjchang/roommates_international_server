import client from "../pg";

const getAllListingsQuery = `SELECT * FROM listing 
INNER JOIN listing_attribute as A 
USING (listing_id) 
WHERE (A.price > $1) 
AND (A.price < $2) 
AND (A.shared_room = $3 OR $3 IS NULL) 
AND (A.shared_house = $4 OR $4 IS NULL)
`;

class Listing {
  static async all() {
    console.log("called");
    const dbResult = await client.query("SELECT * FROM listing");
    // console.log("dbResult", dbResult);
    // return [{ hi: "etst" }];
    return dbResult.rows;
  }
  // static getById();
}

export { Listing };
