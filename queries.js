/* Fill out these functions using Mongoose queries*/

var Listing = require('./ListingSchema.js'), 
    mongoose = require('mongoose'), 
    config = require('./config');

mongoose.connect(config.db.uri);

var mConnection = mongoose.connection;

mConnection.on("connected", function() {
    //check connection to DB
  console.log("I'm connected to my DB");
});   

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   Listing.find( {name: 'Library West'}, function(err, listingObj) {
    if (err) {
      console.log(err);
    }
    console.log(listingObj);
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   Listing.findOneAndRemove({ code:'CABL' }, function(err, listingObj) {
    if (err) {
      console.log(err);
    }
    console.log(listingObj);
   });
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   Listing.findOneAndUpdate ({ name: 'Phelps Laboratory'}, { address: '1275 Center Drive Biomedical Sciences Bldg J383 P.O. Box 116131 Gainesville, FL 32611-6131'}, function(err, prevListingObj) {
    if (err) {
      console.log(err);
    } 

    Listing.find({ name: 'Phelps Laboratory'}, function(err, listingObj) {
      if (err) throw err;
      console.log(listingObj);
    });
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find ( {}, function (err, listingObj) {
    if (err) throw err;
    console.log(listingObj);
   });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
