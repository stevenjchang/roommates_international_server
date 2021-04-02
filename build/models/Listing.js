"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listing = void 0;
const pg_1 = require("../pg");
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
        const dbResult = await pg_1.default.query("SELECT * FROM listing");
        // console.log("dbResult", dbResult);
        // return [{ hi: "etst" }];
        return dbResult.rows;
    }
}
exports.Listing = Listing;
//# sourceMappingURL=Listing.js.map