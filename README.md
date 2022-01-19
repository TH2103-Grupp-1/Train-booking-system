## Stack / Required tools
### Backend
**Node.js** v16 or later: https://nodejs.org/en/<br>
**Express**

### Frontend
**Angular CLI** - npm install -g @angular/cli

### Database
**SQLite**<br>
Recommended: **SQLite DB Browser** https://sqlitebrowser.org/

## Install dependencies
Navigate to **backend/api**. Run **npm install**<br>
Navigate to **frontend**. Run **npm install**


## How to start in development mode

Due to limitations with Heroku, index.js needs adjustments before running in dev mode.

Navigate to **backend/api**. Open index.js and **comment** the following code snippets.

```javascript
app.use(express.static('./public'));
```
AND

```javascript
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});  
```
ALSO make sure to **uncomment** CORS

```javascript
app.use(cors());
```

Start the API by running **npm start** in backend/api folder. The api will per default run on port 5000: http://localhost:5000/api/

Open another terminal, navigate to **frontend** folder. Run **ng serve** for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Structure

```
Train-booking-system
│   README.md
│  
│
└───backend/api 
│   │   database.db - SQLite Database File
│   │   index.js - Entry point for API
│   │   controllers/ - Datalayer for API
|   |   middleware/ - Middleware files for API requests
|   |   public/ - Build of Angular project to serve from the API
|   |   routes/ - Defines the routes for each controller
|   |   ...
|   |
│   
│   
└───frontend
|   |
│   └───src/app
│       │   account/ - Components for account-page
│       │   auth/ - Components for login / register
│       │   booking/ - Components for the booking pages
|       |   models/
|       |   navbar/ - Shared navbar component
|       |   services/ - HTTP, authentication and booking builder services
|       |
|       └───shared/guards
|           |   auth.guard.ts - Guard for protecting routes
|           |
|           └───interceptors
|               |   error-interceptor.ts - Intercepts HTTP errors from API and displays them in a user friendly way
|               |                   
```

### API Endpoints

## Open Endpoints

Open endpoints require no Authentication.

### Users
* **Login** : `POST /api/auth/login/` - Returns user object with JWT. 1h lease time.
* * **Register** : `POST /api/auth/login/` - Creates user and returns user object with JWT. 1h lease time.

### Bookings
* **Create Booking** : `POST /api/bookings/` - Creates a booking from the body request and inserts it into database.
* * **Get Booking By ID** : `GET /api/bookings/:id` - Returns booking by ID if found.
* * **Get Bookings By User ID** : `GET /api/bookings/user/:id?date` - Returns all bookings with UserID, if date query is provided only dates greater than the query date will be returned.

### Carriages
* **Get All Carriages** : `GET /api/carriages/` - Returns all carriages.
* **Get Carriages By Train ID** : `GET /api/carriages/:id` - Returns all carriages that belong to the provided train.

### Payment
* **Checkout** : `POST /api/payment/` - Creates required stripe metadata, when the Stripe API returns OK, the controller returns confirmation component with the Stripe session ID as query. Otherwise it will return the landing page.
* **Order Success** : `GET /api/payment/order/success` - Gets stripe metadata, then sets the specified seats to occupied and returns the stripe metadata.

### Seats
* **Get Carriage Seats** : `POST /api/seats/:id` - Returns all seats the belongs to the specified carraige.
* **Update Seat** : `PATCH /api/seats:id/` - Updates the seat to occuped if found.
* **Create Seats** : `POST /api/seats/` - Seeding function for creating seats.


### Timetables
* **Get All Timetables** : `GET /api/timetables/` - Returns all timetables from the database.

### Trains
* **Get All Trains** : `GET /api/trains/` - Returns all trains.
* **Get Train By ID** : `GET /api/trains/:id` - Returns the specified train if found.


### Trainstations
* **Create Train Station** : `POST /api/trainstations/` - Seeding function for creating trainstations using a body request.
* **Get All Trainstations** : `GET /api/trainstations/` - Returns all trainstations.


### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

**Get user by ID** : `GET /api/users/:id` - Returns the user if found. Currently no requirement of JWT.
**Update User** : `PATCH /api/users/:id` - Updates the specified user. Not implemented yet.
