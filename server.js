const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebase');
require('dotenv/config')
const app = express();
app.use(bodyParser.json());

// Registration route
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .createUser({
      email,
      password,
    })
    .then((userRecord) => {
      // User registered successfully
      res.json({ message: 'Registration successful', uid: userRecord.uid });
    })
    .catch((error) => {
      console.log('Error registering user:', error);
      res.status(400).json({ error: 'Registration failed' });
    });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User logged in successfully
      const { uid } = userCredential.user;
      res.json({ message: 'Login successful', uid });
    })
    .catch((error) => {
      console.log('Error logging in:', error);
      res.status(401).json({ error: 'Login failed' });
    });
});

//hello world
app.get('/', (req, res) => {
  res.send('Hello ini TourismoBE API')
})

app.get('/2', (req, res) => {
  res.send('Hello ini TourismoBE API TEST ROUTE')
})
// Middleware to verify Firebase ID token
const verifyToken = (req, res, next) => {
    const idToken = req.headers.authorization;
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        console.log('Error verifying Firebase ID token:', error);
        res.sendStatus(403); // Unauthorized
      });
  };

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  // Access the authenticated user's information
  const { uid, email } = req.user;
  res.json({ uid, email });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});