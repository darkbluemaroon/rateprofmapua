const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();

let reviews = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { reviews });
});

app.post('/add-review', (req, res) => {
    const newReview = {
        _id: uuidv4(), // Unique ID for each review
        profName: req.body.profName,
        courseName: req.body.courseName,
        rating: parseInt(req.body.rating),
        department: req.body.department,
        reviewMessage: req.body.reviewMessage
    };
    reviews.push(newReview);
    res.redirect('/');
});

app.delete('/remove-review/:id', (req, res) => {
    const reviewId = req.params.id;
    const index = reviews.findIndex(review => review._id === reviewId);

    if (index !== -1) {
        reviews.splice(index, 1); // Remove the review from the array
        res.sendStatus(200); // Successfully removed
    } else {
        res.sendStatus(404); // Review not found
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
