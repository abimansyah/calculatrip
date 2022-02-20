const axios = require('axios');
const instanceAxiosOcr = require('../apis/ocr')
const FormData = require('form-data')
const fs = require('fs')

class OcrController {
  static async postOcr (req,res,next){
    try {

      // console.log(req.file);

      if (req.file.buffer) {
        const image = req.file.buffer
        // const image = req.file.buffer.toString("base64")
        const imageName = req.file.originalname
        // form.append('file', 'data:image/jpeg;base64,'+ image)
        // fs.createReadStream('../server/controllers/Capture.JPG')

        let form = new FormData()
        // form.append('file', image)
        // form.append('fileName', imageName)
        // form.append('file', 'data:image/jpeg;base64,'+ image)
        form.append("file",fs.createReadStream('../server/controllers/Capture.JPG'))
        form.append('language', "eng")
        form.append('isCreateSearchablePdf', true)
        form.append('isSearchablePdfHideTextLayer', false)
        // form.append('fileType', "JPG")

        let newHeaders = form.getHeaders()

        const response = await axios({
          method: "post",
          url:'https://api.ocr.space/parse/image',
          headers:{
            apikey: "K89321088288957",
            ...form.getHeaders(),
            "Content-Type": "multipart/form-data"
          },
          data:{file:form},
          // data:{
          //   file: image,
          //   language:"eng",
          //   isCreateSearchablePdf:true,
          //   isSearchablePdfHideTextLayer:false,
          //   filetype:"JPG"
          // }
        })
        // if (!response) {
        //     throw {
        //         name: 'Error Create Data'
        //     }
        // }

        // req.uploadUrl = response.data.url
        // console.log(response.data);
        // next()
        res.status(200).json(response.data)
    } else {
        throw {name: 'Cant read file image file'}
    }

    } catch (err) {
      console.log(err,"<<<<<<<<<<<<<<<<");
      next(err)
    }
  }
}

module.exports = OcrController