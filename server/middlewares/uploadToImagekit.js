const FormData = require("form-data");
const instanceAxios = require("../apis/axios");

const uploadToImagekit = async (req, res, next) => {
  try {

    if (req.file.mimetype !== "image/png") {
      if (req.file.mimetype !== "image/jpeg") {
        throw {
          name: "InvalidImageFormat",
        };
      }
    }
    if (req.file.size > 5000000) {
      throw {
        name: "InvalidImageSize",
      };
    }

    if (req.file.buffer) {
      const data = req.file.buffer.toString("base64");
      const dataName = req.file.originalname;
      let form = new FormData();
      form.append("file", data);
      form.append("fileName", dataName);

      let newHeaders = form.getHeaders();

      const response = await instanceAxios.post("/files/upload", form, {
        headers: newHeaders,
      });
      if (!response) {
        throw {
          name: "Error Create Data",
        };
      }
      req.uploadUrl = response.data.url;

      next();
    } else {
      throw {
        name: "Cant read file image file",
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = uploadToImagekit;
