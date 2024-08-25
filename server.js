const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database setup
const db = new sqlite3.Database('./database.sqlite');

// Routes
app.get('/', (req, res) => {
    db.all('SELECT * FROM reviews ORDER BY professor_name ASC', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { reviews: rows });
    });
});

app.post('/add', (req, res) => {
    const { professor_name, course_name, rating, department } = req.body;
    db.run('INSERT INTO reviews (professor_name, course_name, rating, department) VALUES (?, ?, ?, ?)', 
        [professor_name, course_name, rating, department], 
        function(err) {
            if (err) {
                return console.log(err.message);
            }
            res.redirect('/');
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
