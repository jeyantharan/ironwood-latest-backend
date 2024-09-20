const router = require("express").Router();
const elementController = require("../controller/element");

//get header element
router.get("/header/:lang",elementController.get_header);

//get card element
router.get("/card/:lang",elementController.get_card);


module.exports = router;