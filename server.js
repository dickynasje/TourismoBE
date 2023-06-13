const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const {db} = require('./firebase');
const admin = require('./firebase');
const axios = require('axios');
require('dotenv/config')
const app = express();
const auth = getAuth();
const FormData = require('form-data');
const calculateDayDifference = require('./util');
//Data Pesawat
const bisnis = require('./jsons/bisnismodified.json');
const ekonomi = require('./jsons/ekonomimodified.json');

function filterDataByParameters(data, departure, arrival) {
  return data.filter((item) => {
    return item.departure === departure && item.arrival === arrival;
  });
}

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
  try {
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
  } catch (error) {
    console.log(error)
  }
});

//all tourist spot
app.get('/api/getalltourist', async(req, res) => {
  const snapshot = await db.collection('wisata').get();
  const documents = [];
  snapshot.forEach((doc) => {
  const documentData = doc.data();
  const documentJson = {
    nama: doc.id,
    ...documentData,
  };
  documents.push(documentJson);
});
  res.json(documents);
});


//specific tourist spot
app.post('/api/specifictourist', async(req, res) => {
  const {nama} = req.body;
  const snapshot = await db.collection('wisata').doc(nama).get();
  const documentData = snapshot.data();
  const documentJson = {
    nama: snapshot.id,
    ...documentData,
  };
  res.json(documentJson);
});

//getPesawat
app.get('/api/getallmaskapai', async(req, res) => {
  const snapshot = await db.collection('maskapai').get();
  const documents = [];
  snapshot.forEach((doc) => {
  const documentData = doc.data();
  const documentJson = {
    nama: doc.id,
    ...documentData,
  };
  documents.push(documentJson);
});
  res.json(documents);
});

//API Data tiket pesawat
app.post('/api/gettiket', async(req, res) => {
  const {departure, arrival, date} = req.body;
  //handle to reject if not in db string
  try {
    if(departure == "" || arrival == "" || date == ""){
      return res.json({message: 'Please Fill the form correctly'})
    }
    else if(departure == arrival){
      return res.json({message: 'Departure and Arrival cannot be the same'})
    }
    else{
      let bisnisFilteredData;
      let ekonomiFilteredData;
      ekonomiFilteredData = filterDataByParameters(ekonomi, departure, arrival);
      bisnisFilteredData = filterDataByParameters(bisnis, departure, arrival);

      // Check if filteredData is empty
      if (ekonomiFilteredData.length === 0 && bisnisFilteredData.length === 0) {
        res.json({ message: 'No data available for the specified parameters' });
      } else {
        const requestDate = new Date(date);
        let dayResultBisnis = null;
        let dayResultEkonomi = null;
        // Extract the common 'day' value from filteredData
        dayResultEkonomi = ekonomiFilteredData[0].day;
        dayResultBisnis = bisnisFilteredData[0].day;
        const newDateEkonomi = new Date(requestDate.getTime() - dayResultEkonomi * 24 * 60 * 60 * 1000);
        const newDateBisnis = new Date(requestDate.getTime() - dayResultBisnis * 24 * 60 * 60 * 1000);
        // Update the 'day' key to 'date' with the newDate value
        // filteredData = filteredData.map((item) => ({
        //   ...item,
        //   date: newDate,
        // }));
        res.json({maskapai: {bisnis: bisnisFilteredData, ekonomi: ekonomiFilteredData}, 
          tanggalBeliEkonomi: newDateEkonomi.toISOString().split('T')[0],
          tanggalBeliBisnis: newDateBisnis.toISOString().split('T')[0]
        });
      }
    } 

  } catch (error) {
    console.log(error)
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