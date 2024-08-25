const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const database = require('./database');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', async (req, res) => {
    const reviews = await database.getAllReviews();
    res.render('index', { reviews });
});

// Post review route
app.post('/add-review', async (req, res) => {
    const { profName, courseName, rating, department, reviewMessage } = req.body;
    await database.addReview(profName, courseName, rating, department, reviewMessage);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
