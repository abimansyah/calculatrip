const axios = require("axios");
const instanceAxiosOcr = require("../apis/ocr");
const FormData = require("form-data");
let form = new FormData();

class OcrController {
  static async postOcr(req, res, next) {
    try {
      // console.log(req.uploadUrl);
      let url = `https://api.ocr.space/parse/imageurl?apikey=K89321088288957&url=${req.uploadUrl}`
      const response = await axios.get(url)
      res.status(200).json({
        message: response.data.ParsedResults[0].ParsedText
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OcrController;