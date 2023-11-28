const express = require("express");
const router = express.Router();
const schemas = require("../validations/Users");
const login = require("../controllers/Login");
const validate = require("../middlewares/validate");
const authenticate= require("../middlewares/authenticate")
const verify= require("../middlewares/verify")


router.route("/").get(authenticate, verify);

router.route("/login").post(login);
// router.route("/login").post(validate(schemas.loginValidation), login);
// router.route('/').post(validate(schemas.createValidation), create)
// router.route('/').put(authenticate, validate(schemas.updateValidation), put)
// router.route('/').delete(authenticate, remove)

module.exports = router;
