// Function to create a new course card
function createCourseCard(title, description, isTrainer) {
    const courseList = isTrainer
        ? document.getElementById('courseList')
        : document.getElementById('availableCourseList');

    if (courseList) {
        const courseCard = document.createElement('li');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            ${isTrainer ? '<button class="delete-button">Delete</button>' : ''}
        `;
        courseList.appendChild(courseCard);

        if (isTrainer) {
            // Add delete event listener for trainer's interface
            const deleteButton = courseCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                // Delete the course and update both interfaces
                deleteCourse(title);
            });
        }
    }
}

// Function to delete a course by title
function deleteCourse(title) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const updatedCourses = courses.filter(course => course.title !== title);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));

    // Refresh both interfaces
    refreshInterfaces();
}

// Function to refresh both interfaces after a course is added or deleted
function refreshInterfaces() {
    // Clear both course lists
    const courseList = document.getElementById('courseList');
    const availableCourseList = document.getElementById('availableCourseList');
    courseList.innerHTML = '';
    availableCourseList.innerHTML = '';

    // Display courses again for both interfaces
    displayCourses(true); // Trainer's interface
    displayCourses(false); // Learner's interface
}

// Function to display courses from localStorage
function displayCourses(isTrainer) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach(course => {
        createCourseCard(course.title, course.description, isTrainer);
    });
}

// Event listener for course submission
if (document.getElementById('courseForm')) {
    document.getElementById('courseForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const courseTitle = document.getElementById('courseTitle').value;
        const courseDescription = document.getElementById('courseDescription').value;
        createCourseCard(courseTitle, courseDescription, true); // Trainer's interface

        // Simulate saving the course data to localStorage (for demonstration)
        const courseData = {
            title: courseTitle,
            description: courseDescription,
        };

        // Store the course data as JSON in localStorage
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(courseData);
        localStorage.setItem('courses', JSON.stringify(courses));

        // Clear input fields
        document.getElementById('courseTitle').value = '';
        document.getElementById('courseDescription').value = '';
    });
}

// Call the function to display courses on page load for both interfaces
displayCourses(true); // Trainer's interface
displayCourses(false); // Learner's interface







// voice search

 // Function to filter cards based on user input
 function filterCards() {
    const searchInput = document.getElementById('ssearch').value.toLowerCase();
    const cards = document.querySelectorAll('.ccard');

    cards.forEach(ccard => {
        const cardText = ccard.textContent.toLowerCase();
        if (cardText.includes(searchInput)) {
            ccard.style.display = 'block';
        } else {
            ccard.style.display = 'none';
        }
    });
}

// Listen for input in the search bar
document.getElementById('ssearch').addEventListener('input', filterCards);

// Voice Search
const voiceSearchButton = document.getElementById('voice-search');
voiceSearchButton.addEventListener('click', () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const voiceSearchResult = event.results[0][0].transcript;
        document.getElementById('ssearch').value = voiceSearchResult;
        filterCards();
    };

    recognition.start();
});

