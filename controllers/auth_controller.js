var express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

var db = require("../models");

// create users 
router.post("/createaccount", function(req, res) {
  db.User.create({
   
    first_name: req.body.first_name,
    last_name:req.body.last_name,
    user_name: req.body.user_name,
    password:req.body.password,
    email:req.body.email, 
    lat: parseFloat( req.body.lat),
    long:parseFloat (req.body.long)
  }).then(function(dbUser) {
      console.log(dbUser);
      res.json(dbUser)
    }).catch(function(err){
      console.log(err)
      res.status(500).json(err);
    });
    
});
 


//AUTHENTICATION LOG IN 
//AUTHENTICATION LOG IN 
router.post("/signin", (req,res)=>{
  db.User.findOne({
    // setting user name as the standard
    where: {
      user_name: req.body.user_name
    }
  }).then(user=>{
    if(!user){
      return res.status(404).send("no such user")
    } else{
      //it will compare the passed in password to what is stored in the database
      if (bcrypt.compareSync(req.body.password, user.password)){
        //whenever i signin, add this object to my session key (will only show up after I signin)
        req.session.user = {
          id: user.id,
          first_name: user.first_name,
          user_name: user.user_name

        }
        res.send("login sucessful!")
      } else{
      res.status(401).send("wrong password")
      }
    }
  }).catch(err=>{
    res.status(500).end();
  })
})

  
  //SESSIONS
  //session key is info about you is connected to the session. go to this route to see your session info
  router.get("/readsessions",(req,res)=>{
    res.json(req.session)
})

  
  //SECRET ROUTE
  router.get("/secretroute", function(req,res){
    if (req.session.user){
      res.send(`welcome to PAWSLIFE ${req.session.user.first_name} `)
    }else{
      res.status(401).send("login first please")
    }
  })

  //LOG OUT
  router.get("/logout", (req,res)=>{
    req.session.destroy();
    db.Post.findAll({
      include:[
        {model:db.User, as:"Provider"},
        {model:db.User, as:"Booker"}
      ]
    }).then(userPosts=>{
      const userPostsJSON = userPosts.map(function(postObj){
        return postObj.toJSON();
      })
      const hbsObj={
        posts:userPostsJSON
      }
      console.log(userPostsJSON)
      res.render("index", hbsObj);
    }).catch(function(err){
      res.status(500).json(err);
    });
    
  })
module.exports = router;