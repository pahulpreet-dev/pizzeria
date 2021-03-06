const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controllers");

/* @desc get all users
@route /api/users/ 
@type get
*/
router.get("/", controller.AllUsers);

/* @desc registers new user
@route /api/users/signup
@type post
*/
router.post("/signup", controller.RegisterUser);

/* @desc login a user
@route /api/users/login
@type post
*/
router.post("/login", controller.LoginUser);

/* @desc delete a user
@route /api/users/:userId 
@type delete
*/
router.delete("/:userId", controller.DeleteUser);

router.get("/test", (req, res) => res.json({ msg: "chal user bar" }));

module.exports = router;
