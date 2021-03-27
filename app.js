const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config/")[env];
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const expressSession = require("express-session")({
  secret: config.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
});
const client = require("./pg.js");
const router = express.Router();
const { accountRouter } = require("./routes/account/index.js");
const { listingRouter } = require("./routes/listing/index.js");
const { authRouter } = require("./routes");
const { Account, Listing } = require("./models/");

// const cors = require('cors')
const setCorsHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

// Middlewear
app.use(cookieParser(config.session.sessionSecret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(setCorsHeaders);
app.use(flash());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
// require("./middleware/passport.js")(passport);

// Routes
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No user found");
//     req.logIn(user, (err) => {
//       if (err) throw err;
//       res.send("Successfully Authenticated");
//     });
//   })(req, res, next);
// });
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  const text = `
    INSERT INTO account (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [username, hashedPassword];
  client.query(text, values).then((result) => {
    const data = result.rows[0];
    res.send(data);
  });
});
router.get("/user", (req, res) => {
  res.send(req.user);
});

router.get("/", (req, res) => {
  res.send("im the home page!");
});

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/listing", listingRouter);

app.use("/", router);

const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  type Account {
    account_id: Int
    username: String!
    email: String
  }
  type Listing {
    listing_id: Int
    title: String
    summary: String
    account_id: Int
    category_id: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    accounts: [Account]
    account(account_id: Int, email: String): Account
    listings: [Listing]
    listing(listing_id: Int): Listing
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    accounts: async () => {
      const users = await Account.getAllUsers();
      return users;
    },
    account: async (parent, args, context, info) => {
      const { account_id, email } = args;
      if (account_id) {
        const queryResult = await Account.findUserById(account_id);
        return queryResult.user;
      } else {
        const queryResult = await Account.findUserByEmail(email);
        return queryResult[0];
      }
    },
    listings: async (_, args) => {
      const dbResult = await Listing.getAllListings(args);
      return dbResult;
    },
    listing: async (_, { listing_id }) => {
      const dbResult = await Listing.getListingById({ listing_id });
      console.log("dbResult ==>", dbResult);
      return dbResult[0];
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// apollo graphql server, port 4000
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

//express server, port 8080
app.listen(config.port, () => {
  console.log("listening on PORT:", config.port);
});
