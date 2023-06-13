const fs = require('fs');
const path = require('path');
const bisnis = require('./jsons/bisnis.json');
const ekonomi = require('./jsons/ekonomi.json');

// Function to determine the URL based on the airline
function getAirlineURL(airline) {
    // Logic to determine the URL based on the airline
    // For simplicity, let's assume a static mapping of airline names to URLs
    const airlineMappings = {
      'AirAsia': 'https://i.imgur.com/9dASu0V.png',
      'Batik Air': 'https://i.imgur.com/BDrgKPy.jpg',
      'Citilink': 'https://i.imgur.com/35GdE6E.png',
      'Garuda': 'https://i.imgur.com/OmVJmDg.png',
      'Lion Air': 'https://i.imgur.com/QKyoIwM.png',
      'NAM Air': 'https://i.imgur.com/Go7CD3l.png',
      'Pelita Air': 'https://i.imgur.com/0z5YG2x.png',
      'Scoot': 'https://i.imgur.com/H6coi9n.png',
      'Sriwijaya Air': 'https://i.imgur.com/hjLwfA8.png',
      'Super Air Jet': 'https://i.imgur.com/54dxYDq.jpg',
      'TransNusa': 'https://i.imgur.com/BGNymc7.png',
      'Wings Air': 'https://i.imgur.com/mwVazD5.png',
      // Add more mappings as needed
    };
  
    // Return the URL corresponding to the airline
    return airlineMappings[airline] || '';
  }
  
  // Modify the data and add the "url" attribute
  const modifiedData = ekonomi.map((obj) => {
    const { airlines } = obj;
    const urlGambar = getAirlineURL(airlines);
    return { ...obj, urlGambar };
  });
  
  // Convert the modifiedData array to JSON string
  const jsonData = JSON.stringify(modifiedData, null, 2);
  
  // Specify the file path where you want to save the new JSON file
  const filePath = './jsons/ekonomimodified.json';
  
  // Write the JSON data to the file
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file written successfully.');
    }
  });