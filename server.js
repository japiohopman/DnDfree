const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/home', (req, res) => {
    res.render('home');
});

// Add other routes here

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
