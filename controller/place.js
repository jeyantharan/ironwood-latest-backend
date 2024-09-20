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




    enobjout = createObject(req.body.Name,req.body.Description,req.body.ShortDescription);
    


    
    let newPlace = new placeModel();
    await cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {    
        enobjout = await createObject(req.body.Name,result.url,req.body.Description,req.body.ShortDescription,req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
        deobjout = await createObject(sout[0],result.url,sout[1],sout[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
        itobjout = await createObject(sout1[0],result.url,sout1[1],sout1[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
        csobjout = await createObject(sout2[0],result.url,sout2[1],sout2[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);


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
  const getDetail = await placeModel.findById(id);
  console.log(getDetail);
  
  res.status(200).send(getDetail);
  
  } catch (error) {
    res.status(409).send("Error " + error);
  }
}


// exports.update_place = async (req, res) => {
//   try {
//     const { id } = req.params; // Get the place ID from the URL parameters
//     const updatedData = req.body; // Get the updated data from the request body
//     let place = await placeModel.findById(id); // Find the place by ID

//     if (!place) {
//       return res.status(404).send("Place not found");
//     }

//     if (req.file) {
//       // If a new image file is provided, upload it to Cloudinary
//       try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         // Set the new image URL in the place document
//         place.Image = result.url;
//       } catch (err) {
//         console.error(err);
//         return res.status(500).send("Error uploading to Cloudinary");
//       }
//     }

//     // Update the other fields
//     Object.assign(place, updatedData);

//     // Save the place document
//     try {
//       const updatedPlace = await place.save();
//       res.status(200).send(updatedPlace);
//     } catch (error) {
//       res.status(500).send("Error saving place: " + error);
//     }
    
//   } catch (error) {
//     res.status(500).send("Error updating place: " + error);
//   }
// };

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
        
    translateWords = req.body.Name + "---" + req.body.Description + "---" + req.body.ShortDescription

    let out = await translate(translateWords,"de");
    const sout = out.split("---");


    let out1 = await translate(translateWords,"it");
    const sout1 = out1.split("---");


    let out2 = await translate(translateWords,"cs");
    const sout2 = out2.split("---");


    enobjout = await createObject(req.body.Name,result.url,req.body.Description,req.body.ShortDescription,req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
    deobjout = await createObject(sout[0],result.url,sout[1],sout[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
    itobjout = await createObject(sout1[0],result.url,sout1[1],sout1[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);
    csobjout = await createObject(sout2[0],result.url,sout2[1],sout2[2],req.body.Map,req.body.Type,req.body.DirMap,req.body.Phone);


    place.En = enobjout
    place.De = deobjout
    place.It = itobjout
    place.Cs = csobjout
    place.Type = req.body.Type
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error uploading to Cloudinary");
      }
    }

    // Update the other fields
   // Object.assign(place, updatedData);

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


