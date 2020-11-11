const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const client = require("./pg.js");

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

/** 
Node/Javascript question:

I always a little confused when I see a require that isn't assigned to something

so in the code

app.js 
```
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig.js")(passport);

passport.authenticate('local', (err, user, info))
```

it catches me by surprise that the require("./passportConfig.js") line effects the passport in the remainer of the app.js file. At this point, I understand why, it just catches me off guard
*/
