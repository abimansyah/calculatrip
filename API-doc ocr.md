## Endpoints :

List of available endpoints for OCR:

- `POST /ocr`


&nbsp;

## 1. POST /ocr

Description:
- Upload image to scan with ocr and get a string result.

Request:

- headers:

```json
{
  "access_token":"string"
}
```

- body: 

```json
{
  "imageFile": "image.jpg(upload image)"
}
```

_Response (200 - Ok )_

```json
{
    "message": "This code imports the dotenv and express libraries and instantiates Express.\r\nWe're also setting the port of the server to see , because in part 1 of this tutorial, we used create-react-app in\r\nthe local environment, so http://localhost:3000/ is already taken. For this reason, we specify a port other than\r\n3808 for the back end.\r\nIn an SPA(single page application) that is running in a local environment, sending a request from the front end to\r\nthe back end API server can cause a same origin policy error, which disallows the front end from accessing the\r\nserver.\r\nIn this tutorial, we're using http://locaIhost:3000/for the front end, and http://localhost:5000/ for the Node.js\r\nserver, causing the same origin policy issue.\r\nTo prevent this from happening, we'll add a proxy definition to package.json.\r\nOpen package.json in a text editor. Add the following code to the file:\r\n"
}
```

_Response (400 - Bad Request )_

```json
{
    "message": "Can't read file image file"
}

```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Forbiden to Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```