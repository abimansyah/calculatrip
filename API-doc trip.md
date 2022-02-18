## Endpoints :

List of available endpoints for Trips:

- `POST /trips`
- `GET /trips`
- `GET /trips/:id`
- `DELETE /trips/:id`
- `PUT /trips/:id`

&nbsp;

## 1. POST /trips

Description:

- Create a trip and usertrip

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
  "name": "string",
  "startDate": "date",
  "endDate": "date",
  "homeCurrency": "string",
  "tripImageUrl": "string",
  "targetBudget": "integer"
}
```

_Response (201 - Created)_

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
  "message": "startDate is required"
}
OR
{
  "message": "endDate cannot end before startDate"
}
OR
{
  "message": "endDate is required"
}
OR
{
  "message": "homeCurrency is required"
}
OR
{
  "message": "Target Budget Must be in Number!"
}
```

&nbsp;

## 2. GET /trips

Description:

- Get all current user trips

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "string",
    "startDate": "date",
    "endDate": "date",
    "homeCurrency": "string",
    "tripImageUrl": "string",
    "targetBudget": "integer",
    "UserTrip": {
        "UserId": 1,
        "TripId": 1,
        "status": "string",
        "role": "string",
    }
  },
  {
    "id": 2,
    "name": "string",
    "startDate": "date",
    "endDate": "date",
    "homeCurrency": "string",
    "tripImageUrl": "string",
    "targetBudget": "integer",
    "UserTrip": {
        "UserId": 1,
        "TripId": 2,
        "status": "string",
        "role": "string",
    }
  },
  ...,
]
```

&nbsp;

## 3. GET /trips/:id

Description:

- Get one trip by trip id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
  {
    "id": 1,
    "name": "string",
    "startDate": "date",
    "endDate": "date",
    "homeCurrency": "string",
    "tripImageUrl": "string",
    "targetBudget": "integer",
    "Users": [
        {
            "id": 1,
            "email": "string",
            "username": "string",
            "avatar": "string",
            "phoneNumber": "string",
            "birthDate": "date",
            "UserTrip": {
                "UserId": "integer",
                "TripId": "integer",
                "status": "string",
                "role": "string",
            }
        }
    ]
},
```

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
}
```

&nbsp;

## 4. DELETE /trips/:id

Description:

- Delete one trip and all related data (savings & expenses) from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Trip ${name} has been deleted!"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbiden to Access"
}
```

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
}
OR
{
  "message": "User Trip not found"
}
OR
{
  "message": "Expense not found"
}
OR
{
  "message": "Saving not found"
}
```

&nbsp;

## 5. PUT /trips/:id

Description:

- Update a trip

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "startDate": "date",
  "endDate": "date",
  "homeCurrency": "string",
  "tripImageUrl": "string",
  "targetBudget": "integer"
}
```

_Response (200 - Created)_

```json
{
  "message": "Trip ${name} has been updated!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Trip name is required"
}
OR
{
  "message": "startDate is required"
}
OR
{
  "message": "endDate cannot be before startDate"
}
OR
{
  "message": "endDate is required"
}
OR
{
  "message": "homeCurrency is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbiden to Access"
}
```

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
}
OR
{
  "message": "User Trip not found"
}
OR
{
  "message": "Expense not found"
}
OR
{
  "message": "Saving not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
