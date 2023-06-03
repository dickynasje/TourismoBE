const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebase');
require('dotenv/config')
const app = express();
const auth = getAuth();
app.use(bodyParser.json());
// Registration route
app.post('/api/register', async(req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      res.json(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      res.send(errorCode)
    });
  
});

// Login route
app.post('/api/login', async(req, res) => {
  const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      res.json(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.send(errorCode)
    });

});

//hello world
app.get('/', (req, res) => {
  res.send('Hello ini TourismoBE API')
})

app.get('/2', (req, res) => {
  res.send('Hello ini TourismoBE HA HI HU HA')
})
// // Middleware to verify Firebase ID token
// const verifyToken = (req, res, next) => {
//     const idToken = req.headers.authorization;
  
//     admin
//       .auth()
//       .verifyIdToken(idToken)
//       .then((decodedToken) => {
//         req.user = decodedToken;
//         next();
//       })
//       .catch((error) => {
//         console.log('Error verifying Firebase ID token:', error);
//         res.sendStatus(403); // Unauthorized
//       });
//   };

// // Protected route example
// app.get('/api/protected', verifyToken, (req, res) => {
//   // Access the authenticated user's information
//   const { uid, email } = req.user;
//   res.json({ uid, email });
// });



// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});