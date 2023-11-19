const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { emit } = require("nodemon");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

function initialize(passport, db) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        db.query(
          "SELECT * FROM customer_base WHERE email = ?",
          [email],
          async (err, results) => {
            if (err) {
              return done(err);
            }

            if (results.length === 0) {
              return done(null, false, { message: "Email not found" });
            }

            const user = results[0];
            console.log("inside passportconfig");

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
              return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
          }
        );
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        const lastName =
          profile.name && profile.name.familyName
            ? profile.name.familyName
            : null;
        const firstName =
          profile.name && profile.name.givenName
            ? profile.name.givenName
            : null;
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;
        const id = Date.now().toString();
        const currentDate = new Date();
        const member_since = currentDate.toISOString().slice(0, 10);
        const license_number = 12345;

        db.query(
          "INSERT INTO customer_base (customer_id, first_name, last_name, email, member_since, license_number) VALUES (?,?,?,?,?,?)",
          [id, firstName, lastName, email, member_since, license_number],
          (err, result) => {
            if (err) {
              return done(err);
            }

            // Retrieve the inserted user from the database
            const user_id = id;
            db.query(
              "SELECT * FROM customer_base WHERE customer_id = ?",
              [user_id],
              (err, user) => {
                if (err) {
                  return done(err);
                }

                // Pass the user object to the done callback
                console.log("worked till now, user is: ", user[0]);
                done(null, user[0]);
              }
            );
          }
        );
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.customer_id);
    return done(null, user.customer_id);
  });

  passport.deserializeUser((customerId, done) => {
    console.log("Deserializing user with id:", customerId);
    db.query(
      "SELECT * FROM customer_base WHERE customer_id = ?",
      [customerId],
      (err, results) => {
        if (err) {
          return done(err);
        }
        const user = results[0];
        return done(null, user);
      }
    );
  });
}

module.exports = initialize;
