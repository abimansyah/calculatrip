## Endpoints :

List of available endpoints for Trips:

- `POST /trips`
- `GET /trips`
- `GET /trips/:id`
- `DELETE /trips/:id`
- `PUT /trips/:id`
- `POST /trips/:id`
- `PATCH /trips/:userTripId`

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
        "id": 4,
        "UserId": 1,
        "TripId": 3,
        "status": "accept",
        "role": "owner",
        "Trip": {
            "id": 3,
            "name": "non mi",
            "startDate": "2022-02-01T00:00:00.000Z",
            "endDate": "2022-02-02T00:00:00.000Z",
            "homeCurrency": "usd",
            "tripImageUrl": "http://dummyimage.com/149x100.png/dddddd/000000",
            "targetBudget": 8212147,
            "Users": [
                {
                    "id": 1,
                    "email": "user@gmail.com",
                    "username": "user",
                    "avatar": "https://robohash.org/dolordistinctioneque.png?size=100x100&set=set1",
                    "phoneNumber": "769-270-1300",
                    "birthDate": "1998-06-09T22:34:42.000Z",
                    "UserTrip": {
                        "id": 4,
                        "UserId": 1,
                        "TripId": 3,
                        "status": "accept",
                        "role": "owner"
                    }
                },
                {
                    "id": 5,
                    "email": "depinay4@feedburner.com",
                    "username": "srawsthorne4",
                    "avatar": "https://robohash.org/ducimusrationeomnis.png?size=100x100&set=set1",
                    "phoneNumber": "700-230-7960",
                    "birthDate": "1999-09-11T07:45:06.000Z",
                    "UserTrip": {
                        "id": 5,
                        "UserId": 5,
                        "TripId": 3,
                        "status": "owner",
                        "role": "companion"
                    }
                },
                {
                    "id": 2,
                    "email": "oskatcher1@ow.ly",
                    "username": "wshitliffe1",
                    "avatar": "https://robohash.org/fugailloatque.png?size=100x100&set=set1",
                    "phoneNumber": "822-961-1072",
                    "birthDate": "1990-04-21T07:54:56.000Z",
                    "UserTrip": {
                        "id": 37,
                        "UserId": 2,
                        "TripId": 3,
                        "status": "pending",
                        "role": "companion"
                    }
                }
            ]
        }
    },...
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

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
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
  "message": "Start Date is required"
}
OR
{
  "message": "End Date cannot be before Start Date"
}
OR
{
  "message": "End Date is required"
}
OR
{
  "message": "homeCurrency is required"
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

## 6. POST /trips/:id

Description:

- Create invitation to another user

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
  "id":"integer"
}
```

- body:

```json
{
  "input":"string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Invitation sent to ${findUser.username}"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}

```

&nbsp;




## 7. PATCH /trips/:userTripId

Description:

- Accept or decline invitation from another user

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
  "userTripId":"integer"
}
```

- body:

```json
{
  "status":"accept/reject"
}
```

_Response (201 - Created)_

```json
{
  "message": "You ${status} the invitation"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User Trip not found"
}
```

&nbsp;

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
