## Endpoints :

List of available endpoints for Savings:

- `POST /savings/:tripId`
- `GET /savings/:tripId`
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
  "message": "Amount can't be below 0"
}
```

&nbsp;

## 2. GET /savings/:tripId

Description:
- Get all savings inside a trip

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
    "tripId": "integer",
    "amount": "integer",
    "userId": "integer",
    "createdAt": "date",
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
    "createdAt": "date",
    "User": {
              "username": "string",
              "email": "string"
            }
  },
  ...,
]
```

&nbsp;

## 3. DELETE /savings/:savingId

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
  "expenseId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Saving with ID: ID has been deleted!"
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