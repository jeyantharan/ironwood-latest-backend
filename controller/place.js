const placeModel = require("../model/place");
const cloudinary = require("../utils/cloudinary");


const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });


//create place

exports.create_place = async (req, res) => {
  try {
    
    let newPlace = new placeModel(req.body);
    await cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {        
        newPlace.Image = result.url;
        let saveDetail = await newPlace.save().then((saveDetail) => {
          res.status(200).send(saveDetail);
        });
      }
    });
  } catch (error) {
    res.status(409).send("Error " + error);
  }
};


exports.get_place = async (req,res)=>{
  try {
    console.log("hiiiqqqq");
    
    let getDetails = await placeModel.find({})
      res.status(200).send(getDetails);      
  } catch (error) {
    res.status(409).send("Error " + error);
  }
}

exports.get_by_id = async(req,res)=>{
  try {
    let id = req.params._id
  const getDetail = await placeModel.findById(id);
  console.log(getDetail);
  
  res.status(200).send(getDetail);
  
  } catch (error) {
    res.status(409).send("Error " + error);
  }
}


exports.update_place = async (req, res) => {
  try {
    const { id } = req.params; // Get the place ID from the URL parameters
    const updatedData = req.body; // Get the updated data from the request body
    let place = await placeModel.findById(id); // Find the place by ID

    if (!place) {
      return res.status(404).send("Place not found");
    }

    if (req.file) {
      // If a new image file is provided, upload it to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        // Set the new image URL in the place document
        place.Image = result.url;
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error uploading to Cloudinary");
      }
    }

    // Update the other fields
    Object.assign(place, updatedData);

    // Save the place document
    try {
      const updatedPlace = await place.save();
      res.status(200).send(updatedPlace);
    } catch (error) {
      res.status(500).send("Error saving place: " + error);
    }
    
  } catch (error) {
    res.status(500).send("Error updating place: " + error);
  }
};


//delete place

exports.delete_place = async(req,res)=>{
  try {
    const { id } = req.params;
    console.log("eeewwww");
    
    const data = await placeModel.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).send("Error updating place: " + error);
  }
}


