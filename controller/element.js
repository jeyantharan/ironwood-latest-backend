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
      } else if(element.Type === req.body.ele12) {        

        element.En.Type = req.body.ele7
        element.De.Type = req.body.ele7
        element.It.Type = req.body.ele7
        element.Cs.Type = req.body.ele7
        element.Type = req.body.ele7

        element._id = element._id

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }else if(element.Type === req.body.ele13) {        

        element.En.Type = req.body.ele8
        element.De.Type = req.body.ele8
        element.It.Type = req.body.ele8
        element.Cs.Type = req.body.ele8
        element.Type = req.body.ele8

        element._id = element._id

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }else if(element.Type === req.body.ele14) {        

        element.En.Type = req.body.ele9
        element.De.Type = req.body.ele9
        element.It.Type = req.body.ele9
        element.Cs.Type = req.body.ele9
        element.Type = req.body.ele9

        element._id = element._id

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }else if(element.Type === req.body.ele15) {        

        element.En.Type = req.body.ele10
        element.De.Type = req.body.ele10
        element.It.Type = req.body.ele10
        element.Cs.Type = req.body.ele10
        element.Type = req.body.ele10

        element._id = element._id

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }else if(element.Type === req.body.ele16) {        

        element.En.Type = req.body.ele11
        element.De.Type = req.body.ele11
        element.It.Type = req.body.ele11
        element.Cs.Type = req.body.ele11
        element.Type = req.body.ele11

        element._id = element._id

        let UType = await placeModel.findByIdAndUpdate(
          element._id,
          element,
          { new: true } // Return the updated document
        );
      }
     

      
    }


    let translateWords = req.body.ele1 + "---" + req.body.ele2 + "---" + req.body.ele3 + "---" + req.body.ele7 + "---" + req.body.ele8 + "---" + req.body.ele9 + "---" + req.body.ele10 + "---" + req.body.ele11

    let out = await translate(translateWords, "de");
    let te = out.split("---");
    const sout = [];
    sout[0] = "Home";
    sout[1] = te[0];
    sout[2] = te[1];
    sout[3] = te[2];
    sout[4] = te[3];
    sout[5] = te[4];
    sout[6] = te[5];
    sout[7] = te[6];
    sout[8] = te[7];
    sout[9] = nav.De[9];
    sout[10] = nav.De[10];

    let out1 = await translate(translateWords, "it");
    let te1 = out1.split("---");
    const sout1 = [];
    sout1[0] = "Home";
    sout1[1] = te1[0];
    sout1[2] = te1[1];
    sout1[3] = te1[2];
    sout1[4] = te1[3];
    sout1[5] = te1[4];
    sout1[6] = te1[5];
    sout1[7] = te1[6];
    sout1[8] = te1[7];
    sout1[9] = nav.It[9];
    sout1[10] = nav.It[10];

    console.log(translateWords);
    

    let out2 = await translate(translateWords, "cs");
    console.log(out2);
    
    let te2 = out2.split("---");

    console.log(te2);
    
    const sout2 = [];
    sout2[0] = "Home";
    sout2[1] = te2[0];
    sout2[2] = te2[1];
    sout2[3] = te2[2];
    sout2[4] = te2[3];
    sout2[5] = te2[4];
    sout2[6] = te2[5];
    sout2[7] = te2[6];
    sout2[8] = te2[7];
    sout2[9] = nav.Cs[9];
    sout2[10] = nav.Cs[10];

    let out3 = await translate(translateWords, "en");
    let te3 = out3.split("---");
    const sout3 = [];
    sout3[0] = "Home";
    sout3[1] = te3[0];
    sout3[2] = te3[1];
    sout3[3] = te3[2];
    sout3[4] = te3[3];
    sout3[5] = te3[4];
    sout3[6] = te3[5];
    sout3[7] = te3[6];
    sout3[8] = te3[7];
    sout3[9] = nav.En[9];
    sout3[10] = nav.En[10];

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
