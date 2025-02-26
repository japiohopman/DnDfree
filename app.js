const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dice', (req, res) => {
    res.render('dice');
});

// Function to save data to JSON
function saveData() {
    const data = {
        // Add variables to save here
    };
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Function to load data from JSON
function loadData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        // Restore variables from data here
    };
    reader.readAsText(file);
}

// Function to save form data and export it as a JSON file
function saveFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Add event listeners for save and load buttons
// Note: These event listeners will not work in a Node.js environment
// They are typically used in a browser environment
// document.getElementById("saveButton").addEventListener("click", saveData);
// document.getElementById("loadInput").addEventListener("change", loadData);

document.querySelectorAll('#page-flip > div').forEach((page, index) => {
    page.addEventListener('click', () => {
        const isEven = index % 2 === 0;
        page.style.transform = isEven ? `rotateY(-180deg)` : `rotateY(0deg)`;
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
