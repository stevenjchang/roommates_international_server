const passport = require("passport");
const bcrypt = require("bcryptjs");
const { logError } = require("../utils/consoleLog");
const LocalStrategy = require("passport-local").Strategy;
const client = require("../pg.js");
const Account = require("../models/account");

passport.serializeUser((profile, done) => {
  console.log("serializeUser ==>");
  return done(null, profile.account_id);
});

passport.deserializeUser((account_id, cb) => {
  console.log("deserializeUser ==>");
  const text = `
  SELECT * FROM account
  WHERE account_id = $1
`;
  const values = [account_id];
  client
    .query(text, values)
    .then((res) => {
      const data = res.rows[0];
      return cb(null, data);
    })
    .catch((err) => {
      return cb(err);
    });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const result = await Account.findUserByEmail(email);
        if (result.length === 1) {
          console.log("result ==>", result[0]);
          return done(null, result[0]);
        } else {
          return done(null, false);
        }
      } catch (err) {
        logError(__filename, err);
        return done(err);
      }
    }
  )
);

module.exports = passport;

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy((username, password, done) => {
//       const text = `SELECT * FROM account
//            WHERE username = $1`;
//       const values = [username];
//       client
//         .query(text, values)
//         .then((res) => {
//           const data = res.rows[0];
//           if (!data) {
//             return done(null, false);
//           }
//           const matchingPassword = bcrypt.compare(password, data.password);
//           if (matchingPassword) {
//             return done(null, data);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     })
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.account_id);
//   });

//   passport.deserializeUser((account_id, cb) => {
//     const text = `
//       SELECT * FROM account
//       WHERE account_id = $1
//     `;
//     const values = [account_id];
//     client
//       .query(text, values)
//       .then((res) => {
//         const data = res.rows[0];
//         cb(null, data);
//       })
//       .catch((err) => {
//         cb(err);
//       });
//   });
// };
