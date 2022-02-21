const axios = require("axios");
const instanceAxiosOcr = require("../apis/ocr");
const FormData = require("form-data");
let form = new FormData();

class OcrController {
  static async postOcr(req, res, next) {
      try {
        console.log(req.file,"<<<<<<<<<<<<<<");
        if(!req.file){
          throw{name:"Can't read file image file"}
        }
 
        const stream = req.file.buffer.toString("base64");
        form.append('base64Image', 'data:image/jpg;base64,'+ stream);
        form.append('language', 'eng');
        form.append('isCreateSearchablePdf', 'true');
        form.append('isSearchablePdfHideTextLayer', 'false');

        let url = 'https://api.ocr.space/parse/image'
        let options = {
            headers: {
                apikey: 'K89321088288957',
                ...form.getHeaders()
              }
        };
        const response = await axios.post(url, form, options)
        res.status(200).json({
          message:response.data.ParsedResults[0].ParsedText
        })
      } catch (error) {
        next(error)
      }
  }
}

module.exports = OcrController;