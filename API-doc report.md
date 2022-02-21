## Endpoints :

List of available endpoints for Report:

- `GET /report/:tripId`


&nbsp;

## 1. GET /report/:tripId

Description:
- Get expenses, savings, trip data for report.

Request:

- params: 

```json
{
  "tripId": "integer"
}
```

_Response (200 - Ok )_
```json
{
    "message": "Your trip report has been created"
}
```

_Response (404 - Not Found )_
```json
{
    "message": "Trip not found"
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