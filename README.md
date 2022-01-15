## How to start in development mode

Navigate to backend/api
Due to limitations with Heroku, index.js needs adjustments before running in dev mode.

Open index.js and make **comment** the following code snippets.

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

Open another terminaln, navigate to frontend folder. Run **ng serve** for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
