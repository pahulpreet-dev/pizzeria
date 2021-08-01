const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controllers");

/* @desc get all users
@route /api/users/ 
@type get
*/
router.get("/", controller.AllUsers);

/* @desc registers new user
@route /api/users/ 
@type post
*/
router.post("/", controller.RegisterUser);

router.get("/test", (req, res) => res.json({ msg: "chal user bar" }));

module.exports = router;
