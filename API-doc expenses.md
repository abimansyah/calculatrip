## Endpoints :

List of available endpoints for Expenses:

- `POST /expenses/:tripId`
- `GET /expenses/:tripId`
- `DELETE / expenses/:expenseId`

&nbsp;

## 1. POST /expenses/:tripId

Description:

- Create a expense inside a trip

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
  "categoryId": "integer",
  "paymentMethodId": "integer",
  "location": "string",
  "description": "text",
}
```

_Response (201 - Created)_

```json
{
  "message": "Expense added!"
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
OR
{
  "message": "Choose expenses category!"
}
OR
{
  "message": "Choose expenses payment method!"
}
```

&nbsp;

## 2. GET /expenses/:tripId

Description:

- Get all expenses inside a trip

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
  "name": "string",
  "amount": "integer",
  "categoryId": "integer",
  "paymentMethodId": "integer",
  "location": "string",
  "description": "text",
  "userId": "integer",
  "Category": {
    "name": "string"
  },
  "PaymentMethod": {
    "name": "string"
  },
  "User": {
    "username": "string",
    "email": "string"
  }
},
 {
  "name": "string",
  "amount": "integer",
  "categoryId": "integer",
  "paymentMethodId": "integer",
  "location": "string",
  "description": "text",
  "userId": "integer",
  "Category": {
    "name": "string"
  },
  "PaymentMethod": {
    "name": "string"
  },
  "User": {
    "username": "string",
    "email": "string"
  }
}
  ...,
]
```

&nbsp;

## 3. DELETE /expenses/:expenseId

Description:

- Delete one expense from a trip

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
  "message": "Expense with ID: ID has been deleted!"
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
  "message": "Expense not found"
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
