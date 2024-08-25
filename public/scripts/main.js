document.addEventListener('DOMContentLoaded', () => {
    const reviewsTable = document.getElementById('reviews-table').getElementsByTagName('tbody')[0];

    function sortReviews() {
        const rows = Array.from(reviewsTable.getElementsByTagName('tr'));
        const sortByProfName = document.getElementById('sort-profName').value;
        const sortByCourseName = document.getElementById('sort-courseName').value;
        const sortByDepartment = document.getElementById('sort-department').value;
        const sortByRating = document.getElementById('sort-rating').value;

        rows.sort((a, b) => {
            // Sort by professor name
            let profNameA = a.cells[0].innerText.toLowerCase();
            let profNameB = b.cells[0].innerText.toLowerCase();
            if (sortByProfName === 'asc') {
                if (profNameA < profNameB) return -1;
                if (profNameA > profNameB) return 1;
            } else {
                if (profNameA > profNameB) return -1;
                if (profNameA < profNameB) return 1;
            }

            // Sort by course name
            let courseNameA = a.cells[1].innerText.toLowerCase();
            let courseNameB = b.cells[1].innerText.toLowerCase();
            if (sortByCourseName === 'asc') {
                if (courseNameA < courseNameB) return -1;
                if (courseNameA > courseNameB) return 1;
            } else {
                if (courseNameA > courseNameB) return -1;
                if (courseNameA < courseNameB) return 1;
            }

            // Filter by department
            if (sortByDepartment) {
                let departmentA = a.cells[2].innerText.toLowerCase();
                let departmentB = b.cells[2].innerText.toLowerCase();
                if (departmentA !== sortByDepartment.toLowerCase() && departmentB !== sortByDepartment.toLowerCase()) {
                    return 0;
                } else if (departmentA === sortByDepartment.toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }
            }

            // Sort by rating
            let ratingA = parseInt(a.cells[3].innerText);
            let ratingB = parseInt(b.cells[3].innerText);
            if (sortByRating === 'asc') {
                return ratingA - ratingB;
            } else {
                return ratingB - ratingA;
            }
        });

        rows.forEach(row => reviewsTable.appendChild(row));
    }

    document.querySelectorAll('.filters select').forEach(select => {
        select.addEventListener('change', sortReviews);
    });

    // Add event listener for the remove button
    reviewsTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const reviewId = e.target.getAttribute('data-id');
            
            fetch(`/remove-review/${reviewId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    e.target.closest('tr').remove(); // Remove the row from the table
                } else {
                    alert('Failed to remove the review.');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
