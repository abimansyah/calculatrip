## Endpoints :

List of available endpoints for Trips:

- `GET /exchangerate`
- `POST /exchangerate`
- `GET /exchangerate/:base`

&nbsp;

## 1. GET /exchangerate

Description:
- Get Symbols money from 3rd party currency.

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
Response (200 - Ok )_
```json
{
    "AED": {
        "description": "United Arab Emirates Dirham",
        "code": "AED"
    },
    "AFN": {
        "description": "Afghan Afghani",
        "code": "AFN"
    },
    "ALL": {
        "description": "Albanian Lek",
        "code": "ALL"
    },
    ...
}

```

## 2. POST /exchangerate

Description:
- Convert money with symbols money 

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- Body:
```json
{
   "from": "USD",
    "to": "EUR",
    "amount": 1
}
```

_Response (200 - OK)_

```json
{
    "from": "USD",
    "to": "EUR",
    "amount": 1,
    "rate": 0.880811,
    "date": "2022-02-17",
    "result": 0.880811
}

```

_Response (400 - Bad Request)_

```json
{
  "message": "From currency is required"
}
OR
{
  "message": "To currency is required"
}
OR
{
  "message": "Amount currency is required"
}
```

&nbsp;

## 3. GET /exchangerate/:base

Description:
- Get latest rate Convert money with symbols money 

Request:

- params: base symbols money

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "base": "EUR",
    "date": "2022-02-17",
    "rates": {
        "AED": 4.168405,
        "AFN": 103.935373,
        "ALL": 121.060137,
        "AMD": 545.06526,
        "ANG": 2.046254,
        ...
    }
   
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