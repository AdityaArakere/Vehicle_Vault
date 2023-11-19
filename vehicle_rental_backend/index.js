require("dotenv").config();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./passportConfig");
const MySQLStore = require("express-mysql-session")(session);
const initializeAvailability = require("./Availability");

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "aditya11",
  database: "session_test",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

initializePassport(passport, db);
initializeAvailability(app, db);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var num = 0;

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   console.log("inside", num++);
//   next();
// });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to the home page or perform other actions
    res.redirect("http://localhost:3000/testPage");
  }
);

app.post("/Reg", async (req, res, next) => {
  // console.log("in reg");
  const phonenumber = req.body.phonenumber;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const passHash = await bcrypt.hash(password, salt);
  const id = Date.now().toString();
  const currentDate = new Date();
  const member_since = currentDate.toISOString().slice(0, 10);
  const license_number = 12345;

  db.query(
    "INSERT INTO customer_base (customer_id, phone_number, first_name, last_name, email, member_since, license_number, password) VALUES (?,?,?,?,?,?,?,?)",
    [
      id,
      phonenumber,
      firstname,
      lastname,
      email,
      member_since,
      license_number,
      passHash,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return (
          res
            // .status(500)
            .json({ message: "Error occurred while registering" })
        );
      } else {
        return (
          res
            // .status(200)
            .json({ message: "Registration successful", result })
        );
      }
    }
  );
  // next();
});

app.post("/login", passport.authenticate("local"), (req, res, next) => {
  const user = req.user;
  console.log("inside login");
  console.log(user);
  res.json({ message: "Login successful", user });
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
};

app.post("/profile", isAuthenticated, (req, res) => {
  const user = req.user;
  res.json({ message: "the profile is", user });
});

app.get("/logout", (req, res) => {
  // Use Passport.js to logout the user (destroy the session)
  req.logout((err) => {
    if (err) {
      return res.json({ message: "Error logging out" });
    }
  });
  // Clear the session or authentication token cookie on the client side
  res.clearCookie("connect.sid"); // replace 'sessionID' with the actual cookie name

  // Send a response indicating successful logout
  res.json({ message: "Logout successful" });
});

app.listen(PORT, () => {
  db.connect((err) => {
    if (!err) {
      console.log("database connected..");
    } else
      console.log(
        "db not connected \n Error : " + JSON.stringify(err, undefined, 2)
      );
  });
  console.log(`Server is running on ${PORT}`);
});
