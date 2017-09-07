'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');


/* Connect to your database */
mongoose.connect(config.db.uri);

var mConnection = mongoose.connection;

mConnection.on("connected", function() {
  console.log("I'm connected to my DB");

    fs.readFile('listings.json', 'utf8', function(err, data) {
        /*
          This callback function should save the data in the listingData variable,
          then start the server.
         */
        if(err) {
            console.log(err);
        }
        else{
            listingData = JSON.parse(data);
            delAndSaveDB();
        }
    });
});

var listingData=undefined;    

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

 var saveToDB = function () {
     for (var elem in listingData["entries"]) {
    var newEntry = new Listing(listingData["entries"][elem]);

    newEntry.save(function (err) {
      if(err) {
        console.log(err);
      }
      console.log("listing saved successfully");
    });
  };

};

var delAndSaveDB = function () {
  //empty db and call back function to catch an err
  Listing.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    saveToDB();
  });

};

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */