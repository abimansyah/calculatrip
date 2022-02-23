## Endpoints :

List of available endpoints for Weather:

- `POST /weather/coordinate`
- `POST /weather/city`


&nbsp;

## 1. POST /weather/coordinate

Description:

- Post weather by coordinate

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
  "lat": "string",
  "lon": "string"
}
``` 

_Response (200 - Ok)_

```json
{
    "coord": {
        "lon": 106.8451,
        "lat": -6.2146
    },
    "weather": [
        {
            "id": 502,
            "main": "Rain",
            "description": "heavy intensity rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 29.04,
        "feels_like": 32.09,
        "temp_min": 24.13,
        "temp_max": 29.49,
        "pressure": 1009,
        "humidity": 66,
        "sea_level": 1009,
        "grnd_level": 1008
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.99,
        "deg": 311,
        "gust": 2.51
    },
    "rain": {
        "1h": 5.96
    },
    "clouds": {
        "all": 100
    },
    "dt": 1645449109,
    "sys": {
        "type": 2,
        "id": 2033644,
        "country": "ID",
        "sunrise": 1645397901,
        "sunset": 1645442074
    },
    "timezone": 25200,
    "id": 1642911,
    "name": "Jakarta",
    "cod": 200
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Latitude is required"
}
OR
{
  "message": "Longitude is required"
}
OR
{
  "message": "Wrong Longitude"
}

```

&nbsp;


## 2. POST /weather/city

Description:

- Post weather by city

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
  "lat":"city",
}
```

_Response (200 - Ok)_

```json
{
    "coord": {
        "lon": 106.8451,
        "lat": -6.2146
    },
    "weather": [
        {
            "id": 502,
            "main": "Rain",
            "description": "heavy intensity rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 29.04,
        "feels_like": 31.92,
        "temp_min": 24.13,
        "temp_max": 29.49,
        "pressure": 1009,
        "humidity": 65,
        "sea_level": 1009,
        "grnd_level": 1008
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.99,
        "deg": 311,
        "gust": 2.51
    },
    "rain": {
        "1h": 6.48
    },
    "clouds": {
        "all": 100
    },
    "dt": 1645448807,
    "sys": {
        "type": 2,
        "id": 2033644,
        "country": "ID",
        "sunrise": 1645397901,
        "sunset": 1645442074
    },
    "timezone": 25200,
    "id": 1642911,
    "name": "Jakarta",
    "cod": 200
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "City is required"
}

```
_Response (404 - Not Found)_

```json
{
  "message": "City not found"
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

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```