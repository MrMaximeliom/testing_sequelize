const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controllers");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
   
    controller.signup,
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
  );
  app.post("/api/auth/signin",
   controller.signin);
};
