## Endpoints :

List of available endpoints for Weather:

- `GET /weather/coordinate`


&nbsp;

## 1. GET /weather/coordinate

Description:

- Get weather by coordinate

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "lat":"string",
  "lon":"string"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Trip ${name} has been created!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Trip name is required"
}
OR
{
  "message": "Start Date is required"
}
OR
{
  "message": "End Date is required"
}
OR
{
  "message": "Invalid date format"
}
OR
{
  "message": "End Date cannot end before Start Date"
}
OR
{
  "message": "Home Currency is required"
}
OR
{
  "message": "Target Budget Must be in Number!"
}
```

&nbsp;


## 2. GET /weather/city

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

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorize - Forbiden to Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
