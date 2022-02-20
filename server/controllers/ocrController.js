const axios = require('axios');
const instanceAxiosOcr = require('../apis/ocr')
const FormData = require('form-data')

class OcrController {
  static async postOcr (req,res,next){
    try {

      // console.log(req.file);

      if (req.file.buffer) {
        const data = req.file.buffer.toString("base64")
        const dataName = req.file.originalname
        let form = new FormData()
        form.append('file', data)
        form.append('fileName', dataName)

        // console.log('data:image/jpeg;base64,'+data);

        let newHeaders = form.getHeaders()

        const test = 'data:image/jpeg;base64,'+data
        // console.log(test);

        const response = await axios({
          method: "post",
          url:'https://api.ocr.space/parse/image',
          headers:{
            apikey: "K89321088288957",
            ...form.getHeaders()
          },
          data:{
            language:"eng",
            base64Image:test,
            // fileType:"JPG",
            isCreateSearchablePdf:true,
            isSearchablePdfHideTextLayer:false,
          }
        })
        // if (!response) {
        //     throw {
        //         name: 'Error Create Data'
        //     }
        // }

        // req.uploadUrl = response.data.url
        // console.log(response.data);
        // next()
    } else {
        throw {name: 'Cant read file image file'}
    }
      
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = OcrController