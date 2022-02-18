## Endpoints :

List of available endpoints for Users:

- `POST users/register`
- `POST users/login`
- `GET users`
- `GET users/profile/:input`
- `GET users/profile`
- `PUT users/:id`

&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "avatar": "defaultValue",
  "birthDate": "date",
  "phoneNumber": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "username": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Username must be unique"
}
OR
{
  "message": "Username can not contain symbols"
}
OR
{
  "message": "Username must have more than 6 characters"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must contain more than 7 characters"
}
OR
{
  "message": "Invalid date format"
}
OR
{
  "message": "Birth Date is required"
}
OR
{
  "message": "Phone Number has already been taken"
}
OR
{
  "message": "Phone Number is required"
}
```

&nbsp;


## 2. POST /users/login

Request:

- body:

```json
{
  "loginInput": "string",
  "password": "string"
}
```

_Response (200 - OK) 

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/username/password"
}
```

&nbsp;

## 3. GET /users

Description:
- Get all users from database

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
    "email": "string",
    "username": "string",
    "avatar": "string",
    "birthDate": "date",
    "phoneNumber": "string",
  },
  {
    "id": 2,
    "email": "string",
    "username": "string",
    "avatar": "string",
    "birthDate": "date",
    "phoneNumber": "string",
  }
  ...,
]
```

&nbsp;

## 4. GET /users/profile/:input

Description:
- Get one user by email/username from database

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
  "input": "string"
}
```

_Response (200 - OK)_

```json
  {
    "id": 1,
    "email": "string",
    "username": "string",
    "avatar": "string",
    "birthDate": "date",
    "phoneNumber": "string",
  },
```
_Response (404 - Not found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 5. GET /users/profile

Description:
- Get one user by access token from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
  {
    "id": 1,
    "email": "string",
    "username": "string",
    "avatar": "string",
    "birthDate": "date",
    "phoneNumber": "string",
  },
```
_Response (404 - Not found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 6. PUT /users/:id

Request:

- body:

```json
{
  "password": "string",
  "username": "string",
  "avatar": "string",
  "birthDate": "date",
  "phoneNumber": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Your profile has been updated!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username must be unique"
}
OR
{
  "message": "username can not contain symbols"
}
OR
{
  "message": "username must have more than 6 characters"
}
OR
{
  "message": "username is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must contain more than 7 characters"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access!"
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