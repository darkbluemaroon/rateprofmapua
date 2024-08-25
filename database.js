const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        profName TEXT,
        courseName TEXT,
        rating INTEGER,
        department TEXT,
        reviewMessage TEXT
    )`);
});

const addReview = (profName, courseName, rating, department, reviewMessage) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO reviews (profName, courseName, rating, department, reviewMessage) VALUES (?, ?, ?, ?, ?)');
        stmt.run(profName, courseName, rating, department, reviewMessage, (err) => {
            if (err) reject(err);
            else resolve();
        });
        stmt.finalize();
    });
};

const getAllReviews = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM reviews', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = { addReview, getAllReviews };
