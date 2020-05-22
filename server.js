const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const port = 3000;


app.set('view-engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.render("login.ejs");
});

app.post('/user', (req, res) => {
   if(!req.body.user || !req.body.pass) {
       res.status("400");
       res.send("Invalid Details!");
       console.log(req.body.user + " " + req.body.pass);
   } else {
       Users.filter(function(user) {
        if(user.username === req.body.username) {
            res.render("login/ejs", {message: "User already exists!"});
        }
       });
       var newUser = {username: req.body.username, password:req.body.password};
       Users.push(newUser);
       req.session.user = newUser;
       res.redirect('/user');
   }
});

function checkSignIn(req, res) {
    if(req.session.user) {
        next();
    } else {
        var err = new Error("Not Logged In!");
        console.log(req.session.user);
        next(err);
    }
}

app.get('/user', checkSignIn, function(req, res) {
    res.render('user.ejs', {id: req.session.user.username});
})

app.use('/user', function(err, req, res, next){
    console.log(err);
       //User should be authenticated! Redirect him to log in.
       res.redirect('/');
});

app.listen(port, () => console.log(`App running at port ${port}`));