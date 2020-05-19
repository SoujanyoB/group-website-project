const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;


app.set('view-engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.render("login.ejs");
});

app.listen(port, () => console.log(`App running at port ${port}`));