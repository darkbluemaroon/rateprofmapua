const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        professor_name TEXT NOT NULL,
        course_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        department TEXT NOT NULL
    )`);

    // Insert departments (optional, for filtering purposes)
    const departments = ['CEGE', 'CHE-CHM', 'EECE', 'IE-EMG', 'MAS', 'MATH', 'MME', 'PHY', 'SLHS', 'SOIT'];
    const stmt = db.prepare('INSERT INTO departments (name) VALUES (?)');
    departments.forEach(department => {
        stmt.run(department);
    });
    stmt.finalize();
});

db.close();
