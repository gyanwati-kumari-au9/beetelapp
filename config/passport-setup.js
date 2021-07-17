const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const Users = require("../models/user-model");
const keys = require("../config/keys");

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  await Users.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      // Setting up user in the session
      const user = await Users.findOne({ email: req.body.email });
      done(null, user);
    }
  )
);

