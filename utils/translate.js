const axios = require("axios")


exports.translate = async(text,lang)=>{
    const apiKey = "AIzaSyADEhJvVCSsz51x3x3teOI1LDBn0Q-XxIo";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const response = await axios.post(url, {
      q: text,
      target: lang, 
    });
  
   return response.data.data.translations[0].translatedText
}

exports.createObject = async(Name,Image,Description,ShortDescription,Map,Type,DirMap,Phone)=>{
    let obj = {
        Name:Name,
        Image:Image,
        Description:Description,
        ShortDescription:ShortDescription,
        Map:Map,
        Type:Type,
        DirMap:DirMap,
        Phone:Phone
    }
    return obj;
}

exports.createEleObject = async(ele1,ele2,ele3,ele4,ele5)=>{
    let obj = {
        Ez :ele1,
        E2:ele2,
        E3:ele3,
        E4:ele4,
        E5:ele5
    }
    return obj;
}