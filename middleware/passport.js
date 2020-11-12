const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const client = require("../pg.js");

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((account_id, cb) => {
  const text = `
  SELECT * FROM account
  WHERE account_id = $1
`;
  const values = [account_id];
  client
    .query(text, values)
    .then((res) => {
      const data = res.rows[0];
      cb(null, data);
    })
    .catch((err) => {
      cb(err);
    });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {}
  )
);

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      const text = `SELECT * FROM account
           WHERE username = $1`;
      const values = [username];
      client
        .query(text, values)
        .then((res) => {
          const data = res.rows[0];
          if (!data) {
            return done(null, false);
          }
          const matchingPassword = bcrypt.compare(password, data.password);
          if (matchingPassword) {
            return done(null, data);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err);
        });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.account_id);
  });

  passport.deserializeUser((account_id, cb) => {
    const text = `
      SELECT * FROM account
      WHERE account_id = $1
    `;
    const values = [account_id];
    client
      .query(text, values)
      .then((res) => {
        const data = res.rows[0];
        cb(null, data);
      })
      .catch((err) => {
        cb(err);
      });
  });
};
