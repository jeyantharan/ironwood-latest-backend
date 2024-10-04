const placeModel = require("../model/place");
const cloudinary = require("../utils/cloudinary");

const multer = require('multer');
const { translate , createObject } = require("../utils/translate");

const storage = multer.memoryStorage();
const upload = multer({ storage });



//create place

exports.create_place = async (req, res) => {
  try {

    translateWords = req.body.Name + "---" + req.body.Description + "---" + req.body.ShortDescription

    let out = await translate(translateWords,"de");
    const sout = out.split("---");


    let out1 = await translate(translateWords,"it");
    const sout1 = out1.split("---");


    let out2 = await translate(translateWords,"cs");
    const sout2 = out2.split("---");

    let out3 = await translate(translateWords,"en");    
    const sout3 = out3.split("---");


    enobjout = createObject(req.body.Name,req.body.Description,req.body.ShortDescription);
    


    
    let newPlace = new placeModel();
    await cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {    
        enobjout = await createObject(sout3[0],result.url,sout3[1],sout3[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone,req.body.Link);
        deobjout = await createObject(sout[0],result.url,sout[1],sout[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone,req.body.Link);
        itobjout = await createObject(sout1[0],result.url,sout1[1],sout1[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone,req.body.Link);
        csobjout = await createObject(sout2[0],result.url,sout2[1],sout2[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone,req.body.Link);


        newPlace.En = enobjout
        newPlace.De = deobjout
        newPlace.It = itobjout
        newPlace.Cs = csobjout
        newPlace.Type = req.body.Type

        //newPlace.Image = result.url;
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

    let getDetails = await placeModel.find({})
      res.status(200).send(getDetails);      
  } catch (error) {
    res.status(409).send("Error " + error);
  }
}

exports.get_by_id = async(req,res)=>{
  try {
    let id = req.params._id
  const getDetail = await linkModel.findById(id);
  
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

    let resultUrl;
    if (req.file) {

      // If a new image file is provided, upload it to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        resultUrl = result.url; // Store the URL of the new image
      } catch (err) {
        return res.status(500).send("Error uploading to Cloudinary");
      }
    } else {
      resultUrl = place.En.Image; // Use the existing URL if no new file is uploaded
    }

    // Prepare translation
    const translateWords = `${req.body.Name}---${req.body.Description}---${req.body.ShortDescription}`;
    const translations = await Promise.all([
      translate(translateWords, "de"),
      translate(translateWords, "it"),
      translate(translateWords, "cs")
    ]);

    // Split translations
    const [sout, sout1, sout2] = translations.map(out => out.split("---"));

    // Create translated objects
    const enobjout = await createObject(req.body.Name, resultUrl, req.body.Description, req.body.ShortDescription, req.body.Map, req.body.Type, req.body.DirMap, req.body.Phone,req.body.Link);
    const deobjout = await createObject(sout[0], resultUrl, sout[1], sout[2], req.body.Map, req.body.Type, req.body.DirMap, req.body.Phone,req.body.Link);
    const itobjout = await createObject(sout1[0], resultUrl, sout1[1], sout1[2], req.body.Map, req.body.Type, req.body.DirMap, req.body.Phone,req.body.Link);
    const csobjout = await createObject(sout2[0], resultUrl, sout2[1], sout2[2], req.body.Map, req.body.Type, req.body.DirMap, req.body.Phone,req.body.Link);

    // Update place object
    place.En = enobjout;
    place.De = deobjout;
    place.It = itobjout;
    place.Cs = csobjout;
    place.Type = req.body.Type;

    // Save the updated place document
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
    
    const data = await placeModel.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).send("Error updating place: " + error);
  }
}


