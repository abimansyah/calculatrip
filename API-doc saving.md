## Endpoints :

List of available endpoints for Savings:

- `POST /savings/:tripId`
- `GET /savings/trip/:tripId`
- `GET /savings/:savingId`
- `DELETE / savings/:savingId`

&nbsp;

## 1. POST /savings/:tripId

Description:
- Create a savings inside a trip

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
  "tripId": "integer"
}
```
- body:

```json
{
  "name": "string",
  "amount": "integer",
  "savingDate": "date"
}
```

_Response (201 - Created)_

```json
{
  "message": "Happy saving!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Amount is required"
}
OR
{
  "message": "Amount can't be 0 or below"
}
OR
{
  "message": "Saving date  input date"
}
OR
{
  "message": "Invalid input date"
}
```

&nbsp;

## 2. GET /savings/trip/:tripId

Description:
- Get all savings inside a trip

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
  "tripId": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "string",
    "tripId": "integer",
    "amount": "integer",
    "userId": "integer",
    "savingDate": "date",
    "createdAt": "date",
    "updatedAt": "date",
    "User": {
              "username": "string",
              "email": "string"
            }
  },
  {
    "id": 2,
    "name": "string",
    "tripId": "integer",
    "amount": "integer",
    "userId": "integer",
    "savingDate": "date",
    "User": {
              "username": "string",
              "email": "string"
            }
  },
  ...,
]
```

&nbsp;

## 3. GET /savings/:savingId

Description:
- Get one saving of a trip

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
  "savingId": "integer"
}
```

_Response (200 - OK)_

```json
  {
    "id": 1,
    "name": "string",
    "tripId": "integer",
    "amount": "integer",
    "userId": "integer",
    "savingDate": "date",
    "createdAt": "date",
    "updatedAt": "date",
    "User": {
              "username": "string",
              "email": "string"
            }
  }
```

&nbsp;

## 4. DELETE /savings/:savingId

Description:
- Delete one saving from a trip

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
  "savingId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Saving has been deleted!"
}
```
Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access!"
}
```

_Response (404 - Not found)_

```json
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