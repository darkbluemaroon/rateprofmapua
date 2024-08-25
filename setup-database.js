const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('./database.sqlite');

// Create tables
db.serialize(() => {
    // Create table for reviews
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        professor_name TEXT NOT NULL,
        course_name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10),
        department TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating reviews table:', err.message);
        }
    });

    // Create table for departments (optional)
    db.run(`CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )`, (err) => {
        if (err) {
            console.error('Error creating departments table:', err.message);
        }
    });

    // Insert departments (optional, for filtering purposes)
    const departments = ['CEGE', 'CHE-CHM', 'EECE', 'IE-EMG', 'MAS', 'MATH', 'MME', 'PHY', 'SLHS', 'SOIT'];
    const stmt = db.prepare('INSERT OR IGNORE INTO departments (name) VALUES (?)');
    departments.forEach(department => {
        stmt.run(department, (err) => {
            if (err) {
                console.error('Error inserting department:', err.message);
            }
        });
    });
    stmt.finalize();
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database connection:', err.message);
    } else {
        console.log('Database setup complete.');
    }
});
