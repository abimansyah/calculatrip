## Endpoints :

List of available endpoints for Expenses:

- `POST /expenses/:tripId`
- `GET /expenses/:tripId`
- `GET /expenses/trip/:expenseId`
- `DELETE / expenses/:expenseId`
- `POST /:expenseId/image`
- `DELETE /:expenseId/image/:imageId`

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
  "expenseCategoryId": "integer",
  "paymentMethodId": "integer",
  "location": "string",
  "description": "text",
  "expenseDate": "date",
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
  "message": "Expense name is required"
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
  "message": "Choose expenses category!"
}
OR
{
  "message": "Choose expenses payment method!"
}
OR
{
  "message": "Expense Date is required"
}
OR
{
  "message": "Invalid input date"
}
```

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
}
```

&nbsp;

## 2. GET /expenses/trip/:tripId

Description:

- Get all expenses inside a trip

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
  "name": "string",
  "amount": "integer",
  "categoryId": "integer",
  "paymentMethodId": "integer",
  "location": "string",
  "description": "text",
  "userId": "integer",
  "ExpenseCategory": {
    "name": "string",
    "icon": "string"
  },
  "PaymentMethod": {
    "name": "string",
    "icon": "string"
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

_Response (404 - Not found)_

```json
{
  "message": "Trip not found"
}
```

&nbsp;

## 3. GET /expenses/:expenseId

Description:

- Get 1 expense inside a trip

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
```

_Response (404 - Not found)_

```json
{
  "message": "Expense not found"
}
```

&nbsp;

## 4. DELETE /expenses/:expenseId

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
  "message": "Expense has been deleted!"
}
```

Response (403 - Forbidden)_

```json
{
  "message": "Forbidden to access"
}
```

_Response (404 - Not found)_

```json
{
  "message": "Expense not found"
}
```

&nbsp;


## 5. POST /:expenseId/image

## 6. DELETE /:expenseId/image/:imageId

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
