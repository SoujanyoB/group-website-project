if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

// Requiring codeforces modules
const handleUsers = require('./codeforces/handleUsers');

const getSubmissions = require('./codeforces/getSubmissions');

const port = 3000;

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

app.get('/rankings', checkAuthenticated, (req, res) => {
  res.render('rankings.ejs', { name: req.user.name });
});



app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      codeforcesHandle: ""
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.listen(port, () => {console.log(`App listening at ${port}`)});

//////////////////////////////////////////////////////////////////////////  
handleUsers.getUser('soujanyo',(err,response)=>{
  if(err)
  {
    console.log(err);
    
  }
  else
  {
    console.log("The rating is "+response.rating);
    
  }
})
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

getSubmissions.getSubmission('KSamiksha',(err,response)=>{
  if (err) {
    return console.log(err);

  }

  var Submissions=response.res;
 
  var CorrectSubmissions=Submissions.filter((Submissions)=>Submissions.verdict==="OK");


  
  console.log(CorrectSubmissions[0].id);
  console.log(CorrectSubmissions[1].id);
  console.log(CorrectSubmissions[2].id);
  console.log(CorrectSubmissions[3].id);
  console.log(CorrectSubmissions[4].id);  
  
  


  
  

  
  
})