const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

 const Admin = require("../models/admins.js");
 const User = require("../models/users.js");

module.exports = function(passport){
    passport.use(
        "user",
        new localStrategy({ usernameField: "user_id" }, (user_id,password,done)=> {
          User.findOne({ user_id: user_id })
          .then((user) => {
            if (!user) {
              return done(null, false,{message: 'Access Denied!!'});
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if(err)
                throw err;
              if(isMatch){
                  return done(null,user);
              }
              else{
                console.log("Inorrect");
                  return done(null,false,{message:'Incorrect Password'});               
              }
            });
          })
        .catch(err=>console.log(err));
        })
      );
      
     
passport.use(
    "admin",
    new localStrategy({ usernameField: "user_id" }, function (
      user_id,
      password,
      done
    ) {
      Admin.findOne({user_id: user_id})
        .then((admin) => {
          if (!admin) {
            console.log("No");
            return done(null, false,{message: 'Access Denied!!'});
          }
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log("mTHED");
              return done(null, admin);
            } else {
              console.log("Inorrect");
                    return done(null,false,{message:'Incorrect Password'});   
            }
          });
        })
      .catch(err=>console.log(err));
    })
  );   
  // passport.serializeUser((user, done)=> {
  //   done(null, user.id);
  // });
   
  // passport.deserializeUser((id, done)=> {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  // });
    passport.serializeUser(function (user, done) {
        let type = user.is_admin ? "admin" : "user";
        done(null, { id: user.id, type: type });
    });
    
    passport.deserializeUser(function (data, done) {
        if (data.type === "user") {
        User.findById(data.id, function (err, user) {
            done(null, user);
        });
        } else {
        Admin.findById(data.id, function (err, user) {
            done(err, user);
        });
        }
    });
};