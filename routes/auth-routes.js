const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Validate User Functions
const { loginValidation, registerValidation } = require("../validation");

module.exports = (router) => {
  // Auth Register
  router.post("/createAdmin", registerValidation, async (req, res) => {
    res.json({ user: req.user });
  });

  // when login is successful, retrieve user info
  router.get("/auth/login/success", (req, res) => {
    if (req.user) {
      //   Create and assign a token
      const token = jwt.sign({ user: req.user }, keys.token.TOKEN_SECRET);
      const user = {
        token: token,
        user: req.user,
        success: true,
      };
      res.send(user);
    } else {
      res.send({ success: false });
    }
  });

  // when login failed, send failed msg
  router.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
    });
  });

  // When logout, redirect to client
  router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect(keys.CLIENT_HOME_PAGE_URL);
  });

  // Auth Login with Passport Local
  router.post(
    "/auth/login",
    loginValidation,
    passport.authenticate("local"),
    (req, res) => {
      const user = {
        token: req.token,
        user: req.user,
      };
      res.send(user);
    }
  );

};