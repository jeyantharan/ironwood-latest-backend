const router = require("express").Router();
const elementController = require("../controller/element");

//get header element
router.get("/header/:lang",elementController.get_header);

//get card element
router.get("/card/:lang",elementController.get_card);

router.patch("/updateNav",elementController.nav_element);

router.get("/getLink",elementController.get_link);


module.exports = router;