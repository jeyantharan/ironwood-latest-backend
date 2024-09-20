const elementModel = require("../model/element");

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