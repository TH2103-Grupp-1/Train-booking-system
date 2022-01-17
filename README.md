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
