<p align="center">
  <img src="https://drive.google.com/file/d/1rNTnBwN5ezgzGaAqbV1--WIrus66-_H4/view?usp=sharing" alt="Tourismo logo" height="180" />
</p>

<h1 align="center">Tourismo</h1>


At Tourismo, we understand the challenges that travelers face when it comes to planning their vacations. Our mission is to simplify the process of travel planning and provide easy access to information about various tourism places. We believe that everyone should have the opportunity to explore the world without the stress and uncertainty of ticket prices and limited knowledge about destinations.

Our app is designed to address these challenges by accurately predicting the best time to buy plane tickets based on your selected holiday period and budget. With our advanced algorithms, you can make informed decisions and secure affordable prices, ensuring that you get the most out of your travel experience.

> Base url of this service is: http://localhost:8080/

API Documentation :

- Authentications
  <pre>POST /api/login</pre>
  <pre>body:{
    "email": "insert email here",
    "password": "insert password here"
  } </pre>

- Users
  <pre>POST /api/register</pre>
  <pre>body:{
    "email": "insert email here",
    "password": "insert password here"
  } </pre>

- Predictions
  <pre>POST /api/predictimage</pre>
  <pre>
  make sure to use form-data
  body:{
    "image": "insert image file here"
  } </pre>

- Tourist
  <pre>GET   /api/getalltourist</pre>
  <pre>POST  /api/specifictourist</pre>
  <pre>body:{
    "nama": "insert here"
  } </pre>


- Maskapai
  <pre>GET   /api/getallmaskapai</pre>
  <pre>POST  /api/gettiket</pre>
  <pre>
  body: {
    "departure":"",
    "arrival": "",
    "date": ""
    }
  </pre>


### Dependency

* [Express Server](https://www.npmjs.com/package/express)
* [Axios](https://www.npmjs.com/package/axios)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Cors](https://www.npmjs.com/package/cors)
* [Firebase](https://www.npmjs.com/package/firebase)
* [Firebase-Admin](https://www.npmjs.com/package/firebase-admin)
* [Firebase Function](https://www.npmjs.com/package/firebase-function)
* [Form data](https://www.npmjs.com/package/form-data)
* [is-Email](https://www.npmjs.com/package/is-email)
* [morgan](https://www.npmjs.com/package/morgan)
* [multer](https://www.npmjs.com/package/multer)
* [nodemon](https://www.npmjs.com/package/nodemon)

## Contribution

### CC Member (Master Contributor)
<p>CC member is responsible for the development of the API service and deployment of the model. In sort, in this project CC is responsible for Backend, infrastructure, and DevOps.</p>

### ML Member
#### Individuals
<p>ML Member is who are contribute to create prediction and classification model that used in this web service. Without them, this service is nothing.</p>

### MD Member
#### Individuals
<p>MD member is who are responsible to serve mobile applications based on Android and use this service as data source and more.</p>