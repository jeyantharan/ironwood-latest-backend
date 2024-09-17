const router = require("express").Router();
const upload = require("../middleware/multer");

const placeController = require("../controller/place");
const multer = require("multer");

//create place
router.post("/createPlace",upload.single('Image'),placeController.create_place);

router.get("/allPlace",placeController.get_place);

router.get("/:_id",placeController.get_by_id);

router.put("/:id",upload.single('Image'),placeController.update_place);

router.delete("/:id",placeController.delete_place)




module.exports = router;