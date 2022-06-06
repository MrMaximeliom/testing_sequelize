const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;
const Role = db.role;
// TODO: break this function to two functions
const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed!, Username is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed!, Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};
const checkDuplicateUsername = (req,res,next) =>{
  User.findOne({
    where:{
      username:req.body.username,
    }
  })
  .then(user =>{
    if(user){
      res.status(400).send({ message:"Failed!, Username already taken!"})
      return;
    }
    next();
  
  }
  
  )
}
const checkDuplicateEmail = (req,res,next) =>{
  User.findOne({
    where:{
      email:req.body.email
    }
  })
  .then(user =>{
    if(user){
      res.status(400).send({message:"Failed!, Email already taken!"})
      return;
    }
    next();
  })
};
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed!, Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};
const checkRoleExisted = (req,res,next) =>{
  if(req.body.roleId){
    Role.findOne({
      where:{
        id:req.body.roleId
      }
    })
    .then(role =>{
      if(!role){
        res.status(400).send({
          message:`FAiled!, Role ${role.name} does not exist!`

        })
        return;
      }
      next();
    })


  }
}
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkDuplicateUsername:checkDuplicateUsername,
  checkDuplicateEmail:checkDuplicateEmail,
  checkRoleExisted:checkRoleExisted
};
module.exports = verifySignUp;
