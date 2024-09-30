const elementModel = require("../model/element");
const { translate , createEleObject } = require("../utils/translate");
const placeModel = require("../model/place");


exports.get_header = async(req,res)=>{
    try {              
        let lang = req.params.lang
        let id = "66ec81a70c8100bf87810bbc"
      const getDetail = await elementModel.findById(id);            
      res.status(200).send(getDetail[lang]);
      
      } catch (error) {
        res.status(409).send("Error " + error);
      }
}

exports.get_card = async(req,res)=>{
    try {        
        let lang = req.params.lang
        let id = "66ed003c0c8100bf87810bc6"
      const getDetail = await elementModel.findById(id);            
      res.status(200).send(getDetail[lang]);
      
      } catch (error) {
        res.status(409).send("Error " + error);
      }
}


exports.nav_element = async (req, res) => {
  try {
    console.log(req.body.ele4);

    console.log(req.body.ele5);
    console.log(req.body.ele6);

    
    let nav = await elementModel.findById("66ec81a70c8100bf87810bbc");

    let getDetails = await placeModel.find({})


    for (let index = 0; index < getDetails.length; index++) {
      const element = getDetails[index];

      // console.log(element);
      

      if(element.Type === req.body.ele4){
        console.log(element.En.Type);
        console.log(req.body.ele1);
        
        element.En.Type = req.body.ele1
        element.De.Type = req.body.ele1
        element.It.Type = req.body.ele1
        element.Cs.Type = req.body.ele1
        element.Type = req.body.ele1
        element._id = element._id

        console.log(element);

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
        
        
      }else if (element.Type === req.body.ele5) {
        console.log(element.En.Type);

        console.log(req.body.ele2);
        
        element.En.Type = req.body.ele2
        element.De.Type = req.body.ele2
        element.It.Type = req.body.ele2
        element.Cs.Type = req.body.ele2
        element.Type = req.body.ele2
        element._id = element._id

        console.log(element);
        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
        
      } else if(element.Type === req.body.ele6) {
        console.log(element.En.Type);
        console.log(req.body.ele3);
        

        element.En.Type = req.body.ele3
        element.De.Type = req.body.ele3
        element.It.Type = req.body.ele3
        element.Cs.Type = req.body.ele3
        element.Type = req.body.ele3

        element._id = element._id

        console.log(element);

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }
     

      
    }


    let translateWords = req.body.ele1 + "---" + req.body.ele2 + "---" + req.body.ele3;

    let out = await translate(translateWords, "de");
    let te = out.split("---");
    const sout = [];
    sout[0] = "Home";
    sout[1] = te[0];
    sout[2] = te[1];
    sout[3] = te[2];
    sout[4] = nav.De[4];
    sout[5] = nav.De[5];

    let out1 = await translate(translateWords, "it");
    let te1 = out1.split("---");
    const sout1 = [];
    sout1[0] = "Home";
    sout1[1] = te1[0];
    sout1[2] = te1[1];
    sout1[3] = te1[2];
    sout1[4] = nav.It[4];
    sout1[5] = nav.It[5];

    let out2 = await translate(translateWords, "cs");
    let te2 = out2.split("---");
    const sout2 = [];
    sout2[0] = "Home";
    sout2[1] = te2[0];
    sout2[2] = te2[1];
    sout2[3] = te2[2];
    sout2[4] = nav.Cs[4];
    sout2[5] = nav.Cs[5];

    let out3 = await translate(translateWords, "en");
    let te3 = out3.split("---");
    const sout3 = [];
    sout3[0] = "Home";
    sout3[1] = te3[0];
    sout3[2] = te3[1];
    sout3[3] = te3[2];
    sout3[4] = nav.En[4];
    sout3[5] = nav.En[5];

    // Instead of creating a new element, update the existing one
    let updatedElement = await elementModel.findByIdAndUpdate(
      nav._id,
      {
        En: sout3,
        De: sout,
        It: sout1,
        Cs: sout2,
      },
      { new: true } // Return the updated document
    );

    res.status(200).send(updatedElement);
  } catch (error) {
    res.status(409).send("Error " + error);
  }
};
