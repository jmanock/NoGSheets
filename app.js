var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1891LShhKaYJTynlKFPSupkEFpLYUll6_9M0Y0f1obI4');
var sheet;

async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('./client_secret.json');
    // OR, if you cannot save the file locally (like on heroku)

    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      sheet = info.worksheets[0];
      step();
    });
  },
  function workingWithRows(step){
    sheet.getRows({
      offset:1,
      limit:20,
      orderby:'col2'
    },function(err, rows){
      for(var i = 0; i<rows.length; i++){
        console.log(rows[i].firstname, rows[i].lastname, rows[i].dob);
      }
    });
  },
  function workingWithCells(step){
    sheet.getCells({
      'min-row':1,
      'max-row':5,
      'return-empty':false
    }, function(err, cells){
      //var cell = cells[0];
      for(var i = 0; i<cells.length; i++){
        //console.log(cells[i].value);
      }
      step();
    })
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});
