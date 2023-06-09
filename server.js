const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const admin = require('./firebase');
const axios = require('axios');
require('dotenv/config')
const app = express();
const auth = getAuth();
const FormData = require('form-data');

// Middleware to read POST data
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(multerMid.single("image"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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
      console.log(errorCode)
      res.json({errorCode})
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
      console.log(errorCode)
      res.json({errorCode})
    });

});
app.post('/api/predictimage', async(req, res) => {
  const image = req.file;
  if(image){
    const formData = new FormData();
    formData.append('image', image.buffer, image.originalname)
    const imagePredict = await axios.post(`${process.env.IMAGEPREDICT}`, 
    formData,
    {
      headers:formData.getHeaders(),
    }
    );
    if(imagePredict.data){
      return res.json(imagePredict.data)
    }else{
      return res.json({message: 'Failed to predict'})
    }
  }
  else{
    return res.json({message: 'No image found'})
  }
});

//hello world
app.get('/', (req, res) => {
  res.send('Hello ini TourismoBE API')
})

app.get('/2', (req, res) => {
  res.send('New Deploy test')
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