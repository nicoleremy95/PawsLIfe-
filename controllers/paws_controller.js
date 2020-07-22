
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
  return res.render("index");
});

router.get("/user", function(req, res) {
  return res.render("user");
});

router.get("/signin", function(req, res) {
  return res.render("signin");
});

router.get("/createaccount", function(req, res) {
  return res.render("createaccount");
});




// router.get("/burgers", function(req, res) {

//   db.Burger.findAll()

//     .then(function(dbBurger) {
//       console.log(dbBurger);
//       const dbBurgersJson = dbBurger.map(burger=>burger.toJSON());
//       var hbsObject = { burger: dbBurgersJson };
//       return res.render("index", hbsObject);
//     });
// });

// router.post("/burgers/create", function(req, res) {
//   db.Burger.create({
//     burger_name: req.body.burger_name
//   }).then(function(dbBurger) {
//       console.log(dbBurger);
//       res.redirect("/");
//     });
// });


// router.put("/burgers/update/:id", function(req, res) {
//   db.Burger.update({
//     devoured: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbBurger) {
//     res.json("/");
//   });
// });

module.exports = router;
