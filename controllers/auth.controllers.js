const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roleId:req.body.roleId
  })
    .then(user => {
      if (user.roleId) {
        Role.findAll({
          where: {
            id: req.body.roleId
            
          }
        }).then(role => {
          user.setRole(role.id).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRole(1).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (!user) {
//         console.log("no user")
//         return res.status(404).send({ message: "User Not found." });
//       }
//       var passwordIsValid = bcrypt.compareSync(
        
//         req.body.password,
//         user.password
//       );
//       if (!passwordIsValid) {
//         console.log("password not valid")

//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }
//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });
//       var authorities ;
//       user.getRole().then(role => {
        
//           authorities = "ROLE_" + role.name.toUpperCase();
//           console.log("user okay")

//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           role: authorities,
//           accessToken: token
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities ;
      user.getRole().then(role => {
        
          authorities = "ROLE_" + role.name.toUpperCase();
        
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};